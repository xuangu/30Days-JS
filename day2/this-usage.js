/*
1、this是函数调用时，由js运行环境传递给函数的函数在调用上下文。对于普通函数的调用，这个this是自动绑定的调用环境的上下文。
因此对于如下代码
var obj = {
    id: "awesome",
    cool: function coolFn() {
        console.log(this.id);
    }
}

var id = "not awesome";
obj.cool();

setTimeout(obj.cool, 100);  // 在浏览器中输出not awesome, 在node中输出undefined

let obj = {
    id: "awesome",
    cool: function coolFn() {
        console.log(this.id);
    }
}

let id = "not awesome";

setTimeout(obj.cool, 100);  // 在浏览器中输出undefined, 在node中输出undefined

let obj = {
    id: "awesome",
    cool: function coolFn() {
        // console.log(this);

        console.log(this.id);
    }
};

var id = "not awesome";

setTimeout(obj.cool.bind(this), 100);   // 在浏览器中输出not awesome, 在node中输出undefined


let def = "abc"; console.log(this.def)     // 在浏览器和node环境中都是undefined
this === window                         // 在浏览器环境中true
var def = "eeefff"; console.log(this.def);      // 在浏览器环境中是 eeefff，在node环境中是undefined的。


###
在node环境中，每个文件的全局this是一个空的Object：{}，在浏览器环境中，全局变量是window。
在node环境中，不管是用var还是用let定义的变量都不会自动加入到该全局变量中，
但是，在浏览器环境中，用var定义的变量会自动加入到全局的window对象中，而用let定义的变量并不会自动加入到全局的window环境中。

以下代码在node中的输出（在node中全局变量用global表示）
let a = "a";
console.log(global.a);      // undefined

var b = "b";
console.log(global.b);   // undefined
console.log(global === this);    // false
console.log(global);       // {Buffer: {}...}
console.log(this);  // {} 空对象


以下代码在浏览器中的输出：（在浏览器中全局变量用window表示）
let a = "a";
console.log(window.a);      // undefined

var b = "b";
console.log(window.b);   // b
console.log(window === this);    // false
console.log(window);       // {Buffer: {}...}
console.log(this);  // {Buffer: {}...}

通过以上两种不同的环境我们可以看出，用let定义的变量，不管是在哪个环境下，都不会自动为全局变量创建同名的属性，并且绑定到该变量上，
但是用var创建的变量，在node环境中既不会自动绑定到this中，也不会绑定到全局变量中。但是在浏览器环境中，用var创建的变量则会被绑定到全局
变量中，并且在全局中this和global是同一个对象的引用。在node中某一个文件的全局this和global并不是同一个对象的应用。明确这个不同之后，
在去理解上述的很多代码就会容易一些，因此如果想正确的在调用类似setTimeout这种函数使用一个对象中定义的方法（该方法内部使用this来对该方法所属对象的属性进行引用），则需要在
调用该方法时，使用bind方法，并且把调用该方法的对象变量名传入bind方法中。

let obj = {
    id: "awesome",
    cool: function coolFn() {
        console.log(this.id);
    }
};

let id = "not awesome";

setTimeout(obj.cool.bind(obj), 100);

针对上述问题，更进一步的研究，请仔细思考以下代码片段：
代码片段1：
let obj = {
    id: "awesome",
    cool: function coolFn() {

        var self = this;
        console.log(this);  // 打印obj对象本身
        console.log(self);

        function nestedCoolFun() {
            console.log("nested:====");
            console.log(this);      // 打印全局
            console.log(this.id);   // undefined
            console.log(self);      // 打印obj对象本身
            console.log(self.id);   // 打印awesome
        }

        nestedCoolFun();
    }
};

let id = "not awesome";

obj.cool();   // this相当于是一个动态作用域，调用时，function中的this指向的是执行function的上下文环境，而不是定义该function的上下文作用域。

代码片段2
let obj = {
    id: "awesome",
    cool: function coolFn() {

        var self = this;
        console.log(this);  // 打印timeout
        console.log(self);  //
        function nestedCoolFun() {
            console.log("nested:====");
            console.log(this);      // 打印全局
            console.log(this.id);   // undefined
            console.log(self);      // 打印timeout对象
            console.log(self.id);   // 打印undefined
        }

        nestedCoolFun();
    }
};

let id = "not awesome";

setTimeout(obj.cool, 100);


*/













// obj.cool();

// setTimeout(() => {
//     obj.cool();
// }, 100);



// var obj = {
//     id: "awesome",
//     cool: function coolFn() {
//         // console.log(this);
//
//         console.log(this.id);
//     }
// };
//
// var id = "not awesome";
//
// setTimeout(obj.cool.bind(obj), 100);

// obj.cool();

// setTimeout(() => {
//     obj.cool();
// }, 100);

// console.log("end");

// this.id = "xxx";
// console.log(this);
//
// setTimeout(obj.cool.bind(this, 100);
