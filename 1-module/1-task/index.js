function factorial(n) {
 
  let number = n;

  if (n === 0 || n === 1) {
      return 1;
  }

  while (n > 1) {
      n--;
      number = n * number;
  }

  return number;
}
