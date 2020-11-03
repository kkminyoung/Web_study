function factorial(num){
    var result = 1;
    for(num;num>1;num--){
      result *= num
    }
    return result;
  }
  
  console.log(factorial(0));
  console.log(factorial(1));
  console.log(factorial(2));
  console.log(factorial(3));
  console.log(factorial(4));
  console.log(factorial(9));