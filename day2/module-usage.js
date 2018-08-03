/*
Node下使用ES6的import和export
Node 环境必须在 9.0以上
不加loader时候，使用import/export的文件后缀名必须为*.mjs（下面会讲利用Loader Hooks兼容*.js后缀文件）
启动必须加上flag --experimental-modules
文件的import和export必须严格按照ECMAScript Modules语法
ECMAScript Modules和require()的cache机制不一样
*/

var obj = {
    a: 1
}
var obj2 = {
    b: 2
}

module.exports = obj;    // { a: 1 }
module.exports = obj2;   // { b: 2}

exports.obj_ref = obj;    // { obj: { a: 3 } }
exports.obj2_ref = obj2;


module.exports = exports.obj = obj;
exports.obj = module.exports = obj2;

exports.objs = {
    obj_ref: obj,
    obj_ref: obj2
}


/*
编写上述代码后，在另一个文件中执行：
const obj-ref = require('./module-ref');
console.log(obj-ref);


利用exports.name = variable的形式能够导出多个标识符，
实质上是将exports看成一个Object，然后添加了exports的多个属性，在
require的那一头，将exports的这个Object，这里边所有的都是引用，如果在这个模块
中修改了值，那么会对影响其他所有在修改了值之后引用了这个模块代码时的值，也就是说
造成的副作用是全局且立即生效的。但是如果另外一个文件再次之后用重新import了初始的
源模块，因为此时，会重新进行初始化工作，所以，在引用的模块中，值又变成了初始值。
例如说，A.js有如下代码：
module.exports = {
    x: 1
}

B.js代码：
const a_ref = require('./A.js');
a_ref.x = 10;


C.js 代码：
const a_ref = require('./A.js');
console.log(a.ref);
http.request('baidu.com' function() {...});
// 异步操作，执行了B.js代码
console.log(a_ref); // 输出{x: 10}

针对上述代码，如果此时，执行环境先执行了C，一定要记住，require是引用，而非copy，
但是，重新执行require，或者import后，会重新执行源模块代码。因此会重新初始化环境，
这些影响都是立即并且全局影响的。



利用exports.name的形式导出多个变量用法如下：
exports.obj_ref = obj;    // { obj: { a: 3 } }
exports.obj2_ref = obj2;

在另一个文件中引用模块的代码如下：
const obj-ref = require('./module-ref');
console.log(obj-ref);           // 打印结果：{ obj_ref: { a: 1 }, obj2_ref: { b: 2 } }



利用module.exports在一个文件中只能导出一个对象，但是可以利用
module.exports = {
    obj_ref: obj,
    obj2_ref: obj2
}
这种形式导出该模块中的多个变量。
在另一个文件中引用模块的代码如下：
const obj-ref = require('./module-ref');
console.log(obj-ref);           // 打印结果：{ obj_ref: { a: 1 }, obj2_ref: { b: 2 } }


注意在同一个文件中同时使用这两种方式的时候，不管这两种方式代码的先后顺序，最后的输出都是以最后一次module.exports的执行结果，
也就是说以下代码序列，
module.exports = obj;    // { a: 1 }
module.exports = obj2;   // { b: 2}

exports.obj_ref = obj;    // { obj: { a: 3 } }
exports.obj2_ref = obj2;

module.exports = exports.obj = obj;
exports.obj = module.exports = obj2;           // 只有该行代码生效

exports.objs = {
    obj_ref: obj,
    obj_ref: obj2
}

在另一个文件中引用模块的代码如下：
const obj-ref = require('./module-ref');
console.log(obj-ref);           // 打印结果：{b: 2}
*/
