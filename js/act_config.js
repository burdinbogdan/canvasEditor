//draw action selection (Pencil, line, etc.) 
let radio = $('.controllers > input[name=tools]');
let nameAction = $(radio).closest('[checked]').val();
radio.change(function() {
	nameAction = $(this).val();
});

// fills
let checkbox = $('.controllers > input[name=fills]');
let fills = checkbox.is(':checked');
checkbox.change(function() {
	fills = $(this).is(':checked');
});

//color selection
let colorCtrl = $('.controllers > input[name=color]');
let color = colorCtrl.val();
colorCtrl.change(function() {
	color = $(this).val();
});

//line width selection
let lineWidthCtrl = $('.controllers > input[name=line-width]');
let lineWidth = lineWidthCtrl.val();
lineWidthCtrl.change(function() {
	lineWidth = $(this).val();
});


const actConfig = {
	nameAction: function(){return nameAction},
	fills: function(){return fills},
	color: function(){return color},
	lineWidth: function(){return lineWidth}
};
export default actConfig;