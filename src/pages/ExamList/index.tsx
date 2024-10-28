import { useEffect, useState } from "react";
import { Button } from "antd";
import { findExamList } from "../../api/exam";
import ExamAddModal from "./ExamAddModal";

function ExamList() {
    const [exams, setExams] = useState<Array<Res.ExamItem>>([])
    const [addModalOpen, setAddModalOpen] = useState(false)

    async function getExamList() {
        const examRes = await findExamList()
        setExams(examRes.data)
    }

    useEffect(() => {
        getExamList()
    }, [])

    return <div>
        <div>
            <h2>exams list page</h2>
            <Button type="primary" onClick={() => { setAddModalOpen(true) }}>new exam</Button>
            {
                exams?.map((examItem) => {
                    return <div key={examItem.id}>
                        <h3>name: { examItem.name }</h3>
                        <div>
                            <Button color="default" variant="solid">{examItem.isPublish ? 'stop' : 'publish'}</Button>
                            <Button color="primary" variant="solid">edit</Button>
                            <Button color="danger" variant="solid">delete</Button>
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