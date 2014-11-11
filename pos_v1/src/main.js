//TODO: Please write code in this file.
/**
*function readInputList(inputs)：读取输入购物单
*@param:inputs 输入的购物单
*@return:realInputs 关联数组，数组下标为物品的barcode，内容为物品数量
*/
function readInputList(inputs){
  var realInputs = {};
  for(var i = 0;i<inputs.length;++i){
    var realInputsItem = splitByDelimiter(inputs[i],'-');
    if(realInputs.hasOwnProperty(realInputsItem[0])){
      realInputs[realInputsItem[0]]+= realInputsItem[1];
    }else{
      realInputs[realInputsItem[0]]= realInputsItem[1];
    }
  }
  return realInputs;
}

/**
*function splitByDelimiter(input,delimiter)
*@param:input
*@param:delimiter
*@return:result,result[0]为分割符前字符,result[1]为分割符后字符,若没有分隔符,则result[1]为null
*/
function splitByDelimiter(input,delimiter){
    var result = input.split(delimiter);
    result[1] = (!result[1])?1:(parseInt)(input.split(delimiter)[1]);

    return result;
}

/**
*getFreeNum(num):计算免费产品的件数
*@param:num 输入购买件数
*@return:根据优惠信息返回免费的件数
*/
function getFreeNum(num){
    return Math.floor(num/3);
}

/**
*function getDetailList(realInputs):
*@param:realInputs 输入关联数组,数组下标为物品的barcode，内容为物品数量
*@return:detailList 详细购物清单
*/
function getDetailList(realInputs){
    var sum = 0;
    var detailList = {};
    var allItems = loadAllItems();
    var j = 0;

    for(var item in realInputs){
	     var currentInfo = getInfoFromAllItem(item);
	     var tempFreeNum = 0;
	     if(isPromotionItem(item)==1){
	         tempFreeNum = getFreeNum(realInputs[item]);
       }
	     var tempPaidNum = realInputs[item]-tempFreeNum;
	     detailList[j]={
	        barcode : currentInfo.barcode,
	        name : currentInfo.name,
	        unit : currentInfo.unit,
	        price : currentInfo.price,
	        num : realInputs[item],
	        freeNum : tempFreeNum,
	        paidNum : tempPaidNum
	      } ;
	     j++;
    }
    return detailList;
}

/**
*function getInfoFromAllItem(barcode)
*@param:barcode
*@return:
*/
function getInfoFromAllItem(barcode){
    var allItems = loadAllItems();
    for(var i=0;i<allItems.length;++i){
	     if(barcode == allItems[i].barcode){
	     return allItems[i];
	     }
    }
}


/**
*function isPromotionItem(barcode):根据条形码判断产品是否优惠产品
*@param:barcode 产品的条形码
*@return:flag 产品是优惠产品返回1,否则,返回0
*/
function isPromotionItem(barcode){
    var flag = 0;
    var promotions = loadPromotions();

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
}

/**
*function printInventory(inputs):打印账单
*@param:inputs 输入的购物单
*/
function printInventory(inputs){
    var realInputs = readInputList(inputs);
    var detailList = getDetailList(realInputs);
    var sumPrice = 0;
    var savePrice = 0;
    var printInfo = "***<没钱赚商店>购物清单***\n";

    for(var i in detailList ){
	printInfo += "名称："+detailList[i].name+"，数量："+detailList[i].num+
                     detailList[i].unit+"，单价："+detailList[i].price.toFixed(2)+"(元)，小计："+
		     (detailList[i].price*detailList[i].paidNum).toFixed(2)+"(元)\n";
	sumPrice += detailList[i].price*detailList[i].paidNum;
    }

    printInfo += "----------------------\n挥泪赠送商品：\n";
    for( i in detailList ){
	if(detailList[i].freeNum>0){
	    printInfo +="名称："+detailList[i].name+"，数量："+detailList[i].freeNum+detailList[i].unit+"\n";
	    savePrice += detailList[i].price*detailList[i].freeNum;
	}
    }
    printInfo +="----------------------\n";
    printInfo +="总计："+sumPrice.toFixed(2)+"(元)\n"+"节省：" +(savePrice).toFixed(2)+"(元)\n";
    printInfo +="**********************";
    console.log(printInfo);

}
