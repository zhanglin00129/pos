var Util = Util || {};

Util.splitByDelimiter = function(input,delimiter){
  var result = input.split(delimiter);
  result[1] = (!result[1])?1:(parseInt)(input.split(delimiter)[1]);
  return result;
};

Util.titleLine = function(){
  return "***<没钱赚商店>购物清单***\n" + "打印时间：" +
      Util.currentDate() + "\n";
};

Util.currentDate = function(){
   dateDigitToString = function (num) {
            return num < 10 ? '0' + num : num;
        };
  var currentDate = new Date(),
            year = dateDigitToString(currentDate.getFullYear()),
            month = dateDigitToString(currentDate.getMonth() + 1),
            date = dateDigitToString(currentDate.getDate()),
            hour = dateDigitToString(currentDate.getHours()),
            minute = dateDigitToString(currentDate.getMinutes()),
            second = dateDigitToString(currentDate.getSeconds()),
            formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
  return  formattedDateString;
};

Util.splitLine = function() {
  return "----------------------\n";
};

Util.endLine  = function() {
  return "**********************";
};
