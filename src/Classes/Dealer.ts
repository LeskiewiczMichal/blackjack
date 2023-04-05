import {Card} from "../types";

export class Dealer {
    cards: Card[];
    score: number;

    constructor() {
        this.cards = [];
        this.score = 0;
    }
}