// TODO 还差小册中tab切换的能力
import { useParams } from 'react-router-dom';
import './index.css';
import {
	Button,
	Checkbox,
	Form,
	Input,
	InputNumber,
	message,
	Radio,
	Segmented,
} from 'antd';
import MaterialItem from './Material';
import { useDrop } from 'react-dnd';
import { useEffect, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { useForm } from 'antd/lib/form/Form';
import { findExamById, saveExam } from '@/api/exam';

export type Question = {
	id: number;
	question: string;
	type: 'radio' | 'checkbox' | 'input';
	options?: string[];
	score: number;
	answer: string;
	answerAnalyser: string;
};

export function Edit() {
	const { examId } = useParams();
	// console.log(examId);

	// 用于高亮显示
	const [currentQuestionId, setCurrentQuestionId] = useState<number>();
	const [json, setJson] = useState<Array<Question>>([]);
	const [form] = useForm();
	const [key, setKey] = useState('json');

	const [{ isOver }, drop] = useDrop(() => ({
		accept: ['单选题', '多选题', '填空题'],
		drop: (item: { type: string }) => {
			const type = {
				单选题: 'radio',
				多选题: 'checkbox',
				填空题: 'input',
			}[item.type] as Question['type'];

			setJson((json) => [
				...json,
				{
					id: new Date().getTime(),
					type,
					question: '最高的山？',
					options: ['选项1', '选项2'],
					score: 5,
					answer: '选项1',
					answerAnalyser: '答案解析',
				},
			]);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	}));

	async function initEditPageData() {
		if (!examId) return;
		try {
			const res = await findExamById(+examId);
			try {
				setJson(JSON.parse(res.data.content));
			} catch (e) {}
		} catch (error) {
			message.error('获取数据失败');
		}
	}

	function renderComponentsByJson(jsonArr: Array<Question>) {
		return jsonArr.map((item) => {
			let formComponent;
			if (item.type === 'radio') {
				formComponent = (
					<Radio.Group>
						{item.options?.map((option, idx) => (
							<Radio value={option} key={idx}>
								{option}
							</Radio>
						))}
					</Radio.Group>
				);
			} else if (item.type === 'checkbox') {
				formComponent = <Checkbox.Group options={item.options} />;
			} else if (item.type === 'input') {
				formComponent = <Input />;
			}

			return (
				<div
					className="component-item"
					style={
						item.id === currentQuestionId
							? { border: '2px solid red' }
							: {}
					}
					key={item.id}
					onClick={() => {
						setCurrentQuestionId(item.id);
					}}
				>
					<p className="question">{item.question}</p>
					<div className="options">{formComponent}</div>
					<p className="score">分值：{item.score}</p>
					<p className="answer">答案：{item.answer}</p>
					<p className="answerAnalyser">
						答案解析：{item.answerAnalyser}
					</p>
				</div>
			);
		});
	}

	async function examSave() {
		if (!examId) return
		try {
			await saveExam({ id: +examId, content: JSON.stringify(json) })
			message.success('试卷保存成功')
		} catch (error) {
			message.error('试卷保存失败')
		}
	}

	useEffect(() => {
		initEditPageData()
	}, []);

	useEffect(() => {
		form.setFieldsValue(
			json.filter((item) => item.id === currentQuestionId)[0]
		);
	}, [currentQuestionId]);

	return (
		<div id="edit-container">
			<div className="header">
				<div>试卷编辑器</div>
				<Button>预览</Button>
				<Button type="primary" onClick={examSave}>保存</Button>
			</div>
			<div className="body">
				<div className="materials">
					<MaterialItem name="单选题" type="单选题" />
					<MaterialItem name="多选题" type="多选题" />
					<MaterialItem name="填空题" type="填空题" />
				</div>
				<div
					className="edit-area"
					ref={drop}
					style={isOver ? { border: '2px solid blue' } : {}}
				>
					{renderComponentsByJson(json)}
				</div>
				<div className="setting">
					<Segmented
						value={key}
						onChange={setKey}
						block
						options={['json', '属性']}
					/>
					{key === 'json' && (
						<pre>{JSON.stringify(json, null, 4)}</pre>
					)}
					{key === '属性' &&
						currentQuestionId &&
						json
							.filter((item) => item.id === currentQuestionId)
							.map((item, index) => {
								return (
									<div key={index}>
										<Form
											form={form}
											style={{ padding: '20px' }}
											initialValues={item}
											onValuesChange={(
												changed,
												values
											) => {
												setJson((json) => {
													return json.map((cur) => {
														return cur.id ===
															item.id
															? {
																	id: item.id,
																	...values,
																	options:
																		typeof values.options ===
																		'string'
																			? values.options?.split(
																					','
																			  )
																			: values.options,
															  }
															: cur;
													});
												});
											}}
										>
											<Form.Item
												label="问题"
												name="question"
												rules={[
													{
														required: true,
														message: '请输入问题!',
													},
												]}
											>
												<Input />
											</Form.Item>
											<Form.Item
												label="类型"
												name="type"
												rules={[
													{
														required: true,
														message: '请选择类型!',
													},
												]}
											>
												<Radio.Group>
													<Radio value="radio">
														单选题
													</Radio>
													<Radio value="checkbox">
														多选题
													</Radio>
													<Radio value="input">
														填空题
													</Radio>
												</Radio.Group>
											</Form.Item>
											{item.type !== 'input' && (
												<Form.Item
													label="选项（逗号分割）"
													name="options"
													rules={[
														{
															required: true,
															message:
																'请输入选项!',
														},
													]}
												>
													<Input />
												</Form.Item>
											)}
											<Form.Item
												label="分数"
												name="score"
												rules={[
													{
														required: true,
														message: '请输入分数!',
													},
												]}
											>
												<InputNumber />
											</Form.Item>
											<Form.Item
												label="答案"
												name="answer"
												rules={[
													{
														required: true,
														message: '请输入答案!',
													},
												]}
											>
												<Input />
											</Form.Item>
											<Form.Item
												label="答案分析"
												name="answerAnalyser"
												rules={[
													{
														required: true,
														message:
															'请输入答案分析!',
													},
												]}
											>
												<TextArea />
											</Form.Item>
										</Form>
									</div>
								);
							})}
				</div>
			</div>
		</div>
	);
}
