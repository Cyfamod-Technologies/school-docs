---
sidebar_position: 3
---

# Quick Start Tutorial

This tutorial walks you through creating your first student record and enrolling them in a class.

## Prerequisites

- You've completed the [Installation Guide](/getting-started/installation)
- Both frontend and backend servers are running
- You're logged in as an admin

## Step 1: Access the Admin Dashboard

1. Navigate to `http://localhost:3000`
2. Log in with admin credentials:
   - Email: `admin@school.com`
   - Password: `password`
3. You should see the admin dashboard

## Step 2: Create a Student

1. Click **"Students"** in the sidebar
2. Click **"Add New Student"** button
3. Fill in the student information:
   - First Name: John
   - Last Name: Doe
   - Date of Birth: 2010-05-15
   - Email: john.doe@student.com
   - Grade Level: 9
4. Click **"Save"**

## Step 3: Enroll Student in a Class

1. Go to **"Classes"** in the sidebar
2. Select a class (e.g., "Mathematics Grade 9")
3. Click **"Enroll Students"**
4. Search for "John Doe"
5. Click **"Enroll"**

## Step 4: View Student Profile

1. Go back to **"Students"**
2. Click on "John Doe"
3. You should see:
   - Student information
   - Enrolled classes
   - Attendance record
   - Grades (if any)

## What's Next?

- **[User Guide](/user-guide/students)** - Learn about all features
- **[API Documentation](/api/authentication)** - Build integrations
- **[Developer Guide](/developer-guide/overview)** - Contribute to the project

## Common Tasks

### Adding a Teacher

1. Navigate to **"Teachers"**
2. Click **"Add New Teacher"**
3. Fill in teacher details
4. Assign subjects

### Creating a Class

1. Go to **"Classes"**
2. Click **"Create New Class"**
3. Set class name, subject, and schedule
4. Assign a teacher

### Recording Attendance

1. Go to **"Attendance"**
2. Select a class
3. Select date
4. Mark students as present/absent
5. Save

## Need Help?

If you encounter any issues:

- Check the [Troubleshooting Guide](/getting-started/installation#troubleshooting)
- View the [API Documentation](/api/endpoints)
- Open an issue on [GitHub](https://github.com/Cyfamod-Technologies)
