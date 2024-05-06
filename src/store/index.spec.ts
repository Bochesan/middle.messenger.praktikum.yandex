import { expect } from 'chai';
import {store, initialState, StoreEvents} from './index.ts';

describe('Store', function () {
  describe('Method getState', function () {
    it('Компонент возвращает состояние хранилища', function () {
      const state = store.getState();
      expect(state).to.be.an('object');
      expect(state).to.deep.equal(initialState);
    });
  });

  describe('Method set', function () {
    it('Компонент устанавливает состояние хранилища', function () {
      const id = 17;
      store.on(StoreEvents.Updated, () => {});
      store.set({ id });
      expect(store.getState().id).to.equal(id);
    });

    it('Компонент вызывает событие обновления при изменении состояния хранилища', function (done) {
      const id = 17;
      store.on(StoreEvents.Updated, () => {
        expect(store.getState().id).to.equal(id);
        done();
      });
      store.set({ id });
    });
  });
});
