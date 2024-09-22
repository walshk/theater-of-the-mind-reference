type Die = {
    dieType: number;
    value: number;
    ignore: boolean;
};

export default class RollResult {
    public dice: { [key: number]: Array<number> };
    public modifier: number;
    public advantage: 'normal' | 'advantage' | 'disadvantage';
    public playerId: string;

    constructor(rollResultString: string) {
        const data = JSON.parse(rollResultString);
        this.dice = data.dice;
        this.modifier = data.modifier;
        this.advantage = data.advantage;
        this.playerId = data.playerId;
    }

    toDiceArray(): Array<Die> {
        const diceTypes = [20, 12, 10, 8, 6, 4];
        const dice = [] as Array<Die>;

        for (const type of diceTypes) {
            const rolls = this.dice[type];
            for (const value of rolls) {
                let ignore = false;

                if (type === 20) {
                    if (this.advantage === 'advantage') {
                        ignore = value < Math.max(...rolls);
                    } else if (this.advantage === 'disadvantage') {
                        ignore = value > Math.min(...rolls);
                    }
                }

                dice.push({
                    dieType: type,
                    value: value,
                    ignore: ignore,
                });
            }
        }
        return dice;
    }

    numDice(): number {
        return Object.values(this.dice).flat().length;
    }

    isCritSuccess(): boolean {
        if (!this.dice[20] || this.dice[20].length === 0) return false;

        if (this.advantage === 'advantage' || this.dice[20].length === 1) {
            const maxD20 = Math.max(...this.dice[20]);
            return maxD20 === 20;
        } else if (this.advantage === 'disadvantage') {
            const minD20 = Math.min(...this.dice[20]);
            return minD20 === 20;
        }
        return false;
    }

    isCritFail(): boolean {
        if (!this.dice[20] || this.dice[20].length === 0) return false;

        if (this.advantage === 'advantage' || this.dice[20].length === 1) {
            const maxD20 = Math.max(...this.dice[20]);
            return maxD20 === 1;
        } else if (this.advantage === 'disadvantage') {
            const minD20 = Math.min(...this.dice[20]);
            return minD20 === 1;
        }
        return false;
    }

    dmValue(): string {
        if (this.isCritSuccess()) {
            return 'NAT 20';
        }

        if (this.isCritFail()) {
            return 'NAT 1';
        }

        return String(this.value() + this.modifier);
    }

    value(): number {
        const numDice = this.numDice();
        if (numDice === 0) {
            return 0;
        }

        if (!this.dice[20] || this.dice[20].length === 0) {
            return Object.values(this.dice)
                .flat()
                .reduce((a, b) => a + b);
        }

        if (this.advantage === 'advantage' && this.dice[20].length > 0) {
            const d20Key = 20;
            const { [d20Key]: d20s, ...otherDice } = this.dice;
            const maxD20 = Math.max(...d20s);
            const otherDiceValues = Object.values(otherDice).flat();

            if (otherDiceValues.length === 0) {
                return maxD20;
            }

            const otherDiceTotal = otherDiceValues.reduce((a, b) => a + b);
            return maxD20 + otherDiceTotal;
        } else if (
            this.advantage === 'disadvantage' &&
            this.dice[20].length > 0
        ) {
            const d20Key = 20;
            const { [d20Key]: d20s, ...otherDice } = this.dice;
            const minD20 = Math.min(...d20s);
            const otherDiceValues = Object.values(otherDice).flat();

            if (otherDiceValues.length === 0) {
                return minD20;
            }

            const otherDiceTotal = otherDiceValues.reduce((a, b) => a + b);
            return minD20 + otherDiceTotal;
        }

        return Object.values(this.dice)
            .flat()
            .reduce((a, b) => a + b);
    }
}
