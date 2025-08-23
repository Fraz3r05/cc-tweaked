-- install: wget run https://raw.githubusercontent.com/Fraz3r05/cc-tweaked/refs/heads/main/install.lua
-- update:  install
-- git add .; git commit -m "update"; git push

local scripts = {
    "install.lua",
    "createFile.lua",
    "importFile.lua",
}

local files = {
    "helloPastebin.lua"
}

print("installing pastebin content...\n")

for i=1, table.getn(scripts) do
    local name = scripts[i]
    
    shell.execute("rm", name)
    shell.execute("wget", "https://raw.githubusercontent.com/Fraz3r05/cc-tweaked/refs/heads/main/" .. name)
end

print("\n")

for i=1, table.getn(files) do
    local name = files[i]
    
    shell.execute("createFile", name)
end
