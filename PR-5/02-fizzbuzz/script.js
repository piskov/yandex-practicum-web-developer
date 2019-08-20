/*
 * Задача 2: «FizzBuzz»
 *
 * Напишите функцию fizzBuzz(n), принимающую как аргумент натуральное число.
 * Функция должна выводить в консоль числа от 1 до n, заменяя числа:
 *
 * • кратные трём — на fizz;
 * • кратные пяти — на buzz;
 * • кратные и трём, и пяти одновременно — на fizzbuzz.
 *
*/

function fizzBuzz(num) {
    if (typeof num !== "number") {
        console.log("Function works only with numbers");
        return;
    }

    for (let i = 1; i <= num; i++) {
        let message = "";

        if (i % 3 === 0) {
            message = "fizz";
        }

        if (i % 5 === 0) {
            message += "buzz";
        }

        // I know about “if (message)” — I’m for strong typing: string ≠ bool
        if (message.length > 0) {
            console.log(message);
        }
        else {
            console.log(i);
        }
    }
}

// Протестируйте решение, вызывая функцию с разными аргументами:

fizzBuzz(15);
