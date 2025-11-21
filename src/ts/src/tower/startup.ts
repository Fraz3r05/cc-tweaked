declare class MePeripheral implements IPeripheral {
    getItems(filter: { name: string }): { count: number }[];
}

export function main() {
    const me: MePeripheral = peripheral.wrap("down")! as MePeripheral;

    function getItemCount(itemName: string) {
        const item = me.getItems({ name: itemName });
        return item[0].count;
    }

    const itemName = "ae2:black_smart_dense_cable";
    print(getItemCount("ae2:black_smart_dense_cable"));
}
