import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../../Types';
import { useMain } from '../MainApplication/Provider';
import TaskForm from './TaskForm';

type Props = {
    task: Task;
};

const CardItem = ({ task }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [, dispatch] = useMain();
    const onDelete = (taskId: string) => {
        dispatch.deleteTask(taskId);
    };
    const onEditTask = (title: string) => {
        dispatch.updateTask(task.id, title);
        setIsEditing(false);
    };

    return (
        <Draggable index={+task.id} draggableId={task.id.toString()}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
                >
                    {isEditing ? (
                        <TaskForm
                            defaultValue={task.title}
                            setEditing={setIsEditing}
                            setTask={onEditTask}
                        />
                    ) : (
                        <p className="text-md mb-3 text-lg leading-6">{task.title}</p>
                    )}

                    <div className="flex justify-between space-x-3">
                        <div key={task.id}>
                            <img
                                src={task.assignees.avt}
                                width="36"
                                height="36"
                                alt={task.assignees.name}
                                className="rounded-full"
                            />
                        </div>

                        {!isEditing && (
                            <div className="flex">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="border border-dashed flex items-center w-9 h-9 border-gray-500 justify-center
                                rounded-full mr-1"
                                >
                                    <PencilIcon className="w-5 h-5 text-gray-500" />
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(task.id);
                                    }}
                                    className="border border-dashed flex items-center w-9 h-9 border-gray-500 justify-center
                        rounded-full"
                                >
                                    <TrashIcon className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default CardItem;
