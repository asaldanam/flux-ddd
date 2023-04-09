export function createStore<
  Store extends BaseStore,
  ThunkAction extends string,
  ThunkFn extends BaseFunction<Thunk<Store>>,
  Thunks extends {
    [TA in ThunkAction]: ThunkFn
  }
>(store: {
    name: string;
    initialState: Store['state'];
    reducers: Reducers<Store>,
    thunks: Thunks
}) {
  return store;
}

export type Thunk<
  Store extends BaseStore,
  Dispatch = <Type extends keyof Store['actions']>(type: Type, payload: Store['actions'][Type]['payload']) => void,
> = (store: { state: Store['state'], dispatch: Dispatch }, repositories: Store['repositories']) => Promise<void>

export type Reducers<Store extends BaseStore> = {
  [A in keyof Store['actions']]: (state: Store['state'], payload: Store['actions'][A]['payload']) => Store['state'];
}

export type Store<S extends BaseStore> = S;

export type State<Store extends BaseStore> = Store['state'];

export type BaseStore = { state: BaseState, actions: BaseActions, repositories?: BaseRepositories };
export type BaseState = { [key: string]: any };
export type BaseRepositories = { [key: string]: any };
export type BaseActions = { [key: string]: { payload: any } };
export type BaseFunction<R> = (...args: any[]) => R;