import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Grid,
  Alert,
  Button,
  Box,
  Snackbar,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useLibraryStore } from "../store/UseLibraryStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CheckoutPage = () => {
  const { selectedBooks, removeBook, resetBooks } = useLibraryStore();
  const navigate = useNavigate();
  const [buySuccess, setBuySuccess] = useState(false);

  const validateCheckout = () => {
    if (selectedBooks.length > 5) return false;

    const categoryCount = {};
    for (const book of selectedBooks) {
      book.subjects?.forEach((sub) => {
        categoryCount[sub] = (categoryCount[sub] || 0) + 1;
      });
    }

    return !Object.values(categoryCount).some((count) => count > 3);
  };

  const handleConfirmCheckout = () => {
    if (validateCheckout()) {
      setBuySuccess(true);
      resetBooks();
    } else {
      alert("❌ Max 5 books allowed and no more than 3 from the same category.");
    }
  };

  const getReadLink = (book) =>
    book.formats["text/html"] ||
    book.formats["text/html; charset=utf-8"] ||
    null;

  return (
    <Box sx={{ backgroundColor: "#1c1c1c", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
          color="white"
        >
          🛒 Book Checkout
        </Typography>

        {selectedBooks.length === 0 ? (
          <Typography
            textAlign="center"
            color="gray"
            sx={{ mt: 5 }}
            variant="h6"
          >
            No books selected.
          </Typography>
        ) : (
          <>
            <Grid container spacing={3} mt={3}>
              {selectedBooks.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                  <Card
                    onClick={() =>
                      navigate(`/books/${book.id}`, { state: { book } })
                    }
                    sx={{
                      display: "flex",
                      height: 180,
                      cursor: "pointer",
                      backgroundColor: "#2c2c2c",
                      color: "#f5f5f5",
                      borderRadius: 3,
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 110,
                        objectFit: "cover",
                        borderRadius: "12px 0 0 12px",
                      }}
                      image={book.formats["image/jpeg"]}
                      alt={book.title}
                    />
                    <CardContent
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        px: 2,
                      }}
                    >
                      <Typography variant="subtitle1" noWrap>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="gray" noWrap>
                        {book.authors.map((a) => a.name).join(", ")}
                      </Typography>
                    </CardContent>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        px: 1,
                        gap: 1,
                      }}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          const readLink = getReadLink(book);
                          if (readLink) {
                            window.open(readLink, "_blank");
                          } else {
                            alert("No readable format available.");
                          }
                        }}
                        color="primary"
                      >
                        <MenuBookIcon />
                      </IconButton>

                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBook(book.id);
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box textAlign="center" mt={5}>
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={handleConfirmCheckout}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Confirm Checkout ({selectedBooks.length})
              </Button>
            </Box>
          </>
        )}

        <Snackbar
          open={buySuccess}
          autoHideDuration={3000}
          onClose={() => setBuySuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setBuySuccess(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            🎉 Checkout successful!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
