import chai from 'chai';
import {createStore} from 'redux';
import {bindAll, createAction, createReducer} from '../src/index.js';
const expect = chai.expect;

describe('bindAll', function () {
  function init() {
    const inc = createAction();
    const dec = createAction();
    const reducer = createReducer({
      [inc]: (state)=> state + 1,
      [dec]: (state)=> state - 1
    }, 0);
    const store = createStore(reducer);
    const store2 = createStore(reducer);
    return { inc, dec, reducer, store, store2 };
  }

  it('should support hash', function () {
    const { inc, dec, reducer, store, store2 } = init();
    bindAll({ inc, dec }, store);
    inc();
    expect(store.getState()).to.equal(1);
    inc();
    expect(store.getState()).to.equal(2);
    dec();
    expect(store.getState()).to.equal(1);
  });

  it('should support array', function () {
    const { inc, dec, reducer, store, store2 } = init();
    bindAll([inc, dec], store);
    inc();
    expect(store.getState()).to.equal(1);
    inc();
    expect(store.getState()).to.equal(2);
    dec();
    expect(store.getState()).to.equal(1);
  });

  it('should support hash and multiple stores', function () {
    const { inc, dec, reducer, store, store2 } = init();
    bindAll({ inc, dec }, [store, store2]);
    inc();
    expect(store.getState()).to.equal(1);
    expect(store2.getState()).to.equal(1);
    inc();
    expect(store.getState()).to.equal(2);
    expect(store2.getState()).to.equal(2);
    dec();
    expect(store.getState()).to.equal(1);
    expect(store2.getState()).to.equal(1);
  });

  it('should support array and multiple stores', function () {
    const { inc, dec, reducer, store, store2 } = init();
    bindAll([inc, dec], [store, store2]);
    inc();
    expect(store.getState()).to.equal(1);
    expect(store2.getState()).to.equal(1);
    inc();
    expect(store.getState()).to.equal(2);
    expect(store2.getState()).to.equal(2);
    dec();
    expect(store.getState()).to.equal(1);
    expect(store2.getState()).to.equal(1);
  });
});
