
function onOpen() {
  var ui = DocumentApp.getUi().createAddonMenu()
  .addItem('Replace die rolls', 'replaceDice')
  .addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function replaceDice() {
  var body = DocumentApp.getActiveDocument().getBody();
  var foundElement = body.findText('\[\d*d\d+[+-]?\d*\]');
  
  while (foundElement !== null) {
    var foundText = foundElement.getElement().asText();
    var text = foundText.getText();
    var dice = text.match(/\[(\d*d\d+[+-]?\d*)\]/)[1];
    foundText.setText(text.replace(/\[\d*d\d+[+-]?\d*\]/, rollDice(dice)));
    foundElement = body.findText('\[\d*d\d+[+-]?\d*\]');
  }
}

function rollDice(str) {
  if (!str) {
    str = 'd6';
  }
  var arr = str.split(/[d+-]/);
  
  var num = parseInt(arr[0]);
  if (isNaN(num)) {
    num = 1;
  }
  
  var size = parseInt(arr[1]);
  if (isNaN(size)) {
    size = 6;
  }
  
  var mod = parseInt(arr[2]);
  if (isNaN(mod)) {
    mod = 0;
  }
  if (str.indexOf('-') !== -1) {
    mod *= -1;
  }

  for (var i=0; i<num; i++) {
    mod += Math.ceil(Math.random() * size);
  }
  
  return str+': '+mod;
}
