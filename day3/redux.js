// const constants = {
//     SORT_COLORS: "SORT_COLORS",
//     ADD_COLOR: "ADD_COLOR",
//     RATE_COLOR: "RATE_COLOR",
//     REMOVE_COLOR: "REMOVE_COLOR"
// }
// const existingColor = {
//     id: "128e1p5-3abl-0e52-33p0-8401l8yf3036",
//     title: "Big Blue",
//     color: "#0000FF",
//     timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)",
//     rating: 0
// }
// const action = {
//     type: "RATE_COLOR",
//     id: "4243e1p0-9abl-4e90-95p4-8001l8yf3036",
//     rating: 4
// }
//
// const color = (state = {}, action) => {
//     switch (action.type) {
//         case constants.ADD_COLOR:
//             return {
//                 id: action.id,
//                 title: action.title,
//                 color: action.color,
//                 timestamp: action.timestamp,
//                 rating: 0
//             }
//         case constants.RATE_COLOR:
//             return (state.id !== action.id) ? state : {
//                 ...state,
//                 rating: action.rating
//             }
//         default:
//             return state
//     }
// }
//
// console.log( color(existingColor, action) )

// function compose(...funcs) {
//   if (funcs.length === 0) {
//     return arg => arg
//   }
//
//   if (funcs.length === 1) {
//     return funcs[0]
//   }
//
//   return funcs.reduce((a, b) => (...args) => a(b(...args)))
// }

let t = 0;
let f1 = next => {
    console.log(++t + ':f1');
    return action => console.log(`f1:`);
}
let f2 = next => {
    console.log(++t + ':f2');
    return action => console.log(`f2:`);
}

compose(f1, f2)()();

// var arr = [10, 11, 12];
// arr.reduce((a, b) => console.log(a, b));
