/**
 * Created by huangchucai on 2017/4/4.
 */
requirejs.config({
    baseUrl: './js/lib',   //相对于根路径而已
    paths: {
        'app': '../app'
    }
});
//加载模快入口
requirejs(['app/index']);