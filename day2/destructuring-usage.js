// 对象解构

// 解构语法如下：左边的let {a, b, c}并不是定义了一个对象，而是一种语法糖，相当于在全局变量中声明了a,b,c三个变量，与如下代码等价：
let a; let b; let c;
let tmp = {
    a: 1,
    b: 2,
    c: 3
}

a = tmp.a;
b = tmp.b;
c = tmp.c;
// 等价于以下代码
let {
    a,
    b,
    c
} = {
    a: 1,
    b: 2,
    c: 3
};

console.log(a); // 1

let obj = {
    a, b, c
}

console.log(obj.a); // 1

console.log({a,b,c}.a); // 1

obj.a = 10;

console.log({a,b,c}.a); // 1

console.log(obj.a); // 10

a = 100;
console.log({a,b,c}.a);  // 100
