let x = 0;
let y = 0;
let z = 0;

let orientation = 0;

export function getPos() {
    return { x, y, z };
}

function refuel() {
    let fuelLevel = turtle.getFuelLevel();
    if (fuelLevel == "unlimited" || fuelLevel > 0) return;

    function tryRefuel() {
        for (let n = 1; n <= 16; n++) {
            if (turtle.getItemCount(n) > 0) {
                turtle.select(n);
                if (turtle.refuel(1)) {
                    turtle.select(1);
                    return true;
                }
            }
        }
        turtle.select(1);
        return false;
    }

    if (!tryRefuel()) {
        print("Add more fuel to continue...");
        while (!tryRefuel()) {
            os.pullEvent("turtle_inventory");
        }
        print("Resume...");
    }
}

function up() {
    refuel();
    y++;
    turtle.up();
}

function down() {
    refuel();
    y--;
    turtle.down();
}

function turnTo(face: number) {
    if (orientation == 3 && face == 0) turtle.turnLeft();
    else if (orientation == 0 && face == 3) turtle.turnRight();
    else {
        while (orientation != face) {
            if (orientation < face) {
                turtle.turnLeft();
                orientation = orientation + 1;
            } else {
                turtle.turnRight();
                orientation = orientation - 1;
            }
        }
    }
    orientation = face;
}

function xPos() {
    turnTo(0);
    refuel();
    turtle.forward();
    x++;
}

function xNeg() {
    turnTo(2);
    refuel();
    turtle.forward();
    x--;
}

function zPos() {
    turnTo(1);
    refuel();
    turtle.forward();
    z++;
}

function zNeg() {
    turnTo(3);
    refuel();
    turtle.forward();
    z--;
}

function place(itemName: string, isDown: boolean) {
    function tryPlace() {
        for (let slot = 1; slot <= 16; slot++) {
            if (turtle.getItemCount(slot) > 0) {
                if ((turtle.getItemDetail(slot) as ItemDetail).name == itemName) {
                    turtle.select(slot);
                    if (isDown) turtle.placeDown();
                    else turtle.place();

                    return true;
                }
            }
        }
        return false;
    }

    if (!tryPlace()) {
        print("Add " + itemName + " blocks");
        while (!tryPlace()) os.pullEvent("turtle_inventory");
        print("Resume...");
    }
}

export function moveTo(_x: number, _y: number, _z: number) {
    if (_y > y) while (y != _y) up();

    while (x != _x)
        if (_x > x) xPos();
        else xNeg();

    while (z != _z)
        if (_z > z) zPos();
        else zNeg();

    if (_y < y) while (y != _y) down();
}

export function placeAtFacing(itemName: string, _x: number, _y: number, _z: number, face: number) {
    if (face == -1) {
        moveTo(_x, _y + 1, _z);
        place(itemName, true);
    } else {
        if (face == 0) moveTo(_x - 1, _y, _z);
        else if (face == 1) moveTo(_x, _y, _z - 1);
        else if (face == 2) moveTo(_x + 1, _y, _z);
        else if (face == 3) moveTo(_x, _y, _z + 1);

        turnTo(face);
        place(itemName, false);
    }
}
