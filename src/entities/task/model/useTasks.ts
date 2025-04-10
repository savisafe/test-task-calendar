import { useState } from 'react';
import {Task, TaskFormValues} from './types';

export const useTasks = (author: string) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);

    const createTask = (task: TaskFormValues) => {
        setTasks(prev => [...prev, task]);
    };

    const editTask = (updated: Task) => {
        setTasks(prev => prev.map(task => task === currentTask ? updated : task));
    };

    const deleteTask = () => {
        if (!currentTask) return;
        setTasks(prev => prev.filter(t => t !== currentTask));
    };

    const importTasks = (imported: Task[]) => {
        const updated = imported.map(task => ({
            ...task,
            previousAuthor: task.author,
            author,
        }));
        setTasks(updated);
    };

    return {
        tasks,
        currentTask,
        setCurrentTask,
        createTask,
        editTask,
        deleteTask,
        importTasks,
    };
};
