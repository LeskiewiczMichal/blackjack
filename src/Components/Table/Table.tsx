import 'Components/Styles/table.style.css'

// Types
import { RootState } from 'store/store';

// Libraries
import { useSelector } from 'react-redux'

// Components
import CardsContainer from 'Components/Table/CardsContainer/CardsContainer';
import PointsDisplay from 'Components/Table/PointsDisplay/PointsDisplay';
import InsurancePopup from 'Components/Interface/InsurancePopup';



export default function Table() {
    const player = useSelector((state: RootState) => state.player);
    const dealer = useSelector((state: RootState) => state.dealer);
    const table = useSelector((state: RootState) => state.table);

    let popUpJSX: JSX.Element | null;

    if (table.popUpActive) {
        popUpJSX = (<InsurancePopup />)
    } else {
        popUpJSX = null;
    }

    return (
            <main className="table--container table-texture">
                
                {table.inGame ? (
                    <>
                        <section className='table--player'>
                            <PointsDisplay score={dealer.score}/>
                            <CardsContainer cards={dealer.cards}/>
                        </section>
                        {popUpJSX}
                        <section className='table--player'>
                            <PointsDisplay score={player.score}/>
                            <CardsContainer cards={player.cards}/>
                        </section>
                    </>
                ) : null}
                {(player.secondHand.length > 0 && player.secondScore != null) ? (
                    <section className='table--player table--second'>
                        <PointsDisplay score={player.secondScore}/>
                        <CardsContainer cards={player.secondHand}/>
                    </section>
                ): null}
            </main>  
    )
}