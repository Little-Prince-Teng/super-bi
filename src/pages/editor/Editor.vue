<template>
	<div class="layout">
		<DndProvider :backend="HTML5Backend">
			<Container :pstate="pstate"/>
		</DndProvider>
	</div>
</template>

<script setup lang="ts">
import { toRaw } from 'vue';
import { DndProvider } from 'vue3-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { storeToRefs } from 'pinia';
import { useEditorStore } from '@/store/editor';

import Container from './Container.vue';

const editorStore = useEditorStore();
const { pointData, curPoint } = storeToRefs(editorStore);
const pstate = { pointData: toRaw(pointData.value), curPoint: curPoint.value };

</script>

<style lang="less">
@import './index.less';
</style>