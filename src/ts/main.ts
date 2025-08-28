import { grid } from "./grid";
import { moveTo, placeAtFacing } from "./building";

let names = [
    "ae2:black_smart_dense_cable",
    "ae2:fluix_glass_cable",
    "ae2:growth_accelerator",
    "mysticalagradditions:insanium_farmland"
];

const floors = 3;

for (let floor = 0; floor < floors + 1; floor++) {
    moveTo(-2, 1, 2);

    for (let n = 0; n < (floor == floors ? 1 : grid.length); n++)
        for (let z = 0; z < grid[n].length; z++)
            for (let x = 0; x < grid[n][z].length; x++) {
                let item = grid[n][z][x];
                if (item >= 0) placeAtFacing(names[item], x, n + floor * grid.length, -z, n == 1 ? 1 : -1);
            }
}
