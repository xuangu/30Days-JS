var arrLike = {
	length: 3,
	0: "foo",    // 这里边有隐式的强制类型转换， property 0，被强制转换成了"0"， 并可以通过[]的访问形式访问。
	1: "bar"
};

console.log(arrLike["0"]);

var o = {
    "0": "foo",
    "1": "bar"
}

console.log(o["1"]);
// console.log(o."1");   // 语法错误
// console.log(o.1);    // 语法错误


var sym1 = Symbol("abc")
var sym2 = Symbol("abc")

console.log(sym1);

console.log(sym2);

console.log(sym1 == sym2);   // false
