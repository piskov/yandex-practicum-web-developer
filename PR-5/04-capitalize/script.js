/*
 * Задача 4: «С большой буквы»
 *
 * Напишите функцию capitalize(str). Функция должна возвращать новую
 * строку каждое слово в которой начинается с прописной буквы.
 *
*/

function capitalize(str) {
    if (typeof str !== "string") {
        console.log("Function works only with strings");
        return;
    }

    // I know about “if (str)” — I’m for strong typing: string ≠ bool
    if (str.length === 0) {
        return str;
    }

    // As we “don’t know” about regex yet
    const excludedChars =
        [' ', '!', '(', ')', '-', '—', '–', '-', '[', ']', '{', '}', ':', ';',
         '"', ',', '.', '/', '|', '\', \'«', '»', '„', '“', '“', '”', '‘', '’',
         '•', '−', '·', '¿', '¡'];

    let index = 0;
    let chars = [];

    let shouldCapitalize = true;

    do {
        let currentChar = str[index];

        const isLetter = !excludedChars.includes(currentChar);

        if (isLetter && shouldCapitalize) {
            currentChar = currentChar.toLocaleUpperCase();
            shouldCapitalize = false;
        }

        chars.push(currentChar);

        index++;
        if (!isLetter) {
            shouldCapitalize = true;
        }
    } while (index < str.length);

    return chars.join('');
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(capitalize('молодость всё простит')); // "Молодость Всё Простит"
