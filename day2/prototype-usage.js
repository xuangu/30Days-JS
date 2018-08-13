let obj = {
    a: 1
};

let anObj = Object.create(obj);

console.log(anObj.__proto__ === obj);

let bObj = {};

function Foo(name) {
    this.name = name;
}
Foo.prototype.fooLog = function () {
    console.log("Foo");
}

Foo.selfFooLog = function () {
    console.log("self foo log");
}

let fNObj = new Foo();

let fCObj = Object.create(Foo);

console.log('====');
console.log("1:");
console.log(Foo.__proto__);     // [Function]
console.log("2:");
console.log(Foo.prototype);     // Foo {}
console.log("3:");
console.log(Object.getPrototypeOf(Foo));    // [Function]
console.log("4:");
console.log(fNObj.__proto__);   // Foo {}
console.log("5:");
console.log(fCObj.__proto__);   // [Function Foo]
console.log("6:");
console.log(fCObj.__proto__.__proto__);   // [Function]
console.log("7:");
console.log(Object.getPrototypeOf(fNObj));  // Foo {}
console.log("8:");
console.log(Object.getPrototypeOf(fCObj));  // [Function: Foo]
console.log("9:");
console.log(fCObj.__proto__ === Foo.__proto__); // false
console.log("10:");
console.log(fNObj.__proto__ === fCObj.__proto__); // false

// console.log(JSON.stringify(fCObj.__proto__));  // undefined

// fCObj.fooLog();     // type error
// fCObj.selfFooLog();     // self foo log

/*
    对以上代码总结：new关键字因为只能与函数一起使用，并且JavaScript对这种用法有固定的解释，就是将新创建的对象的__proto__属性指向函数的.prototype属性
    函数的.prototype属性与函数的.__proto__属性是不一样的，完全指向不同的东西。利用Object.create方法固定将新创建的对象的.__proto__属性指向Object.create()
    方法中的参数中。
*/

console.log('====');

function Bar(name, label) {
    Foo.call(this, name);
    this.label = label;
}

Foo.type = "type Bar";

Foo.prototype.proType = "proType Bar";

Bar.prototype = Object.create(Foo.prototype);

let bar = new Bar('a', 'this is bar');
// 将bar对象的__proto__属性设置为Bar.prototype对象的引用，

// console.log(bar.type);
// console.log(bar.name);
console.log(bar.type);      // undefined
console.log(bar.proType);   // proType

// 函数有一个属性就是prototype,而普通的对象要想访问其原型，需要通过__proto__属性，或者Object.getPrototypeOf方法
console.log(Foo.prototype.__proto__ === Object.prototype); // true
console.log(Foo.prototype === Function.prototype); // false
console.log(Function.__proto__);
console.log(Function.prototype);

let t = Foo.prototype;
while(t !== Object.prototype) {
    console.log(t);
    t = Object.getPrototypeOf(t);
}
