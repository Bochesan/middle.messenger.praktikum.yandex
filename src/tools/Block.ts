import EventBus from './EventBus';
import Handlebars from 'handlebars';
import uniqid from 'uniqid';
import {TProps} from '../types';


export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public _element: HTMLElement | null = null;
  public _id: string;
  public tagName: string;
  public props: TProps;
  public children: TProps;
  public lists: TProps;
  public state: { [key: string]: unknown };
  private eventBus: () => EventBus;

  constructor(propsWithChildren: TProps) {
    const { children, props, lists } = this._getChildrenPropsAndProps(propsWithChildren);

    this._id = uniqid();
    this.tagName = 'div';
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    this.children = this._makePropsProxy(children);
    this.lists = this._makePropsProxy(lists);
    this.state = {};
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenPropsAndProps(propsWithChildren: TProps) {
    const children: { [key: string]: unknown } = {};
    const props: { [key: string]: unknown } = {};
    const lists: { [key: string]: any } = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props, lists };
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this.dispatchComponentDidMount();
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: unknown, newProps: unknown) {
    return oldProps !== newProps;
  }

  setProps(nextProps: TProps) {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _render() {
    const block: unknown = this.render();

    if (block instanceof DocumentFragment) {
      this._removeEvents();

      const newElement = block.firstElementChild;
      if (this._element) {
        if (newElement) {
          this._element.replaceWith(newElement);
        }
      }

      this._element = newElement as HTMLElement;
      this._addEvents();
      this._addAttributes();
    }
  }

  setClassName(className?: string | unknown) { // TODO
    if (typeof className === 'string') {
      const classNames = (className as string).split(/\s+/);
      classNames.forEach((token) => {
        this._element?.classList.add(token);
      });
    }
  }
  compile(template: string, props: TProps) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${key}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const hbsTemplate = Handlebars.compile(template);
    fragment.innerHTML = hbsTemplate(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      const stub = fragment.content.querySelector(`[data-id="__l_${key}"]`);

      if (stub) {
        const listContent = this._createDocumentElement('template') as HTMLTemplateElement;

        child.forEach((item: unknown) => {
          if (item instanceof Block) {
            const content = item.getContent();
            if (content) {
              listContent.content.append(content);
            }
          } else {
            listContent.content.append(`${item}`);
          }
        });
        stub.replaceWith(listContent.content);
      }
    });
    return fragment.content;
  }

  render() {}

  private _makePropsProxy(props: TProps) {
    const self = this as Block;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target, prop: string, value: unknown) {
        const oldTarget = {...target};
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);

    return element;
  }

  private _addAttributes() {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (typeof value === 'string') {
        this._element?.setAttribute(key, value);
      }
    });
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        if (events[eventName].element !== undefined) {
          this._element.querySelector(events[eventName].element).addEventListener(eventName, events[eventName].event);
        } else {
          this._element.addEventListener(eventName, events[eventName]);
        }
      }
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }
}
