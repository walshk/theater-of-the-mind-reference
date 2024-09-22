<template>
    <b-container class="battle-map" fluid>
        <b-row class="fullHeight">
            <b-col
                class="fullHeight"
                style="padding-left: 0; padding-right: 1px"
                id="battleMapCol"
            >
                <div class="game-id-text">
                    <span
                        >Player Name: {{ playerId
                        }}<span
                            v-if="isDM"
                            style="
                                padding-left: 4px;
                                color: var(--bs-success);
                                font-weight: bold;
                            "
                            >(DM)</span
                        ></span
                    >
                    <span>Game ID: {{ gameId }}</span>
                </div>
                <div class="results-area">
                    <DiceResult
                        v-for="result in diceResults"
                        :key="result.id"
                        :roll="result.roll"
                    />
                    <DmRollResult
                        v-for="result in dmResults"
                        :key="result.id"
                        :result="result.dmRollValue"
                    />
                </div>

                <svg
                    class="battle-map-svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 1000 1000"
                    ref="map"
                    @mousemove="onMousemove"
                    @mouseup="putDownMarker"
                    @mousedown="handleMouseDown"
                    @wheel.stop="handleScrollWheel"
                >
                    <defs>
                        <pattern
                            id="grid"
                            width="80"
                            height="80"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 80 0 L 0 0 0 80"
                                fill="none"
                                stroke="black"
                                stroke-width="2"
                                opacity="0.5"
                            />
                        </pattern>
                    </defs>

                    <rect
                        x="-1000"
                        y="-1000"
                        width="3000"
                        height="3000"
                        fill="url(#grid)"
                    />
                    <EntityMarker
                        v-for="(marker, index) in markers"
                        :key="`${marker.name}-${index}`"
                        :marker="marker"
                        :dragging="isDragging"
                        @editMarker="editMarker"
                        @pickUp="pickUpMarker"
                    />
                </svg>
                <div
                    id="trashArea"
                    ref="trashArea"
                    :style="trashAreaStyle"
                    @mousemove="onMousemove"
                    @mouseup="putDownMarker"
                >
                    <b-icon-trash style="margin-right: 1rem" />
                    <span>Drag Here to Delete</span>
                </div>
            </b-col>
            <b-col
                ref="rightCol"
                xs="12"
                md="3"
                class="fullHeight d-none d-lg-block"
            >
                <span
                    class="tab-selector"
                    :class="{ selected: isSelectedTab(tabs.BUILDER) }"
                    :style="tabSelectorStyle"
                    @click="selectedTab = tabs.BUILDER"
                >
                    <b-icon-hammer />
                </span>
                <span
                    class="tab-selector lower-2"
                    :class="{ selected: isSelectedTab(tabs.DICE) }"
                    :style="tabSelectorStyle"
                    @click="selectedTab = tabs.DICE"
                >
                    <b-icon-dice-6 />
                </span>
                <span
                    class="tab-selector lower-3"
                    :class="{ selected: isSelectedTab(tabs.LOG) }"
                    :style="tabSelectorStyle"
                    @click="selectedTab = tabs.LOG"
                >
                    <b-icon-clock-history />
                </span>
                <span
                    class="tab-selector lower"
                    :class="{ selected: isSelectedTab(tabs.LAYERS) }"
                    :style="tabSelectorStyle"
                    @click="selectedTab = tabs.LAYERS"
                >
                    <b-icon-layers-fill />
                </span>
                <keep-alive>
                    <MarkerBuilder
                        v-if="selectedTab === tabs.BUILDER"
                        :marker="editingMarker"
                        @createMarker="addMarker"
                        @updateMarker="updateMarker"
                        @cancelEdit="cancelEditMarker"
                        @removeMarker="removeMarker"
                    />
                    <DiceRoller
                        v-if="selectedTab === tabs.DICE"
                        @diceRoll="emitDiceRoll"
                        @dmRoll="emitDmRoll"
                    />
                    <RollLog
                        v-if="selectedTab === tabs.LOG"
                        :rolls="rollsLog"
                        :dmRolls="dmRollsLog"
                    />
                    <LayerManager
                        v-if="selectedTab === tabs.LAYERS"
                        :markers="markers"
                        @updateMarkerLayers="updateMarkerLayers"
                    />
                </keep-alive>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';

