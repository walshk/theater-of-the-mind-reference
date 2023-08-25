import Marker from './Marker';

export default class BattleMap {
    markers: Marker[];

    constructor() {
        this.markers = [] as Marker[];
    }

    getMarkers(): Marker[] {
        return this.markers;
    }

    addMarker(marker: Marker): void {
        this.markers.push(marker);
    }

    getState(): string {
        return JSON.stringify({
            markers: this.markers,
        });
    }

    setState(stateString: string): void {
        const state = JSON.parse(stateString);

        this.markers = state.markers.map(
            (m: any) =>
                new Marker(
                    m.name,
                    m.color,
                    m.fontColor,
                    m.x,
                    m.y,
                    m.radius,
                    m.id
                )
        );
    }
}
