/*
 * Задача 14: «Простые числа»
 *
 * Напишите функцию primes(n). Её единственный аргумент — целое число n.
 * Функция должна возвращать массив простых чисел от 2 до n.
 *
*/

function primes(num) {
    if (typeof num !== "number") {
        console.log("Function works only numbers");
        return;
    }

    let result = [];

    for (let i = 2; i <= num; i++) {
        if (isPrime(i)) {
            result.push(i)
        }
    }

    return result;
}

function isPrime(n) {
    if (typeof n !== "number") {
        console.log("Function works only with numbers");
        return;
    }

    if (n < 2
        || !Number.isInteger(n)) {
        return false;
    }

    if (n === 2) {
        return true; // so we won’t check if n=i=2 below
    }

    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(primes(6)); // [2, 3, 5]
console.log(primes(17)); // [2, 3, 5, 7, 11, 13, 17]
