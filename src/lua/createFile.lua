local args = { ... }

local fileName = args[1]

file = io.open(fileName, "w")
if file == nil then
    print("failed to open file: " .. fileName)
	return
end

io.output(file)
io.write([[
	require("importFile")
	import("]] .. fileName .. [[")
]])
io.close()

print("created file: " .. fileName)
