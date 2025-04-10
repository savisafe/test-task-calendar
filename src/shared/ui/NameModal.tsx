import {Modal, Form, Input, Button, FormInstance} from 'antd';

interface NameModalProps {
    open: boolean;
    form: FormInstance;
    onSubmit: (values: { name: string }) => void;
}

export const NameModal = ({open, form, onSubmit}: NameModalProps) => (
    <Modal title="Введите ваше имя" open={open} closable={false} footer={null} maskClosable={false}>
        <Form form={form} onFinish={onSubmit} layout="vertical">
            <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}>
                <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">Сохранить</Button>
        </Form>
    </Modal>
);