import BattleMap from '@/models/BattleMap';
import Marker from '@/models/Marker';
import MarkerMovement from '@/models/MarkerMovement';

import EntityMarker from '@/components/EntityMarker.vue';
import MarkerBuilder from './MarkerBuilder.vue';
import DiceRoller from './DiceRoller.vue';
import DiceResult from './DiceResult.vue';
import DmRollResult from './DmRollResult.vue';

import connectSocket from '@/socket';
import { Socket } from 'socket.io-client';
import RollResult from '@/models/RollResult';

import { v4 as uuidv4 } from 'uuid';
import RollLog from './RollLog.vue';

import DiceResultComp from '@/models/DiceResultComp';

import LayerManager from './LayerManager.vue';

let socket: Socket;

export default Vue.extend({
    name: 'BattleMap',
    props: {
        gameId: String,
        playerId: String,
        enterAsDm: Boolean,
    },
    components: {
        EntityMarker,
        MarkerBuilder,
        DiceRoller,
        DiceResult,
        DmRollResult,
        RollLog,
        LayerManager,
    },
    mounted() {
        this.map = new BattleMap();
        this.pageResized = !this.pageResized;

        socket = connectSocket(this.gameId, this.playerId, this.enterAsDm);
        this.$emit('setSocket', socket);

        socket.connect();

        socket.on(`${this.gameIdSafe}::markerError`, (message: string) => {
            this.$bvToast.toast(message, {
                title: 'Marker Error',
                variant: 'warning',
            });
        });

        socket.on(
            `${this.gameIdSafe}::addNormalRollToLog`,
            (rollStringWithTimestamp: string) => {
                const parts = rollStringWithTimestamp.split('::timestamp::');

                const timestamp = +parts.slice(-1)[0];
                const rollString = parts[0];

                this.rollsLog.unshift({
                    timestamp,
                    rollResult: new RollResult(rollString),
                });
            }
        );

        socket.on(
            `${this.gameIdSafe}::addDmRollToLog`,
            (rollStringWithTimestamp: string) => {
                const parts = rollStringWithTimestamp.split('::timestamp::');

                const timestamp = +parts.slice(-1)[0];
                const rollString = parts[0];

                this.dmRollsLog.unshift({
                    timestamp,
                    result: rollString,
                });
            }
        );

        socket.on(`${this.gameIdSafe}::normalRoll`, (rollString: string) => {
            this.displayRoll(rollString);
        });

        socket.on(`${this.gameIdSafe}::dmRoll`, (dmRollValue: string) => {
            this.displayDmRoll(dmRollValue);
        });

        socket.on(`${this.gameIdSafe}::addMarker`, (markerString: string) => {
            const mData = JSON.parse(markerString);
            const marker = new Marker(
                mData.name,
                mData.color,
                mData.fontColor,
                mData.x,
                mData.y,
                mData.radius,
                mData.condition,
                mData.height,
                mData.layer,
                mData.id
            );
            this.map.addMarker(marker);
        });

        socket.on(
            `${this.gameIdSafe}::markerMoved`,
            (markerMovementString: string) => {
                const movement: MarkerMovement =
                    JSON.parse(markerMovementString);
                const movedMarker = this.map.markers.find(
                    (m) => m.id === movement.id
                );

                if (movedMarker) {
                    movedMarker.moveMarkerToSmooth(movement.x, movement.y);
                }
            }
        );

        socket.on(`${this.gameIdSafe}::removeMarker`, (markerId: string) => {
            this.map.removeMarker(markerId);
        });

        socket.on(
            `${this.gameIdSafe}::updateMarkerTraits`,
            (markerString: string) => {
                const updatedMarker = JSON.parse(markerString);
                const markerToUpdate = this.map.markers.find(
                    (m) => m.id === updatedMarker.id
                );

                if (markerToUpdate) {
                    markerToUpdate.setName(updatedMarker.name);
                    markerToUpdate.setColor(updatedMarker.color);
                    markerToUpdate.setFontColor(updatedMarker.fontColor);
                    markerToUpdate.setRadius(updatedMarker.radius);
                    markerToUpdate.setCondition(updatedMarker.condition);
                    markerToUpdate.setHeight(updatedMarker.height);
                    markerToUpdate.setLayer(updatedMarker.layer);
                }
            }
        );

        window.addEventListener('resize', () => {
            this.pageResized = !this.pageResized;
            this.updateRatio();
        });
        this.updateRatio();
    },
    data() {
        return {
            map: new BattleMap(),
            selectedMarker: undefined as Marker | undefined,
            selectedMarkerRef: undefined as HTMLElement | undefined,
            editingMarker: undefined as Marker | undefined,
            isDragging: false,
            isPanning: false,
            panOrigin: {
                x: 0,
                y: 0,
            },
            currentLocation: {
                x: 0,
                y: 0,
            },
            ratio: 0,
            pageResized: false,
            tabs: {
                BUILDER: 'builder',
                DICE: 'dice',
                LOG: 'log',
                LAYERS: 'layers',
            },
            selectedTab: 'builder',
            diceResults: [] as Array<DiceResultComp>,
            dmResults: [] as Array<any>,
            rollsLog: [] as Array<{
                rollResult: RollResult;
                timestamp: number;
            }>,
            dmRollsLog: [] as Array<{
                result: string;
                timestamp: number;
            }>,
        };
    },
    methods: {
        updateRatio() {
            const svg = this.$refs.map as any;

            let [x, y, width, height] = svg
                .getAttribute('viewBox')
                .split(' ')
                .map(Number);

            this.ratio = width / svg.getBoundingClientRect().width;
        },
        emitDiceRoll(rollString: string) {
            socket.emit('normalRoll', rollString);
        },

        emitDmRoll(rollString: string) {
            this.displayRoll(rollString);
            const result = this.calculateDmRollResult(rollString);
            socket.emit('dmRoll', result);
        },

        calculateDmRollResult(rollString: string): string {
            const roll = new RollResult(rollString);
            return roll.dmValue();
        },

        displayRoll(rollString: string) {
            const result = {
                roll: new RollResult(rollString),
                id: uuidv4(),
            };
            this.diceResults.push(result);

            const duration = result.roll.numDice() * 300 + 5000;
            setTimeout(() => {
                this.diceResults = this.diceResults.filter(
                    (r: DiceResultComp) => {
                        return r.id !== result.id;
                    }
                );
            }, duration);
        },

        displayDmRoll(dmRollValue: string) {
            const result = { id: uuidv4(), dmRollValue: dmRollValue };
            this.dmResults.push(result);

            const duration = 5300;
            setTimeout(() => {
                this.dmResults = this.dmResults.filter((r: any) => {
                    return r.id !== result.id;
                });
            }, duration);
        },

        isSelectedTab(tabName: string): boolean {
            return this.selectedTab === tabName;
        },
        addMarker(markerForm: {
            name: string;
            color: string;
            fontColor: string;
            size: string;
            condition: string;
            height: number;
            layer: number;
        }): void {
            const { name, color, fontColor, size, condition, height } =
                markerForm;

            const layer = this.map.getNextLayer();

            const marker = new Marker(
                name,
                color,
                fontColor,
                500,
                500,
                +size,
                condition,
                height,
                layer
            );
            this.map.addMarker(marker);

            socket.emit('addMarker', marker.toString());
        },
        onMousemove(event: MouseEvent): void {
            event.preventDefault();

            if (this.isPanning && this.screenCTM) {
                const svg = this.$refs.map as any;

                let [x, y, width, height] = svg
                    .getAttribute('viewBox')
                    .split(' ')
                    .map(Number);

                const newX =
                    (event.clientX - this.screenCTM.e) / this.screenCTM.a;
                const newY =
                    (event.clientY - this.screenCTM.f) / this.screenCTM.d;

                const offsetX = newX - this.panOrigin.x;
                const offsetY = newY - this.panOrigin.y;

                const updatedX = x - offsetX * this.ratio;
                const updatedY = y - offsetY * this.ratio;

                console.log(updatedX, updatedY);

                svg.setAttribute(
                    'viewBox',
                    `${updatedX} ${updatedY} ${width} ${height}`
                );
                this.pageResized = !this.pageResized;
            }

            if (this.selectedMarker && this.isDragging && this.screenCTM) {
                const newX =
                    (event.clientX - this.screenCTM.e) / this.screenCTM.a;
                const newY =
                    (event.clientY - this.screenCTM.f) / this.screenCTM.d;

                this.selectedMarker.moveMarkerTo(newX, newY);
            }

            this.currentLocation = {
                x: event.clientX,
                y: event.clientY,
            };
        },
        markerMoved(markerMovement: MarkerMovement): void {
            socket.emit('moveMarker', JSON.stringify(markerMovement));
        },
        removeMarker(markerId: string): void {
            this.map.removeMarker(markerId);
            this.editingMarker = undefined;
            socket.emit('removeMarker', markerId);
        },
        pickUpMarker(data: { marker: Marker; ref: HTMLElement }): void {
            this.selectedMarker = data.marker;
            this.selectedMarkerRef = data.ref;
            this.isDragging = true;
        },
        putDownMarker(): void {
            if (this.isPanning) {
                this.isPanning = false;
                console.log('stopped panning');
                return;
            }

            if (this.selectedMarker && this.isDragging) {
                this.isDragging = false;

                if (this.selectedMarkerTrashHover) {
                    this.removeMarker(this.selectedMarker.id);
                    return;
                }

                const movement = {
                    id: this.selectedMarker.id,
                    x: this.selectedMarker.x,
                    y: this.selectedMarker.y,
                };

                socket.emit('moveMarker', JSON.stringify(movement));
            }
        },
        editMarker(marker: Marker): void {
            this.editingMarker = marker;
            this.selectedTab = this.tabs.BUILDER;
        },
        updateMarker(): void {
            if (!this.editingMarker) {
                return;
            }

            const markerString = JSON.stringify(this.editingMarker);
            this.editingMarker = undefined;
            socket.emit('updateMarkerTraits', markerString);
        },
        updateMarkerLayers() {
            for (let i = 0; i < this.markers.length; i++) {
                const markerString = JSON.stringify(this.markers[i]);
                socket.emit('updateMarkerTraits', markerString);
            }
        },
        cancelEditMarker(): void {
            this.editingMarker = undefined;
        },
        handleScrollWheel(event: any): void {
            const svg = this.$refs.map as any;
            event.preventDefault();

            // set the scaling factor (and make sure it's at least 10%)
            let scale = event.deltaY / 1000;
            scale =
                Math.abs(scale) < 0.1
                    ? (0.1 * event.deltaY) / Math.abs(event.deltaY)
                    : scale;

            // get point in SVG space
            let pt = new DOMPoint(event.clientX, event.clientY);
            pt = pt.matrixTransform(svg.getScreenCTM().inverse());

            // get viewbox transform
            let [x, y, width, height] = svg
                .getAttribute('viewBox')
                .split(' ')
                .map(Number);

            // get pt.x as a proportion of width and pt.y as proportion of height
            let [xPropW, yPropH] = [(pt.x - x) / width, (pt.y - y) / height];

            // calc new width and height, new x2, y2 (using proportions and new width and height)
            let [width2, height2] = [
                width + width * scale,
                height + height * scale,
            ];
            let x2 = pt.x - xPropW * width2;
            let y2 = pt.y - yPropH * height2;

            if (width2 > width && width2 > 2000) {
                return;
            }

            svg.setAttribute('viewBox', `${x2} ${y2} ${width2} ${height2}`);
            this.updateRatio();
            this.pageResized = !this.pageResized;
        },
        handleMouseDown(event: MouseEvent) {
            console.log('started panning');
            if (this.screenCTM) {
                this.isPanning = true;

                const newX =
                    (event.clientX - this.screenCTM.e) / this.screenCTM.a;
                const newY =
                    (event.clientY - this.screenCTM.f) / this.screenCTM.d;

                this.panOrigin = {
                    x: newX,
                    y: newY,
                };
            }
        },
    },
    computed: {
        gameIdSafe(): string {
            return encodeURIComponent(this.gameId);
        },
        markers(): Marker[] {
            return this.map.getMarkers();
        },
        screenCTM(): SVGMatrix | null {
            this.pageResized;
            const map = this.$refs.map as SVGGraphicsElement;
            return map.getScreenCTM();
        },
        selectedMarkerTrashHover(): boolean {
            this.currentLocation.x;
            this.currentLocation.y;
            if (!this.selectedMarkerRef) return false;

            const trashArea = this.$refs.trashArea as HTMLElement;

            const markerBB = this.selectedMarkerRef.getBoundingClientRect();
            const trashBB = trashArea.getBoundingClientRect();

            return !(
                markerBB.right < trashBB.left ||
                markerBB.left > trashBB.right ||
                markerBB.bottom < trashBB.top ||
                markerBB.top > trashBB.bottom
            );
        },
        trashAreaStyle(): { [key: string]: string } {
            const bottom = this.isDragging ? '0' : '-10%';
            const backgroundColor = this.selectedMarkerTrashHover
                ? 'var(--bs-danger)'
                : '#000';

            return {
                '--trash-bottom': bottom,
                '--trash-bg-color': backgroundColor,
            };
        },
        tabSelectorStyle() {
            this.pageResized;
            if (!this.$refs.rightCol) return;

            const rightCol = this.$refs.rightCol as HTMLElement;
            const left = rightCol.getBoundingClientRect().left - 40;
            const top = rightCol.getBoundingClientRect().top + 5;

            return {
                '--tab-top': `${top}px`,
                '--tab-left': `${left}px`,
            };
        },
        isDM() {
            return this.$store.state.isDM;
        },
    },
});
</script>

