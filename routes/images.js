var express = require('express');
var router = express.Router();
var fs=require('fs');
var url =require('url');
var path=require('path');
/* GET home page. */
router.get('/*', function(req, res, next) {
	const fullURL =path.resolve(__dirname,'..')+req.originalUrl;
	console.log(fullURL);
	//设置请求的返回头type,content的type类型列表见上面
	res.setHeader("Content-Type", "image/jpeg");
	//格式必须为 binary 否则会出错
	var content =  fs.readFileSync(fullURL,"binary");   
	res.writeHead(200, "Ok");
	res.write(content,"binary"); //格式必须为 binary，否则会出错
	res.end();
});

module.exports = router;
