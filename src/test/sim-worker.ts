import { Turtle } from "./Turtle";
import { mock } from "./mock";

const world: string[][][] = [];

function updateTurtle() {
    const turtle = {
        position: { x: Turtle.mainTurtle.position.x, y: Turtle.mainTurtle.position.y, z: Turtle.mainTurtle.position.z },
        orientation: Turtle.mainTurtle.orientation.value,
        inventory: Turtle.mainTurtle.inventory.map((s) => ({ name: s.name, amount: s.amount })),
        fuelLevel: Turtle.mainTurtle.fuelLevel.value,
        selectedSlot: Turtle.mainTurtle.selectedSlot.value
    };
    self.postMessage({ type: "turtle", data: turtle });
}

function updateBlock(x: number, y: number, z: number) {
    self.postMessage({ type: "block", data: { x, y, z, block: world[x][y][z] } });
}

function setBlock(x: number, y: number, z: number, block: string) {
    if (world[x] == undefined) world[x] = [];
    if (world[x][y] == undefined) world[x][y] = [];
    if (world[x][y][z] == undefined) world[x][y][z] = block;

    updateBlock(x, y, z);
}

mock(updateTurtle, setBlock);
Turtle.mainTurtle.inventory[0] = { name: "mysticalagradditions:insanium_farmland", amount: 40 * 2 };
Turtle.mainTurtle.inventory[1] = { name: "ae2:fluix_glass_cable", amount: 143 * 2 };
Turtle.mainTurtle.inventory[2] = { name: "ae2:growth_accelerator", amount: 60 * 2 };
Turtle.mainTurtle.inventory[3] = { name: "ae2:black_smart_dense_cable", amount: 56 * 2 };
Turtle.mainTurtle.inventory[4] = { name: "minecraft:coal", amount: 64 };

import("./../ts/main");
