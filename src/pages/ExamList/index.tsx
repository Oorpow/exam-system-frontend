import { useEffect, useState } from "react";
import { Button } from "antd";
import { findExamList } from "../../api/exam";

function ExamList() {
    const [exams, setExams] = useState<Array<Res.ExamItem>>([])

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
            <Button type="primary">new exam</Button>
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
    </div>;
}

export default ExamList;