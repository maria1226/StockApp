import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../styles/Home.module.css";
import { fetchDataFromBackend } from '../api/api';

interface StockData {
  date: string;
  price: number;
}

interface StockGraphProps {
  data: StockData[];
  onDateSelect: (selectedDates: { start: string | null, end: string | null }) => void;
}

function StockGraph({ data, onDateSelect }: StockGraphProps) {
  // States for selected date range and price analysis
  const [startData, setStartData] = useState<string | null>(null);
  const [endData, setEndData] = useState<string | null>(null);
  const [dateForBuy, setDateForBuy] = useState<string | null>(null);
  const [sellDate, setSellDate] = useState<string | null>(null);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);
  const [highestPrice, setHighestPrice] = useState<number | null>(null);

  // Function to handle user click to select start and end dates
  const handleDateClick = (entry: StockData) => {
    if (startData && endData) {
      alert('You have already selected both start and end dates. Clear selection to choose again.');
      return;
    }
  
    if (!startData) {
      setStartData(entry.date);
    } else if (!endData && entry.date >= startData) {
      setEndData(entry.date);
      if (onDateSelect) {
        onDateSelect({ start: startData, end: entry.date });
      }
    } else if (!endData && entry.date < startData) {
      alert(`End date (${entry.date}) cannot be before the start date (${startData}). Please choose a date after ${startData}.`);
    }
  };
  // Function to fetch data when start and end dates are selected
  const fetchData = async () => {
    if (startData && endData) {
      try {
        const response = await fetchDataFromBackend(startData, endData);
        // Process response data if needed
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  // Use useEffect to refetch data when startData or endData changes
  useEffect(() => {
    fetchData();
  }, [startData, endData]);


  // Function to find and analyze prices within a specified date range
  const findPricesInPeriod = () => {
    // Check if startData, endData, and the validity of the date range are all true
    if (startData && endData && startData <= endData) {
      // Filter data entries that fall within the specified date range
      const pricesInPeriod = data.filter((entry) =>
        entry.date >= startData && entry.date <= endData
      );

      // Check if there are prices in the specified date range
      if (pricesInPeriod.length > 0) {
        // Extract price values from the filtered data
        const priceValues = pricesInPeriod.map((entry) => entry.price);

        // Calculate the minimum and maximum prices within the range
        const minPrice = Math.min(...priceValues);
        const maxPrice = Math.max(...priceValues);

        // Utility function to find the date associated with a given price
        const findDate = (price: number) =>
          pricesInPeriod.find((entry) => entry.price === price)?.date || null;

        // Set the date for buying (lowest price date) and selling (highest price date)
        setDateForBuy(findDate(minPrice));
        setSellDate(findDate(maxPrice));
        setLowestPrice(minPrice);
        setHighestPrice(maxPrice);
      } else {
        // If there are no prices in the specified date range, reset the state variables
        setDateForBuy(null);
        setSellDate(null);
        setLowestPrice(null);
        setHighestPrice(null);
      }
    }
  };

  // Use useEffect to analyze prices when startData, endData, or data changes
  useEffect(() => {
    findPricesInPeriod();
  }, [startData, endData, data]);

  // Function to clear the selected date range
  const clearSelection = () => {
    setStartData(null);
    setEndData(null);
    setDateForBuy(null);
    setSellDate(null);
    setLowestPrice(null);
    setHighestPrice(null);
    
    // Clear the selected date range and refetch data when the selection is cleared
    if (onDateSelect) {
      onDateSelect({ start: null, end: null });
    }
  };

  // CustomizedDot component for rendering a clickable dot on the chart
  const CustomizedDot = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={8}
          fill="#8884d8"
          onClick={() => handleDateClick(payload)}
          style={{ cursor: 'pointer' }}
        />
      </g>
    );
  };
  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart width={800} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            activeDot={<CustomizedDot />}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mainDiv">
        {(startData || endData) && (
          <button className="button-85" onClick={clearSelection}>
            Click to clear
          </button>
        )}
        <div className="line1" />
        {startData && endData && (
          <div className="research">
            Period from {startData} to {endData}.<br />
            During the selected time frame, we suggest the following:
          </div>
        )}
        {lowestPrice !== null && dateForBuy !== null && (
          <div className="research">
            Best Day to Buy: {dateForBuy}<br />
            Price: {lowestPrice}<br />
          </div>
        )}
        {highestPrice !== null && sellDate !== null && (
          <div className="research">
            Best Day to Sell: {sellDate}<br />
            Price: {highestPrice}<br />
          </div>
        )}
      </div>

    </div>
  );
}

export default StockGraph;