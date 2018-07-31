// 'use strict'
// 注意如果要在node中使用es6的import语法，有两种方式，一种是用babel-node，需要配置项目的.babelrc文件，而是利用node的--experiment选项
import http from 'http';

let promise = new Promise(function(resolve, rej) {
  console.log('before request');
  // resolve("hello world");
  // 注意以host为key值的url，不能加http前缀
  http.get({host: 'baidu.com'}, function(res) {
    res.on('data', (data) => {
      console.log(data.toString());
      resolve('request baidu success');
    });
  });
});

console.log('after promise');

promise.then((value) => {
    console.log('success');
    console.log(value);
  }, (rej) => {
    console.log('err');
  },
);

console.log('after then');

//

// import http from 'http';
// http.request('http://localhost:3000/', (res) => {
//   res.setEncoding('utf-8');
//   console.log(res.toString());
// });

// 在访问本机代码时不能在localhost前加http://
// });


// export var hello = 'hello';
// export var world = 'world';
//
// var obj = {
//   fun(a, b, c) {
//     console.log(a, b, c);
//   },
//
//   // 这种语法在es6中也是不对的
//   // function foo() {
//   //   console.log("foo");
//   // }
//
//   // 这种语法在es6中不通过
//   sugarFun : function(a, b, c) {
//     console.log(a, b, c);
//   },
//
//   foo1 : function() {
//     console.log("foo1");
//   }
// }
//
// function fun(a, b, c) {
//   console.log(a, b, c);
// }
//
// // 这种语法也报错
// // fun() {
// //   console.log("fun");
// // }
//
// // 这种语法在es6中不通过
// // var c = sugarFun : function(a, b, c) {
// //   console.log(a, b, c);
// // }
//
// var foo = function (a, b, c) {
//   console.log("foo");
// }
//
// var foo1 = function foo1(a, b, c) {
//   console.log("foo1");
// }
//
// foo();
// foo1();
//
// obj.fun(1,2,3);
// // obj.sugarFun(1,2,3);
//
// fun(1,2,3);
// // sugarFun(1,2,3);
//
// function nullBind(a, b) {
//   console.log(a + b);
//   // console.log(this);
//   console.log("nullBind");
// }
//
// console.log(nullBind.toString());
// console.log(nullBind.valueOf());
//
// nullBind.bind(null, 1, 2)();

// var s = "test";
// s.len = 4;
// var t = s.len;
// console.log(t); // undefined

// var S = new String(s);
// S.len = 3;
// var tS = S.len;
// console.log(tS); // 3
//
// function e(s) {
//   // 在function内部创建了s的局部变量
//   eval("s = 'abc'");
//   console.log(s);
// }
//
// e(s);
// console.log(s);
//
// eval("s = 'abc'");
// console.log(s);
//
// switch (s) {
//   case "test":
//     console.log("test");
//     break;
//   case "abc":
//     console.log("abc");
//     break;
//   default:
//     console.log("default");
// }
//
// if ("abc" === "abc") {
//   console.log("equal");
// }
//
// // 定义了一个函数，fooName是一个变量，指向该函数
// function fooName() {
//   console.log("fooName");
//   fooName.a = "func props"
//   console.log(fooName.a);
// }
// fooName();
//
// fooName = "string";
//
// console.log(fooName);
//
//
// var varFunc = function defExpFunc() {
//   console.log("defExpFunc");
// }
// // 错误语法，defExpFunc仅仅在defExpFunc方法体中有定义
// // defExpFunc();   // 报defExpFunc undefined
//
// function func() {
//   'use strict';
//   console.log(this.toString());
//   console.log(this);
// }
// // func.call(undefined); // 执行错误，因为this指向了undefined，而对undefined或null的任何属性存取访问都会报错
// func.call({x: 1});
//
// // bind返回的函数没有prototype，因此条件为假
// if (func.bind({x: 1}).prototype) {
//   console.log("abc");
// }
//
// if (func.prototype) {
//   console.log("efg");
// }
//
// console.log(func.prototype);  // func {}
// console.log([1,2].prototype);  // undefined
// console.log({x: 1,y: 2}.prototype); // undefined
// console.log(Object.prototype); // {}
// var a = {x: 1, y: 2};
// console.log(a.prototype);
