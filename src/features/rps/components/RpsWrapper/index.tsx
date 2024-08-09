import { HTMLProps } from "react";
import styles from "./RpsWrapper.module.scss";

const RpsWrapper = ({ children }: HTMLProps<HTMLDivElement>): JSX.Element => (
    <div className={styles.wrapper}>{children}</div>
);
export default RpsWrapper;
