function drawLine(x0, y0, x1, y1)
    local result = {}
    
    local dx = math.abs(x1 - x0)
    local sx = -1
    if x0 < x1 then
        sx = 1
    end
    
    local dy = -math.abs(y1 - y0)
    local sy = -1
    if y0 < y1 then
        sy = 1
    end
    
    local err = dx + dy
    
    while true do
        table.insert(result, {x0, y0})
        local e2 = 2 * err
        if e2 >= dy then
            if x0 == x1 then
                break
            end
            err = err + dy
            x0 = x0 + sx
        end
        if e2 <= dx then
            if y0 == y1 then
                break
            end
            err = err + dx
            y0 = y0 + sy
        end
    end
    return result
end
