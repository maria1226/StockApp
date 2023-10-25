# Stock Insights Dashboard

Welcome to the StockApp web app, a tool for analyzing and gaining insights into stock market data. This application is built using Node.js and TypeScript.

## Overview

During the selected time frame, this dashboard suggests the following stock market insights:

- The Best day to buy & price
- Best day to sell & price

## Installation

Follow these steps to set up and run the StockApp:

1. **Clone the Repository:**
```
git clone [repository URL]
```
```
cd stockapp
```

2. **Download and Install Node.js:**
Download Node.js from [https://nodejs.org/en/download](https://nodejs.org/en/download) and follow the installation instructions.

3. **Download and Install PostgreSQL:**
Download PostgreSQL from [https://www.postgresql.org/download](https://www.postgresql.org/download) and follow the installation steps.

4. **Database Tool (Optional):**
If you prefer a database management tool, you can download DBeaver from [https://dbeaver.io/](https://dbeaver.io/). After installation, you can connect to the PostgreSQL database using DBeaver.

5. **Install Backend and Frontend Dependencies:**
```
cd stockapp/StockApp-BE
npm install
```
```
cd stockapp/StockApp-FE
npm install
```


7. **Install Prisma:**
Install Prisma in the backend using the following command:
```
cd stockapp/StockApp-BE
npm install prisma
```


## Seed the Database
Seed the database with stock data using one of the following commands:
```
cd stockapp/StockApp-BE
npx ts-node ./src/seeds/stockSeed.ts or npm run seed
```
## Run the Backend and Frontend
```
cd stockapp/StockApp-BE
npm run dev
```
```
cd stockapp/StockApp-FE
npm run dev
```

### Access the WebApp
Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the StockApp.

### Access the GraphQL API
In the GraphQL Playground, you can create and execute queries to request specific data from the server.
Start by opening your web browser and navigating to [http://localhost:4000/graphql](http://localhost:4000/graphql).


