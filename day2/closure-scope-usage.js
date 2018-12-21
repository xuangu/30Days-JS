// let obj = {
//     id: "awesome",
//     cool: function coolFn() {
//
//         var self = this;
//         // console.log(this);  // 在node中打印timeout，在浏览器打印window
//         // console.log(self);  //
//         function nestedCoolFun() {
//             console.log("nested:====");
//             // console.log(this);      // node和浏览器中都打印全局
//             // console.log(this.id);   // undefined
//             // console.log(self);      // 在node中打印timeout，在浏览器打印window
//             console.log(self.id);   // 打印undefined
//         }
//
//         // return nestedCoolFun;
//         nestedCoolFun();
//     }
// };
//
// let id = "not awesome";
//
// // setTimeout(obj.cool(), 100);
//
// // setTimeout(obj.cool, 100);
//
//
// let obj2 = {
//     id: "obj2",
//     foo: function () {
//         const self = this;
//
//         // setTimeout(function() {
//         //     console.log(self.id);    // obj3, obj4
//         // }, 100);
//
//         setTimeout(() => {
//             console.log(this.id);       // obj3, obj4
//         }, 100)
//     }
// }
//
// // 以上代码说明，闭包确实是捕获了其外围作用域，但是需要注意的是，外围作用域中的this是运行时确定的，因此在捕获的值是外围函数调用时this取得的运行时值。
//
// let obj3 = {
//     id: "obj3"
// }
//
// obj2.foo.call(obj3);
//
// let obj4 = {
//     id: "obj4"
// }
//
// obj2.foo.call(obj4);


function makeAddr(x) {
    return function add(y) {
        console.log(x);
        x++;
        console.log(x);
        console.log(x + y);
    }
}


let addOne = makeAddr(1);
addOne(2);  // 1 2 4
addOne(41); // 2 3 44
