export class User {

    public id: number;
    public level: number;
    public xp: number;

    constructor(id: number, level: number, xp: number) {
        this.id = id;
        this.level = level;
        this.xp = xp;
    }
}