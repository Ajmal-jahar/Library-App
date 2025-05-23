// src/components/Navbar.jsx
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLibraryStore } from "../store/UseLibraryStore";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Navbar = () => {
  const user = useLibraryStore((state) => state.user);
  const logout = useLibraryStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on login page
  if (location.pathname === "/") return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ width: "100%", boxShadow: 3 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "black",
          px: 3,
        }}
      >
        <Box
          component={Link}
          to="/home"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#fff",
          }}
        >
          <MenuBookIcon sx={{ mr: 1, fontSize: "28px", color: "#fff",  textDecoration: "none"}} />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: "bold",
              fontSize: "22px",
                  textTransform: "none",
      textDecoration: "none",
       "&:hover": {
        backgroundColor: "transparent",
        color: "#fff",
        textDecoration: "none",
      },
            }}
          >
            LIBAPP
          </Typography>
        </Box>
<Box>
  <Button
    component={Link}
    to="/home"
    sx={{
      color: "#fff",
      textTransform: "none",
      textDecoration: "none",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#fff",
        textDecoration: "none",
      },
    }}
  >
    Home
  </Button>

  <Button
    component={Link}
    to="/checkout"
    sx={{
      color: "#fff",
      textTransform: "none",
      textDecoration: "none",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#fff",
        textDecoration: "none",
      },
    }}
  >
    Checkout
  </Button>

  {user && (
    <Button
      onClick={handleLogout}
      sx={{
        color: "#fff",
        textTransform: "none",
        textDecoration: "none",
        "&:hover": {
          backgroundColor: "transparent",
          color: "#fff",
          textDecoration: "none",
        },
      }}
    >
      Logout
    </Button>
  )}
</Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
