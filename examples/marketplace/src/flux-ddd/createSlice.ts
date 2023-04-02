export function createSlice<
  Name extends string,
  State extends any,
  Reducers extends Record<string, (state: State, payload?: any) => State>,
  Type extends Extract<keyof Reducers, string>,
  Dispatch extends <T extends Type>(type: T, payload: Parameters<Reducers[T]>[1]) => void,
  Actions extends string,
  Action extends (payload: any) => void | Promise<void>,
  Repositories extends any,
>(config: {
    name: Name;
    state: State;
    reducers: Reducers,
    actions: (dispatch: Dispatch, repositories: Repositories) => ({ 
      [A in Actions]: Action
    })
  }) {
  return config;
}