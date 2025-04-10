import {Form, Input, Button, Space, FormInstance} from 'antd';
import {Task} from "../../../../entities/task/model/types";

interface EditTaskFormProps {
    form: FormInstance;
    onSave: (values: Task) => void;
    onDelete: () => void;
    onExport: () => void;
}

export const EditTaskForm = ({form, onSave, onDelete, onExport}: EditTaskFormProps) => (
    <Form form={form} onFinish={onSave} layout="vertical">
        <Form.Item label="Название" name="title" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item label="Описание" name="description" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Space>
            <Button type="primary" htmlType="submit">Сохранить</Button>
            <Button danger onClick={onDelete}>Удалить</Button>
            <Button onClick={onExport}>Экспортировать</Button>
        </Space>
    </Form>
);
