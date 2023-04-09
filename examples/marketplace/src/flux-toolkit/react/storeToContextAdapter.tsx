import { PropsWithChildren, createContext, useContext, useMemo, useReducer } from "react";
import { Thunk, Reducers, BaseStore, State, BaseFunction } from "../createStore";

export function storeToContextAdapter<
  Store extends BaseStore,
  ThunkAction extends string,
  ThunkFn extends BaseFunction<Thunk<Store>>,
  Thunks extends {
    [TA in ThunkAction]: ThunkFn
  },
  Dispatch extends <Type extends keyof Store['actions']>(type: Type, payload: Store['actions'][Type]['payload']) => void
>(store: {
    name: string;
    initialState: Store['state'];
    reducers: Reducers<Store>,
    thunks: Thunks,
}) {
  type Value = [State<Store>, Thunks]

  const Context = createContext([store.initialState, {}] as Value);
  Context.displayName = store.name;

  const Provider = ({ children, ...repositories }: PropsWithChildren<Store['repositories']>) => {
    const reducer = (
      state: State<Store>,
      action: {
        type: Parameters<Dispatch>[0],
        payload: Parameters<Dispatch>[1]
      }
    ) => {
      return store.reducers[action.type](state, action.payload);
    }

    const [state, _dispatch] = useReducer(reducer, store.initialState);

    const dispatch = ((type, payload) => {
      _dispatch({ type, payload })
    }) as Dispatch

    const thunks = Object
      .keys(store.thunks)
      .reduce((thunks, action) => {
        const thunkAction = action as ThunkAction

        const thunk = (...args: []) => store.thunks[action as ThunkAction]
          .apply(null, args)({ dispatch, state }, repositories)

        return {
          ...thunks,
          [thunkAction]: thunk
        }
      }, {})
    

    const value = useMemo(() => {
      return [state, thunks] as Value
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    )
  }


  return {
    Provider,
    useContext: () => {
      const value = useContext(Context);
      return value;
    },
  };
}