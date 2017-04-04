/**
 * Created by huangchucai on 2017/4/4.
 */
//定义首页所有的功能
define(['jquery','goTop','Carousel','Waterfall'],function( $ ,GoTop,Carousel,Waterfall){
    new GoTop($(".goTop"))  //回到顶部

    Carousel.init($(".carousel"))  //轮播
    //
    new Waterfall($(".wrap-pic"))  //瀑布流
})