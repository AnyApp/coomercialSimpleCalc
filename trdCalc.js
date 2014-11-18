(function(){
	var incomes = $('.incomes');
	var outcomes = $('.outcomes');
	function renderTotals(incomes){
		var totalsArray = _.map(incomes.find('.totals'),function(one){return Number(one.value);});
		var sum = _.reduce(totalsArray,function(sum,one){return sum+one;},0);
		incomes.find('.totalTotals').val(sum);
		return sum;
	}
	function createHandlers(newIncome){
		var inputs = newIncome.find('input');
		inputs.val('');
		inputs.attr('checked',false);
		var typeHandler = function(){
			var amount = inputs[1].value;
			var price = inputs[2].value;
			var yearly = inputs[4].checked;
			var total = Number(amount) * Number(price) * (yearly ? 1 : 12);
			inputs[5].value = isNaN(total) ? '' : total;
			var sumIncomes = renderTotals(incomes);
			var sumOutcomes = renderTotals(outcomes);
			$('#result1').val(sumIncomes);
			$('#result2').val(sumOutcomes);
			$('#resultsGap').val(sumIncomes-sumOutcomes);
		}
		newIncome.keyup(typeHandler);
		newIncome.keydown(typeHandler);
		$(inputs[3]).click(typeHandler);
		$(inputs[4]).click(typeHandler);
		newIncome.find('h2').click(function(){
			if(newIncome.find('.foldable').css('display') !== 'none'){
				newIncome.find('.foldable').css('display','none');
				newIncome.find('.total').html('Total: ' + inputs[5].value);
			}
			else{
				newIncome.find('.foldable').css('display','');
				newIncome.find('.total').html('');
			}
		});
	}
	function mainIncomeNameHandler(){
		firstIncome.find('h2').html(firstIncome.find('input')[0].value === '' ? 'Main income' : firstIncome.find('input')[0].value);
	}
	function mainOutcomeNameHandler(){
		firstOutcome.find('h2').html(firstOutcome.find('input')[0].value === '' ? 'Main outcome' : firstOutcome.find('input')[0].value);
	}
	var firstIncome = $($('.income')[0]);
	firstIncome.find('input').keydown(mainIncomeNameHandler);
	firstIncome.find('input').keyup(mainIncomeNameHandler);
	var firstOutcome = $($('.outcome')[0]);
	firstOutcome.find('input').keydown(mainOutcomeNameHandler);
	firstOutcome.find('input').keyup(mainOutcomeNameHandler);
	createHandlers(firstIncome);
	createHandlers(firstOutcome);
	$('#add1').click(function(){
		var newIncome = firstIncome.clone()
		newIncome.find('h2').html('Another income');
		function incomeNameHandler(){
			newIncome.find('h2').html(newIncome.find('input')[0].value === '' ? 'Another income' : newIncome.find('input')[0].value);
		}
		newIncome.find('input').keydown(incomeNameHandler);
		newIncome.find('input').keyup(incomeNameHandler);
		createHandlers(newIncome);
		newIncome.insertBefore($('#add1'));
	});
	$('#add2').click(function(){
		var newOutcome = firstOutcome.clone()
		newOutcome.find('h2').html('Another outcome');
		function outcomeNameHandler(){
			newOutcome.find('h2').html(newOutcome.find('input')[0].value === '' ? 'Another income' : newOutcome.find('input')[0].value);
		}
		newOutcome.find('input').keydown(outcomeNameHandler);
		newOutcome.find('input').keyup(outcomeNameHandler);
		createHandlers(newOutcome);
		newOutcome.insertBefore($('#add2'));
	});
})();