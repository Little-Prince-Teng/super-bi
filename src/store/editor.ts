import { defineStore } from 'pinia';

const pointData = localStorage.getItem('userData') || '[]';

function overSave(name: string, data: string) {
	localStorage.setItem(name, JSON.stringify(data));
}


export const useEditorStore = defineStore('Editor', {
	state: () => ({
		pointData: JSON.parse(pointData),
		curPoint: null
	}),
	actions: {
		addPointData({ payload }) {
			let pointData = [...this.pointData, payload];
			overSave("userData", pointData);
			return {
				...this,
				pointData,
				curPoint: payload
			};
		},
		clearAll() {
			overSave("userData", []);
			return {
				...this,
				pointData: [],
				curPoint: null
			};
		}
	}
});