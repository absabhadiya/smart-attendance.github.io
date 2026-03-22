# Deployment Guide (24/7 Cloud Support)

This guide explains how to deploy to **Render** so your link stays active even when your laptop is off.

---

## 🚀 Deployment to Render (Full Cloud)

### 1. Requirements
- A **GitHub Repository** with your code.
- A **Supabase** account (for your database).

### 2. Steps to Deploy
1. **GitHub**: Push your code to a new private/public repository on GitHub.
2. **Render Dashboard**:
   - Create a **New > Web Service**.
   - Connect your GitHub repository.
3. **Configuration**:
   - **Runtime**: `Docker` (Render will automatically use your `Dockerfile`).
   - **Instance Type**: Recommended `Starter` (to handle Python/OpenCV RAM needs).
4. **Environment Variables**:
   Add these in Render Dashboard:
   - `DATABASE_URL`: Your Supabase URI.
   - `JWT_SECRET`: A long random string.
   - `NODE_ENV`: `production`
   - `CAMERA_SOURCE`: *(Optional)* If you have an IP camera, put the RTSP URL here.

---

## 📷 Handling the Camera in the Cloud
Since cloud servers don't have built-in webcams:
- **Option 1 (Manual marked)**: Use the "Manual Attendance" tab in your cloud-hosted dashboard.
- **Option 2 (IP Camera)**: Connect an internet-facing camera and put its link in the `CAMERA_SOURCE` environment variable.

---

## 🛠️ Performance Tips
- Face recognition requires significant CPU. If recognition is slow on the free tier, consider the **Starter** plan on Render.
- For best real-time results, keep the video feed resolution at **320px** (already optimized in `recognize_face.py`).
