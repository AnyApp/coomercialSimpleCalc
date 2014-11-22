(function() {
    function calculateEverything() {
        var mr = $('.mr');
        var sh = $('.sh');
        var sum = $('.sum');
        var totalMonthly = 0;
        if(!isNaN(Number(mr[0].value) + Number(mr[1].value) + Number(mr[2].value)))
            $('.sumMr').val(Number(mr[0].value) + Number(mr[1].value) + Number(mr[2].value));
        else
            $('.sumMr').val('');
        for (var i in mr) {
            var value = Number(mr[i].value) * Number(sh[i].value);
            if (isNaN(value))
                value = '';
            else
                totalMonthly += value;
            sum[i].value = value;
        }
        if(!isNaN(Number(sum[0].value) + Number(sum[1].value) + Number(sum[2].value)))
            $('.sumSum').val(Number(sum[0].value) + Number(sum[1].value) + Number(sum[2].value));
        else
            $('.sumSum').val('');
        totalMonthly += isNaN(Number($('.manage').val())) ? 0 : Number($('.manage').val());
        $('.totalMonthly').val(totalMonthly);
        var len = Number($('#len').val()), optLen = Number($('#optionLen').val());
        var optionTimes = Number($('#optionTimes').val()), optionRise = Number($('#optionRise').val());
        var madad = Number($('#madad').val());
        $('#table').html('');
        if(isNaN(len) || isNaN(optLen) || isNaN(optionTimes) || isNaN(optionRise) || isNaN(madad))
            return;
        var table = $('#table');
        var counter = 0;
        for (i = 0;  i < len + optLen * optionTimes; i += 12, counter++){
            var newPrice = totalMonthly;
            if(i >= len){
                newPrice = newPrice * Math.pow(1 + optionRise/100, 1 + Math.floor((i - len) / optLen));
            }
            newPrice = newPrice * Math.pow(1 + madad/100, counter);
            var newRow = [
                '<tr><td>שנה',
                ' ',
                counter + 1,
                '</td><td>',
                newPrice,
                '</td><td>',
                newPrice * 12,
                '</td></tr>'
            ].join('');
            table.append(newRow);
        }
    }
    var listening = $('.mr, .sh, .manage, #madad, #optionTimes, #optionLen, #len, #optionRise');
    listening.keyup(calculateEverything);
    listening.keydown(calculateEverything);
})();
