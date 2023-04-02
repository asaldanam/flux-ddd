import { createContext, PropsWithChildren, useContext, useMemo, useReducer } from "react";

export function createContextAdapter<
  Name extends string,
  State extends any,
  Reducers extends Record<string, (state: State, payload?: any) => State>,
  Type extends Extract<keyof Reducers, string>,
  Dispatch extends <T extends Type>(type: T, payload: Parameters<Reducers[T]>[1]) => void,
  Actions extends any,
  Repositories extends any,
>(config: {
    name: Name;
    state: State;
    reducers: Reducers,

    actions: (dispatch: Dispatch, repositories: Repositories) => Actions
}) {
  const initialState = config.state;
  
  const Context = createContext({
    state: initialState,
    actions: {} as ReturnType<typeof config.actions>
  });

  Context.displayName = config.name;
  
  const Provider = ({ children, ...repositories }: PropsWithChildren<Repositories>) => {
    const reducer = (
      state: State,
      action: {
        type: Parameters<Dispatch>[0],
        payload: Parameters<Dispatch>[1]
      }
    ) => {
      return config.reducers[action.type](state, action.payload);
    }

    const [state, _dispatch] = useReducer(reducer, initialState);
   
    const dispatch = ((type, payload) => {
      _dispatch({ type, payload })
    }) as Dispatch;

    const actions = config.actions(dispatch, repositories as Repositories);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = useMemo(() => ({ state, actions }), [state])

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    )
  }

  return {
    Provider,
    useContext: () => useContext(Context),
  }
}