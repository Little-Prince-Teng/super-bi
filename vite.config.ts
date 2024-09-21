import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from "@vitejs/plugin-vue-jsx";
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
  plugins: [
		vueJsx(),
		vue(),
		AutoImport({
			// 自动导入 vue 相关函数, 如：ref, reactive, toRef...
			imports: ['vue'],
			resolvers: [
				// 自动导入 Element Plus 相关函数, 如 ElMessage, ElButton...(带样式)
				ElementPlusResolver(),
				// 自动导入图标组件
				IconsResolver({
					prefix: 'Icon',
				}),
			],
			// dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
		}),
		Components({
			resolvers: [
				// 自动注册图标组件
				IconsResolver({
					enabledCollections: ['ep', 'solar'],
				}),
				// 自动导入 Element Plus 组件
				ElementPlusResolver(),
			],
			// dts: path.resolve(pathSrc, 'components.d.ts'),
		}),
		Icons({
			autoInstall: true,
		})
	],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	}
})
