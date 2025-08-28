local downloadedFiles = {}

function listContains(list, item)
    for i=1, table.getn(list) do
		if list[i] == item then
            return true
        end
    end
    return false
end

function import(fileName)
	local sourceName = "_" .. fileName
	
    if not listContains(downloadedFiles, fileName) then
    	  shell.execute("rm", sourceName)
    	  shell.execute("wget", "https://raw.githubusercontent.com/Fraz3r05/cc-tweaked/refs/heads/main/" .. fileName, sourceName)
        table.insert(downloadedFiles, fileName)
    end
    
    require(sourceName)
end
