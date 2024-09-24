import { defineComponent, ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElRadioGroup, ElRadio, ElCheckboxGroup, ElCheckbox, ElSelect, ElDatePicker } from 'element-plus';
import './baseForm.less';
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
		components: {
			ElForm,
			ElInput,
			ElFormItem
		},
    setup(props) {
      const handleChange = (value: string | undefined) => {
        props.onChange?.(value);
      };
      return () => (
        <ElFormItem label={props.label}>
          <ElInput
            clearable
            type="text"
            placeholder={props.placeholder}
            onInput={handleChange}
          />
        </ElFormItem>
      );
    },
  }),

  Textarea: defineComponent({
    props: {
      label: String,
      placeholder: String,
      onChange: Function,
    },
		components: {
			ElFormItem,
			ElInput
		},
    setup(props) {
      const handleChange = (value: string | undefined) => {
        props.onChange?.(value);
      };
      return () => (
        <ElFormItem label={props.label}>
          <ElInput
            type="text"
            rows={3}
            autoHeight
            showLength
            placeholder={props.placeholder}
            onInput={handleChange}
          />
        </ElFormItem>
      );
    },
  }),

  Number: defineComponent({
    props: {
      label: String,
      placeholder: String,
      onChange: Function,
    },
		components: {
			ElFormItem,
			ElInput
		},
    setup(props) {
      const handleChange = (value: string | undefined | number) => {
        props.onChange?.(value);
      };
      return () => (
        <ElFormItem label={props.label}>
          <ElInput
            type="number"
            placeholder={props.placeholder}
            onInput={handleChange}
          />
        </ElFormItem>
      );
    },
  }),

  MyRadio: defineComponent({
    props: {
      label: String,
      options: Array,
      onChange: Function,
    },
		components: {
			ElFormItem,
			ElRadioGroup,
			ElRadio
		},
    setup(props) {
      const handleChange = (value: string | number | undefined) => {
        props.onChange?.(value);
      };
      return () => (
        <div class="radioWrap">
          <div class="radioTitle">{props.label}</div>
          <ElFormItem>
            <ElRadioGroup onChange={handleChange}>
              {props.options.map((item, i) => (
                <ElRadio value={item.value} key={i} class="radioItem">
                  {item.label}
                </ElRadio>
              ))}
            </ElRadioGroup>
          </ElFormItem>
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
		components: {
			ElFormItem,
			ElCheckboxGroup,
			ElCheckbox
		},
    setup(props) {
      const handleChange = (value: Array<any> | undefined) => {
        props.onChange?.(value);
      };
      return () => (
        <div class="radioWrap">
          <div class="radioTitle">{props.label}</div>
          <ElFormItem>
            <ElCheckboxGroup onChange={handleChange}>
              {props.options.map((item, i) => (
                <ElCheckbox value={item.value} key={i} class="radioItem">
                  {item.label}
                </ElCheckbox>
              ))}
            </ElCheckboxGroup>
          </ElFormItem>
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
		components: {
			ElFormItem,
			ElDatePicker
		},
    setup(props) {
      const value = ref<string | Date | null>(null);
      const handleChange = (v: Date) => {
        value.value = v;
        props.onChange?.(formatTime('yyyy-MM-dd', v));
      };
      return () => (
        <ElFormItem label={props.label}>
          <ElDatePicker
            placeholder={props.placeholder}
            mode="date"
            min="1949-05-15"
            max="2100-05-15"
            v-model={value.value}
            onOk={handleChange}
          />
        </ElFormItem>
      );
    },
  }),

  MySelect: defineComponent({
    props: {
      label: String,
      options: Array,
      onChange: Function,
    },
		components: {
			ElFormItem,
			ElSelect
		},
    setup(props) {
      const handleChange = (value: any) => {
        props.onChange?.(value);
      };
      return () => (
        <ElFormItem label={props.label}>
          <ElSelect dataSource={props.options} onOk={handleChange} />
        </ElFormItem>
      );
    },
  }),

  MyTextTip: defineComponent({
    props: {
      label: String,
      color: String,
      fontSize: String,
    },
		components: {
			ElFormItem
		},
    setup(props) {
      return () => (
        <ElFormItem title={<div style={{ color: props.color, fontSize: props.fontSize }}>{props.label}</div>} />
      );
    },
  }),
};

export default BaseForm;
