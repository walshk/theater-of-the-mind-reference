export default class Marker {
    name: string;
    color: string;
    x: number;
    y: number;
    radius: number;

    constructor(
        name: string,
        color: string,
        x: number,
        y: number,
        radius: number
    ) {
        this.name = name;
        this.color = color;
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
}
