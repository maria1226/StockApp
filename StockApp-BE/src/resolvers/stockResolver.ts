import { stockService } from '../services';

export type StockInput = {
  startDate: string;// Define the input type for stock queries - start date
  endDate: string;// Define the input type for stock queries - end date
};

export const getStocks = async (_parent: any, args: StockInput, _context: any) =>
  stockService.getStocks(args).catch((err: Error) => {
    throw new Error(err.message);// Asynchronously fetch stock data using stockService, and handle potential errors
  });

export default {
  Query: {
    stocks: getStocks,// Define a GraphQL query resolver for fetching stocks using the getStocks function
  },
};
