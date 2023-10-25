import axios from 'axios';// Import the Axios library for making HTTP requests
import { PrismaClient } from '@prisma/client';// Import the PrismaClient for interacting with the database

const prisma = new PrismaClient();// Create an instance of the PrismaClient

const API_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/AAPL';// Define the base URL for Yahoo Finance API
const FIVE_YEARS_IN_SECONDS = 5 * 365 * 24 * 60 * 60;// Calculate the duration of five years in seconds

(async () => {
  const now = Math.floor(Date.now() / 1000);// Get the current timestamp in seconds
  const fiveYearsAgo = now - FIVE_YEARS_IN_SECONDS;// Calculate a timestamp for five years ago

// Fetch historical stock data from the Yahoo Finance API within the specified date range
  const response = await axios.get(`${API_BASE_URL}?period1=${fiveYearsAgo}&period2=${now}&interval=1d`);
  const { result } = response.data.chart;// Extract the result data from the API response

  //fill a database with initial data
  console.log('response.data.chart:', response.data.chart);// Log the raw response data for debugging
  console.log('result:', result); // Log the extracted result data for debugging

  if (!result || !result[0].indicators || !result[0].indicators.quote) {//If any of the following conditions is true, execute the code inside the if block
    console.error('Invalid response data:', response.data.chart);
    return;// Handle and log errors if the response data is invalid
  }
 // Map the retrieved stock data into a format suitable for database storage
  const stocks = result[0].timestamp.map((timestamp: number, index: string | number) => ({
    date: new Date(timestamp * 1000).toISOString().slice(0, 10),// Format the date
    symbol: 'AAPL',// Set the stock symbol to 'AAPL'
    price: result[0].indicators.quote[0].close[index],// Retrieve the stock closing price
    
  }));
// Delete existing stock data in the database and insert the new stock data
  await prisma.stock.deleteMany();
  await prisma.stock.createMany({ data: stocks });
})();
