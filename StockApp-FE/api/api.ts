export const fetchDataFromBackend = async (startData: string, endData: string) => {
    if (startData && endData) {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query StocksWithinDateRange($startDate: String!, $endDate: String!) {
                stocks(startDate: $startDate, endDate: $endDate) {
                  stocks {
                    price
                    date
                  }
                }
              }
            `,
            variables: {
              startDate: startData,
              endDate: endData,
            },
          }),
        });
        return await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    return Promise.resolve(null); // Return a resolved Promise if no data to fetch
  };
  