// this <=> ResolveThisBinding()  文档的12.2.2   对this关键字求值，其实是调用ResolveThisBinding()方法

//
// ResolveThisBinding() {
//   let envRec = GetThisEnvironment()
//   // 不同的envRec类型的GetThisBinding方法不一样
//   return envRec.GetThisBinding()
// }
//
//
// GetThisEnvironment() {
//   let lex = get running execution context LexicalEnvironment
//   do {
//     let envRec = lex.envRec;
//     if (envRec.HasThisBinding()) {
//       return envRec;
//     } else {
//       let outer = lex.outerEnvRef;
//       lex = outer;
//     }
//   } while (lex != global.envRecRef)
//
//   return global.envRec
// }


// GetThisBinding() {
//   let envRec = get the function Env record which the method was invoked; // 注意这个envRec和调用这个方法的GetThisBinding不是同一个概念，主要要获取的是当前执行上下文的父执行上下文，也就是调用栈的次栈顶上下文（当前执行上下文是栈顶上下文）。
//   return envRec.[[thisValue]]
// }

// call
// [[call]]
// PrepareForOrdinaryCall
// NewFunctionEnvironment

// 12.3.4  Function Calls

foo() =>
被解释为适用于以下词法规则：
CallExpression:
  CallExpression Arguments
Arguments:
  （）

该语法规则的运行时语义（Runtime Semantics）(12.3.4.1)
执行
EvaluateDirectCall(func, thisValue, Arguments, tailCall) =>   (12.3.4.3)
执行
Call(func, thisValue, argList) => (7.3.12) =>
func.[[call]](thiValue, argList) => (9.2.1) =>

PrepareForOrdinaryCall(F, undefined)
OrdinaryCallBindThis(F, calleeContext, thisArgument)
OrdinaryCallEvaluateBody(F, argument)


PrepareForOrdinaryCall() {
   NewFunctionEnvironment(F, newTarget)
}


OrdinaryCallBindThis() {
  1. Let thisMode be the value of F’s [[ThisMode]] internal slot.
  2. If thisMode is lexical, return NormalCompletion(undefined).
  3. Let calleeRealm be the value of F’s [[Realm]] internal slot.
  4. Let localEnv be the LexicalEnvironment of calleeContext.
  5. If thisMode is strict, let thisValue be thisArgument.
  6. Else
    a. if thisArgument is null or undefined, then
      i. Let thisValue be calleeRealm.[[globalThis]].
    b. Else
      i. Let thisValue be ToObject(thisArgument).
      ii. Assert: thisValue is not an abrupt completion.
      iii. NOTE ToObject produces wrapper objects using calleeRealm.
  7. Let envRec be localEnv’s EnvironmentRecord.
  8. Assert: The next step never returns an abrupt completion because envRec.[[thisBindingStatus]] is not
  "uninitialized".
  9. Return envRec.BindThisValue(thisValue).

  envRec.BindThisValue(thisValue)
}

OrdinaryCallEvaluateBody() {
  FunctionDeclarationInstantiation(F, argumentsList)
}

NewFunctionEnvironment() { 8.1.2.4
  // 核心是将
  1. Assert: F is an ECMAScript function.
  2. Assert: Type(newTarget) is Undefined or Object.
  3. Let env be a new Lexical Environment.
  4. Let envRec be a new function Environment Record containing no bindings.
  5. Set envRec.[[FunctionObject]] to F.
  6. If F’s [[ThisMode]] internal slot is lexical, set envRec.[[thisBindingStatus]] to "lexical".
  7. Else, Set envRec.[[thisBindingStatus]] to "uninitialized".
  8. Let home be the value of F’s [[HomeObject]] internal slot.
  9. Set envRec.[[HomeObject]] to home.
  10. Set envRec.[[NewTarget]] to newTarget.
  11. Set env’s EnvironmentRecord to be envRec.
  12. Set the outer lexical environment reference of env to the value of F’s [[Environment]] internal slot.
  13. Return env.
}

BindThisValue(thiValue) { 8.1.1.3
  1. Let envRec be the function Environment Record for which the method was invoked.
  2. Assert: envRec.[[thisBindingStatus]] is not "lexical".
  3. If envRec.[[thisBindingStatus]] is "initialized", throw a ReferenceError exception.
  4. Set envRec.[[thisValue]] to V.
  5. Set envRec.[[thisBindingStatus]] to "initialized".
  6. Return V.
}



function foo(zz) {
    if (this === global) {
      console.log("global");
    } else {
      console.log(this);
    }
    // zz.test();

    // let yy = zz.test;
    // yy();

    let mm = () => {
      if (this === global) {
        console.log("global");
      } else {
        console.log(this);
      }
    };

    mm();
}

this.num = 10;

// 传递给函数的实参的作用域是写该函数调用语句所处的作用域

