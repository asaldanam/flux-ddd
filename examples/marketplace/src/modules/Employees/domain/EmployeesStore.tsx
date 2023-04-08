import produce from "immer";

interface Employee {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export type EmployeesState = {
  employees: Employee []
}

export type EmployeesActions = {
  selectedActiveEmployee: { payload: { employee: Employee } },
  loadedEmployees: { payload: { criteria?: Partial<Employee> } }
}

export type EmployeesStore = Store<{
  state: {
    employees: Employee []
  },
  actions: {
    selectedActiveEmployee: { payload: { employee: Employee } },
    loadedEmployees: { payload: { criteria?: Partial<Employee> } }
  }
}>
const loadEmployees = (criteria?: Partial<Employee>): Thunk<EmployeesStore> => async (store) => {
  store.dispatch('loadedEmployees', { criteria })
}

loadEmployees({ email: 'asa' })

const slice = createStore({
  name: 'employees',
  initialState: {
    employees: [],
  } as State<EmployeesStore>,
  reducers: {
    loadedEmployees(state, payload) {
      
    },
    selectedActiveEmployee(state, payload) {
      
    },
  } as Reducers<EmployeesStore>,
  thunks: {
    loadEmployees,
    cosa: () => async (store) => {
      store.dispatch('loadedEmployees', {});
    },
    novale: () => {}
  }
})

slice.thunks.asdf();
slice.actions.loadEmployees()



export function createStore<
  Store extends BaseStore,
  ThunkAction extends string,
  ThunkFn extends Thunk<Store>,
>(config: {
    name: string;
    initialState: Store['state'];
    reducers: Reducers<Store>,
    thunks: {
      [TA in ThunkAction]: () => ThunkFn
    }
}) {

  type Thunks = typeof config.thunks;

  const actions = {} as Thunks

  return {
    ...config,
    actions,
  };
}

type Thunk<
  Store extends BaseStore,
  Dispatch = <Type extends keyof Store['actions']>(type: Type, payload: Store['actions'][Type]['payload']) => void,
> = (store: { state: Store['state'], dispatch: Dispatch }) => Promise<void>

type Reducers<Store extends BaseStore> = {
  [A in keyof Store['actions']]: (state: Store['state'], payload: Store['actions'][A]['payload']) => Store['state'];
}

type Store<S extends BaseStore> = S;
type State<Store extends BaseStore> = Store['state'];

type BaseStore = { state: BaseState, actions: BaseActions };
type BaseState = { [key: string]: any };
type BaseActions = { [key: string]: { payload: any } };