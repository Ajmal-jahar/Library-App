import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/Homepage";
import BookListPage from "./components/BookListPage";
import BookDetailPage from "./components/BookDetailPage";
import CheckoutPage from "./components/CheckoutPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

// Component to handle layout with flex structure
function AppLayout() {
  const location = useLocation();
  const isLogin = location.pathname === "/";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {!isLogin && <Navbar />}

      {/* Main content pushes footer down */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/books/category/:category" element={<BookListPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>

      {!isLogin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;

