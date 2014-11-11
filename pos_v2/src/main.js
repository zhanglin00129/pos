//TODO: Please write code in this file.
function printInventory(inputs) {

  var checkStand = new CheckStand(inputs);
  var detailList = checkStand.getDetailList();

  var sumPrice = 0;
  var savePrice = 0;

  var printInfo = Util.titleLine()+Util.splitLine();

  for(var i in detailList ){
     printInfo += "名称："+detailList[i].name+"，数量："+detailList[i].num+
                   detailList[i].unit+"，单价："+detailList[i].price.toFixed(2)+"(元)，小计："+
                   (detailList[i].price*detailList[i].paidNum).toFixed(2)+"(元)\n";
     sumPrice += detailList[i].price*detailList[i].paidNum;
  }

  printInfo += Util.splitLine()+"挥泪赠送商品：\n";
  for( i in detailList ){
     if(detailList[i].freeNum>0){
     printInfo +="名称："+detailList[i].name+"，数量："+detailList[i].freeNum+detailList[i].unit+"\n";
     savePrice += detailList[i].price*detailList[i].freeNum;
}
  }
  printInfo += Util.splitLine();
  printInfo += "总计："+sumPrice.toFixed(2)+"(元)\n"+"节省：" +(savePrice).toFixed(2)+"(元)\n";
  printInfo += Util.endLine();
  console.log(printInfo);
}
