function swapNodes(a, b) {
    var aparent= a.parentNode;
    var asibling= a.nextSibling===b? a : a.nextSibling;
    b.parentNode.insertBefore(a, b);
    aparent.insertBefore(b, asibling);
}

function getCheckedRadioId(name) {
    var elements = document.getElementsByName(name);

    for (var i=0, len=elements.length; i<len; ++i)
        if (elements[i].checked) return elements[i].value;
}
function calcPrice(){
	var price = Number($('#noi').val()) / (Number($('#yield').val()) * 0.01);
	$('#price').val(isNaN(price) ? '' : price);
}
function calcYield(){
	var yield = Number($('#noi').val()) / (Number($('#price').val()) * 0.01);
	$('#yield').val(isNaN(yield) ? '' : yield);
}
var radio2 = true;
$(':radio').click(function(){
	var checked = getCheckedRadioId('optionsRadios');
	if(checked === 'option1'){
		if(radio2){
			swapNodes(document.getElementById('swap1'),document.getElementById('swap2'));
			radio2 = !radio2;
			$('#yield').prop('readonly', true);
			$('#price').prop('readonly', false);
			var listening = $('#noi, #yield, #price');
			listening.unbind('keyup');
			listening.unbind('keydown');
			listening.keyup(calcYield);
			listening.keydown(calcYield);
            months = ["100,000", "250,000", "500,000", "1,000,000"];
            $("#slider10").slider({ min: 0, max: 3 });
            $("#slider10").slider("pips" , { rest: "label", labels: months });
			return;
		}
		return;
	}
	if(!radio2){
		swapNodes(document.getElementById('swap1'),document.getElementById('swap2'));
		radio2 = !radio2;
		$('#yield').prop('readonly', false);
		$('#price').prop('readonly', true);
		var listening = $('#noi, #yield, #price');
		listening.unbind('keyup');
		listening.unbind('keydown');
		listening.keyup(calcPrice);
		listening.keydown(calcPrice);
        months = ["0.1", "0.25", "0.5", "1"];
        $("#slider10").slider({ min: 0, max: 3 });
        $("#slider10").slider("pips" , { rest: "label", labels: months });
		return;
	}
});

var listening = $('#noi, #yield');
listening.keyup(calcPrice);
listening.keydown(calcPrice);
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
