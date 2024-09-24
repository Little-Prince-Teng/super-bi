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
			this.pointData = [...this.pointData, payload];
			this.curPoint = payload;
			overSave("userData", this.pointData);
		},
		clearAll() {
			this.pointData = [];
			this.curPoint = null;
			overSave("userData", []);
		}
	}
});