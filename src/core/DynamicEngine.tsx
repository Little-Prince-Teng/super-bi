// 动态加载器

import { defineComponent, defineAsyncComponent, computed } from 'vue';

export type componentsType = 'base' | 'media' | 'visual';
type DynamicType = {
	isTpl: Boolean,
	config: { [key: string]: any },
	type: string,
	componentsType: componentsType,
	category: string
};

const DynamicFunc = (type: string, componentsType: string) => {
	return defineAsyncComponent({
		loader: async () => {
			const { default: Graph } = await import(`@/materials/${componentsType}${type}`);
			const Component = Graph;
			return (props: DynamicType) => {
				const { config, isTpl } = props;
				return <Component {...{ ...config, isTpl }} />
			};
		},
		loadingComponent: () => (
			<div style={{ paddingTop: '10px', textAlign: 'center' }}>
				Loading
			</div>
		)
	});
};

const DynamicEngine = defineComponent({
	props: {
		isTpl: { type: Boolean, required: true },
		config: { type: Object as () => { [key: string]: any }, required: true },
		type: { type: String, required: true },
		componentsType: { type: String as () => componentsType, required: true },
		category: { type: String, required: true }
	},
	setup(props) {
		const Dynamic = computed(() => DynamicFunc(props.type, props.category));

		return () => <Dynamic {...props} />;
	}
});

export default DynamicEngine;