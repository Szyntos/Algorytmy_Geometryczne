@for /f "tokens=*" %%a in ('dir /ad /b') do for /f "tokens=*" %%b in ('dir /d /b %%a') do @if /i not %%a==_remove.git if /i not %%a==readme if /i not %%a==status.bat if /i not %%b==readme echo ! & echo ! & echo ! & echo ! & echo ! & echo ! & echo ! & echo ! & echo ! & echo ! & echo ! & echo ! & echo %%a/%%b & echo ! & git --git-dir=%%a/%%b/.git --work-tree=%%a/%%b status & echo pull & git --git-dir=%%a/%%b/.git --work-tree=%%a/%%b pull --dry-run & echo push & git --git-dir=%%a/%%b/.git --work-tree=%%a/%%b push --dry-run
pause 