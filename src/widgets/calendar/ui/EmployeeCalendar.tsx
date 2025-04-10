import {useState, useEffect} from 'react';
import {Calendar, Modal, Input, Button, Upload, Form} from 'antd';
import {InboxOutlined, PlusOutlined} from '@ant-design/icons';
import {Dayjs} from 'dayjs';
import {useTasks} from "../../../entities/task/model/useTasks";
import {Task} from "../../../entities/task/model/types";
import {AlertMessage} from "../../../shared/ui/AlertMessage";
import {NameModal} from "../../../shared/ui/NameModal";
import {TaskList} from "../../../entities/task/ui/TaskList";
import {CreateTaskForm} from "../../../features/task/create/ui/CreateTaskForm";
import {EditTaskForm} from "../../../features/task/edit/ui/EditTaskForm";
import "../../../index.css"

const EmployeeCalendar = () => {
    const [author, setAuthor] = useState('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [search, setSearch] = useState('');
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDayModalVisible, setIsDayModalVisible] = useState(false);
    const [isNameModalVisible, setIsNameModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [nameForm] = Form.useForm();

    const {
        tasks,
        currentTask,
        setCurrentTask,
        createTask,
        editTask,
        deleteTask,
        importTasks,
    } = useTasks(author);

    useEffect(() => {
        const stored = localStorage.getItem('author');
        if (!stored) {
            setIsNameModalVisible(true);
        } else {
            setAuthor(stored);
        }
    }, []);

    const handleImportAll = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const imported = JSON.parse(reader.result as string) as Task[];
                importTasks(imported);
                setAlertType('success');
                setAlertMessage('Задания импортированы');
            } catch {
                setAlertType('error');
                setAlertMessage('Ошибка импорта');
            }
        };
        reader.readAsText(file);
        return false;
    };

    const handleExportAll = () => {
        const blob = new Blob([JSON.stringify(tasks, null, 2)], {type: 'application/json'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'tasks.json';
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const handleExportOne = () => {
        if (!currentTask) return;
        const blob = new Blob([JSON.stringify(currentTask, null, 2)], {type: 'application/json'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `task-${currentTask.date}.json`;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const tasksForSelectedDate = tasks.filter(task =>
        task.date === selectedDate && task.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {alertMessage && (
                <AlertMessage message={alertMessage} type={alertType} onClose={() => setAlertMessage(null)}/>
            )}

            <h2 className="text-center">Календарь сотрудника: {author}</h2>

            <Calendar
                onSelect={(date, { source }) => {
                    if (source === 'date') {
                        setSelectedDate(date.format('YYYY-MM-DD'));
                        setIsDayModalVisible(true);
                        setSearch('');
                    }
                }}
                cellRender={(value: Dayjs) => {
                    const dayTasks = tasks.filter(t => t.date === value.format('YYYY-MM-DD'));
                    return <ul>{dayTasks.map((t) => <li key={t.id}>{t.title}</li>)}</ul>;
                }}
            />

            <NameModal open={isNameModalVisible} form={nameForm} onSubmit={({name}) => {
                localStorage.setItem('author', name);
                setAuthor(name);
                setIsNameModalVisible(false);
            }}/>

            <Modal
                title={`Задания на ${selectedDate}`}
                open={isDayModalVisible}
                onCancel={() => setIsDayModalVisible(false)}
                footer={null}>
                <Input placeholder="Поиск по названию" value={search} onChange={e => setSearch(e.target.value)}/>
                <TaskList tasks={tasksForSelectedDate} onEdit={(task) => {
                    setCurrentTask(task);
                    editForm.setFieldsValue(task);
                    setIsEditModalVisible(true);
                }}/>
                <Button icon={<PlusOutlined/>} type="dashed" block onClick={() => setIsCreateModalVisible(true)}>Добавить
                    задание</Button>
            </Modal>

            <Modal open={isCreateModalVisible} title="Создать задание" footer={null}
                   onCancel={() => setIsCreateModalVisible(false)}>
                <CreateTaskForm
                    form={form}
                    onCreate={(values) => {
                        createTask({...values, id: Date.now(), date: selectedDate, author});
                        form.resetFields();
                        setIsCreateModalVisible(false);
                    }}
                />
            </Modal>

            <Modal open={isEditModalVisible} title="Редактировать задание" footer={null} onCancel={() => {
                setIsEditModalVisible(false);
                setCurrentTask(null);
            }}>
                <EditTaskForm
                    form={editForm}
                    onSave={(values: Task) => {
                        if (!currentTask) return;
                        editTask({...currentTask, ...values});
                        setIsEditModalVisible(false);
                        setCurrentTask(null);
                    }}
                    onDelete={() => {
                        deleteTask();
                        setIsEditModalVisible(false);
                    }}
                    onExport={handleExportOne}
                />
            </Modal>

            <div className="upload-buttons">
                <Upload beforeUpload={handleImportAll} showUploadList={false}>
                    <Button icon={<InboxOutlined/>}>Импортировать задания</Button>
                </Upload>
                <Button onClick={handleExportAll}>Экспортировать все задания</Button>
            </div>
        </div>
    );
};

export default EmployeeCalendar;
