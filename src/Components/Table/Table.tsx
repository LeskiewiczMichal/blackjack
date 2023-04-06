import 'Components/Styles/table.style.css'

import { useSelector } from 'react-redux'
import { RootState } from 'store/store';

import Card from 'Components/Card'
import CardsContainer from 'Components/Table/CardsContainer/CardsContainer';




export default function Table() {
    const player = useSelector((state: RootState) => state.player);
    const dealer = useSelector((state: RootState) => state.dealer);

    return (
            <main className="table--container table-texture">
                <CardsContainer player={player}/>
                <CardsContainer player={dealer}/>
            </main>  
    )
}