import {List, Button} from 'antd';
import {Task} from '../model/types';

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
}

export const TaskList = ({tasks, onEdit}: TaskListProps) => (
    <List
        dataSource={tasks}
        locale={{emptyText: 'Нет заданий'}}
        renderItem={(task) => (
            <List.Item actions={[<Button type="link" onClick={() => onEdit(task)}>Редактировать</Button>]}>
                <List.Item.Meta
                    title={task.title}
                    description={
                        <>
                            <div>{task.description}</div>
                            {task.previousAuthor && <div>Ранее автор: {task.previousAuthor}</div>}
                        </>
                    }
                />
            </List.Item>
        )}
    />
);
