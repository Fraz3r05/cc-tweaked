require("building")
require("grid")

names = {
"ae2:black_smart_dense_cable",
"ae2:fluix_glass_cable",
"ae2:growth_accelerator",
--"minecraft:dirt"
"mysticalagradditions:insanium_farmland"
}

denseCount = 0
cableCount = 0
fieldCount = 0
growthCount = 0

for n=1, table.getn(grid) do
    for y=1, table.getn(grid[n]) do
        for x=1, table.getn(grid[n][y]) do
            item = grid[n][y][x]
            if item < 5 then
                dir = -1
                if n == 1 then
                    dir = 1
                end
                placeAtFacing(names[item], x-1, -y+1, n-1, dir)
            end
            
            if item == 1 then
                denseCount = denseCount + 1
            elseif item == 2 then
                cableCount = cableCount + 1
            elseif item == 3 then
                growthCount = growthCount + 1
            elseif item == 4 then
                fieldCount = fieldCount + 1
            end
        end
    end    
end

print("needed:")
print("Dense Cable: " .. denseCount)
print("Cable: " .. cableCount)
print("Growth Accelerator: " .. growthCount)
print("Field: " .. fieldCount)
