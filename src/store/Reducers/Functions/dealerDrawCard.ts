import { Card } from "types";
import { store } from "store/store";
import { addCard } from "store/Reducers/dealerReducer";
import { drawCard } from "store/Reducers/tableReducer";


export function dealerDrawCard() {
    const reduxStore = store.getState();

    const randomCard: Card = reduxStore.table.cards[Math.floor(Math.random() * reduxStore.table.cards.length)];
    store.dispatch(drawCard(randomCard));
    store.dispatch(addCard(randomCard));
}