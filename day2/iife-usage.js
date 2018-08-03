/*
iife: 立即执行函数表达式
两种等价形式：[foo]表示函数名是可选的
(function [foo]() {...})();
(function [foo]() {...}());

// 这个代码会编译错误，因为编译器会认为这是一个函数声明，而不是一个函数表达式，而
// 函数声明是不能直接做匿名调用的。
function foo(){
    let a = 1;
}();   // 这种方式是不合法的。

// 在这行代码中fooName被识别为一个函数表达式，而不是函数声明，变量foo的结果是fooName函数的执行结果
var foo = function fooName() {

}();

// 在下述代码中fooName同样会被认为是一个函数表达式，变量foo是绑定到这个函数的变量。
var foo = function fooName() {

};

// 注意nestFun标识符任然会被编译器识别为一个函数表达式，而不是函数声明。
function fun() {
    nestFun()   // runtime error，RHS出错，ReferenceError，如果下边没有对fun()的调用，编译能通过，这有可能是编译器做的优化，如果有对fun的调用就会出错。
                // 原因是nestFun是一个函数表达式，没有进行变量提升，nestFun标识符仅能在其函数体中访问，nestFun是被绑定到函数体内的
    return function nestFun() {
        console.log("nestFun");
    }
}

fun()

// 判断是函数声明还是函数表达式最简单的方法是看function关键字出现在表达式语句的位置，
// 并且如果function关键字是表达式语句的第一个词，那么就是一个函数声明，否则就是一个函数表达式。
// 注意区分以下情况
foo();
var a = 1, function foo() {console.log("hello");}   // Syntax error, js不允许这种做法

foo();
var a = 1; function foo() {console.log("hello");}  // 注意，其实，因为有;风格，所以function foo()这个已经是一条新的表达式语句了。

function fun() {
    return 1;   // 注意这是一个return语句，语句组成是由return关键自开始的。
}
// 针对上述语句，因此对于以下代码来说定义foo的那条语句是一个return语句，表达式的开始是以return开始，而不是function关键字，所以foo是一个函数表达式
function fun() {
    return function foo() {

    }
}

*/
// function fun() {
//     nestFun()   // runtime error，RHS出错，ReferenceError，如果下边没有对fun()的调用，编译能通过，这有可能是编译器做的优化，如果有对fun的调用就会出错。
//                 // 原因是nestFun是一个函数表达式，没有进行变量提升，nestFun标识符仅能在其函数体中访问，nestFun是被绑定到函数体内的
//     return function nestFun() {
//         console.log("nestFun");
//     }
// }

// fun()
// function func() {
//     for (let i = 0; i < 5; i++) {
//         setTimeout(function timerHandler() {
//             console.log(i);
//         }, i * 1000);
//     }
// }
//
// func()

var a = 20;

function args_pass_mechanism(a) {
    a = 10;
}

args_pass_mechanism();
console.log(a);
