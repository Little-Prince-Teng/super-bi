<template>
	<div class="editorWrap">
		<HeaderComponent :pointData="pointData" :redohandler="redohandler" :undohandler="undohandler"
			:clearData="clearData" />
		<div class="container">
			<div class="list" :style="{
					transition: 'all ease-in-out 0.5s',
					position: 'fixed',
					width: collapsed ? '50px' : '350px',
					zIndex: 1,
					boxShadow: 'none'
				}">
				<div class="componentList">
					<el-tabs class="editorTabclass" tab-position="left" @tabClick="() => changeCollapse(false)">
						<TabRender />
						<!-- <template v-for="(tab, index) in tabRender">
							<el-tab-pane :label="tab.label" :name="index"></el-tab-pane>
						</template> -->
					</el-tabs>
				</div>
				<div class="collapsed" style="position: absolute; bottom: 80px; left: 20px"
					@click="() => changeCollapse(!collapsed)">
					<i-ep-d-arrow-right v-if="collapsed" />
					<i-ep-d-arrow-left v-else />
				</div>
			</div>

			<div :style="{ width: collapsed ? '50px' : '350px', transition: 'all ease-in-out 0.5s' }"></div>

			<div class="tickMark">
				<div class="tickMarkTop">
					<Calibration direction="up" id="calibrationUp" :multiple="scaleNum" />
				</div>
				<div class="tickMarkLeft">
					<Calibration direction="left" id="calibrationLeft" :multiple="scaleNum" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue';
import HeaderComponent from './component/Header/header.vue';
import TargetBox from './TargetBox.vue';
import DynamicEngine from '@/core/DynamicEngine';
import Calibration from '@/components/Calibration';

import baseTpl from '@/materials/base/template';
import mediaTpl from '@/materials/media/template';
import visualTpl from '@/materials/visual/template';
import schema from '@/materials/schema';

import { ElTabPane } from "element-plus";
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const collapsed = ref(false);
const pointData = ref([]);
const scaleNum = ref(1);
// 指定画布的id
let canvasId = 'js_canvas';

const redohandler = () => {};

const undohandler = () => {};

const clearData = () => {};

const changeCollapse = (value) => {
	collapsed.value = value;
};

const TabRender = computed(() => {
	return () => (
		<>
			<ElTabPane label="基础组件" name="base">
				{baseTpl.map(value => {
					return (
						<DndProvider backend={HTML5Backend}>
							<TargetBox item={value} canvasId={canvasId}>
								<DynamicEngine
									{ ...value }
									config={schema[value.type].config}
									componentsType="base"
									isTpl={true}
								/>
							</TargetBox>
						</DndProvider>
					);
				})}
			</ElTabPane>
		</>
	)
});
</script>