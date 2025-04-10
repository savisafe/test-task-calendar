import {Form, Input, Button, FormInstance} from 'antd';
import {TaskFormValues} from "../../../../entities/task/model/types";

interface CreateTaskFormProps {
    form: FormInstance;
    onCreate: (values: TaskFormValues) => void;
}

export const CreateTaskForm = ({form, onCreate}: CreateTaskFormProps) => (
    <Form form={form} onFinish={onCreate} layout="vertical">
        <Form.Item label="Название" name="title" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item label="Описание" name="description" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">Создать</Button>
    </Form>
);
