//fetches stock data based on the provided date range
import { PrismaClient, Stock } from '@prisma/client';
import { StockInput } from '../resolvers/stockResolver';

const prisma = new PrismaClient();

export const getStocks = async ({ startDate, endDate }: StockInput): Promise<Record<string, Stock[]>> => {
  const where = {
    AND: [startDate ? { date: { gte: startDate } } : {}, endDate ? { date: { lte: endDate } } : {}],
  };

  const stocks = await prisma.stock.findMany({
    where,
  });

  return { stocks: stocks };
};
