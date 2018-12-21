// var p = {
//     then: function(cb) {
//         cb(42);
//         return {
//             then: function(cb) {
//                 cb(43);
//                 return {
//                     then: function(cb) {
//                         cb(44);
//                         // return {...}  递归返回
//                     }
//                 }
//             }
//         }
//     }
// }
//
// // p.then.prototype.then = function(cb) {
// //         cb(43);
// // }
//
// p.then(function fullfilled(val) {
//     console.log(val);
// }, function rejected(err) {
//     console.log(err);
// }).then(function fullfilled(val) {
//     console.log(val);
// }, function rejected(err) {
//     console.log(err);
// })


// function delay(time) {
//     return new Promise( function(resolve, rejected) {
//         setTimeout( resolve, time );   // 因为调用resolve函数没有传递参数，所以默认为undefined的，并且将undefined传递给then方法的fullfillment回调方法的参数中。关于Promise这方面的语义在MDN文档上有定义描述
//     } );
// }
//
//
// delay( 100 )
// .then( function sep2() {
//     console.log( Date.now() );
//     console.log( "setp 2 after 100ms" );
//     return delay( 200 );
// } )
// .then( function sep3(res) {
//     console.log( Date.now() );
//     console.log( "step 3 after 200ms" );
//     console.log( (typeof res) );  // undefined
// } )


// var pr1 = null;
//
// var pr2 = new Promise( function(resolve, reject){
//     pr1 = Promise.resolve("ops");
//     resolve(pr1);   // 不是直接返回pr1，返回的是一个新的Promise，该Promise的状态是pr1的状态。
// } )
//
// console.log(pr1);
// console.log(pr2);
//
// console.log(pr1 === pr2);    // false

//
// pr1.then( function(msg){
//     console.log('fullfilled ' + msg);
// },  function(err) {
//     console.log('reject ' + err);
// } )
//
//
// pr2.then( function(msg){
//     console.log('fullfilled ' + msg);
// },  function(err) {
//     console.log('reject ' + err);
// } )
//
//
// var pr3 = Promise.resolve("pr3");
//
// var pr4 = Promise.resolve(pr3);   //
//
// console.log(pr3 === pr4);   // true  这种调用方法说明Promise.resolve确实是直接返回的原值


// var pr1 = new Promise(function(resolve, reject) {
//     resolve( new Promise( function(resolve, reject) {
//         setTimeout( function() {
//              resolve("timeout")
//          }, 1000 );
//     } ) );
// })
//
// console.log(Date.now());
//
// pr1.then(function(msg) {
//     console.log(Date.now());
//     console.log(msg);
// })


// var pr1 = new Promise( function(resolve, reject) {
//     resolve('pr1');
// } )
//
//
// pr1.then( function(msg) {
//     console.log(msg);
// } )
// .then( function(msg) {
//     console.log(typeof msg);   // undefined
// } );

// var fn = function() {
//     console.log('function');
//     // console.log(this.t);
// }
//
// // Function.apply.bind(fn, null)()  == fn.apply(fn)
// Function.apply.apply.apply.apply(fn, null)  //
// Function.apply.apply.apply(fn, null)

// fn.t = 'b'

// fn.apply(fn)

// var ret = Function.apply.bind(fn,null);
// ret()

// console.log(Function.apply);

// fn()
