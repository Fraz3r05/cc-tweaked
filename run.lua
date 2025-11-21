local args = { ... }
local fileName = args[1]
shell.execute("wget", "run", "https://raw.githubusercontent.com/Fraz3r05/cc-tweaked/refs/heads/main/build/" .. fileName)
