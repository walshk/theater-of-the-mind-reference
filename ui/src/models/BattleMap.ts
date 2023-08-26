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

    removeMarker(markerId: string): void {
        this.markers = this.markers.filter((m) => m.id !== markerId);
    }
}
