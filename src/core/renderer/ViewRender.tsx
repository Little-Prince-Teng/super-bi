import { defineComponent, PropType } from 'vue';
// import VueDraggableResizable from 'vue-draggable-resizable';
import Drager from 'es-drager';
import DynamicEngine from '@/core/DynamicEngine';
import './viewRender.less';
// 导入默认样式
import 'es-drager/lib/style.css'
import 'vue-draggable-resizable/style.css';
interface PointDataItem {
  id: string;
  item: Record<string, any>;
  point: Record<string, any>;
}

interface ViewProps {
  pointData: Array<PointDataItem>;
  pageData?: any;
  width?: number;
  dragStop?: Function;
  onDragStart?: Function;
  onResizeStop?: Function;
}

export default defineComponent({
  name: 'ViewRender',
  props: {
    pointData: {
      type: Array as PropType<PointDataItem[]>,
      required: true,
    },
    pageData: {
      type: Object as PropType<any>,
      required: false,
    },
    width: {
      type: Number,
      required: false,
    },
    dragStop: {
      type: Function,
      required: false,
    },
    onDragStart: {
      type: Function,
      required: false,
    },
    onResizeStop: {
      type: Function,
      required: false,
    },
  },
  setup(props: ViewProps) {
    return () => (
			<>
				{props.pointData.map((value: PointDataItem) => (
					<Drager
						v-bind="value"
						key={value.id}
						data-grid={value.point}
						rotatable
						boundary
						snapToGrid={true}
						gridX={10}
						gridY={10}
						class="dragItem"
					>
						<DynamicEngine {...value.item} isTpl={false} />
					</Drager>
				))}
			</>
			// <VueDraggableResizable>
			// 	{props.pointData.map((value: PointDataItem) => (
			// 		<div
			// 			key={value.id}
			// 			data-grid={value.point}
			// 			class="dragItem"
			// 		>
			// 			<DynamicEngine {...value.item} isTpl={false} />
			// 		</div>
			// 	))}
			// </VueDraggableResizable>
    );
  },
});

