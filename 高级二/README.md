## 字符串问题

### 问题1：** apply、call 、bind有什么作用，什么区别

`bind`:创建一个新函数，当这个函数被调用的时候，第一个参数作为this值，之后的参数作为实参传入到新函数中。

`call`:调用函数，并指定这个函数的this和传入的若干个参数值。

`apply`:指定this值和以数组形式传递参数的情况下调用函数。

**作用**: 从它们的用法中可以看出，改变this，传递参数。

**区别**:首先是call和bind的区别，call是调用函数，返回的是函数的返回值，而bind是创建一个新函数，就像是复制了别人的躯壳，改变了内在，然后作为一个新东西使用。然后call和apply的区别是，传递的实参不一样，call是单个传递，而apply是以数组的形式传递。

```javascript
    var name="window"
    function Student(age){
        this.age=age
        this.name="student";
        this.say=function(){
            console.log(this.name);
            console.log(this.age);
        }
    }
    var fn1=new Student(22)
    fn1.say()
    var say1=fn1.say.call(window)
    // say1  undefined
    var fn2=new Student()
    var say2=fn2.say.bind(Student)
    //say2  function
    say2()
    
```

### **问题2：** 以下代码输出什么?

```javascript
var john = { 
  firstName: "John" 
}
function func() { 
  alert(this.firstName + ": hi!")
}
john.sayHi = func
john.sayHi()
//转换这个代码的执行函数
//john.sayHi.call(john)
//所以输出'John: hi!'
```

### **问题3：** 下面代码输出什么，为什么

```javascript
func() //window
function func() { 
  alert(this)
}
//转化这个代码的执行函数
//func.call(null) 在默认情况下，call中传递的是null,undefined的时候，this指向window
//所以call的第一值就是this，也就是window
```

### **问题4：**下面代码输出什么

```javascript
document.addEventListener('click', function(e){
    console.log(this); //document
    setTimeout(function(){
        console.log(this); //window
    }, 200);
}, false);
//这里考察2个点 1. setTimeout的默认this值是window 2.事件处理程序中的this就是事件源DOM对象

```

### **问题5：**下面代码输出什么，why

```javascript
var john = { 
  firstName: "John" 
}
function func() { 
  alert( this.firstName )
}
func.call(john)  //John
//1. 由于call调用函数第一个值传递的是this
//2. 所以func函数的调用的this的值就是john
```

### **问题6：** 以下代码有什么问题，如何修改

```javascript
var module= {
  bind: function(){
    $btn.on('click', function(){
      console.log(this) //this指什么  这里的this指的是#btn
      this.showMsg();//这里的this指的是#btn
    })
  },
  
  showMsg: function(){
    console.log('饥人谷');
  }
}
//this的指向出现了问题，事件监听函数中的this指向事件源，但是事件源没有showMsg()这个方法
//修改1
  bind: function(){
    var _this=this
    $btn.on('click', function(){
      _this.showMsg();
    })
  },
//修改2
  bind: function(){
    var _this=this
    $btn.on('click', function(){
     	module.showMsg.bind(module)()
        //module.showMsg.call(module)
    })
  },
```

## 原型链问题

### **问题7：**有如下代码，解释`Person`、 `prototype`、`__proto__`、`p`、`constructor`之间的关联。

```javascript
function Person(name){
    this.name = name;
}
Person.prototype.sayName = function(){
    console.log('My name is :' + this.name);
}
var p = new Person("若愚")
p.sayName();
```

> 1. 首先明白，对于函数先研究原型`prototype`,对于对象研究`__proto__`原型链
> 2. `__proto__ `指向的是一个构造函数的原型，`constructor`指向的是对应的构造函数
> 3. 因为所有函数都是由Function创建的，所以Function.prototype===被创建函数.__proto__  
> 4. 一切函数的原型对象都是由Object函数创建的，所以Function.prototype.__proto__都指向Object的prototype属性。

**解析**

* Person是构造函数，p是Person生成的实例。每一个函数在声明的时候同时会有一个prototype属性(是一个对象)。

* Person.prototype.constructor === Person   构造函数的原型的constructor的属性指向相应的构造函数

* p.__ proto __=  Person.prototype  实例化的对象的`__ proto__`属性，指向构造函数的原型（这里想new到底做了什么）     

  ​

### **问题8：** 上例中，对对象 p可以这样调用 `p.toString()`。`toString`是哪里来的? 画出原型图?并解释什么是原型链。

![原型链](D:\饥人谷作业\高级二\原型链.png)

有上图可以看出:对象p是没有toString()方法,所以它必须通过__proto__像上级寻找是否有toString()方法，发现Person.prototype里面也没有toString()方法，所以Person.prototype必须又向上级寻找，在Object.prototype中找到了toString()方法。像这样的通过__proto__不断的寻找属性和方法，就是原型链，在自己的作用域中找到了就不会继续想上寻找了。

### **问题9：**对`String`做扩展，实现如下方式获取字符串中频率最高的字符

```javascript
var str = 'ahbbccdeddddfg';
var ch = str.getMostOften();
console.log(ch); //d , 因为d 出现了5次
```