foo({
    // test继承在外部对象的this，而外部对象的this遵守词法作用域的查找规则，指向本模块的module.exports对象，注意，根本是这个实参对象的父作用域是module.exports，而不是foo函数作用域。
    xxxx: 10000,
    test: () => {
      if (this === global) {
        console.log(this);
      } else {
        console.log(this);
      }
    }
});

console.log('=====');

foo({
  test: function() {
    if (this === global) {
      console.log(this);
    } else {
      console.log(this);
    }
  }
})



// class Obj {
//     foo() {
//         this.data = {
//             a: 1
//         };
//
//         console.log(this);
//
//         this.baz();
//     }
//
//     baz() {
//         console.log('baz');
//     }
// }
//
// let o = new Obj();
// o.foo();
//
// console.log(o);


// let obj = {
//     a: 1,
//
//     foo: function() {
//         return () => {
//             console.log(this.a);
//         }
//     }
// }
//
// let baz = obj.foo;
//
// let obj1 = {
//     a: 2,
// }
//
// let xyz = baz.call(obj1)
//
// xyz()


/*
参见ecma-262文档的第八章：
规范对this的解析：引擎会将所有引用this的地方，换成如下函数的执行：
ResolveThisBinding()。

The abstract operation ResolveThisBinding determines the binding of the keyword this using the LexicalEnvironment of the running execution context. ResolveThisBinding performs the following steps:
1. Let envRec be GetThisEnvironment( ).
2. Return envRec.GetThisBinding().


8.3.2 GetThisEnvironment ( )
The abstract operation GetThisEnvironment finds the Environment Record that currently supplies the binding of the keyword this. GetThisEnvironment performs the following steps:
1. Let lex be the running execution context’s LexicalEnvironment.
2. Repeat
Component
Purpose
 Generator
The GeneratorObject that this execution context is evaluating.
NOTE
a. b. c. d. e.
Let envRec be lex’s EnvironmentRecord.
Let exists be envRec.HasThisBinding().
If exists is true, return envRec.
Let outer be the value of lex’s outer environment reference. Let lex be outer.
The loop in step 2 will always terminate because the list of environments always ends with the global environment which has a this binding.
*/

// console.log(this);
//
// let b = {
//   tt: this.num    // this遵循词法作用域查找，在node中，指向本模块
// }
//
// console.log(this === module.exports);  // true
// console.log(this === exports);          // true
// console.log(exports === module.exports);  // true
//
// console.log(b.tt);
//
// function baz() {
//   this.num = 100;
//   let mm = {
//       zz: this.num
//   }
//
//   console.log(mm.zz);
//   console.log(this.num);
// }
//
//
// baz()
//
// console.log(global.num);
//
//
// function f1(mm) {
//
// }

// exports.var1 = 'exprots var1'
//
let x = {
  t: 1,

  xa: () => {
    console.log(this);
  },

  xf: function() {
    console.log(this);
  }
}

x.xf();
x.xa();   // xa箭头函数指向定义这个对象的词法作用域，这个对象是在本模块的全局作用域定义的，因此xa中的箭头函数的this指向本模块作用域
//
//
// function f() {
//   console.log(this);
//   console.log('==========');
//   let farr = () => {
//     console.log(this);
//   }
//
//   farr();
// }
//
// f();  // f函数遵循运行时作用域绑定规则，运行时，this指向了全局global，而不是本模块，因此打印global。而farr，指向定义该箭头函数的父作用域，因此，farr中this一定与f在第一次调用时绑定的this是一致的，并且之后是不会再被改变了。


// function f1() {
//   console.log(this);
//   console.log('==========');
//   if (!f1.prototype.farr) {
//     f1.prototype.farr = () => {
//       console.log(this);
//     }
//   }
//   f1.prototype.farr();
// }
//
// let obj = {
//   a: 'a'
// }
//
// f1();           // global, global
//
// console.log('++++++');
//
//
// f1.call(obj);   // obj, global





//
// function foo(obj) {
//   // console.log(obj);
//   // console.log(this);
//   // obj.test.call(obj);
//   // console.log(this);
//   // obj.test();
//   // obj.test.call(obj);
//
//   let obj1 = {
//     var1: 'obj1 var1'
//   }
//
//   // obj.baz()();
//   obj.baz.call(obj1)();
// }
//
//
// foo(
//   {
//     var1: 'var1',
//
//     test: () => {
//       const that = this;
//       console.log(this);
//       console.log(this.var1);
//       console.log(that);
//       console.log(that.var1);
//     },
//
//     baz: function() {
//       return () => {
//         console.log(this);
//         console.log(this.var1);
//       }
//     }
//   }
// )
//
//
// bar = a => a = 1
//
// fun = (a) => {
//   let mm = 11;
// }
//
// func = (a) => {zz = 1}
//
//
// funcz = (a) => (zz = 1)
//
// console.log(bar());   // 1
//
// console.log((a = 1)); // 1
//
// console.log(fun());   // undefined
//
// console.log(func());  // undefined
//
// console.log(funcz()); // 1
