import { defineComponent, PropType } from 'vue';
import VueDraggableResizable from 'vue-draggable-resizable';
import DynamicEngine from '@/core/DynamicEngine';
// import styles from './viewRender.module.less';

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
      <VueDraggableResizable
        w={props.width}
        grid={[1, 1]}
        onDrag={props.dragStop}
        onDragStart={props.onDragStart}
        onResize={props.onResizeStop}
        style={{
          minHeight: '100vh',
          backgroundColor: props.pageData?.bgColor || 'initial',
          backgroundImage: props.pageData?.bgImage
            ? `url(${props.pageData.bgImage[0].url})`
            : 'initial',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {props.pointData.map((value: PointDataItem) => (
          <div
            key={value.id}
            data-grid={value.point}
            class={props.onDragStart ? styles.dragItem : ''}
          >
            <DynamicEngine {...value.item} isTpl={false} />
          </div>
        ))}
      </VueDraggableResizable>
    );
  },
});