```javascript
    String.prototype.getMostOften=function(){
        var obj={}
        //遍历字符串
        for(let i=0;i<this.length;i++){
            if(!obj[this[i]]){
                obj[this.charAt(i)]=1;
            }
            else if(obj[this[i]]){
                obj[this.charAt(i)]++
            }
        }
        //console.log(obj)
        //遍历这个对象的值
        var max=0,val; //假定一个最大值
        for(var key in obj){
            if(obj[key]>max){
                max=obj[key];
                val=key;

            }
        }
        return val;
    }
    var str = 'foajfljadlfjlajfl';
    var ch= str.getMostOften();
    console.log(ch)
```

### **问题10：** `instanceof`有什么作用？内部逻辑是如何实现的？

> 记住instanceof是作用于**对象**的，看看一个实例化的对象在其原型链上存不存在一个构造函数的原型。
>
> ```
> object(对象) instanceof constructor(一个构造函数)
> ```

**内部逻辑**:首先明白1. 每一个对象都一个`__proto__`属性值指向创建它的构造函数。2.通过`__proto__`原型链会不断的向上寻找，直到找到目标为止。3.  所有对象都是通过Object对象实例化而成。

```javascript
function Person(){}
var p=new Person()
p instanceof Person   //true    因为p.__proto__===Person.prototype
p instanceof Object  //true 
Person.prototype={}  //重写原型
p instanceof Person  //false  由于原型的重写，它还是指向原来的，而此时已经不是Person的原型了
```

## 继承相关问题

### **问题11：**继承有什么作用?

**继承的作用：**

1. 减少代码的量，实现复用代码。
2. 可以充分的理解面向对象的基础

### **问题12：** 下面两种写法有什么区别?

```javascript
//方法1
function People(name, sex){
    this.name = name;
    this.sex = sex;
    this.printName = function(){
        console.log(this.name);
    }
}
var p1 = new People('饥人谷', 2)

//方法2
function Person(name, sex){
    this.name = name;
    this.sex = sex;
}

Person.prototype.printName = function(){
    console.log(this.name);
}
var p1 = new Person('若愚', 27);
```

**二种写法的区别：**

1. 想想第一种写法，我们如果创建100个实例对象，是不是每一个对象都会有printName这个方法。

2. 但是有时候，不是所有对象都需要这个方法，这就加大了内存的负担。

3. 如果我们按照第二种方法构造函数，就能够做到，谁想用就用，不用就可以不用，只有一条代码。

4. 这二种的结构都不一样，生成的实例对象拥有的属性和方法都不一样。

   > 总结
   >
   > 1. 公共的属性和方法就放在构造函数中
   > 2. 有的需要有的不需要就放在构造函数的原型中
   > 3. 方法到底是放在原型中还是构造函数中，是根据需要和结构而定

### **问题13：** `Object.create` 有什么作用？兼容性如何？

> 创建一个指定原型的对象，也可以添加相应属性。
>
> 通常用于继承，给一个对象的原型创建一个__proto__指向它的父类的原型，从而实现继承
>
> 支持ie9以上(包括ie9)，其他主流浏览器

```javascript
function Parent(name,age){
  this.name=name;
  this.age=age;
}
Parent.prototype.say=function(){console.log("my name is "+this.name)}
function Child(name,age,sex){
  Parent.call(this,name,age); //继承属性
  this.sex=sex;
}
Child.prototype=Object.create(Parent.prototype)   //这里重写了Child的原型，并指定了Child.prototype的__proto__指向Parent.prototype
Child.prototype.walking=function(){console.log(this.sex)}
Child.prototype.constructor=Child;  //手动指定构造函数
var c=new Child("hcc",24,"男")
```

### **问题14：** `hasOwnProperty`有什么作用？ 如何使用？

> 我们知道有些属性是通过原型链获得的，不一定都是自己的，所以急需要一个方法来判定是不是属于我们的
>
> `Object.prototype.hasOwnProperty()`判定一个属性是不是属于这个对象本身

```javascript
var obj={
  name:"hcc",
  age:24,
  say:function(){}
}
obj.hasOwnProperty('name')  //true
obj.hasOwnProperty('say')  //true
obj.hasOwnProperty('toString')  //false
obj.hasOwnProperty('hasOwnProperty' )  //false
```

### **问题15：**如下代码中`call`的作用是什么?

```javascript
function Person(name, sex){
    this.name = name;
    this.sex = sex;
}
function Male(name, sex, age){
    Person.call(this, name, sex);    //这里的 call 有什么作用
    this.age = age;
}
```

>  Person.call(this, name, sex);    //这里的 call 有什么作用
>
> 1. 调用Person这个函数
>
> 2. 改变Person里面的this作用域
>
> 3. 传递erson这个函数需要的相应参数
>
>    所以这里变相的实现了**Male继承了Person的属性** 

### **问题16：** 补全代码，实现继承 

```javascript
function Person(name, sex){
    // todo ...
}

Person.prototype.getName = function(){
    // todo ...
};    

function Male(name, sex, age){
   //todo ...
}

//todo ...
Male.prototype.getAge = function(){
    //todo ...
};

var ruoyu = new Male('若愚', '男', 27);
ruoyu.getName();
```

```javascript
function Person(name, sex){
    this.name=name;
  	this.sex=sex;
}
Person.prototype.getName = function(){
    return "my name is "+ this.name;
};  
function Male(name, sex, age){
   Person.call(this,name,sex)
   this.age=age;
}
Male.prototype=Object.create(Person.prototype);
Male.prototype.constructor=Male;
Male.prototype.getAge = function(){
   return "my age is "+ this.age
}
var ruoyu = new Male('若愚', '男', 27);
ruoyu.getName();
```

