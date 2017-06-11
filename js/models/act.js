export default class Act {
	constructor(nameAction, color, lineWidth, fills, points, cb) {
		this.nameAction = nameAction;
		this.color = color;
		this.lineWidth = lineWidth;
		this.fills = fills;
		this.points = points;
		this.cb = cb;
	}
}