// 'use strict'

// 事实上在es6之后，不应该在用var定义任何变量，只使用const和let。
/*相关讨论：
https://www.zhihu.com/question/47456978
https://davidwalsh.name/for-and-against-let
https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75
https://medium.com/craft-academy/javascript-variables-should-you-use-let-var-or-const-394f7645c88f
https://softwareengineering.stackexchange.com/questions/274342/is-there-any-reason-to-use-the-var-keyword-in-es6
*/

// 在js中只有定义式声明，没有c或者c++式的引用声明，并且js支持重复的定义式声明，而大部分的语言不支持这种重复定义声明。c/c++支持重复的引用式声明。

// function scope() {
//     {
//         var a = 10;
//         {
//             var a = 11;
//             {
//                 var a = 20;
//             }
//         }
//     }
//
//     console.log(a);
// }
//
// scope();     // log: 10，调用的是下边的这个function
//
// function scope() {      // 覆盖了上面的同名function
//     {
//         var a = 10;
//         {
//             let a = 11;
//             {
//                 let a = 20;
//             }
//         }
//     }
//
//     console.log(a);
// }
//
// function scope1() {
//     {
//         var a = 10;
//         {
//             var a = 11;
//             {
//                 var a = 20;
//                 console.log(a);     // 20
//             }
//             console.log(a);         // 20
//         }
//         console.log(a);             // 20
//     }
// }
//
// scope1()
//
// var b = 1;
//
// function scope2() {
//     var b = 2;
//     {
//         var b = 3;
//     }
// }
//
// scope2();
//
// console.log(b);
//
// function test() {
//     var x = 1;
//     for (var i = 0; i < 5; i++) {
//         setTimeout(function() {
//             console.log(i + x);
//         }, 0);
//     }
// }
//
// test();
//
// function test1() {
//     var x = 1;
//     for (var i = 0; i < 5; i++) {
//         setTimeout(function(i) {
//             return function() {
//                 console.log(i + x);
//             }
//         }(i), 0);
//     }
// }
//
// test1()
//
// function test2() {
//     // 可以认为只有var声明的变量会被提升，并且可以被重复声明，存在各种语言缺陷，let关键字定义的
//     // 变量与传统语言定义变量的方式是一样的，不会被提升，也不能被重复定义。看起来是这样的，并且这样
//     // 理解就好了，虽然js的编译器还更深一步，其实是对let声明的变量，生成了“临时死区”，其实这些
//     // 都是为了解决es6之前var定义变量的本身语言机制的问题。在es6之后，就可以不用考虑这种情况了，并且
//     // 在代码中也不应该出现var关键字，该关键字应该被废弃。
//     let b = 20;
//
//     // var b = 30;  // error
//     // let b = 30;  // error
// }
//
// test2();
//
// let x = 3333;
// console.log(x);

// let let = 444;       // Syntax Error, 报错
// let const = 323;     // Syntax Error, 报错
// var let = 123;     console.log(let);      // right, output: 123
// var const = 32342;         // Syntax Error,
// const let = 2323;           // Syntax Error,
// const var = 1212;        // Syntax Error

/*
var使用不正确造成的严重问题：
function test() {
    var x = 1;
    for (var i = 0; i < 5; i++) {
        setTimeout(function() {
            console.log(i + x);
        }, 0);
    }
}

// output： 6 6 6 6 6而不是1 2 3 4 5
使用IIFE机制后
function test() {
    var x = 1;
    for (var i = 0; i < 5; i++) {
        setTimeout(function(i) {
            return function() {
                console.log(i + x);
            }
        }(i), 0);
    }
}
*/

// function foo() {
//     console.log(a);
// }
//
// function bar() {
//     var a  = 3;
//     foo();
// }
//
// var a = 2;
// bar();
