// var x = 200, y = 300, z = 100;
// var o1 = {x: {y: 42}, z: {y: z}};
//
// console.log(x, y, z);
// console.log(o1);
//
// ({y: x = {y: y}} = o1);
// console.log(x, y, z);


// ({a, b}) = {a: 1, b: 2};
// console.log(a, b);


// var {a, b} = {a: 1, b: 2};
// console.log(a, b);

// {a, b} = {a: 1, b: 2};

// var {a = 0, b = 0} = {a: 1, b: 2};
// // 是
// var {a: a = 0, b: b = 0} = {a: 1, b: 2}
// // 的省略写法

// var defaults = {
// 	options: {
// 		remove: true,
// 		enable: false,
// 		instance: {}
// 	},
// 	log: {
// 		warn: true,
// 		error: true
// 	}
// };
//
// var config = {
// 	options: {
// 		remove: false,
// 		instance: null
// 	}
// };
//
// // merge `defaults` into `config`
// {
// 	// destructure (with default value assignments)
// 	let {   // 这里的let用法与 var {a, b} = {a: 1, b: 2}是类似的，可以用let、var和const解构
// 		options: {
// 			remove = defaults.options.remove,
// 			enable = defaults.options.enable,
// 			instance = defaults.options.instance
// 		} = {},
// 		log: {
// 			warn = defaults.log.warn,
// 			error = defaults.log.error
// 		} = {}
// 	} = config;
//
// 	// restructure
// 	config = {
// 		options: { remove, enable, instance },
// 		log: { warn, error }
// 	};
// }


// 实际声明的A和B两个变量，而不是a，b
var {a: A, b: B} = {a: 1, b: 2}

console.log(A, B);

// console.log(a, b);
