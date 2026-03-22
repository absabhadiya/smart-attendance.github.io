# Deployment Guide - Smart Attendance System

This guide outlines how to deploy the Smart Attendance System for different use cases.

## Option 1: Local Network Deployment (Recommended)
This is the easiest way to use the system within a school, office, or home. Your computer acts as the server, and others can access the dashboard from their own devices.

1. **Start the Server**:
   ```bash
   npm start
   ```
2. **Find your Local IP**:
   - Open Command Prompt and type `ipconfig`.
   - Your current IP appears to be: **`192.168.0.100`**. 
3. **Access from Other Devices**:
   - On a phone or laptop connected to the **same Wi-Fi**, open this link:
     👉 **[http://192.168.0.100:3000](http://192.168.0.100:3000)**

> [!WARNING]
> If you see "This site can't be reached", make sure you have run `npm start` in your terminal first!

---

## Option 2: Public (Universal) Link via Localtunnel
If you want a link that anyone on the internet can use, use **Localtunnel**. It's free and lets you choose a name.

1. **Install Localtunnel**:
   ```bash
   npm install -g localtunnel
   ```
2. **Start the Tunnel with a custom name**:
   ```bash
   lt --port 3000 --subdomain smart-attendance
   ```
3. **Your Universal Link**:
   👉 **[https://smart-attendance.loca.lt](https://smart-attendance.loca.lt)**

---

## Option 3: Remote Access via Ngrok
Another popular tool for a temporary public link.

1. **Install Ngrok**: Download from [ngrok.com](https://ngrok.com/).
2. **Start the Tunnel**:
   ```bash
   ngrok http 3000
   ```
3. **Share the Link**: Ngrok will provide a public URL (e.g., `https://random-id.ngrok-free.app`). 

> [!IMPORTANT]
> The face recognition still happens on the computer where the server is running. The camera must be physically connected to that machine.

---

## Option 3: Docker Deployment (Advanced)
Docker ensures the application runs exactly the same on any machine.

1. **Install Docker Desktop**.
2. **Build and Start**:
   ```bash
   docker-compose up --build
   ```
3. **Access**: Navigate to `http://localhost:3000`.

---

## Production Checklist
- [ ] **Database**: Ensure your PostgreSQL database is backed up.
- [ ] **Environment Variables**: Update `.env` with production-ready `JWT_SECRET` and `EMAIL` credentials.
- [ ] **Security**: If using Ngrok, keep your public URL private.
- [ ] **Hardware**: Ensure the deployment machine has a dedicated camera and sufficient CPU for face recognition.
