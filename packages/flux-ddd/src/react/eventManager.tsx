import { DomainEventBase } from "../types";
import React, { createContext, PropsWithChildren, useContext, useEffect } from "react";

type Value = {
  manager?: EventTarget
  eventKey?: string;
}

const EventManagerCtx = createContext<Value>({});

export function EventManagerProvider({ children, manager, eventKey }: PropsWithChildren<Value>) {
  const value = {
    manager: manager || new EventTarget(),
    eventKey: eventKey || 'flux-ddd/event-manager'
  }

  return (
    <EventManagerCtx.Provider value={value}>
      {children}
    </EventManagerCtx.Provider>
  )
}

export function useEventManager(props: { subscription?: EventListenerOrEventListenerObject | null }) {
  const { subscription } = props;
  const { manager, eventKey } = useContext(EventManagerCtx);

  const send = (detail: DomainEventBase) => {
    if (!manager || !eventKey) return;
    manager.dispatchEvent(new CustomEvent(eventKey, { detail }))
  }

  useEffect(() => {    
    if (!subscription) return;

    if (!manager || !eventKey) {
      console.warn('[EventManager] no provider found. Should instance <EventManagerProvider> at top of the tree');
      return;
    }

    manager.addEventListener(eventKey, subscription)
    return () => manager.removeEventListener(eventKey, subscription)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { send }
}

