var obj = {
    a: 1
}

var obj1 = {
    c: 2
}

with(obj) {
    a = 3
}

console.log(obj.a);     // 3

console.log(obj1.a);    // undefined

with(obj1) {
    a = 4
}

console.log(obj1.a);  // undefined

console.log(a);     // 4

console.log(global.a);      // 4

console.log(global.a === a);    // ture

/*
解释：
MDN对with的解释
JavaScript looks up an unqualified name by
searching a scope chain associated with the
execution context of the script or function
containing that unqualified name. The 'with'
statement adds the given object to the head
of this scope chain during the evaluation of
its statement body. If an unqualified name
used in the body matches a property in the
scope chain, then the name is bound to the
property and the object containing the property.
Otherwise a ReferenceError is thrown.

unqualified name与qualified name的解释：
function foo() {
    a = 10;             // a是一个unqualified name
    window.b = 100;     // window是一个unqualified name, b是一个qualified name
}

foo();
总结：
在JavaScript中，当引擎对一个变量名进行查找时，通过两种方式进行查找，
一种是对象属性访问规则，一种是词法作用域查找，对于上面function中的a进行查找时
执行的是LHS的词法作用域查找，词法作用域查找只会查找一级标识符（也就是unqualified name）
，比如上述的a标识符，如果代码中使用了类似window.b这种通过"."运算符的标识符b，词法作用域
只会试图查找window标识符，通过标识符找到变量后，因为有"."运算符，所以后边对b标识符的查找
会交于对象属性访问规则来接管对b标识符的属性访问。所谓的qualified name实质上就是类似的间接
访问，相当于通过"."对相应的标识符加了限制（类似C++中的命名空间的概念）。

with原型
with(expression) {
    statement
}
通过MDN对with语义的解释我们可以知道，with会将expression加入到当前代码的作用域，然后在
当前代码作用域中执行statement语句。因此，对于以下代码
var obj1 = {
    b: 2
}

with(obj1) {
    a = 4
}
在执行with语句时，因为a是unqualified name，因此会首先对a进行词法作用域的LHS查找，obj1中并没有定义a，
按照with的语义，会在当前作用域链向上继续查找，因此到全局查找，因为是非严格模式，全局作用域中没有此变量，因此
会在全局作用域中定义一个a变量，而不是在obj1中定义该变量，因此
console.log(obj1.a);打印undefined

console.log(a); 打印在全局作用域中隐式定义的变量a的值4
console.log(window.a) 与上边是一样的
window.a === a   // ture
*/
