import Marker from './Marker';

export default class BattleMap {
    markers: Marker[];

    constructor() {
        this.markers = [] as Marker[];
    }

    getMarkers(): Marker[] {
        return this.markers.sort((a, b) => a.layer - b.layer);
    }

    addMarker(marker: Marker): void {
        this.markers.push(marker);
    }

    removeMarker(markerId: string): void {
        this.markers = this.markers.filter((m) => m.id !== markerId);
    }

    getNextLayer(): number {
        return this.markers.length;
    }
}
