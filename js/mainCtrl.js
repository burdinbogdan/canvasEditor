import actConfig from './act_config.js';
import Act from './models/act.js';
import Drawer from './models/drawer.js';
import Point from './models/point.js';
import Actions from './models/actions.js';
import saveHandler from './save_handler.js';

let $canvas = $('.canvas');
let drawer = new Drawer($canvas[0]);

let lastPoint;
let mouseIsDown = false;
let points = [];

function redraw() {
	drawer.clean();
	Actions.doActions();
	nextStepButton.attr('disabled', !Actions.isNext());
	prevStepButton.attr('disabled', !Actions.isPrev());
	readButton.attr('disabled', !localStorage.getItem('act-coutn'));
	$('#saveImage').attr('src', localStorage.getItem('pict'));
}

//Functional handlers

let cleanButton = $('.controllers > input[type=button][name=clean]');
let prevStepButton = $('.controllers > input[type=button][name=prevStep]');
let nextStepButton = $('.controllers > input[type=button][name=nextStep]');
let saveButton = $('.controllers > input[type=button][name=save]');
let readButton = $('.controllers > input[type=button][name=read]');
let sizeButton = $('.controllers > input[type=button][name=size]');

cleanButton.click(function() {
	let act = new Act();
	act.nameAction = 'clean';
	act.cb = drawer.clean.bind(drawer);
	Actions.addAction(act);
	redraw();
});

prevStepButton.click(function() {
	Actions.stepBack();
	drawer.ctx.save();
	drawer.ctx.filter = 'blur(1px)';

	drawer.ctx.restore();
	redraw();
});

nextStepButton.click(function() {
	Actions.stepForward();
	redraw();
});

saveButton.click(function() {
	localStorage.setItem('pict', drawer.canvas.toDataURL());
	$('#saveImage').attr('src', drawer.canvas.toDataURL());
	saveHandler.saveInLocalStorage(Actions.getActions());
	redraw();
});

readButton.click(function() {
	let actionsFromLocal = saveHandler.readFromLocalStorage();

	for (let j = 0; j < actionsFromLocal.length; j++) {
		actionsFromLocal[j].cb = drawer.getDrawer(actionsFromLocal[j].nameAction);
	}

	Actions.setActions(actionsFromLocal);

	redraw();
});

sizeButton.click(function() {
	let sizes = $(this).siblings('.sizeInput');
	let width = +sizes.closest('[name = width]').val();
	let height = +sizes.closest('[name = height]').val();

	if (width && height) {
		drawer.canvas.width = width;
		drawer.canvas.height = height;

		let newEditorWidth = width +
			parseInt($('.panel.left').css('width')) +
			parseInt($('.panel.right').css('width'));
		$('.editor').css('width', newEditorWidth);
	}

	redraw();
});

//Drawing process handlers

$canvas.mousedown(function(e) {
	mouseIsDown = true;
	lastPoint = new Point(e.offsetX, e.offsetY);
	points[points.length] = lastPoint;
});

$canvas.mouseup(function(e) {
	mouseIsDown = false;

	points[points.length] = new Point(e.offsetX, e.offsetY);

	let act = new Act(
		actConfig.nameAction(),
		actConfig.color(),
		actConfig.lineWidth(),
		actConfig.fills(),
		points.slice(),
		drawer.getDrawer(actConfig.nameAction())
	);

	Actions.addAction(act);
	points.length = 0;
	redraw();
});

$canvas.mousemove(function(e) {
	if (mouseIsDown) {
		let currentPoint = new Point(e.offsetX, e.offsetY);
		switch (actConfig.nameAction()) {
			case 'pencil':
				points[points.length] = currentPoint;
				drawer.drawLine(lastPoint, currentPoint, actConfig.color(), actConfig.lineWidth());
				lastPoint = currentPoint;
				break;
			default:
				redraw();
				let drawerFunc = drawer.getDrawer(actConfig.nameAction());
				drawerFunc(lastPoint, currentPoint, actConfig.color(), actConfig.lineWidth(), actConfig.fills());
				break;
		}
	}
});

redraw();