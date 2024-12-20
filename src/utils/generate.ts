interface listObj {
	id: string | number,
	name: string,
	age: number,
	sex: string,
	favor: string
}

const mockList = [
	{
		id: 1,
		name: '一',
		age: 18,
		sex: 'male',
		favor: 'reading'
	},
	{
		id: 2,
		name: '二',
		age: 20,
		sex: 'female',
		favor: 'fitness'
	}
]

const genereteDistData = (key: string, list: Array<listObj>) => {
	const distDataMap: any = {}
	const distData = []
	list.forEach((item: listObj) => {
		const curKey = typeof item[key] === 'object' ? item[key][0].label : item[key]
		if (distDataMap[curKey]) {
			distDataMap[curKey]++
		} else {
			distDataMap[curKey] = 1
		}
	})
	for(let k in distDataMap) {
		distData.push({ name: k, value: distDataMap[k] })
	}
	return distData
}

