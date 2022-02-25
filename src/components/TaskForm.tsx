import React, { useRef } from 'react';
import { CheckIcon, XIcon } from '@heroicons/react/outline';

type Props = {
    setTask: (taskTitle: string) => void;
    setEditing: (value: boolean) => void;
    defaultValue?: string;
    columnId?: string;
};

const TaskForm = ({ setEditing, setTask, defaultValue, columnId }: Props) => {
    const taskInfoRef = useRef<HTMLTextAreaElement>(null);
    return (
        <form onSubmit={() => setTask( taskInfoRef.current?.value || '')}>
          <textarea
              defaultValue={defaultValue || ''}
              ref={taskInfoRef}
              className="border-gray-300 rounded focus:ring-purple-400 w-full"
              rows={3}
              placeholder="Task info"
          />
            <div className="flex float-right">
                <button
                    type="submit"
                    className="border border-dashed flex items-center w-9 h-9 border-gray-500 justify-center rounded-full mr-1"
                >
                    <CheckIcon className="w-5 h-5 text-gray-500" />
                </button>
                <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="border border-dashed flex items-center w-9 h-9 border-gray-500 justify-center rounded-full mr-1"
                >
                    <XIcon className="w-5 h-5 text-gray-500" />
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
