export default class Drawer {

	constructor(canvas) {
		this.canvas = canvas;
		if (canvas.getContext) {
			this.ctx = canvas.getContext('2d');
		}
	}

	drawLine(startPoint, endPoint, color, lineWidth) {
		if (startPoint && endPoint) {
			this.ctx.strokeStyle = color;
			this.ctx.lineWidth = lineWidth;
			this.ctx.lineCap = 'round';
			this.ctx.beginPath();
			this.ctx.moveTo(startPoint.x, startPoint.y);
			this.ctx.lineTo(endPoint.x, endPoint.y);
			this.ctx.stroke();
		}
	}

	drawCircle(startPoint, endPoint, color, lineWidth, fills) {
		if (startPoint && endPoint) {
			this.ctx.strokeStyle = color;
			this.ctx.lineWidth = lineWidth;
			this.ctx.beginPath();
			let radius = Math.sqrt(Math.pow(startPoint.x - endPoint.x, 2) + Math.pow(startPoint.y - endPoint.y, 2));
			this.ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI, true);
			this.ctx.stroke();
			if (fills) {
				this.ctx.fillStyle = color;
				this.ctx.fill();
			}
		}
	}

	drawRectangle(startPoint, endPoint, color, lineWidth, fills) {
		if (startPoint && endPoint) {
			this.ctx.strokeStyle = color;
			this.ctx.lineWidth = lineWidth;
			this.ctx.beginPath();
			this.ctx.strokeRect(startPoint.x, startPoint.y, endPoint.x - startPoint.x, endPoint.y - startPoint.y);
			this.ctx.stroke();
			if (fills) {
				this.ctx.fillStyle = color;
				this.ctx.fillRect(startPoint.x, startPoint.y, endPoint.x - startPoint.x, endPoint.y - startPoint.y);
			}
		}
	}
	
	clean() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	getDrawer(nameAction) {
		switch (nameAction) {
			case 'pencil':
				return this.drawLine.bind(this);
			case 'line':
				return this.drawLine.bind(this);
			case 'circle':
				return this.drawCircle.bind(this);
			case 'rectangle':
				return this.drawRectangle.bind(this);
			case 'clean':
				return this.clean.bind(this);
		}
	}
}