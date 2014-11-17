//needs underscore! and jquery!


var CalcFactory = function(textBox){
    var newCalc = {};
    newCalc.press = function(c){
        textBox.value += c;
    };
    newCalc.remove = function(){
        textBox.value = textBox.value.substring(0, textBox.value.length - 1);
    };
    newCalc.onType = function(){
        if(!/^[0-9]|\+|\*|-|\/$/.test(textBox.value[textBox.value.length-1]))
            newCalc.remove();
    };
    /**
     * Welcome programmers. this is a very serious function. it splits the input
     * to simpler inputs for every type of math function (+-*\/) and then folds
     * the array of the results for each of them. in a more abstract way to put it,
     * it creates a tree. each node in the tree represents a math function. each
     * leaf represent a number.
     * @returns {result of the calculations}
     */
    newCalc.calculate = function(){
        var line  =  textBox.value;
        var added = line.split('+');
        var addedParsed = _.map(added,function(str){
            var subtracted = str.split('-');
            var subtractedParsed = _.map(subtracted,function(str){
                var multiplied = str.split('*');
                var multipliedParsed = _.map(multiplied,function(str){
                    var divided = str.split('/');
                    var dividedParsed = _.map(divided, function(devidee){return Number(devidee)});
                    return _.reduce(dividedParsed,function(aggregated,num){return aggregated/num;},dividedParsed[0]*dividedParsed[0]);
                });
                return _.reduce(multipliedParsed,function(aggregated,num){return aggregated*num},1);
            });
            return _.reduce(subtractedParsed,function(aggregated,num){return aggregated-num},subtractedParsed[0]*2);
        });
        result = _.reduce(addedParsed,function(aggregated,num){return aggregated+num},0);
		if (isNaN(result))
			return textBox.value = 'Illegal';
		textBox.value = result;		
    };
	
	newCalc.wipe = function(){
		textBox.value='';
	}
	
    return newCalc;
};
(function(){
	var c = CalcFactory(document.getElementById('screenSimple'));
	for(var i = 0; i < 10; i++){
		(function(i){
			$('#'+i).click(function(){
				c.press(''+i);
			});
		})(i);
	}
	$('#plus').click(function(){
		c.press('+');
	});
	$('#sub').click(function(){
		c.press('-');
	});
	$('#div').click(function(){
		c.press('/');
	});
	$('#mult').click(function(){
		c.press('*');
	});
	$('#wipe').click(function(){
		c.wipe();
	});
	$('#del').click(function(){
		c.remove();
	});
	$('#dot').click(function(){
		c.press('.');
	});
	$('#res').click(function(){
		c.calculate();
	});
	$("#screenSimple").keyup(function (e) {
		c.onType();
	});
	$("#screenSimple").keydown(function (e) {
		c.onType();
	});
})()
