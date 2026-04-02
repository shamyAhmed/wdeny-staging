export type PassengerType = "adult" | "child" | "infant";

export interface PassengerState {
    id: number;
    type: PassengerType;
    displayNum: number;
    isExpanded: boolean;
    savedName: string | null;
}

/** Build the ordered passenger list from URL param counts (adults → children → infants). */
export function buildPassengerList(adults: number, children: number, infants: number): PassengerState[] {
    const list: PassengerState[] = [];
    let num = 1;
    for (let i = 0; i < adults; i++)
        list.push({ id: num, type: "adult", displayNum: num++, isExpanded: i === 0, savedName: null });
    for (let i = 0; i < children; i++)
        list.push({ id: num, type: "child", displayNum: num++, isExpanded: false, savedName: null });
    for (let i = 0; i < infants; i++)
        list.push({ id: num, type: "infant", displayNum: num++, isExpanded: false, savedName: null });
    return list;
}
