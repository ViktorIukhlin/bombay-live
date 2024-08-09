export type IColorType = "green" | "blue" | "red";

export interface IRpsCardProps {
    testId: string;
    name: string;
    color: IColorType;
    active?: boolean;
    bet?: number;
    callback(name: string): void;
}
