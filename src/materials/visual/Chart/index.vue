<template>
	<div class="chartWrap">
		<div class="chartTitle" :style="{ color, fontSize: size, paddingTop }">
			{{ title }}
		</div>
		<template v-if="props.isTpl">
			<img :src="chartImg" alt="super-bi chart" />
		</template>
		<template v-else>
			<canvas ref="chartRef"></canvas>
		</template>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
// 锁定 V3 版本，如果版本大于 V3，组件使用方式不一样，需要注意
import { Chart } from '@antv/f2';
import ChartImg from '@/assets/img/chart.png';
import { IChartConfig } from './schema';

interface XChartProps extends IChartConfig {
	isTpl: boolean;
}

const props = defineProps<XChartProps>();
const chartRef = ref<HTMLCanvasElement | null>(null);
const chartImg = ChartImg;

const renderChart = () => {
	if (props.isTpl) return
	const chart = new Chart({
		el: chartRef.value as HTMLCanvasElement,
		pixelRatio: window.devicePixelRatio, // 指定分辨率
	});

	// step 1: 处理数据
	const dataX = props.data.map((item: any) => ({ ...item, value: Number(item.value) }));

	// Step 2: 载入数据源
	chart.source(dataX);

	// Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
	chart
		.interval()
		.position('name*value')
		.color('name');

	// Step 4: 渲染图表
	chart.render();
};

// chart 数据更新，重新渲染
watch(() => [props.data, props.isTpl], () => {
	renderChart()
});

onMounted(() => {
	// chart 初始化
	renderChart()
});
</script>

<style lang="less" scoped>
	.chartWrap {
		position: relative;
		width: 100%;

		.chartTitle {
			text-align: center;
		}

		img {
			width: 100%;
		}

		canvas {
			width: 100%;
		}
	}
</style>