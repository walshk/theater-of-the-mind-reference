type Die = {
    dieType: number;
    value: number;
};

export default class RollResult {
    public dice: { [key: number]: Array<number> };
    public modifier: number;

    constructor(rollResultString: string) {
        const data = JSON.parse(rollResultString);
        this.dice = data.dice;
        this.modifier = data.modifier;
    }

    toDiceArray(): Array<Die> {
        const diceTypes = [20, 12, 10, 8, 6, 4];
        const dice = [] as Array<Die>;

        for (const type of diceTypes) {
            const rolls = this.dice[type];
            for (const value of rolls) {
                dice.push({
                    dieType: type,
                    value: value,
                });
            }
        }
        return dice;
    }

    numDice(): number {
        return Object.values(this.dice).flat().length;
    }

    value(): number {
        const numDice = this.numDice();
        if (numDice === 0) {
            return 0;
        }

        return Object.values(this.dice)
            .flat()
            .reduce((a, b) => a + b);
    }
}
