---
sidebar_position: 2
---

# Installation Guide

Follow these steps to set up the School Management System on your local machine.

## Step 1: Clone the Repositories
```bash
# Create a project folder
mkdir school-management-system
cd school-management-system

# Clone the frontend
git clone https://github.com/Cyfamod-Technologies/school-fe-nextjs.git frontend

# Clone the backend
git clone https://github.com/Cyfamod-Technologies/school-be-laravel.git backend
```

## Step 2: Backend Setup (Laravel)

### 2.1 Install PHP Dependencies
```bash
cd backend
composer install
```

### 2.2 Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 2.3 Configure Database

Edit `.env` file and set your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=school_management
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 2.4 Create Database
```bash
# Create the database (if using MySQL command line)
mysql -u root -p
CREATE DATABASE school_management;
exit;

# Run migrations
php artisan migrate

# Seed database with sample data (optional)
php artisan db:seed
```

### 2.5 Start Backend Server
```bash
php artisan serve
```

Backend will run at: `http://localhost:8000`

## Step 3: Frontend Setup (Next.js)

### 3.1 Install Node Dependencies

Open a **new terminal window**:
```bash
cd ../frontend  # Navigate to frontend folder
npm install
```

### 3.2 Configure Environment
```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` and set the backend API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3.3 Start Frontend Server
```bash
npm run dev
```

Frontend will run at: `http://localhost:3000`

## Step 4: Verify Installation

Open your browser and navigate to:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api

You should see the login page if everything is working correctly.

## Default Login Credentials

After seeding the database, you can use these credentials:

- **Admin**
  - Email: `admin@school.com`
  - Password: `password`

- **Teacher**
  - Email: `teacher@school.com`
  - Password: `password`

- **Student**
  - Email: `student@school.com`
  - Password: `password`

:::warning
Change these passwords in production!
:::

## Troubleshooting

### Backend Issues

**Error: "Could not find driver"**
```bash
# Install PHP MySQL extension
# Ubuntu/Debian:
sudo apt-get install php-mysql

# Mac (using Homebrew):
brew install php@8.1
```

**Error: "Permission denied" on storage folder**
```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

### Frontend Issues

**Error: "Module not found"**
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: "Port 3000 already in use"**
```bash
# Use a different port
npm run dev -- -p 3001
```

## Next Steps

Now that everything is installed:

👉 [Quick Start Tutorial →](/getting-started/quick-start)
