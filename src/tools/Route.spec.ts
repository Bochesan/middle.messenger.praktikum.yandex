import { expect } from 'chai';
import Block from './Block.ts';
import Route from './Route.ts';
import {TProps} from '../types';

describe('Route', function () {
  let TestBlock: typeof Block;

  before(() => {
    class TestComponent extends Block {
      constructor(props: TProps) {
        super(props);
      }
    }

    TestBlock = TestComponent;
  });

  it('Роут совпадает с заданным маршрутом', function () {
    const route = new Route('/route', TestBlock, {rootQuery: '#app'});
    expect(route.match('/route')).to.be.true;
    expect(route.match('/undefined')).to.be.false;
  });

  it('Роут инициализируется с параметрами', function () {
    const query = 'query';
    const route = new Route('/route', TestBlock, {rootQuery: query});
    expect(route._pathname).to.equal('/route');
    expect(route._blockClass).to.equal(TestBlock);
    expect(route._props.rootQuery).to.equal(query);
  });

});
