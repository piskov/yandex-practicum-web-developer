/*
 * Задача 8: «Фибоначчи»
 *
 * Последовательность Фибоначчи — это порядок чисел, где каждое последующее
 * число является суммой двух предыдущих: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.
 *
 * Напишите функцию, которая принимает на вход число n и возвращает n-й элемент
 * последовательности Фибоначчи.
*/

function fibonacci(n) {
    if (typeof n !== "number") {
        console.log("Function works only with numbers");
        return;
    }

    if (n < 1) {
        console.log("Provide a positive number.");
        return;
    }

    switch (n) {
        case 1: return 0;
        case 2: return 1;
    }

    let first = 0;
    let second = 1;
    let sum = 0;

    let iterationsLeft = n - 2; // first two are covered in the switch-block above
    while (iterationsLeft > 0) {
        sum = first + second;
        iterationsLeft--;

        first = second;
        second = sum;
    }

    return sum;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(fibonacci(4)); // 2. Четвёртое число последовательности — двойка (0, 1, 1, 2)
