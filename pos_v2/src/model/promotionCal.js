function PromotionCal(barcode,num){
  this.barcode = barcode;
  this.num = num;
}



PromotionCal.prototype.isPromotion = function(){
  var flag = 0;
  var promotions = loadPromotions();
  var barcode = this.barcode;
  for(var i=0;i<promotions.length;++i){
    if(promotions[i].type=='BUY_TWO_GET_ONE_FREE'){
      for(var j = 0;j<promotions[i].barcodes.length;++j){
        if(barcode == promotions[i].barcodes[j]){
          flag = 1;
          break;
        }
      }
    }
  }
  return flag;
};

PromotionCal.prototype.getFreeNum = function(){
  var num = this.num;
  return Math.floor(num/3);
};
