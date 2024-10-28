import { useState } from 'react';
import { Button, Space, Tabs, TabsProps, message, theme } from 'antd';
import {
	LoginForm,
	ProConfigProvider,
	ProFormText,
} from '@ant-design/pro-components';

import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { userLogin } from '../../api/user';

type LoginType = 'register' | 'login';

const items: TabsProps['items'] = [
	{ key: 'login', label: '登录' },
	{ key: 'register', label: '注册' },
];

function Login() {
	const { token } = theme.useToken();
	const [loginType, setLoginType] = useState<LoginType>('login');

	const handleUserLogin = async (values: Dto.UserLoginDto) => {
		const res = await userLogin(values)
		if (res.data.token) {
			localStorage.setItem('exam-token', res.data.token)
			message.success('登录成功')
		}
	}

	return (
		<ProConfigProvider hashed={false}>
			<div style={{ backgroundColor: token.colorBgContainer }}>
				<LoginForm
					title="Exam System"
                    submitter={{ searchConfig: { submitText: loginType === 'login' ? '登录' : '注册' } }}
					onFinish={(values: Dto.UserLoginDto) => {
						handleUserLogin(values)
					}}
				>
					<Tabs
						centered
						activeKey={loginType}
						onChange={(activeKey) =>
							setLoginType(activeKey as LoginType)
						}
						items={items}
					></Tabs>
					{loginType === 'login' && (
						<>
							<ProFormText
								name="username"
								fieldProps={{
									size: 'large',
									prefix: (
										<UserOutlined
											className={'prefixIcon'}
										/>
									),
								}}
								placeholder="请输入用户名"
								rules={[
									{
										required: true,
										message: '请输入用户名!',
									},
								]}
							/>
							<ProFormText.Password
								name="password"
								fieldProps={{
									size: 'large',
									prefix: (
										<LockOutlined
											className={'prefixIcon'}
										/>
									),
								}}
								placeholder="请输入密码"
								rules={[
									{
										required: true,
										message: '请输入密码！',
									},
								]}
							/>
						</>
					)}
					{loginType === 'register' && (
						<>
							<ProFormText
								name="username"
								fieldProps={{
									size: 'large',
									prefix: (
										<UserOutlined
											className={'prefixIcon'}
										/>
									),
								}}
								placeholder="请输入用户名"
								rules={[
									{
										required: true,
										message: '请输入用户名!',
									},
								]}
							/>
							<ProFormText.Password
								name="password"
								fieldProps={{
									size: 'large',
									prefix: (
										<LockOutlined
											className={'prefixIcon'}
										/>
									),
									strengthText:
										'Password should contain numbers, letters and special characters, at least 8 characters long.',
									statusRender: (value) => {
										const getStatus = () => {
											if (value && value.length > 12) {
												return 'ok';
											}
											if (value && value.length > 6) {
												return 'pass';
											}
											return 'poor';
										};
										const status = getStatus();
										if (status === 'pass') {
											return (
												<div
													style={{
														color: token.colorWarning,
													}}
												>
													强度：中
												</div>
											);
										}
										if (status === 'ok') {
											return (
												<div
													style={{
														color: token.colorSuccess,
													}}
												>
													强度：强
												</div>
											);
										}
										return (
											<div
												style={{
													color: token.colorError,
												}}
											>
												强度：弱
											</div>
										);
									},
								}}
								placeholder="请输入密码"
								rules={[
									{
										required: true,
										message: '请输入密码！',
									},
								]}
							/>
							<ProFormText
								name="email"
								fieldProps={{
									size: 'large',
									prefix: (
										<MailOutlined
											className={'prefixIcon'}
										/>
									),
								}}
								placeholder="请输入邮箱"
								rules={[
                                    { type: 'email', message: '请输入正确的邮箱格式' },
									{ required: true, message: '请输入邮箱' },
								]}
							/>
						</>
					)}
				</LoginForm>
			</div>
		</ProConfigProvider>
	);
}
export default Login;
