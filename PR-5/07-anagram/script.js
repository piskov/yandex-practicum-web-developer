/*
 * Задача 7: «Анаграмма»
 *
 * Два слова называют анаграммами, если они состоят из одних и тех же букв.
 * Напишите функцию, проверяющую, являются ли две строки анаграммами друг друга
 * (регистр букв не имеет значения). Для простоты примите, что в этих строках
 * нет пробелов и знаков препинания.
 *
*/

function anagram(str1, str2) {
    if (typeof str1 !== "string"
        || typeof str2 !== "string") {
        console.log("Function works only with strings");
        return;
    }

    if (str1.length !== str2.length
        || str1.toLocaleLowerCase() === str2.toLocaleLowerCase()) {
        return false;
    }

    function unique(arr) {
        return arr.filter((item, index, self) => self.indexOf(item) === index);
    }

    const firstLetters =
        unique(str1.split('')
            .map(char => char.toLocaleLowerCase())
            .sort());

    const secondLetters =
        unique(str2.split('')
            .map(char => char.toLocaleLowerCase())
            .sort());

    return firstLetters.every((char, index) => char === secondLetters[index]);
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(anagram('finder', 'Friend')); // true
console.log(anagram('hello', 'bye')); // false
