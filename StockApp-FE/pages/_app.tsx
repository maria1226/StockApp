import '../styles/global.css'; 
import '../styles/main.css'; 
// The main component that wraps all pages
function MyApp({ Component, pageProps }) {
  // Render the component with its props
  return <Component {...pageProps} />;
}
// Export the main component as the default export
export default MyApp;
