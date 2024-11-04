import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { deleteExam, findExamList, publishExamOrNot } from "../../api/exam";
import ExamAddModal from "./ExamAddModal";

function ExamList() {
    const [exams, setExams] = useState<Array<Res.ExamItem>>([])
    const [addModalOpen, setAddModalOpen] = useState(false)

    async function getExamList(bin?: boolean) {
        const examRes = await findExamList(bin)
        setExams(examRes.data)
    }

    async function handleChangePubStatus(id: number, isPublish: boolean) {
        try {
            const res = await publishExamOrNot({ id, isPublish: !isPublish })
            message.success('publish status update success')
            getExamList()
        } catch (e) {
            message.error('publish status update error')
        }
    }

    async function handleDeleteExam(id: number) {
        try {
            await deleteExam({ id })
            message.success('delete exam success')
            getExamList()
        } catch (e) {
            message.error('delete exam error')
        }
    }

    useEffect(() => {
        getExamList()
    }, [])

    return <div>
        <div>
            <h2>exams list page</h2>
            <Button type="primary" onClick={() => { setAddModalOpen(true) }}>new exam</Button>
            <Button onClick={() => getExamList(true)}>recycle bin</Button>
            {
                exams?.map((examItem) => {
                    return <div key={examItem.id}>
                        <h3>name: { examItem.name }</h3>
                        <div>
                            <Button color="default" variant="solid" onClick={() => handleChangePubStatus(examItem.id, examItem.isPublish)}>{examItem.isPublish ? 'stop pub' : 'publish'}</Button>
                            <Button color="primary" variant="solid">edit</Button>
                            <Button color="danger" variant="solid" onClick={() => handleDeleteExam(examItem.id)}>delete</Button>
                        </div>
                    </div>
                })
            }
        </div>
        <ExamAddModal isOpen={addModalOpen} handleClose={() => {
            setAddModalOpen(false)
            getExamList()
        }} />
    </div>;
}

export default ExamList;