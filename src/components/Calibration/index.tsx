import { defineComponent, onMounted, ref, watch, nextTick } from "vue";
import './index.less';

export interface CalibrationTypes {
  direction: "up" | "left" | "right";
  multiple: number;
  id: string;
}

export default defineComponent({
  name: "Calibration",
  props: {
    direction: {
      type: String as () => "up" | "left" | "right",
      required: true,
    },
    multiple: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  setup(props: CalibrationTypes) {
    const calibrationRef = ref<HTMLDivElement | null>(null);
    const calibrationLength = ref<{ width: number; height: number }>({
      width: 0,
      height: 0,
    });

    const generateElement = (item?: boolean, num?: number) => {
      if (calibrationRef.value) {
        const createSpan = document.createElement("div");
        createSpan.className = "calibrationLine";
        createSpan.style.backgroundColor = "#ccc";
        calibrationRef.value.style.display = "flex";
        calibrationRef.value.style.justifyContent = "space-between";

        if (props.direction === "up") {
          calibrationRef.value.style.marginLeft = "50px";
          createSpan.style.width = "1px";
          createSpan.style.height = "6px";
          createSpan.style.display = "inline-block";
        } else {
          calibrationRef.value.style.flexDirection = "column";
          createSpan.style.height = "1px";
          createSpan.style.width = "6px";
        }

        if (item) {
          const createSpanContent = document.createElement("span");
          if (props.direction === "up") {
            createSpan.style.height = "12px";
            createSpanContent.style.transform = "translate3d(-4px, 20px, 0px)";
            createSpan.style.transform = "translateY(0px)";
          } else {
            createSpan.style.width = "12px";
            createSpanContent.style.paddingLeft = "20px";
          }
          createSpanContent.style.display = "block";
          createSpanContent.className = "calibrationNumber";
          createSpanContent.innerHTML = (num! * 5).toString();
          createSpan.appendChild(createSpanContent);
        }
        calibrationRef.value.appendChild(createSpan);
      }
    };

    onMounted(() => {
      nextTick(() => {
        if (calibrationRef.value) {
          const calibration = calibrationRef.value.getBoundingClientRect();
          calibrationLength.value = { width: calibration.width, height: calibration.height };
          const length = props.direction === "up" ? calibration.width : calibration.height;

          for (let i = 0; i < length / 5; i++) {
            if (i % 10 === 0) {
              generateElement(true, i);
            } else {
              generateElement();
            }
          }
        }
      });
    });

    watch(
      () => props.multiple,
      (newMultiple) => {
        nextTick(() => {
          if (calibrationRef.value) {
            const { width, height } = calibrationLength.value;
            const actualWidth = width || calibrationRef.value.getBoundingClientRect().width;
            const actualHeight = height || calibrationRef.value.getBoundingClientRect().height;

            const elements = Array.from(calibrationRef.value.querySelectorAll(".calibrationLine"));

            if (elements.length) {
              if (props.direction === "up") {
                calibrationRef.value.style.width = `${(newMultiple * actualWidth).toFixed(1)}px`;
                elements.forEach((el) => {
                  const numberEl = el.querySelector(".calibrationNumber") as HTMLElement;
                  if (numberEl) {
                    numberEl.style.transform = `translate3d(-4px, 16px, 0px) scale(${(newMultiple + 0.1).toFixed(1)})`;
                  }
                });
              } else {
                calibrationRef.value.style.height = `${(newMultiple * actualHeight).toFixed(1)}px`;
                elements.forEach((el) => {
                  const numberEl = el.querySelector(".calibrationNumber") as HTMLElement;
                  if (numberEl) {
                    numberEl.style.transform = `translate3d(-4px, -8px, 0px) scale(${(newMultiple + 0.1).toFixed(1)})`;
                  }
                });
              }
            }
          }
        });
      },
      { immediate: true }
    );

    return () => (
      <div class="calibration" ref={calibrationRef}></div>
    );
  },
});

