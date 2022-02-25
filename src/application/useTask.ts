import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';
import { useMain } from '../MainApplication/Provider';
import { Task } from '../../Types';

const useTask = (columnId: string) => {
    const [state, dispatch] = useMain();
    const { firstName, profileImageUrl } = useUser();
    const [isCreating, setIsCreating] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState('');

    const onCreateTask = (title: string) => {
        const task: Task = {
            id: uuidv4(),
            title,
            columnId: selectedColumn,
            assignees: {
                name: firstName || 'John Doe',
                avt:
                    profileImageUrl || 'https://randomuser.me/api/portraits/men/79.jpg',
            },
        };
        dispatch.createTask(task);
        setIsCreating(false);
    };

    const onAddTask = (columnId: string) => {
        setSelectedColumn(columnId);
        setIsCreating(true);
    };

    const tasks = state.tasks.filter((task) => task.columnId === columnId);

    return {
        tasks,
        onAddTask,
        onCreateTask,
        isCreating,
        setIsCreating,
        selectedColumn,
    };
};

export default useTask;
