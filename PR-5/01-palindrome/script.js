/*
 * Задача 1: «Палиндром»
 *
 * Палиндром — это слово, предложение или последовательность символов,
 * которая читается слева направо так же, как и справа налево. Например,
 * «топот» и «Анна» — палиндромы, а «привет» и «Витя» — нет.
 *
 * Напишите функцию palindrome(str), принимающую как аргумент строку.
 * Функция должна вернуть true, если строка — палиндром, и false, если нет.
 *
 * Считайте, что на вход всегда передаётся слово: то есть знаков препинания
 * и пробелов в аргументе быть не может.
 *
*/

function palindrome(str) {
    if (typeof str !== "string") {
        return false;
    }

    // I know about “if (str)” — I’m for strong typing: string ≠ bool
    if (str.length === 0) {
        return true;
    }

    // As we “don’t know” about regex yet
    const excludedChars =
        [' ', '!', '(', ')', '-', '—', '–', '-', '[', ']', '{', '}', ':', ';',
         '"', ',', '.', '/', '|', '\', \'«', '»', '„', '“', '“', '”', '‘', '’',
         '•', '−', '·', '¿', '¡'];

    function advanceIndex(index, stopValue, moveForward, line, excludedChars) {
        const minValue = Math.min(index, stopValue);
        const maxValue = Math.max(index, stopValue);

        do {
            moveForward ? index++ : index--;
        } while (index >= minValue
                 && index <= maxValue
                 && excludedChars.includes(line.charAt(index)));

        return index;
    }

    let leftIndex = -1;
    let rightIndex = str.length;

    do {
        leftIndex = advanceIndex(leftIndex, rightIndex, true, str, excludedChars);
        rightIndex = advanceIndex(rightIndex, leftIndex, false, str, excludedChars);

        if (leftIndex >= rightIndex) {
            break;
        }

        const leftChar = str.charAt(leftIndex).toLocaleLowerCase();
        const rightChar = str.charAt(rightIndex).toLocaleLowerCase();

        if (leftChar !== rightChar) {
            return false;
        }
    } while (true);

    return true;
}

// Протестируйте решение, вызывая функцию с разными аргументами:
console.log(palindrome('топот')); // должно быть true
console.log(palindrome('Saippuakivikauppias')); // true
console.log(palindrome('привет')); // false

/*
 * Бонус. Задача для любознательных. Пусть функция принимает на вход любую строку,
 * но пробелы и знаки препинания не учитывает. Например:
 */

console.log(palindrome('О, лета тело!')); // true
