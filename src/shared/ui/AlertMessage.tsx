import { Alert } from 'antd';

interface AlertMessageProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export const AlertMessage = ({message, type, onClose}: AlertMessageProps) => (
    <Alert
        message={message}
        type={type}
        showIcon
        closable
        style={{ margin: 20 }}
        onClose={onClose}
    />
);
