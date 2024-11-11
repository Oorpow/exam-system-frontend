import { findAnswerById } from '@/api/answer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Question } from '../Edit';
import { findExamById } from '@/api/exam';
import { Checkbox, Input, Radio } from 'antd';

function Score() {
	const { id } = useParams();
	const [score, setScore] = useState();
	const [json, setJson] = useState<Array<Question>>([]);

	async function findExam(id: number) {
		const res = await findExamById(id);
		try {
			const content = JSON.parse(res.data.content);
			setJson(content);
		} catch (error) {}
	}

	async function initScorePageData() {
		if (!id) return;
		const res = await findAnswerById(+id);
		setScore(res.data.score);
		await findExam(res.data.examId);
	}

	useEffect(() => {
		initScorePageData();
	}, []);

    function renderComponents(arr: Array<Question>) {
        return arr.map(item => {
            let formComponent;
            if(item.type === 'radio') {
                formComponent = <Radio.Group value={item.answer}>
                    {
                        item.options?.map(option => <Radio value={option}>{option}</Radio>)
                    }
                </Radio.Group>
            } else if(item.type === 'checkbox') {
                formComponent = <Checkbox.Group options={item.options} value={item.answer.split(',')}/>
            } else if(item.type === 'input'){
                formComponent =  <Input value={item.answer}/>
            }

            return <div className="component-item" key={item.id}>
                <p className="question">{item.question}</p>
                <div className="options">
                    {formComponent}
                </div>
                <p className="score">
                    分值：{item.score}
                </p>
                <p className="answerAnalyse">
                    答案解析：{item.answerAnalyser}
                </p>
            </div>
        })
    }

	return (
		<div>
			<h1>成绩页</h1>
			<div>
				<h2>你的成绩：{score}</h2>
			</div>
			<div>
                正确答案: {renderComponents(json)}
            </div>
		</div>
	);
}

export default Score;
