import { expect } from 'chai';
import Block from './Block';
import {TProps} from '../types';

describe('Block', () => {
  let TestBlock: typeof Block;

  before(() => {
    const template = '<div></div>';
    class TestComponent extends Block {
      constructor(props: TProps) {
        super({
          ...props,
          message: null,

          events: {
            click: (value: string) => {
              this.setProps({ message: value });
            }
          }
        });

      }

      render() {
        return this.compile(template, this.props as Record<string, unknown>);
      }
    }

    TestBlock = TestComponent;
  });

  it('Компонент инициализируется с id', () => {
    const component = new TestBlock({});
    expect(component._id).to.be.a('string').that.has.length;
  });

  it('Компонент рендерит HTML-разметку', () => {
    const component = new TestBlock({});
    const element = component.getContent();
    expect(element?.tagName).to.equal('DIV');
  });

  it('Компонент принимает входные параметры', () => {
    const content = 'Test content';
    const component = new TestBlock({ content });

    expect(component.props.content).to.be.equal(content);
  });

  it('Компонент устанавливает новое значение для параметра через setProps', () => {
    const message = 'Test message';
    const component = new TestBlock({ message });

    expect(component.props.message).to.be.equal(null);
    component.setProps({ message });
    expect(component.props.message).to.be.equal(message);
  });

});
