import { SubscriptionProvider } from "../contexts/SubscriptionContext";
import "../components/Card.css";
import "../components/Sidebar.css";
import "../components/Navbar.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <SubscriptionProvider>
      <Component {...pageProps} />
    </SubscriptionProvider>
  );
}
