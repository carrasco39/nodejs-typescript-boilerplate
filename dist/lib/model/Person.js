"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    constructor() {
        this.lname = "";
    }
    get name() {
        return `${this.fname} ${this.lname}`;
    }
    set name(name) {
        let names = name.split(" ");
        if (names.length > 1) {
            this.fname = names[0];
            this.lname = names[1];
        }
        else {
            this.fname = name;
        }
    }
}
exports.Person = Person;
