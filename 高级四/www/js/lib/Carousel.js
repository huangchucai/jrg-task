/**
 * Created by huangchucai on 2017/3/31.
 */
define(['jquery'],function($){
    var Carousel=(function(){
        function  _Carousel ($ct){
            this.$ct=$ct;
            this.$ctImg=this.$ct.children(".ct-img");
            this.$control=this.$ct.children(".control");
            this.$next=this.$ct.children(".next");
            this.$prev=this.$ct.children(".prev");
            this.currentPage=0;
            this.animateOff=true;
            this.init();
        }
        _Carousel.prototype.init=function(){
            this.$imgLength=this.$ctImg.children().length;
            this.$imgWidth=this.$ctImg.children().eq(0).width();
            var $firstClone=this.$ctImg.children().first().clone();
            var $lastClone=this.$ctImg.children().last().clone();
            this.$ctImg.prepend($lastClone);
            this.$ctImg.append($firstClone);
            this.$ctImg.width(this.$ctImg.children().length*this.$ctImg.children().eq(0).width());
            this.$ctImg.css("left",-this.$imgWidth);
            this.autoplay();
            this.bind();
        }
        _Carousel.prototype.bind=function(){
            var _this=this
            this.$next.on("click",function(e){
                clearInterval(_this.clock)
                e.preventDefault()
                _this.playNext(1)
            })
            this.$prev.on("click",function(e){
                clearInterval(_this.clock)
                e.preventDefault();
                _this.playPrev(1);
            })
            this.$control.find("a").on('click',function(e){
                clearInterval(_this.clock)
                e.preventDefault();
                var index=_this.$control.find("a").index($(this))
                if(index<_this.currentPage){
                    _this.playPrev(_this.currentPage-index)
                }
                else if(index>_this.currentPage){
                    _this.playNext(index-_this.currentPage)
                }
            })
        }
        _Carousel.prototype.playNext=function(num){
            var _this=this;
            if(this.animateOff){
                this.animateOff=false;
                this.$ctImg.animate({
                    left: '-='+num*this.$imgWidth
                },600,function(){
                    _this.animateOff=true;
                    _this.currentPage+=num;
                    if(_this.currentPage===_this.$imgLength){
                        _this.currentPage=0
                        _this.$ctImg.css("left",0-_this.$imgWidth)
                    }
                    _this.show()
                })
                this.autoplay()
            }

        }
        _Carousel.prototype.playPrev=function(num){
            var _this=this;
            if(this.animateOff){
                this.animateOff=false;
                this.$ctImg.animate({
                    left: '+='+num*this.$imgWidth
                },1000,function(){
                    _this.animateOff=true;
                    _this.currentPage-=num;
                    if(_this.currentPage<0){
                        _this.$ctImg.css("left",0-_this.$imgWidth*_this.$imgLength)
                        _this.currentPage=_this.$imgLength-1
                    }
                    _this.show()
                })
            }
        }
        _Carousel.prototype.show=function(){
            this.$control.find("a").removeClass("active").eq(this.currentPage).addClass("active")
        }
        _Carousel.prototype.autoplay=function(){
            var _this=this;
            this.clock=setTimeout(function(){
                _this.playNext(1)
            },1500)
        }
        return {
            init: function($ct){
                $ct.each(function(){
                    new _Carousel($(this))
                })
            }
        }
    })()
    return Carousel
})
