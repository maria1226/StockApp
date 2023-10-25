import React, { useState, useEffect } from 'react';
import {
  LineChart,//for creating line charts
  Line,//Represents the line in the line chart
  XAxis,
  YAxis,
  CartesianGrid,//Adds grid lines to the chart
  Tooltip,//Displays tooltips when hovering over data points
  Legend,
  ResponsiveContainer,
} from 'recharts';
import "../styles/Home.module.css"
interface StockData {
  date: string;
  price: number;
}

interface StockGraphProps {
  data: StockData[];
  onDateSelect: (selectedDates: { start: string | null, end: string | null }) => void;
}

function StockGraph({ data, onDateSelect }: StockGraphProps) {
  const [startData, setStartData] = useState<string | null>(null);
  const [endData, setEndData] = useState<string | null>(null);
  const [dateForBuy, setDateForBuy] = useState<string | null>(null);
  const [sellDate, setSellDate] = useState<string | null>(null);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);
  const [highestPrice, setHighestPrice] = useState<number | null>(null);

  const handleDateClick = (entry: StockData) => {
    if (!startData || !endData) {
      // Check if both start and end dates are not selected
      if (!startData) {
        setStartData(entry.date);
      } else if (!endData) {
        setEndData(entry.date);
        if (entry.date < startData) {
          // Alert the user when the selected end date is before the start date
          alert(`End date (${entry.date}) cannot be before the start date (${startData}). Please choose a date after ${startData}.`);
          setEndData(null);
        }
      }
      // Invoke the callback function with the selected dates
      if (onDateSelect && startData && endData) {
        onDateSelect({ start: startData, end: endData });
      }
    } else {
      alert('You have already selected both start and end dates. Clear selection to choose again.');
    }
  };
  
  // Function to find and analyze prices within a specified date range
const findPricesInPeriod = () => {
  // Check if startData, endData, and the validity of the date range are all true
  if (startData && endData && startData <= endData) {
    // Filter data entries that fall within the specified date range
    
    const pricesInPeriod = data.filter((entry) =>//filters the data array to create a new array called pricesInPeriod,
    //which contains only those entries whose date falls between startData and endData
      entry.date >= startData && entry.date <= endData
    );

    // Check if there are prices in the specified date range
    if (pricesInPeriod.length > 0) {//check the length of array
      // Extract price values from the filtered data
      const priceValues = pricesInPeriod.map((entry) => entry.price);

      // Calculate the minimum and maximum prices within the range
      const minPrice = Math.min(...priceValues);
      const maxPrice = Math.max(...priceValues);

      // Utility function to find the date associated with a given price
      const findDate = (price) =>
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

  useEffect(() => {
    findPricesInPeriod();
  }, [startData, endData, data]);

  const clearSelection = () => {
    setStartData(null);
    setEndData(null);
    setDateForBuy(null);
    setSellDate(null);
    setLowestPrice(null);
    setHighestPrice(null);
  };

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
    Period from {startData} to {endData}.<br/>
    During the selected time frame, we suggest the following:
      </div>
      )}
      {lowestPrice !== null && dateForBuy !== null &&(
        <div className="research">
        Best Day to Buy: {dateForBuy}<br/>
        Price: {lowestPrice}<br/>
        </div>
      )}
      {highestPrice !== null && sellDate !== null && (
        <div className="research">
        Best Day to Sell: {sellDate}<br/>
        Price: {highestPrice}<br/>
        </div>
      )}
    </div>

    </div>
  );
}

export default StockGraph;
