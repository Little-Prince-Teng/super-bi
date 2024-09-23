export interface IColorConfigType {
	key: string;
	name: string;
	type: "Color";
}

export type TColorDefaultType = string;

export interface IFormItemsConfigType {
	key: string;
	name: string;
	type: "FormItems";
}

export interface INumberConfigType {
	key: string;
	name: string;
	type: "Number";
	range?: [number, number];
	step?: number;
}

export interface ITextConfigType {
	key: string;
	name: string;
	type: "Text";
}

export type TNumberDefaultType = number;

export interface ISelectConfigType<KeyType> {
	key: string;
	name: string;
	type: "Select";
	range: Array<{
		key: KeyType;
		text: string;
	}>;
}

export type TSelectDefaultType<KeyType> = KeyType;

export type TTextDefaultType = string;

export interface ITableConfigType {
	key: string;
	name: string;
	type: "Table";
}
export type TTableDefaultType = Array<{
	name: string;
	value: number;
}>;

//0---------baseform
export type baseFormOptionsType = {
	label: string;
	value: string;
};

export type baseFormTextTpl = {
	id: string;
	type: "Text";
	label: string;
	placeholder: string;
};

export type baseFormTextTipTpl = {
	id: string;
	type: "MyTextTip";
	label: string;
	color: string;
	fontSize: number;
};

export type baseFormNumberTpl = {
	id: string;
	type: "Number";
	label: string;
	placeholder: string;
};

export type baseFormTextAreaTpl = {
	id: string;
	type: "Textarea";
	label: string;
	placeholder: string;
};

export type baseFormMyRadioTpl = {
	id: string;
	type: "MyRadio";
	label: string;
	options: baseFormOptionsType[];
};

export type baseFormMyCheckboxTpl = {
	id: string;
	type: "MyCheckbox";
	label: string;
	options: baseFormOptionsType[];
};

export type baseFormMySelectTpl = {
	id: string;
	type: "MySelect";
	label: string;
	options: baseFormOptionsType[];
};

export type baseFormDateTpl = {
	id: string;
	type: "Date";
	label: string;
	placeholder: string;
};

export type baseFormUnion =
	| baseFormTextTpl
	| baseFormTextTipTpl
	| baseFormNumberTpl
	| baseFormTextAreaTpl
	| baseFormMyRadioTpl
	| baseFormMyCheckboxTpl
	| baseFormMySelectTpl
	| baseFormDateTpl;
export type baseFormUnionType =
	| baseFormTextTpl["type"]
	| baseFormTextTipTpl["type"]
	| baseFormNumberTpl["type"]
	| baseFormTextAreaTpl["type"]
	| baseFormMyRadioTpl["type"]
	| baseFormMyCheckboxTpl["type"]
	| baseFormMySelectTpl["type"]
	| baseFormDateTpl["type"];

export type TFormItemsDefaultType = Array<baseFormUnion>;