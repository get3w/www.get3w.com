cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/com.qt.cordova.data/www/savedata.js",
        "id": "com.qt.cordova.data.SaveData",
        "clobbers": [
            "cordova.plugins.savedata"
        ]
    },
    {
        "file": "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
        "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.1",
    "com.qt.cordova.data": "1.0.0",
    "phonegap-plugin-barcodescanner": "4.1.0"
};
// BOTTOM OF METADATA
});