import { Modal, Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { createExam } from '../../api/exam';

interface Props {
    isOpen: boolean
    handleClose: () => void
}

const formLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
}

function ExamAddModal(props: Props) {
    const [form] = useForm<Dto.CreateExamDto>()

    const handleOk = async () => {
        await form.validateFields()
        const values = form.getFieldsValue()
        
        await createExam(values)
        message.success('create exam success')
        form.resetFields()
        props.handleClose()
    }

    return <Modal 
        title="新增试卷"
        open={props.isOpen}
        onOk={handleOk}
        onCancel={() => props.handleClose()}
        okText={'创建'}
        cancelText={'取消'}    
    >
        <Form
            form={form}
            colon={false}
            {...formLayout}
        >
            <Form.Item
                label="试卷名"
                name="name"
                rules={[
                    { required: true, message: '请输入试卷名!' },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    </Modal>;
}

export default ExamAddModal;