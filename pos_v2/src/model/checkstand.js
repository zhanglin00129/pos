function CheckStand(inputs){
  this.inputs = inputs;
  this.realInputs = {};
  this.readInputList();//构造函数
}

CheckStand.prototype.readInputList = function(){
  var inputs = this.inputs;
  var realInputs = this.realInputs;
  for(var i = 0;i<inputs.length;++i){
    var realInputsItem = Util.splitByDelimiter(inputs[i],'-');

    if(realInputs.hasOwnProperty(realInputsItem[0])){
      realInputs[realInputsItem[0]]+= realInputsItem[1];
    }else{
      realInputs[realInputsItem[0]]= realInputsItem[1];
    }
  }
};

CheckStand.prototype.getDetailList = function(){

    var realInputs = this.realInputs;
    var detailList = {};
    var j = 0;

    for(var item in realInputs){
      var currentInfo = this.getInfoFromAllItem(item);
      var promotionCal = new PromotionCal(item,realInputs[item]);
      var tempFreeNum = (promotionCal.isPromotion()==1) ? promotionCal.getFreeNum():0;
      detailList[j] =  {
        barcode : currentInfo.barcode,
        name : currentInfo.name,
        unit : currentInfo.unit,
        price : currentInfo.price,
        num : realInputs[item],
        freeNum : tempFreeNum,
        paidNum :(realInputs[item] - tempFreeNum)
      };
      j++;
    }
    return detailList;
};

CheckStand.prototype.getInfoFromAllItem = function(barcode){
    var allItems = loadAllItems();
    for(var i=0;i<allItems.length;++i){
       if(barcode == allItems[i].barcode){
       return allItems[i];
       }
    }
}
