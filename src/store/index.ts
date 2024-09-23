import { createPinia } from 'pinia';

const pinia = createPinia();

// 判断开发环境, 使用日志中间件
if (process.env.NODE_ENV === 'development') {

}

// 错误处理插件
pinia.use(({ store }) => {
	store.$onAction(({ name, store, error }) => {
		if (error) {
			console.log(error.message); // 错误处理, 显示消息
		}
	})
})

export default pinia;