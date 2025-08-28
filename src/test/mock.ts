import { Turtle } from "./Turtle";

function waitForMs(ms: number) {
    const time = Date.now() + ms;
    while (Date.now() < time) {}
}

function placeAt(
    x: number,
    y: number,
    z: number,
    updateTurtle: () => void,
    setBlock: (x: number, y: number, z: number, block: string) => void
) {
    if (Turtle.mainTurtle.inventory[Turtle.mainTurtle.selectedSlot.value].amount == 0) return false;

    setBlock(x, y, z, Turtle.mainTurtle.inventory[Turtle.mainTurtle.selectedSlot.value].name);

    if (reduceInventoryOnPlace) Turtle.mainTurtle.inventory[Turtle.mainTurtle.selectedSlot.value].amount--;
    if (Turtle.mainTurtle.inventory[Turtle.mainTurtle.selectedSlot.value].amount == 0) {
        Turtle.mainTurtle.inventory[Turtle.mainTurtle.selectedSlot.value].name = "";
    }
    updateTurtle();
    return true;
}

const walkSpeed = 0.1;
const turnSpeed = 0;
const reduceInventoryOnPlace = false;
const fuelUsage = 0;

export function mock(updateTurtle: () => void, setBlock: (x: number, y: number, z: number, block: string) => void) {
    (globalThis as any).print = console.log;
    (globalThis as any).turtle = {
        forward: () => {
            if (Turtle.mainTurtle.fuelLevel.value < fuelUsage) return false;
            waitForMs(walkSpeed);
            Turtle.mainTurtle.fuelLevel.value -= fuelUsage;
            Turtle.mainTurtle.position.x += Turtle.cardinal[Turtle.mainTurtle.orientation.value].x;
            Turtle.mainTurtle.position.z += Turtle.cardinal[Turtle.mainTurtle.orientation.value].z;
            updateTurtle();
            return true;
        },
        up: () => {
            if (Turtle.mainTurtle.fuelLevel.value < fuelUsage) return false;
            waitForMs(walkSpeed);
            Turtle.mainTurtle.fuelLevel.value -= fuelUsage;
            Turtle.mainTurtle.position.y++;
            updateTurtle();
            return true;
        },
        down: () => {
            if (Turtle.mainTurtle.fuelLevel.value < fuelUsage) return false;
            waitForMs(walkSpeed);
            Turtle.mainTurtle.fuelLevel.value -= fuelUsage;
            Turtle.mainTurtle.position.y--;
            updateTurtle();
            return true;
        },
        turnRight: () => {
            waitForMs(turnSpeed);
            Turtle.mainTurtle.orientation.value--;
            if (Turtle.mainTurtle.orientation.value == -1) Turtle.mainTurtle.orientation.value = 3;
            updateTurtle();
            return true;
        },
        turnLeft: () => {
            waitForMs(turnSpeed);
            Turtle.mainTurtle.orientation.value++;
            if (Turtle.mainTurtle.orientation.value == 4) Turtle.mainTurtle.orientation.value = 0;
            updateTurtle();
            return true;
        },
        getItemDetail: (slotNum?: number, detailed?: boolean) => {
            return Turtle.mainTurtle.inventory[
                slotNum != undefined ? slotNum - 1 : Turtle.mainTurtle.selectedSlot.value
            ];
        },
        place: async (text?: string) => {
            return placeAt(
                Turtle.mainTurtle.position.x + Turtle.cardinal[Turtle.mainTurtle.orientation.value].x,
                Turtle.mainTurtle.position.y,
                Turtle.mainTurtle.position.z + Turtle.cardinal[Turtle.mainTurtle.orientation.value].z,
                updateTurtle,
                setBlock
            );
        },
        placeDown: (text?: string) => {
            return placeAt(
                Turtle.mainTurtle.position.x,
                Turtle.mainTurtle.position.y - 1,
                Turtle.mainTurtle.position.z,
                updateTurtle,
                setBlock
            );
        },
        getFuelLevel: () => Turtle.mainTurtle.fuelLevel.value,
        select: (slotNum: number): true => {
            Turtle.mainTurtle.selectedSlot.value = slotNum - 1;
            return true;
        },
        getItemCount: (slotNum?: number): number =>
            Turtle.mainTurtle.inventory[slotNum != undefined ? slotNum - 1 : Turtle.mainTurtle.selectedSlot.value]
                .amount
    } as unknown as typeof turtle;

    (globalThis as any).os = {
        pullEvent: async (filter?: string | undefined): Promise<void> => {
            new Promise((res) => setTimeout(res, 2000));
        }
    } as unknown;
}
