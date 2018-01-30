var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var Goods = require('../models/goods');
mongoose.connect('mongodb://127.0.0.1:27017/malltest');
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{
    //成功连接
    console.log("链接成功")
})

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

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


//连接MongoDB数据库


let Goods = mongoose.model('goods',produtSchema);

router.get('/list', function(req, res, next) {
//	let data=Goods.find({})
console.log(Goods);
	Goods.find({},(err,data)=>{
		console.log(data);
		if(err){
			console.log(err);
			return ;
		}
		res.json({
	  	code:0,
	  	data,
	  })
	});
//
});

module.exports = router;