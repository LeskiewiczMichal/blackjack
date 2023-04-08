// Hooks
import { useAppSelector } from "Hooks/hooks";


export default function InfoTable() {
    const currentBet: number  = useAppSelector(state => state.table.currentBet);
    const playerBalance: number = useAppSelector(state => state.player.balance);
    const insuranceBet: number | null = useAppSelector(state => state.table.insuranceBet);

    let betJSX: JSX.Element;

    if (insuranceBet) {
        betJSX = (
            <>
                <div className="InfoTable--Insurance-active">
                    <div className="InfoTable--row">
                        <span>Current bet:</span>
                        <span className="InfoTable--money">{currentBet}$</span>
                    </div>
                    <div className="InfoTable--row">
                        <span>Insurance bet:</span>
                        <span className="InfoTable--money">{insuranceBet}$</span>
                    </div>
                </div>
            </>
        )
    } else {
        betJSX = (
            <>
                <div className="InfoTable--row">
                    <span>Current bet:</span>
                    <span className="InfoTable--money">{currentBet}$</span>
                </div>
            </>
        )
    }

    return (
        <div className="InfoTable--container">
            <div className="InfoTable--row">
                <span>Balance:</span>
                <span className="InfoTable--money">{playerBalance}$</span>
            </div>
            {betJSX}            
        </div>
    )
}