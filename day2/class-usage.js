class cl {
    // a: 1,
    // let b = 2
    constructor() {
        this.a = 1          // 在目前的es6中，只能在constructor中定义实力属性，在es7中，可以将实力属性定义在方法外边，与方法平级，目前babel编译器可以支持这种
    };          // 目前es6中，只支持定义方法，不支持直接定义属性，方法直接使用方法名和()组成，用“;”分割，不能用","也不能加function关键字

    foo() {
        console.log('foo' + this.a);
    };

    baz() {
        console.log('baz');
    };
}

let obj = new cl();
obj.foo();

// 在es7和babel中可以将上述代码写成
class cl {
    // a = 1;      // 支持定义属性
    // static scl = 10;    // 指定定义类静态变量
    //
    // foo() {
    //     console.log(this.a);
    //     console.log(cl.scl);
    // }

    a = a;
}
