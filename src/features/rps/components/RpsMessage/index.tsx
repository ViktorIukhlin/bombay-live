import styles from "./RpsMessage.module.scss";

const RpsMessage = ({
    computerChoice,
    playerChoice,
    result,
}: any): JSX.Element => {
    const {
        container,
        defaultMessage,
        processingMessage,
        choice,
        vs,
        winContainer,
        winTitle,
        winMessage,
        winNumber,
    } = styles;
    const { winningPosition, winAmount } = result;

    // Result state
    if (result)
        return (
            <div className={container}>
                <div className={winContainer}>
                    <div className={winTitle}>{winningPosition} WON</div>

                    <div className={winMessage}>
                        {winAmount && (
                            <div>
                                YOU WIN{" "}
                                <span className={winNumber}>{winAmount}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );

    // Processing state
    if (computerChoice && playerChoice)
        return (
            <div className={container}>
                <div className={processingMessage}>
                    <span className={choice}>{computerChoice}</span>
                    <span className={vs}>vs</span>
                    <span className={choice}>{playerChoice}</span>
                </div>
            </div>
        );

    // Default state
    return (
        <div className={container}>
            <p className={defaultMessage}>PICK YOUR POSITIONS</p>
        </div>
    );
};
export default RpsMessage;
