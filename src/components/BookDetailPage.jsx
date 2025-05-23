import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  CardMedia,
  Link,
  Box,
  Paper,
} from "@mui/material";

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`https://gutendex.com/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    getBook();
  }, [id]);

  if (!book) return <Container sx={{ mt: 5, color: "white" }}>Loading...</Container>;

  return (
    <Box
      sx={{
        backgroundColor: "whitesmoke",
        minHeight: "100vh",
        py: 5,
        color: "#f0f0f0",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "#2c2c2c",
            color: "#f5f5f5",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
          >
            {book.title}
          </Typography>

          <Box display="flex" justifyContent="center" mb={3}>
            <CardMedia
              component="img"
              image={book.formats["image/jpeg"]}
              alt={book.title}
              sx={{
                width: 250,
                height: "auto",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            <strong>Authors:</strong>{" "}
            {book.authors.map((a) => a.name).join(", ") || "Unknown"}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            <strong>Subjects:</strong>{" "}
            {book.subjects?.join(", ") || "Not available"}
          </Typography>

<Typography variant="subtitle1" gutterBottom>
  <strong>Languages:</strong>{" "}
  {book.languages?.join(", ").toUpperCase() || "Not available"}
</Typography>

<Typography variant="subtitle1" gutterBottom>
  <strong>Download Count:</strong> {book.download_count?.toLocaleString() || "N/A"}
</Typography>


          <Typography
            variant="h6"
            mt={4}
            fontWeight="bold"
            gutterBottom
            color="lightblue"
          >
            Summary
          </Typography>
          <Typography variant="body1" paragraph>
            {book.summaries?.[0] || "No summary available."}
          </Typography>

          <Box mt={3}>
            <Link
              href={book.formats["text/html"]}
              target="_blank"
              rel="noopener"
              underline="hover"
              color="skyblue"
              fontWeight="bold"
            >
              👉 Read Online
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default BookDetailPage;
