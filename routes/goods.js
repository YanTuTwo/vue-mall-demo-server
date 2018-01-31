var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');


//连接MongoDB数据库

mongoose.connect('mongodb://127.0.0.1:27017/ttmall');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});



router.get('/list', function(req, res, next) {
	let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
	let priceLevel = req.param("priceLevel");
	let priceSort = req.param("priceSort");
	let skip = (page-1)*pageSize;
	var priceGt = '',priceLte = '';
	let params = {};
	if(priceLevel != 'all') {
		switch(priceLevel) {
			case '0':
				priceGt = 0;
				priceLte = 100;
				break;
			case '1':
				priceGt = 100;
				priceLte = 500;
				break;
			case '2':
				priceGt = 500;
				priceLte = 1000;
				break;
			case '3':
				priceGt = 1000;
				priceLte = 5000;
				break;
		}
		params = {
			salePrice: {
				$gt: priceGt,
				$lte: priceLte
			}
		}
	}
//	.exec(function(err,data){
//		console.log(data);
//	});
//	console.log(total);
	var count;
	let countmodal=Goods.find(params).count();
	countmodal.exec(function(err,docs){
		console.log(docs);
		count=docs;
	})
	let goodsModal=Goods.find(params).skip(skip).limit(pageSize);
	if(priceSort!=0){
		goodsModal.sort({'salePrice':priceSort});	
	}
	
	goodsModal.exec(function(err,doc){		
		if(err) {
			res.json({
				status: '1',
				msg: err.message
			});
		} else {
			res.json({
				status: '0',
				msg: '',
				total:count,
				data:doc
			});
		}
	});
});

module.exports = router;