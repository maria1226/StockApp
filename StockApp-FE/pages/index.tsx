import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../pages/layout"; // Update the import path
import StockGraph from "../components/StockGraph";
import styles from "../styles/Home.module.css";

interface StockDataItem {
  // Define the shape of a single item in the stockData array
  date: string;
  price: number;
}

const Home: React.FC = () => {
  const [stockData, setStockData] = useState<StockDataItem[]>([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query Stocks {
            stocks {
              stocks {
                price
                date
              }
            }
          }
        `,
      }),
    })
      .then((response) => response.json())
      .then((data) => setStockData(data.data.stocks.stocks))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Layout>
      <Head>
        <title>Stock</title>
      </Head>
      <div className="research">Analyze Apple Stock Performance Over Time</div>
      <div className={styles["custom-chart-container"]}>
        <StockGraph data={stockData} onDateSelect={function (selectedDates: { start: string; end: string; }): void {
          throw new Error("Function not implemented.");
        } } />
      </div>
    </Layout>
  );
};

export default Home;
