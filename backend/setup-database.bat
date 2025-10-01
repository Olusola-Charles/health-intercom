@echo off
setlocal enabledelayedexpansion

echo Setting up PostgreSQL database for Health InterComm
echo ==================================================
echo.

REM Check if PostgreSQL is installed
where psql >nul 2>&1
if errorlevel 1 (
    echo PostgreSQL is not installed or not in PATH.
    echo Please install PostgreSQL from: https://www.postgresql.org/download/windows/
    echo After installation, add PostgreSQL bin directory to your PATH.
    echo Example: C:\Program Files\PostgreSQL\15\bin
    pause
    exit /b 1
)

REM Prompt for database configuration
set /p DB_NAME="Enter database name [healthintercomm]: "
if "%DB_NAME%"=="" set DB_NAME=healthintercomm

set /p DB_USER="Enter database user [healthapp]: "
if "%DB_USER%"=="" set DB_USER=healthapp

echo Enter password for database user:
REM Use PowerShell to read password securely
for /f "delims=" %%i in ('powershell -Command "$pwd = Read-Host -AsSecureString; [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($pwd))"') do set "DB_PASS=%%i"

set /p DB_HOST="Enter database host [localhost]: "
if "%DB_HOST%"=="" set DB_HOST=localhost

set /p DB_PORT="Enter database port [5432]: "
if "%DB_PORT%"=="" set DB_PORT=5432

echo.
echo Creating database and user...

REM Create temporary SQL file
echo DROP DATABASE IF EXISTS %DB_NAME%; > temp_setup.sql
echo CREATE DATABASE %DB_NAME%; >> temp_setup.sql
echo DROP USER IF EXISTS %DB_USER%; >> temp_setup.sql
echo CREATE USER %DB_USER% WITH ENCRYPTED PASSWORD '%DB_PASS%'; >> temp_setup.sql
echo GRANT ALL PRIVILEGES ON DATABASE %DB_NAME% TO %DB_USER%; >> temp_setup.sql
echo ALTER USER %DB_USER% CREATEDB; >> temp_setup.sql

REM Execute SQL as postgres user
echo Please enter the postgres user password when prompted:
psql -U postgres -h %DB_HOST% -p %DB_PORT% -f temp_setup.sql

if errorlevel 1 (
    echo Database creation failed. Please check your PostgreSQL installation and credentials.
    del temp_setup.sql 2>nul
    pause
    exit /b 1
)

REM Set up extensions
echo \c %DB_NAME% > temp_extensions.sql
echo CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; >> temp_extensions.sql
echo CREATE EXTENSION IF NOT EXISTS "pgcrypto"; >> temp_extensions.sql
echo GRANT ALL ON SCHEMA public TO %DB_USER%; >> temp_extensions.sql
echo GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO %DB_USER%; >> temp_extensions.sql
echo GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO %DB_USER%; >> temp_extensions.sql
echo ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO %DB_USER%; >> temp_extensions.sql
echo ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO %DB_USER%; >> temp_extensions.sql

psql -U postgres -h %DB_HOST% -p %DB_PORT% -f temp_extensions.sql

REM Clean up temporary files
del temp_setup.sql 2>nul
del temp_extensions.sql 2>nul

if errorlevel 1 (
    echo Extension setup failed, but database was created.
    echo You may need to set up extensions manually.
) else (
    echo Database setup completed successfully
)

REM Generate DATABASE_URL
set "DATABASE_URL=postgresql://%DB_USER%:%DB_PASS%@%DB_HOST%:%DB_PORT%/%DB_NAME%?schema=public"

REM Create or update .env file
if exist ".env" (
    REM Update existing .env
    powershell -Command "(Get-Content .env) -replace '^DATABASE_URL=.*', 'DATABASE_URL=\"%DATABASE_URL%\"' | Set-Content .env"
    echo Updated DATABASE_URL in existing .env file
) else (
    REM Create new .env from template
    if exist ".env.example" (
        copy .env.example .env >nul
        powershell -Command "(Get-Content .env) -replace '^DATABASE_URL=.*', 'DATABASE_URL=\"%DATABASE_URL%\"' | Set-Content .env"
        echo Created new .env file with database configuration
    ) else (
        echo DATABASE_URL="%DATABASE_URL%" > .env
        echo Created basic .env file
    )
)

REM Generate JWT secret if not present
findstr /C:"JWT_SECRET=" .env >nul
if errorlevel 1 (
    REM Generate random JWT secret using PowerShell
    for /f "delims=" %%i in ('powershell -Command "[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))"') do set "JWT_SECRET=%%i"
    echo JWT_SECRET="%JWT_SECRET%" >> .env
    echo Generated new JWT secret
) else (
    findstr /C:"your-super-secure-jwt-secret" .env >nul
    if not errorlevel 1 (
        for /f "delims=" %%i in ('powershell -Command "[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))"') do set "JWT_SECRET=%%i"
        powershell -Command "(Get-Content .env) -replace '^JWT_SECRET=.*', 'JWT_SECRET=\"%JWT_SECRET%\"' | Set-Content .env"
        echo Generated new JWT secret
    )
)

echo.
echo Database configuration:
echo   Database: %DB_NAME%
echo   User: %DB_USER%
echo   Host: %DB_HOST%
echo   Port: %DB_PORT%
echo   URL: %DATABASE_URL%
echo.
echo Next steps:
echo 1. Run: npm run db:generate
echo 2. Run: npm run db:migrate
echo 3. Optional: npm run db:seed
echo.
pause