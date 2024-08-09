import styles from "./Header.module.scss";
import { IHeaderItem, IHeaderProps } from "./interfaces";

const Header = ({ balance, bet, win }: IHeaderProps): JSX.Element => {
    const { wrapper, container, itemLabel, itemValue } = styles;

    const HeaderItem = ({ label, value }: IHeaderItem) => (
        <li className={itemLabel} aria-label={`${label}${value}`}>
            {label}: <span className={itemValue}>{value}</span>
        </li>
    );

    return (
        <div data-test-id="rps-header" className={wrapper}>
            <ul className={container}>
                <HeaderItem label="BALANCE" value={balance} />
                <HeaderItem label="BET" value={bet} />
                <HeaderItem label="WIN" value={win} />
            </ul>
        </div>
    );
};
export default Header;
