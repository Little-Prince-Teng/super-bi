<template>
	<div class="layout">
		<DndProvider :backend="HTML5Backend">
			<Container :pstate="pstate" />
		</DndProvider>
	</div>
</template>

<script setup lang="ts">
import { toRaw, watch, onMounted } from 'vue';
import { DndProvider } from 'vue3-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEditorStore } from '@/store/editor';
import Container from './Container.vue';

const pstate = ref(null);
const editorStore = useEditorStore();

watch(() => editorStore.pointData, (newVal) => {
	pstate.value = {
		pointData: toRaw(newVal),
		curPoint: editorStore.curPoint
	}
});


onMounted(() => {
	pstate.value = {
		pointData: toRaw(editorStore.pointData),
		curPoint: editorStore.curPoint
	}
});

</script>

<style lang="less">
@import './index.less';
</style>