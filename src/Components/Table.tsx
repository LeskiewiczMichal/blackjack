import './Styles/table.style.css'

import { useSelector } from 'react-redux'

import Card from './Card'
import { RootState } from '../store/store';



export default function Table() {
    const playerCards = useSelector((state: RootState) => state.player.cards);
    const dealerCards = useSelector((state: RootState) => state.dealer.cards);

    const playerCardsJSX = playerCards.map((card, index) => {
        return <Card key={index} suit={card.suit} value={card.value} faceUp={true} />
    });

    const dealerCardsJSX = dealerCards.map((card, index) => {
        return <Card key={index} suit={card.suit} value={card.value} faceUp={false} />
    });

    return (
            <main className="table--container table-texture">
                {playerCardsJSX}
                {dealerCardsJSX}
            </main>  
    )
}