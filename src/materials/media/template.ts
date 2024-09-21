import Calendar from './Calendar/template'

const mediaTemplate = [
	Calendar,
];

const MediaTemplate = mediaTemplate.map(v => {
	return { ...v, category: 'media' };
});

export default MediaTemplate;