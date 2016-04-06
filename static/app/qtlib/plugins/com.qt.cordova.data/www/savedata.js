cordova.define("com.qt.cordova.data.SaveData", function(require, exports, module) {

var exec = require('cordova/exec');

function SaveData(){};

SaveData.prototype.save = function(key,value,success, error){
	  exec(success, error, "SaveData", "save", [key,value]);
};

SaveData.prototype.get = function(key,success, error){
	  exec(success, error, "SaveData", "get", [key]);
};

var savedata = new SaveData();
module.exports = savedata; 



});
