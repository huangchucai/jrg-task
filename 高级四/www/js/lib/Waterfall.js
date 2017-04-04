/**
 * Created by huangchucai on 2017/4/3.
 */
//0.判定load是否看得见
//1. 获取得到数据
//2. 把数据渲染成dom节点
//3. dom节点以瀑布流的形式展示
define(['jquery'],function($){
        function Waterfall($ul) {
            this.$ul=$ul;
            this.$itemLi =this.$ul.find('.item-li') ;
            this.btn=this.$ul.siblings(".item-btn")
            this.init();
            this.getData();
            this.event()
        }
        Waterfall.prototype.init=function(){

            this.$itemLiWidth = this.$itemLi.outerWidth(true);
            this.arrLength = parseInt(this.$itemLi.parents('.wrap').width() / this.$itemLiWidth)
            this.pageCount= this.arrLength*2;
            this.curPage=1;
            this.dataIsArrive=false
            this.arr=[];
            //初始化数组
            for(var i=0;i<this.arrLength;i++){
                this.arr.push(0)
            }
        }
        Waterfall.prototype.event=function(){
            var _this=this;
            if(!this.dataIsArrive){
                this.btn.on('click',function(){
                    _this.getData()
                    _this.dataIsArrive=true
                })
            }
        }

        Waterfall.prototype.show = function ($node) {
            var top = $node.offset().top;
            var scr = $(window).scrollTop();
            var winHeight = $(window).height()
            if (top < scr + winHeight) {
                return true
            }
            else return false
        }
        Waterfall.prototype.getData = function () {
            var _this=this;
            if (!this.dataIsArrive) {
                $.ajax({
                    method: "GET",
                    url: "http://platform.sina.com.cn/slide/album_tech",
                    dataType: "jsonp",
                    jsonp: "jsoncallback",
                    // http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4
                    data: {
                        app_key: "1271687855",
                        num: this.pageCount,
                        page: this.curPage
                    }
                }).done(function(res){
                    // console.log(res.data)
                    _this.curPage++
                    _this.place(res.data)  //得到10条数据

                    _this.dataIsArrive=false
                })
            }
            dataIsArrive=true
        }
        Waterfall.prototype.place=function(items){
            var _this=this
            this.$tpls=this.create(items);
            // console.log(this.$tpls)
            // console.log(this.$tpls.html())
            // console.log()
            $.each(this.$tpls,function(index,ele){
                var $node=$(ele);
                $node.find("img").on('load',function(){
                    _this.$ul.append($node);
                    _this.waterfall($node)                })
            })
        }
        Waterfall.prototype.waterfall=function($node){
            var idx=0,min=this.arr[idx]
            for(var i=0;i<this.arr.length;i++){
                if(this.arr[i]<min){
                    idx=i
                    min=this.arr[i]
                }
            }
            $node.css({
                top: min,
                left: idx*this.$itemLiWidth
            })
            // console.log($node.outerWidth(true))
            // console.log($node.outerHeight(true))
            this.arr[idx]=$node.outerHeight(true)+this.arr[idx]
            this.$ul.height(Math.max.apply(null,this.arr))
        }
        Waterfall.prototype.create=function(nodes){
            var tpls='';
            for(var i=0;i<nodes.length;i++){
                tpls+="<li class='item-li'>";
                tpls+="<a href="+nodes[i].url+">";
                tpls+="<img src="+nodes[i].img_url+" alt='新闻图片'>";
                tpls+="</a>"
                tpls+="<h4 class='title'>"+nodes[i].short_name+"</h4>"
                tpls+="<p class='desp'>"+nodes[i].short_intro+"</p>"
                tpls+="</li>"
            }
            return $(tpls)
        }
    return Waterfall
})

