### 回到顶部插件

1. 添加如下样式

   ```css
           .goTop{
               position: fixed;
               width: 60px;
               height: 30px;
               line-height: 30px;
               border-radius: 5px;
               background: rebeccapurple;
               bottom: 35px;
               right: 35px;
               text-align: center;
               color: #ffffff;
               font-size:12px;
               display: none;
           }
   ```



2. new GotTop()

   * 原生插件 

     > ```
     > new GotTop(ct) //ct=document.querySelector(".ct") 容器
     > ```

   * 基于jquery的插件

     > ```
     > new GotTop($(".ct")) //ct是容器
     > ```