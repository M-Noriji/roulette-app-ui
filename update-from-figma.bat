@echo off
cd /d "%~dp0"

echo ==============================
echo  Figmaからの修正をGitHubへ反映します
echo ==============================
echo.

echo 現在の変更状況を表示します...
git status

echo.
set /p MSG="コミットメッセージを入力してください（未入力なら「更新」）： "

if "%MSG%"=="" set MSG=更新

echo.
echo ---- 変更をステージングしています...
git add .

echo.
echo ---- コミットしています...
git commit -m "%MSG%"

echo.
echo ---- GitHubへプッシュしています...
git push

echo.
echo ==== 完了しました。Enterキーを押すとウィンドウを閉じます ====
pause >nul
