@echo off
REM 文字コードをUTF-8に変更（日本語の文字化け対策）
chcp 65001 >nul

REM このバッチファイルがあるフォルダに移動
cd /d "%~dp0"

echo ==============================
echo  Figmaの修正を GitHub に反映します
echo ==============================
echo.

echo 現在の変更内容を確認します...
git status

echo.
set /p MSG="コミットメッセージを入力してください（未入力なら「更新」で保存します）： "

if "%MSG%"=="" set MSG=更新

echo.
echo 変更をステージングしています...
git add .

echo.
echo コミットしています...
git commit -m "%MSG%"

echo.
echo GitHub にプッシュしています...
git push

echo.
echo すべて完了しました。Enterキーを押すとウィンドウを閉じます。
pause >nul
