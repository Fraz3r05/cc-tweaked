import { reactive, ref } from "vue";

export class Turtle {
    public static mainTurtle = new Turtle();

    public static cardinal = [
        { x: 0, z: 1 },
        { x: 1, z: 0 },
        { x: 0, z: -1 },
        { x: -1, z: 0 }
    ];

    public position = reactive({ x: 0, y: 0, z: 0 });
    public orientation = ref(0);
    public inventory = reactive([] as { name: string; amount: number }[]);
    public fuelLevel = ref(80);
    public selectedSlot = ref(0);

    constructor() {
        for (let i = 0; i < 16; i++) this.inventory[i] = { name: "", amount: 0 };
    }
}
