//TODO: Please write code in this file.
/**
*function readInputList(inputs)：读取输入购物单
*@param:inputs 输入的购物单
*@return:realInputs 关联数组，数组下标为物品的barcode，内容为物品数量
*/
function readInputList(inputs){
    var realInputs = new Array();
    var len = inputs.length;

    for(var i = 0;i<len;++i){
	 var barcode;
  	 var goodsNum;
        if(inputs[i].indexOf('-')>0){
            barcode = inputs[i].split('-')[0];
	    goodsNum = (parseInt)(inputs[i].split('-')[1]);
        }
	else{
	        barcode = inputs[i];
	        goodsNum = 1;		
	}
	var flag = 0;
	for(var item in realInputs){
	 //查找是否已经存过该关键字
	   if(barcode == item){
	       realInputs[item]+= goodsNum;
	       flag = 1;
	       break;
           }
	}
	//没存过时 
	 if(flag == 0){
	    realInputs[barcode]=goodsNum;
	  }
    }	
  
　　　　return realInputs;
};

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
    var sum = 0
    var detailList = {};
    var allItems = loadAllItems();
    var j=0;

    for(var item in realInputs){

	for(var i=0;i<allItems.length;++i){

	    if(item == allItems[i].barcode){
		var tempFreeNum = 0;
		if(isPromotionItem(item)==1){
		    tempFreeNum = getFreeNum(realInputs[item])
		}
		var tempPaidNum = realInputs[item]-tempFreeNum
		detailList[j]={
		    barcode : allItems[i].barcode,
		    name : allItems[i].name,
		    unit : allItems[i].unit,
	   	    price : allItems[i].price,
		    num : realInputs[item],
		    freeNum : tempFreeNum,
		    paidNum : tempPaidNum
		} 
		++j	
	    }   	
	}
    }
    return detailList;
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
*function outputTwoDecimal(num)):强制保留两位小数
*@param:num 要处理的数据
*@return:s_num 返回处理后的字符串
*/
function outputTwoDecimal(num){
    var f_num = parseFloat(num);

    f_num = Math.round(f_num*100)/100;
    var s_num = f_num.toString();
    var pos_decimal = s_num.indexOf('.');
    if(pos_decimal<0){
    	pos_decimal = s_num.length;
	s_num += '.';
    }
    while(s_num.length <= pos_decimal+2){
    	s_num += '0'
    }
    return s_num;
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
    var printInfo = "***<没钱赚商店>购物清单***\n"

    for(var i in detailList ){
	printInfo += "名称："+detailList[i].name+"，数量："+detailList[i].num+
                     detailList[i].unit+"，单价："+outputTwoDecimal(detailList[i].price)+"(元)，小计："+
		     outputTwoDecimal(detailList[i].price*detailList[i].paidNum)+"(元)\n"
	sumPrice += detailList[i].price*detailList[i].paidNum;
    }

    printInfo += "----------------------\n挥泪赠送商品：\n"
    for(var i in detailList ){
	if(detailList[i].freeNum>0){
	    printInfo +="名称："+detailList[i].name+"，数量："+detailList[i].freeNum+detailList[i].unit+"\n"
	    savePrice += detailList[i].price*detailList[i].freeNum;
	}
    }
    printInfo +="----------------------\n"
    printInfo +="总计："+outputTwoDecimal(sumPrice)+"(元)\n"+"节省：" +outputTwoDecimal(savePrice)+"(元)\n"
    printInfo +="**********************"
    console.log(printInfo);
}
