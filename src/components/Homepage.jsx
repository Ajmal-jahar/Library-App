import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLibraryStore } from "../store/UseLibraryStore";

const predefinedSubjects = ["Philosophy", "History", "Fiction", "Drama", "Horror tales"];

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { selectedBooks } = useLibraryStore();
  const addBook = useLibraryStore((state) => state.addBook);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const pageRequests = [1, 2, 3, 4].map((page) =>
          axios.get(`https://gutendex.com/books/?page=${page}`)
        );
        const responses = await Promise.all(pageRequests);
        const all = responses.flatMap((res) => res.data.results);
        setBooks(all);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBook = (book) => {
    const isAlreadySelected = selectedBooks.some((b) => b.id === book.id);
    if (isAlreadySelected) return;

    const success = addBook(book);

    if (!success) {
      alert("❌ Cannot add book. Max 5 total OR 3 from the same category.");
    }
  };

  const handleCategoryClick = (subject) => {
    const formatted = subject.toLowerCase().replace(/\s+/g, "-");
    navigate(`/books/category/${formatted}`);
  };

  const getBookRows = () => {
    const rows = [];
    for (let i = 0; i < 4; i++) {
      rows.push(books.slice(i * 16, (i + 1) * 16));
    }
    return rows;
  };

  return (
    <div className="bg-dark text-light min-vh-100" style={{ width: "100%", overflowX: "hidden" }}>
      {/* Carousel */}
      <div className="px-3 pt-4 mb-4">
        <div
          id="libraryCarousel"
          className="carousel slide rounded overflow-hidden"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://ideas.ted.com/wp-content/uploads/sites/3/2020/06/final_booklist_black-writers.jpg"
                className="d-block mx-auto"
                alt="Slide 1"
                style={{ height: "450px", width: "80%", borderRadius: "10px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://cdn.aarp.net/content/dam/aarpe/en/home/entertainment/books/info-2021/authors-pick-top-books/_jcr_content/root/container_main/container_moreAarp_main/container_moreAarp/container_moreAarp_cmp/featuredlist/tabItem/audiobooks-for-long-drives1.coreimg.50.932.png/content/dam/aarp/entertainment/books/2023/05/1140-new-audiobooks.png"
                className="d-block mx-auto"
                alt="Slide 2"
                style={{ height: "450px", width: "80%", borderRadius: "10px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.contentstack.io/v3/assets/blt64b2de096a6f4663/blt7ce5d6e074557715/65e207894487d02960400358/March_2024_s_biggest_books.png"
                className="d-block mx-auto"
                alt="Slide 3"
                style={{ height: "450px", width: "80%", borderRadius: "10px" }}
              />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#libraryCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#libraryCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

 {/* Welcome Section */}
<div className="container text-center my-5 px-4">
  <div
    className="p-4 rounded shadow"
    style={{
      background: "linear-gradient(90deg, #343a40, #212529)",
      color: "#f8f9fa",
    }}
  >
    <h3 className="mb-3"> Welcome to the Library App!</h3>
    <p style={{ fontSize: "1rem", lineHeight: "1.8" }}>
      Dive into the timeless world of literature with the  Library App — your portal to thousands of free eBooks from some of the most influential authors in history. Whether you're a fan of epic adventures, emotional dramas, philosophical debates, or historical insights, our library offers a diverse collection that spans centuries and continents.
      This digital library is built on top of the amazing Project Gutenberg archive, which curates works that are now in the public domain. From William Shakespeare and Jane Austen to Mark Twain and Mary Shelley, you'll find literary masterpieces that have stood the test of time. Each book is beautifully presented with cover images and organized by category, author, and popularity to help you explore with ease.
      Start browsing by selecting a category such as <strong>Philosophy, History, Fiction, Horror</strong> and more. Click on any book to view its details, and build your reading list by adding your favorites. You can select up to <strong>5 books</strong> total, with a limit of <strong>3 books per category</strong> to keep your choices diverse.
      Whether you're rediscovering a childhood favorite or uncovering a classic you've never read, we hope this app inspires your imagination and fuels your love of reading. Ready to begin your journey through the pages of history? Scroll down and let the stories unfold.
    </p>
  </div>
</div>


      {/* Category Chips */}
      <div className="d-flex justify-content-center flex-wrap gap-3 mb-5 mt-2">
        {predefinedSubjects.map((subject) => (
          <button
            key={subject}
            className="btn btn-outline-light btn-sm px-3"
            onClick={() => handleCategoryClick(subject)}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Popular Books */}
      <h3 className="text-center mb-5">Available Books</h3>

      <div className="px-4">
        {loading ? (
          <div className="text-center my-4">
            <div className="spinner-border text-light" role="status" />
          </div>
        ) : (
          getBookRows().map((row, index) => (
            <div className="mb-5" key={index}>
              <div className="d-flex overflow-auto gap-3 pb-2">
                {row.map((book) => {
                  const isSelected = selectedBooks.some((b) => b.id === book.id);
                  return (
                    <div
                      className={`card ${isSelected ? "border-success" : ""} text-dark`}
                      key={book.id}
                      style={{ minWidth: "180px", maxWidth: "180px", flex: "0 0 auto" }}
                    >
                      <img
                        src={book.formats["image/jpeg"]}
                        className="card-img-top"
                        alt={book.title}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/books/${book.id}`)}
                      />
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title text-truncate">{book.title}</h6>
                        <button
                          className={`btn btn-sm ${isSelected ? "btn-success" : "btn-secondary"} mt-auto`}
                          onClick={() => handleAddBook(book)}
                        >
                          {isSelected ? "Added" : "Add to checkout"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
