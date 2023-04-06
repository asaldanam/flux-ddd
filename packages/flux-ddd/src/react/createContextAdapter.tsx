import { DomainEventBase } from "../types";
import React, { createContext, PropsWithChildren, useContext, useMemo, useReducer } from "react";
import { useEventManager } from "./eventManager";

export function createContextAdapter<
  Name extends string,
  State extends any,
  Reducers extends Record<string, (state: State, payload?: any) => State>,
  Type extends Extract<keyof Reducers, string>,
  Dispatch extends <T extends Type>(type: T, payload: Parameters<Reducers[T]>[1]) => void,
  Actions extends any,
  Repositories extends Object,
>(
    slice: {
      name: Name;
      state: State;
      reducers: Reducers,
      actions: (dispatch: Dispatch, repositories: Repositories) => Actions,
      externalEvents?: <E extends DomainEventBase>(event: E, actions: Actions) => void, 
    },
  )
{
  const initialState = slice.state;
  
  const Context = createContext({
    state: initialState,
    actions: null as ReturnType<typeof slice.actions>
  });

  Context.displayName = slice.name;
  
  const Provider = ({ children, ...repositories }: PropsWithChildren<Repositories>) => {
    const reducer = (
      state: State,
      action: {
        type: Parameters<Dispatch>[0],
        payload: Parameters<Dispatch>[1]
      }
    ) => {
      return slice.reducers[action.type](state, action.payload);
    }

    const [state, _dispatch] = useReducer(reducer, initialState);

    const subscription = (e: any) => {
      const detail: DomainEventBase = e.detail;
      if (!slice.externalEvents || detail.slice === slice.name) return;

      slice.externalEvents(detail, actions)
    }

    const { send } = useEventManager({ subscription: slice.externalEvents ? subscription : null })
   
    const dispatch = ((type, payload) => {
      const params = { type, payload }

      _dispatch(params)
      send({ slice: slice.name, ...params });
    }) as Dispatch;

    const actions = slice.actions(dispatch, repositories as Repositories);

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
    useContext: () => {
      const value = useContext(Context);
      
      if (value.actions === null) {
        throw new Error(
          `[createContextAdapter]: No provider setted for ${slice.name}`
        );
      }

      return value;
    },
  }
}