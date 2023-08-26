import { v4 as uuidv4 } from 'uuid';
export default class Marker {
    public id: string;
    public name: string;
    public color: string;
    public fontColor: string;
    public x: number;
    public y: number;
    public radius: number;

    constructor(
        name: string,
        color: string,
        fontColor: string,
        x: number,
        y: number,
        radius: number,
        id?: string
    ) {
        this.id = id ?? uuidv4();

        this.name = name;
        this.color = color;
        this.fontColor = fontColor;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    setName(name: string): void {
        this.name = name;
    }

    setColor(color: string): void {
        this.color = color;
    }

    moveMarkerTo(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    moveMarkerToSmooth(x: number, y: number): void {
        const xDistance = x - this.x;
        const yDistance = y - this.y;

        const xIncrement = xDistance / 100;
        const yIncrement = yDistance / 100;

        let count = 0;
        const interval = setInterval(() => {
            if (count === 100) {
                clearInterval(interval);
            } else {
                this.x += xIncrement;
                this.y += yIncrement;
                count += 1;
            }
        }, 1);
    }

    toString(): string {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            color: this.color,
            fontColor: this.fontColor,
            x: this.x,
            y: this.y,
            radius: this.radius,
        });
    }
}
