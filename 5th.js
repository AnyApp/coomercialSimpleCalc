(function() {
    function calculateEverything() {
        var mr = $('.mr');
        var sh = $('.sh');
        var sum = $('.sum');
        var totalMonthly = 0;
        for (var i in mr) {
            var value = Number(mr[i].value) * Number(sh[i].value);
            if (isNaN(value))
                value = '';
            else
                totalMonthly += value;
            sum[i].value = value;
        }
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
            console.log(1 + madad/100);
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
    var listening = $('.mr, .sh, #madad, #optionTimes, #optionLen, #len, #optionRise')
    listening.keyup(calculateEverything);
    listening.keydown(calculateEverything);
})();
function toggleHide(id){
    var hide = $('#hide'+id);
    if(hide.css('display') === 'none')
        hide.css('display','');
    else
        hide.css('display','none');
}
