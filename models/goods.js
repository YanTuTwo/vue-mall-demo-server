var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice":Number,
  "orginPrice":Number,
//"checked":String,
//"productNum":Number,
  "productImage":String
});

module.exports = mongoose.model('Goods',produtSchema);
