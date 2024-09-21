import Form from './Form/template';

const baseTemplate = [
	Form,
];

const BaseTemplate = baseTemplate.map(v => {
	return { ...v, category: 'base' };
});

export default BaseTemplate;