import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Question } from "../Edit";
import { findExamById } from "@/api/exam";
import { Button, Checkbox, Input, message, Radio } from "antd";
import { addAnswer } from "@/api/answer";

type Answer = {
    id: number
    answer: string
}

// 考试界面
function Exam() {
    const { id } = useParams()
    const [json, setJson] = useState<Array<Question>>([])
    const [answers, setAnswers] = useState<Array<Answer>>([])

    async function initExamPageData() {
        if (!id) return
        try {
            const res = await findExamById(+id)
            try {
                const content = JSON.parse(res.data.content)
                const answers = content.map((item: any) => ({
                    id: item.id
                }))
                // 初始化json、答卷数组
                setJson(content)
                setAnswers(answers)
            } catch (e) {}
        } catch (error) {
            message.error('获取数据失败')
        }
    }

    useEffect(() => {
        initExamPageData()
    }, [])

    // 表单项的值改变时，找到答卷数组中对应项进行值的修改
    function setAnswerItem(id: number, value: string) {
        const answerList = answers.map(item => {
            return item.id === id ? {
                id,
                answer: value
            } : item
        })

        setAnswers(answerList)
    }

    // 提交答卷
    async function answerAdd() {
        if (!id) return
        try {
            await addAnswer({ examId: +id, content: JSON.stringify(answers) })
            message.success('答卷提交成功')
        } catch (error) {
            message.error('答卷提交失败')
        }
    }

    function renderComponents(arr: Array<Question>) {
        return arr.map(item => {
            let formComponent;
            if(item.type === 'radio') {
                formComponent = <Radio.Group onChange={(e) => {
                    setAnswerItem(item.id, e.target.value)
                }}>
                    {
                        item.options?.map(option => <Radio value={option}>{option}</Radio>)
                    }
                </Radio.Group>
            } else if(item.type === 'checkbox') {
                formComponent = <Checkbox.Group options={item.options} onChange={(values) => {
                    setAnswerItem(item.id, values.join(','))
                }} />
            } else if(item.type === 'input'){
                formComponent = <Input onChange={(e) => {
                    setAnswerItem(item.id, e.target.value)
                }} />
            }

            return <div className="component-item" key={item.id}>
                <p className="question">{item.question}</p>
                <div className="options">
                    {formComponent}
                </div>
            </div>
        })
    }

    return <div>
        {renderComponents(json)}
        <Button type="primary" onClick={() => { answerAdd() }}>提交答卷</Button>
    </div>;
}

export default Exam;