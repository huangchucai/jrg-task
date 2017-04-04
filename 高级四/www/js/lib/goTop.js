/**
 * Created by huangchucai on 2017/3/31.
 */
define(['jquery'],function($){
    function GoTop($ct){
        this.$ct=$ct;
        this.bind()
        this.init()
    }
    GoTop.prototype.bind=function(){
        if($(window).scrollTop()>50){
            this.$ct.fadeIn()
            this.$ct.on('click',function(){
                $(window).scrollTop(0)
            })
        }
        else {
            this.$ct.fadeOut()
        }
    }
    GoTop.prototype.init=function(){
        var _this=this
        $(window).on('scroll',function(){
            _this.bind()
        })
    }

    //return 出来
    return GoTop
})
