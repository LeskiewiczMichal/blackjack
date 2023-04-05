import { Card, ChipValue, PlayerInterface } from "../types";


export class Player implements PlayerInterface {
    public cards: Card[];
    public score: number;
    public balance: number;

    constructor () {
        this.cards = [];
        this.score = 0;
        this.balance = 1000;
    }

    betAdd(value: ChipValue) {
        if (this.balance < value) {
            return false;
        }

        this.balance -= value;
        return true;
    }
}