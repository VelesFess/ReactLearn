"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var saystuff = {
    sayHi: function (name) {
        return "\u041F\u0440\u0438\u0432\u0435\u0442, ".concat(name);
    },
    sayBye: function (name) { return "\u041F\u043E\u043A\u0430, ".concat(name); },
};
var sayfuck = {
    sayHi: function (name) {
        return "\u0422\u0432\u043E\u044E \u043C\u0430\u0442\u044C \u044F \u0432 ".concat(name);
    },
    sayBye: function (name) { return "\u041F\u043E\u043A\u0430, ".concat(name); },
};
console.log(saystuff.sayHi('Питер')); // Привет, Питер
console.log(saystuff.sayBye('Питер')); // Пока, Питер
console.log(sayfuck.sayHi('Питер')); // Привет, Питер
console.log(sayfuck.sayBye('олежа')); // Пока, Питер
