import { Column, Task } from '../../Types';

type Action =
    | { type: 'CREATE_TASK'; item: Task }
    | { type: 'UPDATE_TASK'; items: {taskId:string, title:string} }
    | { type: 'UPDATE_TASK_COLUMN'; items: {taskId:string, columnId:string} }
    | { type: 'DELETE_TASK'; item: string }

export type Actions = {
    createTask: (task: Task) => void;
    updateTask: (taskId: string, title: string) => void;
    updateTaskColumn: (taskId: string, columnId: string) => void;
    deleteTask: (taskId: string) => void;
};

export type State = {
    tasks: Task[];
    columns: Column[];
};

export type Dispatch = (action: Action) => void;

export function Reducer(state: State, action: Action) {
    switch (action.type) {

        case 'CREATE_TASK': {
            return {
                ...state,
                tasks: [...state.tasks, action.item]
            };
        }

        case 'UPDATE_TASK': {
            return {
                ...state,
                tasks: [
                    ...state.tasks.map(task => {
                        if(task.id === action.items.taskId){
                            return {
                                ...task,
                                title: action.items.title,
                            }
                        }
                        return task
                    }),
                ]
            };
        }
        case 'UPDATE_TASK_COLUMN': {
            return {
                ...state,
                tasks: [
                    ...state.tasks.map(task => {
                        if(task.id === action.items.taskId){
                            return {
                                ...task,
                                columnId: action.items.columnId
                            }
                        }
                        return task
                    }),
                ]
            };
        }
        case 'DELETE_TASK': {
            return {
                ...state,
                tasks: [...state.tasks.filter(task => task.id !== action.item)]
            };

        }
        default: {
            throw new Error('Unhandled action type');
        }
    }
}

export function mapToReducerActions(dispatch: Dispatch): Actions {
    return {
        createTask: (task: Task) => dispatch({ type: 'CREATE_TASK', item: task }),
        updateTask: (taskId: string, title: string) => dispatch({ type: 'UPDATE_TASK', items: {taskId, title} }),
        updateTaskColumn: (taskId: string, columnId: string) => dispatch({ type: 'UPDATE_TASK_COLUMN', items: {taskId, columnId} }),
        deleteTask: (taskId: string) => dispatch({ type: 'DELETE_TASK', item: taskId }),
    };
}
