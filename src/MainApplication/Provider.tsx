import * as React from 'react';
import {FunctionComponent} from 'react';
import {Actions, Dispatch, mapToReducerActions, Reducer, State} from './Reducer';

const tasks = require('../data/task-data.json');
const columns = require('../data/column-data.json');

const StateContext = React.createContext<State | undefined>(undefined);
const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

const initialState = (): State => {
    return {
        tasks: tasks,
        columns: columns,
    };
};

type Props = {
    children: React.ReactChild
};

const Provider: FunctionComponent<Props> = ({
    children
}) => {
    const [state, dispatch] = React.useReducer(Reducer, initialState());
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

function useState() {
    const context = React.useContext(StateContext);
    if (context === undefined) {
        throw new Error('useState must be used within a MainApplication.');
    }
    return context;
}

function useDispatch() {
    const context = React.useContext(DispatchContext);
    if (context === undefined) {
        throw new Error('useDispatch must be used within a MainApplication.');
    }
    return context;
}

function useMain(): [State, Actions] {
    const actions = mapToReducerActions(useDispatch());
    return [useState(), actions];
}

export { Provider, useMain };
