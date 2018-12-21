// function test(name: "guxuan"): string {
//     console.log('return type string');
//     return "";
// };
// function test(name: "lintie"): number {
//     console.log('return type number');
//     return 0;
// };
// function test(name: string): boolean {
//     console.log('common test function');
//     return false;
// };
//
// test("guxuan");
// test("lintie");
//
// test("agc");
function test(name) {
    if (name == "guxuan") {
        // console.log('guxuan function');
        return "guxuan";
    }
    if (name == "lintie") {
        return 0;
    }
    return true;
    // console.log('common test function');
    // return false;
}
;
console.log(test("guxuan"));
console.log(test("lintie"));
console.log(test(888));
// test("guxuan");
// test("lintie");
//
// test("agc");
