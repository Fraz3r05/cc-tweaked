@echo off

setlocal enabledelayedexpansion
for %%I in (tower/tower tower/startup) do (
  echo building %%I
  (
    echo import { main } from "./src/%%I";
    echo.
    echo main^(^);
  ) > main.ts

  call tstl

  set "tmppath=%%I"
  set "tmppath=!tmppath:/=\!"
  echo d | xcopy main.lua "..\..\build\!tmppath!.lua" /i /y
)
endlocal
