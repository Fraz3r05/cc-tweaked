function addToSet(list, vec2)
    minDist = 1000000
    minIndex = 0
    for n=1, table.getn(list) do        
        sub = {list[n][1] - vec2[1], list[n][2] - vec2[2]}
        dist = math.sqrt(sub[1] * sub[1] + sub[2] * sub[2])
        if dist < minDist then
            minDist = dist
            minIndex = n
        end
    end
    local pos = {list[minIndex][1], list[minIndex][2]}
    
    table.remove(list, minIndex)
    table.insert(list, minIndex, vec2)
    
    list[minIndex][1] = pos[1]
    list[minIndex][2] = pos[2]
    return list
end

function addLists(list1, list2)
    for n=1, table.getn(list2) do
        table.insert(list1, list2[n])
    end
    return list1
end
