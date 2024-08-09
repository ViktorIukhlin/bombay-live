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
            <section
                data-test-id="rps-tie-message"
                className={container}
                aria-live="polite"
            >
                <div className={winContainer}>
                    <h2 className={`${winTitle} ${tieTitle}`} role="alert">
                        TIE
                    </h2>
                </div>
            </section>
        );

    // Win
    if (winningPosition)
        return (
            <section
                data-test-id="rps-win-message"
                className={container}
                aria-live="polite"
            >
                <div className={winContainer}>
                    <h2 className={winTitle} role="alert">
                        {winningPosition} WON
                    </h2>

                    <div className={winMessage}>
                        {winAmount && (
                            <div>
                                YOU WIN{" "}
                                <span className={winNumber}>{winAmount}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );

    // Processing
    if (computerChoice && playerChoice)
        return (
            <section
                data-test-id="rps-processing-message"
                className={container}
                aria-live="polite"
            >
                <div className={processingMessage}>
                    <span className={choice}>{computerChoice}</span>
                    <span className={vs}>vs</span>
                    <span className={choice}>{playerChoice}</span>
                </div>
            </section>
        );

    // Default
    return (
        <section
            data-test-id="rps-default-message"
            className={container}
            aria-live="polite"
        >
            <p className={defaultMessage}>PICK YOUR POSITIONS</p>
        </section>
    );
};
export default RpsMessage;
