/*
 * Задача 12: «Посчитать количество нулей»
 *
 * Напишите функцию countZeros(n), принимающую на вход целое неотрицательное
 * число n. Возвращать функция должна количество нулей, содержащихся в аргументе.
 *
*/

function countZeros(n) {
    if (typeof n !== "number"
        || n < 0
        || !Number.isInteger(n)) {
        console.log("Function works only with non-negative integer numbers");
        return;
    }

    let zeroesCount = 0;

    for (let i = 1; i <= n; i++) {
        let digits = i.toString().split('');

        zeroesCount += digits.reduce((counter, digit) =>
            digit === '0' ? counter + 1 : counter,
            0);
    }

    return zeroesCount;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(countZeros(20)); // 2 – два нуля, по одному в числах 10 и 20
console.log(countZeros(100)); // 11 – 11 нулей в числах: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
console.log(countZeros(342)); // 11 – 11 нулей в числах: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
