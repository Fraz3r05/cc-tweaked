require("building")
require("geom")
require("list-util")

bn = {
"minecraft:light_blue_stained_glass",
"minecraft:quartz_bricks"
}

a = {
{-14,-14},
{-10,-14},
{-6,-14},
{-2,-14},
{2,-14},
{6,-14},
{10,-14},

{14,-14},
{14,-10},
{14,-6},
{14,-2},
{14,2},
{14,6},
{14,10},

{14,14},
{10,14},
{6,14},
{2,14},
{-2,14},
{-6,14},
{-10,14},

{-14,14},
{-14,10},
{-14,6},
{-14,2},
{-14,-2},
{-14,-6},
{-14,-10}
}

floorCount = 29
floorHeight = 7

angle = math.pi / 2

local startZ = 7 * 24 + 4
local buildZ = 0
for fc=1, floorCount+1 do
    alpha = (fc-1) * (angle / floorCount)
    
    for f=1, floorHeight do
        buildZ = buildZ + 1
        local rotBlocks = {}
        for n=1, table.getn(a) do
            x = math.cos(alpha) * a[n][1] - math.sin(alpha) * a[n][2]
            y = math.sin(alpha) * a[n][1] + math.cos(alpha) * a[n][2]
        
            table.insert(rotBlocks, {x, y, 2})
        end
        
        for i=1, 4 do
            local index = (i-1)*7 + 1
            for e=1, 2 do
                rotBlocks[index][e] = math.floor(rotBlocks[index][e]+ 0.5)
            end
        end
        
        local line = drawLine(rotBlocks[1][1], rotBlocks[1][2], rotBlocks[8][1], rotBlocks[8][2])
        line = addLists(line, drawLine(rotBlocks[8][1], rotBlocks[8][2], rotBlocks[15][1], rotBlocks[15][2]))
        line = addLists(line, drawLine(rotBlocks[15][1], rotBlocks[15][2], rotBlocks[22][1], rotBlocks[22][2]))
        line = addLists(line, drawLine(rotBlocks[22][1], rotBlocks[22][2], rotBlocks[1][1], rotBlocks[1][2]))

        for n=1, table.getn(line) do
            table.insert(line[n], 1) 
        end

        for n=1, table.getn(rotBlocks) do
            addToSet(line, rotBlocks[n])
        end
        
        for n=1, table.getn(line) do
            local item = line[n][3]
            if f == 1 then
                item = 2
            end
            if buildZ > startZ then
                placeAtFacing(bn[item], line[n][1], line[n][2], buildZ, -1)
            end
        end
    end
end
