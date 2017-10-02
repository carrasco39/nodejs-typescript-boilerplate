export class Person {

    private fname: string;
    private lname: string = "";
    get name(): string {
        return `${this.fname} ${this.lname}`;
    }
    set name(name: string) {
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