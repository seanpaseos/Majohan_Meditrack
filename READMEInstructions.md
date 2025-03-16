How to Access Our Project
Follow these steps to set up and run our project on your local machine:

1. Download the Project Files
  Download the entire project folder from the provided source.
2. Import the SQL Database
  Open XAMPP and start Apache and MySQL.
  Open phpMyAdmin by going to http://localhost/phpmyadmin/.
  Create a new database (db_paseos).
  Import the provided SQL file into this database.
3. Open the Project in VS Code
  Open VS Code.
  Click File → Open Folder.
  Select the folder Mojahan_Project (not Majohan_Meditrack).
4. Start the Server
  Open a new terminal in VS Code.
  Run the following command:
  node server.js
5. Access the Web Application
  Once the server is running, open your browser and go to:
  arduino
  Copy code
  http://localhost:3000
  Click the link to access the login page.
6. Log In to the System
  Doctor Credentials
    Username: LIC12345
    Password: password123
  Assistant Credentials
    Username: assistant1
    Password: securepass123
Each role will be redirected to its respective page upon successful login.

Unable to Start XAMPP

Ensure Apache and MySQL are not blocked by a firewall or another application.

Check if ports 80 (Apache) and 3306 (MySQL) are in use by running:

netstat -ano | findstr :80
netstat -ano | findstr :3306

If another application is using these ports, either stop that process or change XAMPP's port settings.

Port 3000 is Already in Use

To kill a process running on port 3000, follow these steps:

Find the Process ID (PID) using the command:

netstat -ano | findstr :3000

This will return a line similar to:

TCP    0.0.0.0:3000             0.0.0.0:0              LISTENING       12345

In this example, 12345 is the PID.

Kill the process using:

taskkill /PID 12345 /F

Replace 12345 with the actual PID you found.

After completing these steps, restart the server using node server.js.
