import { defineComponent, ref, computed } from 'vue';
import BaseForm from './BaseForm';
import { ElButton } from 'element-plus';
import './index.less';
import logo from '@/assets/img/form.png';

interface IFormConfig {
  title: string;
  bgColor: string;
  fontSize: string;
  titColor: string;
  btnColor: string;
  titWeight: string;
  btnTextColor: string;
  api: string;
  formControls: Array<any>;
}

export default defineComponent({
  props: {
    title: String,
    bgColor: String,
    fontSize: String,
    titColor: String,
    btnColor: String,
    titWeight: String,
    btnTextColor: String,
    api: String,
    formControls: Array,
    isTpl: Boolean,
  },
	components: { ElButton },
  setup(props: IFormConfig & { isTpl: boolean }) {
    const formData = ref<Record<string, any>>({});
    
    const handleChange = (item: any, value: string) => {
      formData.value[item.label] = value;
    };

    const handleSubmit = () => {
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
      }
    };

    const isEditorPage = computed(() => window.location.pathname.indexOf('editor') > -1);

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
            // style={{
            //   backgroundColor: props.bgColor,
            //   overflow: 'hidden',
            //   position: 'absolute',
            //   pointerEvents: isEditorPage.value ? 'none' : 'initial',
            // }}
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
              {props.formControls.map((item) => {
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
  },
});

