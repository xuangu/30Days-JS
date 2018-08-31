// function hello(who) {
//     return "hello" + who;
// }
//
// export {hello};

console.log(this);  // 在node实现的es6模块中（ node --experimental-modules bar.mjs），输出undefined；使用node bar.mjs输出{}

// console.log(this === module.exports);
//
// console.log(module.exports);   在node的es6 module实现中module.exports没有定义

// 以下代码，在node实现的module中，module中的function调用中的this会被绑定到module环境下的this。即undefined的

let bar = function () {
  if (this === global) {
    console.log("global");
  } else {
    console.log(this);
  }
};

bar();

console.log(this);
function foo(zz) {
    if (this === global) {
      console.log("global");
    } else {
      console.log(this);
    }
    zz.test();

    let mm = () => {
      if (this === global) {
        console.log("global");
      } else {
        console.log(this);
      }
    };

    mm();
}

// this.num = 10;

// 传递给函数的实参的作用域是写该函数调用语句所处的作用域

foo({
    // test继承在外部对象的this，而外部对象的this遵守词法作用域的查找规则，指向本模块的module.exports对象，注意，根本是这个实参对象的父作用域是module.exports，而不是foo函数作用域。
    xxxx: 10000,
    test: () => {
      if (this === global) {
        console.log(this);
      } else {
        console.log(this);
      }
    }
});
