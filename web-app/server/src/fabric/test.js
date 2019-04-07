var path=require('path');
var store_path = path.join(__dirname, '../wallet', 'user1');
console.log("__dirname=%s", path.resolve(__dirname));
console.log("store_path=%s", path.resolve(store_path));