<style scoped>
.battle-map {
    height: 100%;
    width: 100%;
    display: block;
}

.battle-map-svg {
    background: lightgrey;
    height: 100%;
    width: 100%;
}

.battle-map-svg:hover {
    cursor: move;
}

#battleMapCol {
    position: relative;
}

#trashArea {
    position: absolute;
    bottom: var(--trash-bottom);
    padding: 0.5rem 0.5rem;
    border-radius: 1rem 1rem 0 0;
    font-size: 1.25rem;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    right: 0;
    left: 0;

    background-color: var(--trash-bg-color);
    color: #fff;
    opacity: 0.7;

    transition: bottom 0.25s ease-in-out;
}

#trashArea:hover {
    cursor: grabbing;
}

.tab-selector {
    position: absolute;
    top: var(--tab-top);
    left: var(--tab-left);
    font-size: 1rem;
    background-color: white;
    padding: 5px 10px;
    border-radius: 6px;
    transition: all 0.2s ease-in-out;
}

.tab-selector.lower {
    top: calc(var(--tab-top) + 40px);
}

.tab-selector.lower-2 {
    top: calc(var(--tab-top) + 80px);
}

.tab-selector.lower-3 {
    top: calc(var(--tab-top) + 120px);
}

.tab-selector.selected {
    background-color: var(--bs-primary);
    color: white;
}

.tab-selector:not(.selected):hover {
    cursor: pointer;
    /* background-color: var(--bs-success); */
    /* color: white; */
    transform: translateX(-5px);
}

.game-id-text {
    position: absolute;
    top: 0px;
    left: 0;
    background-color: #1b1b1b;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0 0 6px 0;
    text-align: center;
    text-anchor: middle;
    font-size: 14px;

    display: grid;
    grid-template-rows: repeat(2, min-content);
    text-align: left;
    opacity: 0.6;
}

.results-area {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translate(-50%, 0);
    max-width: 70%;

    display: block;
    height: 100%;
    overflow-y: auto;
}

.results-area > * {
    margin: 1rem 1rem;
}
</style>
