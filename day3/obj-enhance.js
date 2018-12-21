// let a = 1;
// let obj = {a};

// var a = [1,2,3];
// var obj = {a};
//
// console.log(obj.a, a);
//
// obj.a = 2;
//
// console.log(obj.a, a);

// var o = {
//     a: 1,
//     a: 2
// }
//
// console.log(o.a);

// var o = {
//     $$a: 1   // $$合法的标识符
// }
//
// console.log(o.$$a);

const obj = ({parm}) => ({
    type: 'obj',
    parm: parm
})


console.log(obj({parm: 1}));
