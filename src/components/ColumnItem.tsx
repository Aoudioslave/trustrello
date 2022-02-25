import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { Droppable } from 'react-beautiful-dnd';
import {Column} from '../../Types';
import TaskForm from './TaskForm';
import CardItem from './CardItem';
import useTask from '../application/useTask';

type Props = {
    column: Column;
};

const ColumnItem = ({ column }: Props) => {
    const {
        tasks,
        onAddTask,
        onCreateTask,
        isCreating,
        setIsCreating,
        selectedColumn,
    } = useTask(column.id);

    return (
        <div key={column.name}>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div
                            className={`bg-gray-100 rounded-md shadow-md flex flex-col relative overflow-hidden
                            ${snapshot.isDraggingOver && 'bg-green-100'}`}
                        >
                            <span className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200 absolute inset-x-0 top-0" />
                            <h2 className=" p-3 flex justify-between items-center mb-2">
                                <span className="text-2xl text-gray-600">{column.name}</span>
                            </h2>

                            <div
                                className="overflow-y-auto overflow-x-hidden h-auto"
                                style={{ maxHeight: 'calc(100vh - 290px)' }}
                            >
                                {tasks.length > 0 && tasks.map((task) => <CardItem key={task.id} task={task} />)}
                                {provided.placeholder}
                            </div>

                            {isCreating && selectedColumn === column.id ? (
                                <div className="p-3">
                                    <TaskForm setEditing={setIsCreating} setTask={onCreateTask} />
                                </div>
                            ) : (
                                <button
                                    className="flex justify-center items-center my-3 space-x-2 text-lg"
                                    onClick={() => onAddTask(column.id)}
                                >
                                    Add task
                                    <PlusCircleIcon className="w-5 h-5 text-gray-500" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ColumnItem;
