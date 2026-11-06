@echo off
title Deploying ANIKA Website to GitHub Pages
color 0D
cls
echo ===================================================================
echo     ANIKA - A LITTLE WORLD MADE JUST FOR YOU (SORRY BABUU)
echo               1-Click GitHub Pages Deployment
echo ===================================================================
echo.

echo [1/3] Building the website...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Website build fail ho gaya! Please check errors above.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Staging and committing files to Git...
git add .
git commit -m "Deploy latest updates for sorry-babuu website"

echo.
echo [3/3] Uploading to GitHub repository...
echo (Agar browser window khule, toh bas 'Sign in with your browser' pe click karna)
echo.
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo ---------------------------------------------------------------
    echo [NOTE] Agar Git credential popup na aaye ya push fail ho,
    echo aap direct gh-pages deployment bhi run kar sakte hain:
    echo Command: npm run deploy
    echo ---------------------------------------------------------------
    echo.
    set /p retry="Kya aap direct 'npm run deploy' try karna chahte hain? (y/n): "
    if /i "%retry%"=="y" (
        call npm run deploy
    ) else (
        pause
        exit /b 1
    )
)

echo.
echo ===================================================================
echo   SUCCESS! Website GitHub par upload ho gayi hai!
echo.
echo   Aapka Live Link:
echo   https://arman33014-web.github.io/sorry-babuu/
echo.
echo   (Note: GitHub Pages ko live hone mein 1-2 minute lagte hain)
echo ===================================================================
echo.
pause
