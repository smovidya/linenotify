function getData() {
  var sheetId = "1_fmkr1pqNMMHPxS6uSlksSSs3sj5SLKZGiGFn1uNJ1M";
  var currentSheet = SpreadsheetApp.openById(sheetId).getSheetByName("Form Responses 1");
 
  var lastRow = currentSheet.getLastRow();
  var lastColumn = currentSheet.getLastColumn();
 
  Logger.log("Last Row :" + lastRow);
  Logger.log("Last Column :" + lastColumn);

  var headerData = currentSheet.getRange("B1:E1").getValues()[0];
  var lastRowData = currentSheet.getRange("B" + lastRow + ":E" + lastRow).getValues()[0];
 
  Logger.log("Header :" + headerData);
  Logger.log("Last Row Data :" + lastRowData);
 
  //set message
  var message = "\n\n" + "ชิบหายแล้วทุกคนนนน มีเรื่อง(ร้องเรียน)แล้วววววว วี้หว่อๆๆๆ🚨🚨" + "\n";
    for (i = 0; i < lastColumn - 1; i++) {
      message += "\n" + headerData[i] + " : " + lastRowData[i];
    }
 
  Logger.log("Data Message :" + message);

  //set line notify
  if (message !== "") {
   sendMessage(message);
 }
 
}

function sendMessage(message) {
  var lineNotifyEndPoint = "https://notify-api.line.me/api/notify";
  var accessToken = "2vif0ZqmabP6AXeI9U6PzNUzgIW8T6eLgjaa3bFz4iG";

  var formData = {
    "message": message
  };
  
  var options = {
    "headers" : {"Authorization" : "Bearer " + accessToken},
    "method" : 'post',
    "payload" : formData
  };

  try {
    var response = UrlFetchApp.fetch(lineNotifyEndPoint, options);
  }
  
  catch (error) {
    Logger.log(error.name + "：" + error.message);
    return;
  }
    
  if (response.getResponseCode() === 200) {
    Logger.log("Sending message completed.");
  } 

}
