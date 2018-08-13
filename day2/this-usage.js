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

setTimeout(obj.cool.bind(obj), 100);        // 打印 awesome

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
        console.log(this);  // 在node中打印timeout，在浏览器打印window
        console.log(self);  //
        function nestedCoolFun() {
            console.log("nested:====");
            console.log(this);      // node和浏览器中都打印全局
            console.log(this.id);   // undefined
            console.log(self);      // 在node中打印timeout，在浏览器打印window
            console.log(self.id);   // 打印undefined
        }

        nestedCoolFun();
    }
};

let id = "not awesome";

setTimeout(obj.cool, 100);


代码片段3
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
        nestedCoolFun.bind(this);
        nestedCoolFun.bind(obj);
        nestedCoolFun();
    }
};

obj.cool();


// 代码片段4
let obj = {
    id: "awesome",
    cool: function coolFn() {

        var self = this;
        console.log(this);  // 打印obj
        console.log(self);  //
        function nestedCoolFun() {
            console.log("nested:====");
            console.log(this);      // 打印全局
            console.log(this.id);   // undefined
            console.log(self);      // 打印obj
            console.log(self.id);   // 打印awesome
        }

        nestedCoolFun();
    }
};

let id = "not awesome";

setTimeout(obj.cool.bind(obj), 100);        // 从代码片段2、3、4、来看，不管外边调用是什么样子的，对于内嵌的传统的函数声明来说，其内嵌函数内部的this永远指向全局对象


// 代码片段5： 使用箭头函数，可以让内嵌的函数执行永远正确的绑定到其所在的作用域。
let obj = {
    id: "awesome",
    cool: function coolFn() {

        var self = this;
        console.log(this);  // 打印obj
        console.log(self);  //
        var nestedCoolFun = () => {
            console.log("nested:====");
            console.log(this);      // 打印obj
            console.log(this.id);   // awesome
            console.log(self);      // 打印obj
            console.log(self.id);   // 打印awesome
        }

        nestedCoolFun();
    }
};

let id = "not awesome";

setTimeout(obj.cool.bind(obj), 100);


// 代码片段6
let obj = {
    id: "awesome",
    cool: function coolFn() {

        var self = this;
        console.log(this);  // 打印obj
        console.log(self);  //
        var nestedCoolFun = () => {
            console.log("nested:====");
            console.log(this);      // 打印obj
            console.log(this.id);   // awesome
            console.log(self);      // 打印obj
            console.log(self.id);   // 打印awesome
        }

        nestedCoolFun();
    }
};

let id = "not awesome";

setTimeout(() => {
    obj.cool();
}, 100);

从上述代码来看，执行引擎根据不同的运行场景对函数内部的this赋予不同的上下文，对于全局函数来说，其this指针在严格模式下指向当前环境的全局对象，在node中，某个文件的全局对象默认是
{}空对象，在浏览器中是window。对于某个对象的方法来说，当用某个对象去调用该方法时，node与浏览器的表现形式也是不一样的，当该对象是直接处于全局环境下对其方法进行调用时，浏览器和node
都会讲该对象作为该函数的this值传进去，但是node和浏览器都不会将this传递给该函数中嵌套的函数中去（前提是该嵌套函数是以非箭头函数的形式定义的），以非箭头函数形式定义的内嵌函数中this永远
指向全局的对象，在node中是global，在浏览器中是window。事实上node分为两种全局对象，一种是模块（文件）的全局对象，默认是{}空对象，一种是node的全局对象，用global标识，在node中的文件中
如果是在非函数的环境下使用this变量，this变量指向的是一个空对象，如果是在函数中使用this指向的全局对象。代码片段如下：
console.log(this);      // 空对象
function baz() {
    console.log(this);      // 全局global对象
}
baz();

如果是在对象的方法中this，this指向其运行时环境，有可能是对象自己，也有可能是运行方法时所在的上下文，例如setTimeout中传递的this在node环境下就是timeout对象，在浏览器环境下是window，注意这里说的都是方法。
这里说的方法是特指该函数是对象的一个属性。函数泛指任何不是一个对象的属性的函数，例如全局函数和方法的内嵌函数等等，都是函数（箭头函数不在此函数讨论范围中），函数中的this一定是指向全局global对象的。箭头函数中的this一定
都是绑定到其定义的词法作用域的，而不是其运行时的上下文环境，是其定义时的上下文环境。另外bind函数只能绑定一层，对于内嵌函数中this不管用，见代码片段4。另外还需要注意绑定规则仅仅对方法管用，对于函数不管用，考虑代码片段7：

代码片段7：
var obj = {
    id: "awesome"
}

function foo() {
    console.log(this);          // global对象
    console.log(this.id);       // undefined
}

foo.bind(obj);
foo();      // undefined


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


// let obj = {
//     id: "awesome",
//     cool: function coolFn() {
//
//         var self = this;
//         console.log(this);  // 打印obj
//         console.log(self);  //
//         function nestedCoolFun() {
//             console.log("nested:====");
//             console.log(this);      // 打印全局
//             console.log(this.id);   // undefined
//             console.log(self);      // 打印obj
//             console.log(self.id);   // 打印awesome
//         }
//
//         nestedCoolFun();
//     }
// };
//
// let id = "not awesome";
//
// setTimeout(obj.cool.bind(obj), 100);
//
//
//
// let obj = {
//     id: "awesome",
//     cool: function coolFn() {
//
//         var self = this;
//         console.log(this);  // 打印obj
//         console.log(self);  //
//         var nestedCoolFun = () => {
//             console.log("nested:====");
//             console.log(this);      // 打印obj
//             console.log(this.id);   // awesome
//             console.log(self);      // 打印obj
//             console.log(self.id);   // 打印awesome
//         }
//
//         nestedCoolFun();
//     }
// };
//
// let id = "not awesome";
//
// setTimeout(obj.cool.bind(obj), 100);

// console.log(this);
// function baz() {
//     console.log(this);
// }
// baz();

var obj = {
    id: "awesome"
}

function foo() {
    console.log(this);          // global对象
    console.log(this.id);       // undefined
}

foo.bind(obj);
foo();      // undefined
