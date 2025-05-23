import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLibraryStore } from "../store/UseLibraryStore";

const BookListPage = () => {
  const { category } = useParams();
  const { addBook, selectedBooks } = useLibraryStore();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const formattedCategory = category.replace(/-/g, " ").toLowerCase();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const pageRequests = [1, 2, 3, 4].map((page) =>
          axios.get(`https://gutendex.com/books/?page=${page}`)
        );
        const responses = await Promise.all(pageRequests);

        let allBooks = [];
        responses.forEach((res) => {
          allBooks.push(...res.data.results);
        });

        const filteredBooks = allBooks.filter((book) =>
          book.subjects?.some((subject) =>
            subject.toLowerCase().includes(formattedCategory)
          )
        );

        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [formattedCategory]);

  const handleSelectBook = (book) => {
    const selected = useLibraryStore.getState().selectedBooks;

    // Prevent duplicate
    const alreadyExists = selected.some((b) => b.id === book.id);
    if (alreadyExists) return;

    // Total limit
    if (selected.length >= 5) {
      alert("❌ Cannot add book. Max 5 books allowed.");
      return;
    }

    // Per category limit
    const sameCategoryCount = selected.filter((b) =>
      b.subjects?.some((subj) =>
        subj.toLowerCase().includes(formattedCategory)
      )
    ).length;

    if (sameCategoryCount >= 3) {
      alert("❌ Max 3 books allowed from the same category.");
      return;
    }

    // Add if passed all checks
    addBook(book);
  };

  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      <div className="container">
        <h2 className="text-center mb-4 text-capitalize animate__animated animate__fadeInDown">
          {formattedCategory}
        </h2>

        {books.length === 0 ? (
          <p className="text-center">Loading books...</p>
        ) : (
          <div className="row g-4">
            {books.map((book, index) => {
              const isSelected = selectedBooks.some((b) => b.id === book.id);

              return (
                <div
                  className="col-12 col-sm-6 col-md-4 animate__animated animate__fadeInUp"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationDuration: "0.6s",
                  }}
                  key={book.id}
                >
                  <div
                    className="card h-100 bg-whitesmoke"
                    style={{
                      transition: "transform 0.3s, box-shadow 0.3s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.03)";
                      e.currentTarget.style.boxShadow =
                        "0 0 15px rgba(255,255,255,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <img
                      src={book.formats["image/jpeg"]}
                      className="card-img-top  d-block"
                      alt={book.title}
                      style={{ height: "200px", width: "auto", objectFit: "cover" }}
                      onClick={() => navigate(`/books/${book.id}`)}
                    />
                    <div className="card-body text-center p-2">
                      <h5 className="card-title text-truncate">{book.title}</h5>
                      <p className="card-text text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                        {book.authors && book.authors.length > 0
                          ? book.authors.map((a) => a.name).join(", ")
                          : "Unknown Author"}
                      </p>
                    </div>
                    <div className="card-footer bg-transparent border-0">
                      <button
                        className={`btn w-100 ${
                          isSelected ? "btn-success" : "btn-outline-dark"
                        }`}
                        onClick={() => handleSelectBook(book)}
                        disabled={isSelected}
                      >
                        {isSelected ? "Added" : "Add to checkout"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookListPage;
