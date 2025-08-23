local x = 0
local y = 0
local z = 0

local orientation = 0

function refuel()
    local fuelLevel = turtle.getFuelLevel()
    if fuelLevel == "unlimited" or fuelLevel > 0 then
        return
    end
        
    local function tryRefuel()
        for n = 1, 16 do
            if turtle.getItemCount(n) > 0 then
                turtle.select(n)
                if turtle.refuel(1) then
                    turtle.select(1)
                    return true
                end
            end
        end
        turtle.select(1)
        return false
    end

    if not tryRefuel() then
        print("Add more fuel to continue...")
        while not tryRefuel() do
            os.pullEvent("turtle_inventory")
        end
        print("Resume...")
    end
end

function up()
    refuel()
    z = z + 1
    turtle.up()
end

function down()
    refuel()
    z = z - 1
    turtle.down()
end

function turnTo(face)
    refuel()
    if orientation == 3 and face == 0 then
        turtle.turnLeft()
    elseif orientation == 0 and face == 3 then
        turtle.turnRight()
    else
        while orientation ~= face do
            if orientation < face then
                turtle.turnLeft()
                orientation = orientation + 1
            else
                turtle.turnRight()
                orientation = orientation - 1
            end
        end
    end
    orientation = face
end

function xPos()
    turnTo(0)
    refuel()
    turtle.forward()
    x = x + 1
end

function xNeg()
    turnTo(2)
    refuel()
    turtle.forward()
    x = x - 1
end

function yPos()
    turnTo(1)
    refuel()
    turtle.forward()
    y = y + 1
end

function yNeg()
    turnTo(3)
    refuel()
    turtle.forward()
    y = y - 1
end

function place(itemName, isDown)
    local function tryPlace()
        for slot=1, 16 do
            if turtle.getItemCount(slot) > 0 then
                if turtle.getItemDetail(slot).name == itemName then
                    turtle.select(slot)
                    if isDown then
                        turtle.placeDown()
                    else
                        turtle.place()
                    end
                    return true            
                end
            end
        end
        
        return false
    end

    if not tryPlace() then
        print("Add " .. itemName .. " blocks")
        while not tryPlace() do
            os.pullEvent("turtle_inventory")            
        end
        print("Resume...")
    end
end

function moveTo(_x, _y, _z)
    if _z > z then
        for n = 1, _z - z do
            up()
        end
    else
        for n = 1, z - _z do
            down()
        end
    end
    
    if _x > x then
        for n=1, _x - x do
            xPos()
        end
    else
        for n=1, x - _x do
            xNeg()
        end
    end
    
    if _y > y then
        for n=1, _y - y do
            yPos()
        end
    else
        for n=1, y - _y do
            yNeg()
        end
    end
end

function placeAtFacing(itemName, _x, _y, _z, face)
    if face == -1 then
        moveTo(_x, _y, _z+1)
        place(itemName, true)
    else
        if face == 0 then
            moveTo(_x-1, _y, _z)
        elseif face == 1 then
            moveTo(_x, _y-1, _z)
        elseif face == 2 then
            moveTo(_x+1, _y, _z)
        elseif face == 3 then
            moveTo(_x, _y+1, _z)
        end
        turnTo(face)
        place(itemName, false)
    end
end
