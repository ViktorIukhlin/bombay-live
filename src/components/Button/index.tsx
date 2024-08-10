import styles from "./Button.module.scss";

type ButtonTypes = "dark";

interface IButton {
    type: ButtonTypes;
    callback(): void;
    text: string;
    disabled?: boolean;
    ariaLabel?: string;
}

const Button = ({
    type,
    callback,
    text,
    disabled,
    ariaLabel,
}: IButton): JSX.Element => (
    <button
        className={`${styles.button} ${styles[type]}`}
        onClick={callback}
        disabled={disabled}
        aria-label={ariaLabel || text}
        aria-disabled={disabled}
    >
        {text}
    </button>
);
export default Button;
