import { defineComponent, ref } from 'vue';
// import styles from './baseForm.less';
import {
  baseFormDateTpl,
  baseFormMyRadioTpl,
  baseFormMyCheckboxTpl,
  baseFormMySelectTpl,
  baseFormNumberTpl,
  baseFormTextAreaTpl,
  baseFormTextTpl,
  baseFormTextTipTpl,
  baseFormUnionType
} from '@/components/FormComponents/types';
import { formatTime } from '@/utils/tool';

type TBaseForm = {
  [key in baseFormUnionType]: any;
};

const BaseForm: TBaseForm = {
  Text: defineComponent({
    props: {
      label: String,
      placeholder: String,
      onChange: Function,
    },
    setup(props) {
      const handleChange = (value: string | undefined) => {
        props.onChange?.(value);
      };
      return () => (
        <ElCell title={props.label}>
          <ElInput
            clearable
            type="text"
            placeholder={props.placeholder}
            onInput={handleChange}
          />
        </ElCell>
      );
    },
  }),

  Textarea: defineComponent({
    props: {
      label: String,
      placeholder: String,
      onChange: Function,
    },
    setup(props) {
      const handleChange = (value: string | undefined) => {
        props.onChange?.(value);
      };
      return () => (
        <ElCell title={props.label}>
          <ElInput
            type="text"
            rows={3}
            autoHeight
            showLength
            placeholder={props.placeholder}
            onInput={handleChange}
          />
        </ElCell>
      );
    },
  }),

  Number: defineComponent({
    props: {
      label: String,
      placeholder: String,
      onChange: Function,
    },
    setup(props) {
      const handleChange = (value: string | undefined | number) => {
        props.onChange?.(value);
      };
      return () => (
        <ElCell title={props.label}>
          <ElInput
            type="number"
            placeholder={props.placeholder}
            onInput={handleChange}
          />
        </ElCell>
      );
    },
  }),

  MyRadio: defineComponent({
    props: {
      label: String,
      options: Array,
      onChange: Function,
    },
    setup(props) {
      const handleChange = (value: string | number | undefined) => {
        props.onChange?.(value);
      };
      return () => (
        <div class="radioWrap">
          <div class="radioTitle">{props.label}</div>
          <ElCell>
            <ElRadioGroup onChange={handleChange}>
              {props.options.map((item, i) => (
                <ElRadio value={item.value} key={i} class="radioItem">
                  {item.label}
                </ElRadio>
              ))}
            </ElRadioGroup>
          </ElCell>
        </div>
      );
    },
  }),

  MyCheckbox: defineComponent({
    props: {
      label: String,
      options: Array,
      onChange: Function,
    },
    setup(props) {
      const handleChange = (value: Array<any> | undefined) => {
        props.onChange?.(value);
      };
      return () => (
        <div class="radioWrap">
          <div class="radioTitle">{props.label}</div>
          <ElCell>
            <ElCheckboxGroup onChange={handleChange}>
              {props.options.map((item, i) => (
                <ElCheckbox value={item.value} key={i} class="radioItem">
                  {item.label}
                </ElCheckbox>
              ))}
            </ElCheckboxGroup>
          </ElCell>
        </div>
      );
    },
  }),

  Date: defineComponent({
    props: {
      label: String,
      placeholder: String,
      onChange: Function,
    },
    setup(props) {
      const value = ref<string | Date | null>(null);
      const handleChange = (v: Date) => {
        value.value = v;
        props.onChange?.(formatTime('yyyy-MM-dd', v));
      };
      return () => (
        <ElCell title={props.label}>
          <ElDatePicker
            placeholder={props.placeholder}
            mode="date"
            min="1949-05-15"
            max="2100-05-15"
            v-model={value.value}
            onOk={handleChange}
          />
        </ElCell>
      );
    },
  }),

  MySelect: defineComponent({
    props: {
      label: String,
      options: Array,
      onChange: Function,
    },
    setup(props) {
      const handleChange = (value: any) => {
        props.onChange?.(value);
      };
      return () => (
        <ElCell title={props.label}>
          <ElSelect dataSource={props.options} onOk={handleChange} />
        </ElCell>
      );
    },
  }),

  MyTextTip: defineComponent({
    props: {
      label: String,
      color: String,
      fontSize: String,
    },
    setup(props) {
      return () => (
        <ElCell title={<div style={{ color: props.color, fontSize: props.fontSize }}>{props.label}</div>} />
      );
    },
  }),
};

export default BaseForm;
