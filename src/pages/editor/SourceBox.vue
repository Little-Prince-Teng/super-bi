<template>
	<VueDraggableResizable
		:x="dragState.x"
		:y="dragState.y"
		classNameHandle=".js_box"
		@dragstop="handleDragStop"
	>
		<div class="canvasBox">
			<div :style="{ transform: `scale(${scaleNum})`, position: 'relative', width: '100%', height: '100%' }">
				<div :id="canvasId" class="canvas" :style="{ opacity, width: '1440px', height: '900px', backgroundImage: `url('../../../public/img/canvas_bg.jpg')` }" ref="drop">
					<ViewRender v-if="pointData.length > 0" :pointData="pointData" :width="canvasRect[0] || 0"
						:dragStop="dragStop" :onDragStart="onDragStart" :onResizeStop="onResizeStop" />
				</div>
			</div>
		</div>
	</VueDraggableResizable>
	<!-- <MyAwesomeMenu /> -->
</template>

<script setup>
import { ref, onMounted, watchEffect, reactive, computed, toRefs } from "vue";
import { useDrop } from "vue3-dnd";
import VueDraggableResizable from 'vue-draggable-resizable';
// import { useStore } from "vuex";
import { ViewRender } from "@/core";
// import { uuid } from "@/utils/tool";

const props = defineProps({
	pstate: Object,
	cstate: Object,
	scaleNum: Number,
	canvasId: String,
	allType: Array,
	dragState: Object,
	setDragState: Function,
});

// const store = useStore();
const pointData = computed(() => (props.pstate ? props.pstate.pointData : []));
const cpointData = computed(() => (props.cstate ? props.cstate.pointData : []));
const canvasRect = ref([]);
const isShowTip = ref(true);
const opacity = computed(() => (isOver ? 0.7 : 1));
const [ collect, drop ] = useDrop(() => ({
	accept: props.allType,
	drop(item, monitor) {
		const parentDiv = document.getElementById(props.canvasId);
		const pointRect = parentDiv.getBoundingClientRect();
		const top = pointRect.top;
		const pointEnd = monitor.getSourceClientOffset();
		const y = pointEnd.y < top ? 0 : pointEnd.y - top;
		const col = 24;
		const cellHeight = 2;
		const w = item.type === "Icon" ? 3 : col;
		const gridY = Math.ceil(y / cellHeight);

		// store.dispatch("editorModal/addPointData", {
		// 	id: uuid(6, 10),
		// 	item,
		// 	point: {
		// 		i: `x-${pointData.value.length}`,
		// 		x: 0,
		// 		y: gridY,
		// 		w,
		// 		h: item.h,
		// 		isBounded: true,
		// 	},
		// 	status: "inToCanvas",
		// });
	},
	collect: monitor => ({
		isOver: monitor.isOver()
	})
}));

const { isOver } = toRefs(collect);

const dragStop = computed(() => {
	return (layout, oldItem, newItem, placeholder, e, element) => {
		const curPointData = pointData.value.filter(
			(item) => item.id === newItem.i
		)[0];
		// store.dispatch("editorModal/modPointData", {
		// 	...curPointData,
		// 	point: newItem,
		// 	status: "inToCanvas",
		// });
	};
});

const onDragStart = computed(() => {
	return (layout, oldItem, newItem, placeholder, e, element) => {
		const curPointData = pointData.value.filter(
			(item) => item.id === newItem.i
		)[0];
		// store.dispatch("editorModal/modPointData", {
		// 	...curPointData,
		// 	status: "inToCanvas",
		// });
	};
});

const onResizeStop = computed(() => {
	return (layout, oldItem, newItem, placeholder, e, element) => {
		const curPointData = pointData.value.filter(
			(item) => item.id === newItem.i
		)[0];
		// store.dispatch("editorModal/modPointData", {
		// 	...curPointData,
		// 	point: newItem,
		// 	status: "inToCanvas",
		// });
	};
});

const handleDragStop = (e, data) => {
	props.setDragState({ x: data.x, y: data.y });
};

const handleContextMenuDel = () => {
	if (props.pstate.curPoint) {
		// store.dispatch("editorModal/delPointData", { id: props.pstate.curPoint.id });
	}
};

const handleContextMenuCopy = () => {
	if (props.pstate.curPoint) {
		// store.dispatch("editorModal/copyPointData", { id: props.pstate.curPoint.id });
	}
};

const onConTextClick = (type) => {
	if (type === "del") {
		handleContextMenuDel();
	} else if (type === "copy") {
		handleContextMenuCopy();
	}
};

// const MyAwesomeMenu = () => (
// 	<Menu id= "menu_id" >
// 	<Item onClick={() => onConTextClick("copy")}> 复制 </Item>
// 		< Item onClick = {() => onConTextClick("del")}> 删除 </Item>
// 			</Menu>
// );

onMounted(() => {
	const { width, height } = document
		.getElementById(props.canvasId)
		.getBoundingClientRect();
	canvasRect.value = [width, height];
});

watchEffect(() => {
	const timer = setTimeout(() => {
		isShowTip.value = false;
	}, 3000);
	return () => {
		clearTimeout(timer);
	};
});
</script>

<style scoped>
.canvasBox {
	/* your styles */
}

.canvas {
	/* your styles */
}
</style>
