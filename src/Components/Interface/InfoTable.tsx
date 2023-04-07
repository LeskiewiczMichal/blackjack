// Hooks
import { useAppSelector } from "Hooks/hooks";


export default function InfoTable() {
    const currentBet: number  = useAppSelector(state => state.table.currentBet)
    const playerBalance: number = useAppSelector(state => state.player.balance)

    return (
        <div className="InfoTable--container">
            <div className="InfoTable--row">
                <span>Balance:</span>
                <span className="InfoTable--money">{playerBalance}$</span>
            </div>
            <div className="InfoTable--row">
                <span>Current bet:</span>
                <span className="InfoTable--money">{currentBet}$</span>
            </div>
        </div>
    )
}