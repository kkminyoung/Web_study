// Lab Ex1) Implement Factorial function using a recursive function
// f(n) = f(n-1)*n;
// f(0) = 1;
// f(2) = f(1)*2 // 1*2 = 2
// f(1) = f(0)*1 // = 1;


function factorial(num){
    if (num === 0){
        return 1;
    }
    return factorial(num-1)*num;
}

console.log(factorial(0));
console.log(factorial(1));
console.log(factorial(2));
console.log(factorial(3));
console.log(factorial(4));
console.log(factorial(9));