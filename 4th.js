
$('#calcPrice').click(function(){
	var price = Number($('#noi').val()) * Number($('#yield').val());
	$('#price').val(isNaN(price) ? '' : price);
});

$('#calcYield').click(function(){
	var yield = Number($('#price').val()) / Number($('#noi').val());
	$('#yield').val(isNaN(yield) ? '' : yield);
});

$('#calcSens').click(function(){
	$("#slider10").trigger("slidechange",[{value: selected}]);
});