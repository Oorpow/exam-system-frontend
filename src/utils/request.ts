import { message } from 'antd';
import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

interface OpInterceptors<T = AxiosResponse> {
	requestInterceptor?: (
		config: InternalAxiosRequestConfig
	) => InternalAxiosRequestConfig;
	requestErrorInterceptor?: (err: any) => any;
	responseInterceptor?: (res: T) => T;
	responseErrorInterceptor?: (err: any) => any;
}

interface OpConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: OpInterceptors<T>;
}

// 拦截器
class OpRequest {
	instance: AxiosInstance;
	interceptors?: OpInterceptors;

	constructor(config: OpConfig) {
		this.instance = axios.create(config);
		this.interceptors = config.interceptors;

		// 创建实例时，如果有携带拦截器，则添加
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptor,
			this.interceptors?.requestErrorInterceptor
		);
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor,
			this.interceptors?.responseErrorInterceptor
		);

		// 通用拦截器
		this.instance.interceptors.request.use((config) => {
			const examToken = localStorage.getItem('exam-token') || ''
			if (examToken) {
				config.headers.Authorization = `Bearer ${examToken}`
			}
			return config;
		});

		this.instance.interceptors.response.use(
			(res) => {
				return res.data;
			},
			(err) => {
				message.error(err.response.data.message)
				return Promise.reject(err.response.data.message);
			}
		);
	}

	request<T>(config: OpConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			this.instance
				.request<any, T>(config)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

export const commonOpReq = new OpRequest({
	baseURL: 'http://localhost:3001',
	timeout: 1000 * 10,
});

export default OpRequest;
