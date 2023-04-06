import 'Components/Styles/table.style.css'

import { useSelector } from 'react-redux'
import { RootState } from 'store/store';

import CardsContainer from 'Components/Table/CardsContainer/CardsContainer';
import PointsDisplay from 'Components/Table/PointsDisplay/PointsDisplay';




export default function Table() {
    const player = useSelector((state: RootState) => state.player);
    const dealer = useSelector((state: RootState) => state.dealer);

    return (
            <main className="table--container table-texture">
                <section className='table--player'>
                    <PointsDisplay player={dealer}/>
                    <CardsContainer player={dealer}/>
                </section>
                <section className='table--player'>
                    <PointsDisplay player={player}/>
                    <CardsContainer player={player}/>
                </section>
            </main>  
            
    )
}