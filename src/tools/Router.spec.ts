import Router from './Router';
// import Route from './Route';
import Block from './Block';
import { expect } from 'chai';
import sinon from 'sinon';
import {TProps} from '../types';

describe('Router', () => {
  let router: Router;
  let FirstPageComponent: typeof Block;
  let SecondPageComponent: typeof Block;

  before(() => {
    class FirstComponent extends Block {
      constructor(props: TProps) {
        super({
          ...props
        });
      }

      render(): string {
        return '<div>{{text}}</div>';
      }
    }

    class SecondComponent extends Block {
      constructor(props: TProps) {
        super({
          ...props
        });
      }

      render(): string {
        return '<div>{{newText}}</div>';
      }
    }

    FirstPageComponent = FirstComponent;
    SecondPageComponent = SecondComponent;
  });

  beforeEach(() => {
    router = new Router('#app');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Роутер инициализирует и записывает маршрут', () => {
    router.use('/test', FirstPageComponent);

    expect(router.routes).to.have.lengthOf(1);
  });

  it('Роутер переходит по страницам с помощью метода go и записывает историю посещения в history', () => {
    router.use('/test-1', FirstPageComponent);
    router.use('/test-2', SecondPageComponent);
    router.go('/test-1');
    router.go('/test-2');

    expect(router.history?.length).to.be.eq(3);
  });

  it('Роутер переходит на предыдущую страницу с помощью метода back', () => {
    const goBack = sinon.stub(window.history, 'back');

    router.back();

    expect(goBack.calledOnce).to.be.true;
  });

  it('Роутер переходит на следующую страницу с помощью метода forward', () => {
    const goForward = sinon.stub(window.history, 'forward');

    router.forward();

    expect(goForward.calledOnce).to.be.true;
  });
});
