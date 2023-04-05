export default function InfoTable() {
    return (
        <div className="InfoTable--container">
            <div className="InfoTable--row">
                <span>Balance:</span>
                <span className="InfoTable--money">0$</span>
            </div>
            <div className="InfoTable--row">
                <span>Current bet:</span>
                <span className="InfoTable--money">0$</span>
            </div>
        </div>
    )
}