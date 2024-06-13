function getData() {
  var sheetId = "1X515mLf7AjlCb7FYqjj2zaswL2W51vlwSbRF9he9T88";
  var currentSheet = SpreadsheetApp.openById(sheetId).getSheetByName("Form Responses 1");
 
  var lastRow = currentSheet.getLastRow();
  var lastColumn = currentSheet.getLastColumn();
 
  Logger.log("Last Row :" + lastRow);
  Logger.log("Last Column :" + lastColumn);

  var headerData = currentSheet.getRange("H1:I1").getValues()[0];
  var lastRowData = currentSheet.getRange("H" + lastRow + ":I" + lastRow).getValues()[0];
 
  Logger.log("Header :" + headerData);
  Logger.log("Last Row Data :" + lastRowData);
 
  //set message
  var message = "\n\n" + "ชิบหายแล้วทุกคนนนน มีเรื่อง(ร้องเรียน)แล้วววววว วี้หว่อๆๆๆ🚨🚨" + "\n";
  for (var i = 0; i < headerData.length; i++) {
    message += "\n\n" + headerData[i] + " : " + lastRowData[i];
  }
 
  Logger.log("Data Message :" + message);

  //set line notify
  if (message !== "") {
    sendMessage(message);
  }
}

function sendMessage(message) {
  var lineNotifyEndPoint = "https://notify-api.line.me/api/notify";
  var accessToken = " **token** ";

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
  } catch (error) {
    Logger.log(error.name + "：" + error.message);
    return;
  }
    
  if (response.getResponseCode() === 200) {
    Logger.log("Sending message completed.");
  }
}
