
/**
 * 发送 GET 请求， 无参数
 * GET /hello
 * 返回响应数据
 */
app.get('/getText', function(req,res) {
	var times=req.query.size;
	var start=parseInt(req.query.start);
	var length=parseInt(req.query.length)+3;
	var arr=[];
	for(var i=start;i<length;i++){
		arr.push(i+length*times);
	}
	setTimeout(function(){
        res.send({
            arr:arr
        })
	},300)
});