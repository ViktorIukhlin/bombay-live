import RpsService from "../../rpsService";
import { IRpsCardProps } from "./interfaces";
import styles from "./RpsCard.module.scss";

const RpsCard = ({
    testId,
    name,
    color,
    bet,
    active,
    callback,
}: IRpsCardProps): JSX.Element => {
    const { container, selected, itemBet, itemName } = styles;

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            // Prevent the default action for the Space key to avoid scrolling
            event.preventDefault();
            callback({ betType: name, currentBet: bet || 0 });
        }
    };

    return (
        <div aria-live="polite">
            <div
                data-test-id={testId}
                className={`${container} ${styles[color]} ${
                    active ? selected : ""
                }`}
                onClick={() =>
                    callback({ betType: name, currentBet: bet || 0 })
                }
                role="button"
                tabIndex={1}
                aria-label={`Bet item: ${name}, bet amount: ${
                    bet ? RpsService.formatNumber(bet) : "no bet"
                }`}
                onKeyDown={handleKeyPress}
            >
                {bet && (
                    <div className={itemBet}>
                        {RpsService.formatNumber(bet)}
                    </div>
                )}
                <div className={itemName}>{name}</div>
            </div>
        </div>
    );
};
export default RpsCard;
