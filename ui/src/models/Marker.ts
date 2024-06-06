import { v4 as uuidv4 } from 'uuid';
export default class Marker {
    public id: string;
    public name: string;
    public color: string;
    public fontColor: string;
    public x: number;
    public y: number;
    public radius: number;
    public condition: string;
    public height: number;
    public layer: number;

    private blinkingInterval: number | undefined;

    constructor(
        name: string,
        color: string,
        fontColor: string,
        x: number,
        y: number,
        radius: number,
        condition = '',
        height = 0,
        layer: number,
        id?: string
    ) {
        this.id = id ?? uuidv4();

        this.name = name;
        this.color = color;
        this.fontColor = fontColor;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.condition = condition;
        this.height = height;
        this.layer = layer;
    }

    setName(name: string): void {
        this.name = name;
    }

    setColor(color: string): void {
        this.color = color;
    }

    setFontColor(color: string): void {
        this.fontColor = color;
    }

    setRadius(radius: number): void {
        this.radius = radius;
    }

    setCondition(condition: string): void {
        this.condition = condition;
    }

    setHeight(height: number): void {
        this.height = height;
    }

    setLayer(layer: number): void {
        this.layer = layer;
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
            condition: this.condition,
            height: this.height,
            layer: this.layer,
        });
    }

    toSvgString(): string {
        return `
        <svg class="marker-layer-svg" width="100%" height="100%" viewBox="0 0 200 200">
            <g class="entity-marker">
                    <circle
                        class="border-circle"
                        fill="black"
                        cx="100"
                        cy="100"
                        r="90"
                    ></circle>
                    <circle
                        fill="${this.color}"
                        cx="100"
                        cy="100"
                        r="88"
                    ></circle>
                </g>
            </svg>
        `;
    }
}
