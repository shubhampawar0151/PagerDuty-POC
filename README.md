Setup Instructions:
1. Clone the repository:

Clone the repository from GitHub: https://github.com/shubhampawar0151/PagerDuty-POC.git

Currently, all the working changes are on the main branch.

2. Install dependencies:

After cloning, open a terminal and navigate to the project directory:

**cd PagerDuty-POC**

Run the following command to install all necessary dependencies:

**npm install**

This will create the node_modules folder required for development.

3. Set up the API Key:

To display PagerDuty data on the dashboard, you’ll need to set an API key in the .env file located within the repo.

Open the .env file and update the following line:

**VITE_API_TOKEN=u+U6ykS_EKB8Q3cXYmdg**

This API key is connected to my instance and can be used temporarily for testing.

5. Run the application:

Start the application with the command:

**npm run dev**



7. Launch the Dashboard:
   
Open your browser and navigate to:

**http://localhost:5173/**

You should now see the PagerDuty Insight dashboard.
