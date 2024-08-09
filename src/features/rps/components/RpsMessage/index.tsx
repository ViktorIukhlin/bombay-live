import { IRpsMessageProps } from "./interfaces";
import styles from "./RpsMessage.module.scss";

const RpsMessage = ({
    computerChoice,
    playerChoice,
    winningPosition,
    winAmount,
    tie,
}: IRpsMessageProps): JSX.Element => {
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
        tieTitle,
    } = styles;

    // Tie
    if (tie)
        return (
            <div className={container}>
                <div className={winContainer}>
                    <div className={`${winTitle} ${tieTitle}`}>TIE</div>
                </div>
            </div>
        );

    // Win
    if (winningPosition)
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

    // Processing
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

    // Default
    return (
        <div className={container}>
            <p className={defaultMessage}>PICK YOUR POSITIONS</p>
        </div>
    );
};
export default RpsMessage;
