import { defineComponent, defineProps, ref } from 'vue';
import type { PropType } from 'vue';
import BaseForm from './BaseForm';
import { ElButton } from 'element-plus';
import './index.less';
import { IFormConfig } from './schema';
import logo from '@/assets/img/form.png';

interface FormPropsTypes extends IFormConfig {
	isTpl: boolean
}

export default defineComponent({
  props: {
		form: {
			type: Object as PropType<FormPropsTypes>,
      required: true
		}
	},
	components: { ElButton },
  setup(props) {
		console.log('props data', props);
    const formData = ref<Record<string, any>>({});

		// change 事件
    const handleChange = (item: any, value: string) => {
      formData.value[item.label] = value;
    };

		// 提交
    const handleSubmit = () => {
      const isPass = Object.values(formData).every(item => !!item);
			if (isPass) {
				if (props.api) {
					fetch(props.api, {
						body: JSON.stringify(formData.value),
						cache: 'no-cache',
						headers: {
							'Content-Type': 'application/json',
						},
						method: 'POST',
						mode: 'cors',
					});
				} else {
					console.log('request');
				}
			} else {
				alert('请将表单填写完整');
			}
    };
		return () => {

		};
		/*
    return () => (
      <>
        {props.isTpl && (
          <div>
            <img src={logo} alt="" />
          </div>
        )}
        {!props.isTpl && (
          <div
            class="formWrap"
            style={{backgroundColor: props.bgColor}}
          >
            {props.title && (
              <div
                class="title"
                style={{
                  fontSize: props.fontSize,
                  fontWeight: +props.titWeight,
                  color: props.titColor,
                }}
              >
                {props.title}
              </div>
            )}
            <div class="formContent">
              {props.formControls.map((item: any) => {
                const FormItem = BaseForm[item.type];
                return (
                  <FormItem
                    onChange={(value: string) => handleChange(item, value)}
                    {...item}
                    key={item.id}
                  />
                );
              })}
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <ElButton
                  type="primary"
                  block
                  size="small"
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: props.btnColor,
                    borderColor: props.btnColor,
                    color: props.btnTextColor,
                  }}
                >
                  提交
                </ElButton>
              </div>
            </div>
          </div>
        )}
      </>
    );
		*/
  },
});
