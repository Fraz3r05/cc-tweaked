me = peripheral.wrap("front")

function getItemCount(itemName)
    item = me.getItems(
        {
            name=itemName
        }
    )

    if table.getn(item) == 0 then
        return 0
    else
        return item[1].count
    end
end

itemName = "ae2:black_smart_dense_cable"
requiredCount = 56
print(getItemCount(itemName))

while true do
    if getItemCount(itemName) >= requiredCount then
        break
    end
    
    crafting = me.craftItem({
        name=itemName,
        count=requiredCount-getItemCount(itemName)
    })

    while not crafting.isDone() and not crafting.isCanceled() do
        local event, error, id, message = os.pullEvent("ae_crafting")
        print("update on " .. id)
        if error then
            print("error: " .. message)
        else
            print("new state " .. message)
        end
    end
    if crafting.isDone() and getItemCount(itemName) >= requiredCount then
        break
    end
end

me.exportItem({
    name = itemName,
    count = requiredCount
    },
"front")
