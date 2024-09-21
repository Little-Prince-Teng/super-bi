<template>
	<div class="listWrap">
		<div class="module" style="cursor: 'move'; height: '140px'" :ref="drag">
			<div class="content">
				<slot></slot>
			</div>
			<div class="footer">
				{{ item.displayName }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import schema from '@/materials/schema';
import { useDrag } from 'vue3-dnd';

const props = defineProps(['item', 'canvasId']);
const { item } = toRefs(props);
const itemConfig = computed(() => schema[item.value.type as typeof schema].config);
const editableElement = computed(() => schema[item.value.type as typeof schema].editData);

const [collect, drag] = useDrag(() => ({
	type: 'BOX',
	item: {
		type: item.value.type,
		config: itemConfig.value,
		h: item.value.h,
		editableEl: editableElement.value,
		category: item.value.category,
		x: item.value.x || 0
	},
	collect: monitor => ({
		opacity: monitor.isDragging() ? 0.4 : 1
	}),
}));

</script>

<style scoped lang="less">
@import './index.less';

.list-wrap {
	/* 样式 */
}

.module {
	cursor: move;
	height: 140px;
}

.content {
	height: 110px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	overflow: hidden;
}

.footer {
	height: 30px;
	line-height: 30px;
	text-align: center;
	background-color: rgba(245, 245, 245, 1);
	color: rgba(118, 118, 118, 1);
}
</style>
