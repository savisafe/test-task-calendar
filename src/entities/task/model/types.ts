export interface Task {
    id: number;
    title: string;
    description: string;
    date: string;
    author: string;
    previousAuthor?: string;
}

export type TaskFormValues = Omit<Task, 'previousAuthor'>;