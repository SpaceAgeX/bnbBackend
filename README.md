# BoostBNB Backend

This is the backend for BoostBNB, a Node.js application designed to provide AI-powered tools for Airbnb hosts. The backend is hosted on a server and is configured with NGINX as a reverse proxy for secure and efficient HTTP/HTTPS communication.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Dependencies](#dependencies)
3. [Setup](#setup)
4. [Running the Application](#running-the-application)
5. [Updating the API](#updating-the-api)

---

### Getting Started
To set up the backend locally or on a server, follow the instructions below. This assumes you have Node.js and npm installed.

### Dependencies
The backend uses the following dependencies:
- [Express](https://expressjs.com/): For building the web server.
- [PM2](https://pm2.keymetrics.io/): For process management on the server.
- [NGINX](https://www.nginx.com/): For reverse proxy and HTTPS configuration.

---

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bnbbackend.git
   cd bnbbackend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the application locally:
   ```bash
   node server.js
   ```
   Test the app by visiting `http://localhost:8080` in your browser.

---

### Running the Application on a Server
The backend is hosted on a server with the following setup:

1. **NGINX Configuration**
   NGINX is configured as a reverse proxy to forward requests from port `80` (HTTP) or `443` (HTTPS) to the Node.js application on port `8080`. For the NGINX configuration, refer to:
   ```nginx
   server {
       listen 80;
       server_name boostbnb.cloud www.boostbnb.cloud;

       location / {
           proxy_pass http://localhost:8080;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

2. **PM2 Process Manager**
   PM2 is used to manage the Node.js process:
   ```bash
   pm2 start server.js --name "bnb-backend"
   pm2 save
   pm2 startup
   ```

---

### Updating the API
To deploy updates to the API, follow these steps:

1. **SSH into the Server:**
   ```bash
   ssh root@your-server-ip
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd /var/www/bnbbackend
   ```

3. **Pull the Latest Changes from GitHub:**
   ```bash
   git pull origin main
   ```

4. **Install New Dependencies (if any):**
   ```bash
   npm install
   ```

5. **Restart the Application with PM2:**
   ```bash
   pm2 restart bnb-backend
   ```

6. **Verify the Update:**
   - Test locally from the server:
     ```bash
     curl http://localhost:8080
     ```
   - Test externally by visiting:
     ```
     https://boostbnb.cloud
     ```

---

### Notes
- Ensure your domain (`boostbnb.cloud`) is correctly pointed to your server's IP address via DNS.
- Use Certbot for HTTPS setup and renewal:
  ```bash
  sudo certbot --nginx -d boostbnb.cloud -d www.boostbnb.cloud
  sudo certbot renew --dry-run
  ```

For any issues, check the logs:
- **NGINX Logs:**
  ```bash
  sudo tail -n 20 /var/log/nginx/error.log
  ```
- **PM2 Logs:**
  ```bash
  pm2 logs bnb-backend
  ```

