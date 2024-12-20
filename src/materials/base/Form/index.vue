<template>
	<div v-if="isTpl">
		<img :src="logo" style="width: 100%;" alt="" />
	</div>
	<div v-else class="formWrap">
		<div v-if="props.title" class="title" :style="{
			fontSize: props.fontSize,
			fontWeight: props.titWeight,
			color: props.titColor
		}">
			{{ props.title }}
		</div>
		<div class="formContent">
			<component
				v-for="item in formControls"
				:key="item.id"
				:is="BaseForm[item.type]"
				v-bind="item"
				@change="(value: any) => handleChange(item, value)"
			/>
			<div style="text-align: center; padding: 16px 0;">
				<ElButton type="primary" block size="small" @click="handleSubmit" :style="{
					backgroundColor: props.btnColor,
					borderColor: props.btnColor,
					color: props.btnTextColor,
					width: 'calc(100% - 100px)',
					marginLeft: '100px'
				}">
					提交
				</ElButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseForm from './BaseForm';
import { IFormConfig } from './schema';
import logo from '@/assets/img/form.png';

interface FormPropsTypes extends IFormConfig {
	isTpl: boolean
}

const props = defineProps<FormPropsTypes>();

const formData = ref<Record<string, any>>({});

const { formControls } = props;
formControls.map((item: any) => {
	if (item.type !== 'MyTextTip') {
		formData.value[item.label] = '';
	}
})

// change 事件
const handleChange = (item: any, value: string) => {
	formData.value[item.label] = value;
};

// 表单提交
const handleSubmit = () => {
	const isPass = Object.values(formData).every(item => !!item);
	if (isPass) {
		if (props.api) {
			fetch(props.api, {
				body: JSON.stringify(formData.value),
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				mode: 'cors',
			});
		} else {
			console.log('request');
		}
	} else {
		alert('请将表单填写完整');
	}
};
</script>

<style lang="less" scoped>
.formWrap {
	position: absolute;
	margin: 10px;
	padding: 20px 16px;
	overflow: hidden;
	border-radius: 6px;
	background-color: #fff;
	box-shadow: 0 2px 6px #f0f0f0;
	// pointer-events: v-bind:isEditorPage ? 'none': 'initial';

	.title {
		padding-bottom: 20px;
		text-align: center;
		// font-size: 18px;
	}
}
</style>
