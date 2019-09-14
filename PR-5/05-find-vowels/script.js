/*
 * Задача 5: «Найти гласные»
 *
 * Напишите функцию findVowels(str), принимающую на вход кириллическую
 * строку str и возвращающую количество гласных, содержащихся в этой строке.
 * Для вашего удобства вот массив кириллических гласных:
 *
 * ['а', 'я', 'о', 'ё', 'у', 'ю', 'ы', 'и', 'э', 'е'].
 *
*/

function findVowels(str) {
    if (typeof str !== "string") {
        console.log("Function works only with strings");
        return;
    }

    // I know about “if (str)” — I’m for strong typing: string ≠ bool
    if (str.length === 0) {
        return 0;
    }

    let vowelsCount = 0;

    let vowels = ['а', 'я', 'о', 'ё', 'у', 'ю', 'ы', 'и', 'э', 'е'];

    return str.split("")
              .reduce(function (counter, item) {
        if (vowels.includes(item.toLocaleLowerCase())) {
            return counter + 1;
        }

        return  counter;
    }, 0);
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(findVowels('здравствуй')); // 2
console.log(findVowels('привет')); // 2
console.log(findVowels('хеллоу')); // 3
