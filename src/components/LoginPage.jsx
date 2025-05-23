import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Avatar,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLibraryStore } from "../store/UseLibraryStore";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const login = useLibraryStore((state) => state.login);
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Both fields are required.");
    } else if (!validateEmail(email)) {
      setError("Enter a valid email address.");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters.");
    } else {
      setError("");
      login(email);
      navigate("/home");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Left side - Welcome panel */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          bgcolor: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 6,
          textAlign: "center",
        }}
      >
        <Box sx={{ maxWidth: 500 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Welcome to Library App
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Discover a world of knowledge at your fingertips
          </Typography>
          <Typography variant="body1">
            Sign in to access your personalized dashboard, book recommendations,
            and reading history.
          </Typography>
        </Box>
      </Grid>

      {/* Right side - Login Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
  
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 5,
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
            marginLeft:'200px'
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h2" variant="h5" sx={{ fontWeight: 600 }}>
              Sign in
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: "100%", mt: 2, mb: 1 }}>
                {error}
              </Alert>
            )}

            <Box component="form" noValidate sx={{ mt: 2, width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Remember me"
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: "bold",
                  backgroundColor: "black",
                  ":hover": {
                    backgroundColor: "#333",
                  },
                }}
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
