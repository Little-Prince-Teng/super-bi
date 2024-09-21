<template>
	<div class="header">
		<div class="logoArea">
			<div class="backBtn">
				<ElButton link class="btn-icon"><i-ep-back /></ElButton>
			</div>
		</div>

		<div class="controlArea">
			<ElButton link class="btn-icon" title="撤销" :disabled="!pointData.length" @click="undohandler">
				<i-solar-undo-left-round-bold />
			</ElButton>
			<ElButton link class="btn-icon" title="恢复" :disabled="!pointData.length" @click="redohandler">
				<i-solar-undo-right-round-bold />
			</ElButton>
			<ElButton link class="btn-icon" title="清空" :disabled="!pointData.length" @click="deleteAll">
				<i-ep-delete />
			</ElButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// props
const props = defineProps({
	pointData: Array,
	undohandler: Function,
	redohandler: Function,
	clearData: Function,
});

const deleteAll = () => {
	ElMessageBox.confirm(
		'确认清空画布?',
		'操作',
		{
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'info'
		}
	)
		.then(() => {
			props.clearData?.()
		})
		.catch(() => {})
}

onMounted(() => {

});
</script>

<style scoped lang="less">
.header {
	position: relative;
	z-index: 3;
	display: flex;
	align-items: center;
	height: 40px;
	background: #1d1e1f;

	.logoArea {
		width: 300px;
		height: 40px;
		line-height: 40px;
		.backBtn {
			display: inline-block;
			cursor: pointer;
		}
	}

	.controlArea {
		flex: 1 1;
		text-align: center;
	}

	.btnArea {
		width: 250px;
		margin-left: 20px;
		text-align: right;
	}

	:deep(.el-button) {
		&.btn-icon {
			width: 40px;
			height: 40px;
			padding: 4.9px 0;
			font-size: 18px;
			border-radius: 2px;
			
		}
	}
}

@media screen and (min-width: 1280px) {
	.header {
		.logoArea {
			width: 17%;
		}

		.controlArea {
			width: auto;
		}
	}
}
</style>