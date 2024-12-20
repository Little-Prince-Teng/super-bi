// import { defineComponent, defineProps, ref } from 'vue';
import { ElInput, ElRadioGroup, ElRadio, ElCheckboxGroup, ElCheckbox, ElSelect, ElDatePicker } from 'element-plus';
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

type TBaseForm = {
  [key in baseFormUnionType]: any;
};

const BaseForm: TBaseForm = {
  Text: (props: baseFormTextTpl & { onChange: (v: string | undefined) => void }) => {
    const { label, placeholder, onChange } = props;
    return (
      <div className="formItem">
        <span className="formLabel">{ label }</span>
        <ElInput type="text" placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  },
  Textarea: (props: baseFormTextAreaTpl & { onChange: (v: string | undefined) => void }) => {
    const { label, placeholder, onChange } = props;
    return (
      <div className="formItem" style={{alignItems: 'flex-start'}}>
        <span className="formLabel">{ label }</span>
        <ElInput
					type="textarea"
          rows={3}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  },
  Number: (props: baseFormNumberTpl & { onChange: (v: string | undefined | number) => void }) => {
    const { label, placeholder, onChange } = props;
    return (
      <div className="formItem">
        <span className="formLabel">{ label }</span>
        <ElInput type="number" placeholder={placeholder} onChange={onChange} style={{width: '100%'}} />
      </div>
    );
  },
  MyRadio: (props: baseFormMyRadioTpl & { onChange: (v: string | undefined | number) => void }) => {
    const { label, options, onChange } = props;
    return (
      <div className="radioWrap">
        <div className="radioTitle">{label}</div>
          <ElRadioGroup onChange={(e) => onChange(e.target.value)}>
            {options.map((item, i) => {
              return (
                <ElRadio value={item.value} key={i} className="radioItem">
                  {item.label}
                </ElRadio>
              );
            })}
          </ElRadioGroup>
      </div>
    );
  },
  MyCheckbox: (props: baseFormMyCheckboxTpl & { onChange: (v: Array<string> | Array<number> | undefined) => void }) => {
    const { label, options, onChange } = props;
    return (
      <div className="radioWrap">
        <div className="radioTitle">{label}</div>
          <ElCheckboxGroup onChange={onChange}>
            {options.map((item, i) => {
              return (
                <ElCheckbox value={item.value} key={i} className="radioItem">
                  {item.label}
                </ElCheckbox>
              );
            })}
          </ElCheckboxGroup>
      </div>
    );
  },
  Date: (props: baseFormDateTpl & { onChange: (v: Date) => void }) => {
    const { label, placeholder, onChange } = props;
    const [value, setValue] = useState<any>('2020-11-01');
     const handleChange = (v:any, str) => {
       console.log(v, str)
      //  return
      setValue(str)
      onChange && onChange(str)
     }
     const dateFormat = 'YYYY-MM-DD';
    return (
      <div className="formItem">
        <span className="formLabel">{ label }</span>
        <ElDatePicker 
          onChange={handleChange}
          mode="date"
          placeholder={placeholder}
          onOk={handleChange}
          value={moment(value, dateFormat)}
          style={{width: '100%'}}
          format={dateFormat}
        />
      </div>
    );
  },
  MySelect: (
    props: baseFormMySelectTpl & { onChange: ((v: Record<string, any>) => void) | undefined },
  ) => {
    const { label, options, onChange } = props;
    return (
      <div className="formItem">
        <span className="formLabel">{ label }</span>
        <ElSelect options={options} onChange={onChange} style={{width: '100%'}} placeholder={`请输入${label}`} />
      </div>
    )
  },
  MyTextTip: (
    props: baseFormTextTipTpl,
  ) => {
    const { label, color, fontSize } = props;
    return (
      <div className="formItem">
        <span className="formLabel"></span>
        <div style={{color, fontSize, lineHeight: '2.2'}}>{label}</div>
      </div>
      
    );
  },
};

export default BaseForm;
