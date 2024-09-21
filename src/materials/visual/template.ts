import Chart from './Chart/template'

const visualTemplate = [
	Chart,
];

const VisualTemplate = visualTemplate.map(v => {
	return { ...v, category: 'visual' };
});

export default VisualTemplate;