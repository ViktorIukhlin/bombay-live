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

    return (
        <div
            data-test-id={testId}
            className={`${container} ${styles[color]} ${
                active ? selected : ""
            }`}
            onClick={() => callback({ betType: name, currentBet: bet || 0 })}
            role="button"
            aria-pressed={active}
            aria-label={`Bet item: ${name}, bet amount: ${
                bet ? RpsService.formatNumber(bet) : "no bet"
            }`}
        >
            {bet && (
                <div className={itemBet}>{RpsService.formatNumber(bet)}</div>
            )}
            <div className={itemName}>{name}</div>
        </div>
    );
};
export default RpsCard;
