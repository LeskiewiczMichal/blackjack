import { useSelector } from "react-redux"
import { RootState } from "../../store/store";

export default function InfoTable() {
    const currentBet: number  = useSelector((state: RootState) => state.table.currentBet)
    const playerBalance: number = useSelector((state: RootState) => state.player.balance)

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