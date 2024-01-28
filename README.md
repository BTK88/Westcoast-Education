---

# Installation Instructions

Welcome to the WestCoast-Education repository. Follow these steps to get the application up and running on your local environment:

### Step 1: Clone the Repository
To begin, you need to clone the WestCoast-Education repository to your local machine. Open your terminal and run the following command:

```bash
git clone https://github.com/BTK88/Westcoast-Education
```

This command copies all the files from the repository to your computer.

### Step 2: Install Dependencies
After cloning the repository, navigate to the project directory and install the necessary dependencies. Run the following command in your terminal:

```bash
npm install
```

This command fetches and installs all the dependencies required for the project to run correctly.

### Step 3: Start the Application
Once the dependencies are installed, you can start the application. To do this, execute the following command in the terminal:

```bash
npx json-server --watch db.json
```

This command starts a local JSON server and watches for any changes in the `db.json` file, providing a full fake REST API for testing and development purposes.

---

Follow these steps carefully to set up and start using the WestCoast-Education application on your local system. If you encounter any issues, please refer to the troubleshooting guide or submit an issue on GitHub.