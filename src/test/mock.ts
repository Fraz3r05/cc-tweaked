import { Turtle } from "./Turtle";

function waitForMs(ms: number) {
    const time = Date.now() + ms;
    while (Date.now() < time) {}
}

const walkSpeed = 0.1;
const turnSpeed = 0;
const fuelUsage = 1;

export function mock(updateTurtle: () => void, setBlock: (x: number, y: number, z: number, block: string) => void) {
    function addToInventory(slot: number, amount: number, itemName: string) {
        if (amount < 0) {
            if (itemName != Turtle.mainTurtle.inventory[slot].name) return { amount: 0, itemName: "" };
            const retrieved = Math.min(-amount, Turtle.mainTurtle.inventory[slot].amount);
            Turtle.mainTurtle.inventory[slot].amount -= retrieved;

            if (Turtle.mainTurtle.inventory[slot].amount == 0)
                Turtle.mainTurtle.inventory[Turtle.mainTurtle.selectedSlot.value].name = "";

            updateTurtle();
            return { amount: retrieved, itemName: itemName };
        } else {
            // TODO

            updateTurtle();
            return { amount: amount, itemName: itemName };
        }
    }

    function placeAt(x: number, y: number, z: number) {
        const retrievedBlock = addToInventory(
            Turtle.mainTurtle.selectedSlot.value,
            -1,
            Turtle.mainTurtle.inventory[Turtle.mainTurtle.selectedSlot.value].name
        );
        if (retrievedBlock.amount == 0) return false;

        setBlock(x, y, z, retrievedBlock.itemName);

        updateTurtle();
        return true;
    }

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
                Turtle.mainTurtle.position.z + Turtle.cardinal[Turtle.mainTurtle.orientation.value].z
            );
        },
        placeDown: (text?: string) => {
            return placeAt(
                Turtle.mainTurtle.position.x,
                Turtle.mainTurtle.position.y - 1,
                Turtle.mainTurtle.position.z
            );
        },
        getFuelLevel: () => Turtle.mainTurtle.fuelLevel.value,
        select: (slotNum: number): true => {
            Turtle.mainTurtle.selectedSlot.value = slotNum - 1;
            return true;
        },
        getItemCount: (slotNum?: number): number =>
            Turtle.mainTurtle.inventory[slotNum != undefined ? slotNum - 1 : Turtle.mainTurtle.selectedSlot.value]
                .amount,
        refuel: (n: number) => {
            if (n != 1) console.warn("not implemented for n != 1");
            if (addToInventory(Turtle.mainTurtle.selectedSlot.value, -1, "minecraft:coal").amount == 1) {
                Turtle.mainTurtle.fuelLevel.value += 80;
                return true;
            }

            return false;
        }
    } as unknown as typeof turtle;

    (globalThis as any).os = {
        pullEvent: async (filter?: string | undefined): Promise<void> => {
            new Promise((res) => setTimeout(res, 2000));
        }
    } as unknown;
}
