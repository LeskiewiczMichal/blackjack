import 'Components/Styles/table.style.css'

import { useSelector } from 'react-redux'
import { RootState } from 'store/store';

import CardsContainer from 'Components/Table/CardsContainer/CardsContainer';
import PointsDisplay from 'Components/Table/PointsDisplay/PointsDisplay';
import { useEffect } from 'react';
import useDealerDraw from 'Hooks/useDealerDraw';

export default function Table() {
    const player = useSelector((state: RootState) => state.player);
    const dealer = useSelector((state: RootState) => state.dealer);
    const table = useSelector((state: RootState) => state.table);
    const { handleDealerDraw } = useDealerDraw();

    // useEffect(() => {
    //     if (table.gameFinished) {
    //         if (dealer.score < 17) {
    //             handleDealerDraw(dealer.score);
    //         } else {
    //             handleCheckResult(player.score, dealer.score, table.currentBet);
    //         }
    //     }
    // }, [table.gameFinished, player.score, dealer.score, table.currentBet, handleDealerDraw, handleCheckResult]);

    return (
            <main className="table--container table-texture">
                {table.inGame ? (
                    <>
                        <section className='table--player'>
                            <PointsDisplay player={dealer}/>
                            <CardsContainer player={dealer}/>
                        </section>
                        <section className='table--player'>
                            <PointsDisplay player={player}/>
                            <CardsContainer player={player}/>
                        </section>
                    </>
                ) : null}
            </main>  
            
    )
}