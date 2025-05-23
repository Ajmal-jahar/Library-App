import axios from 'axios';

const BASE_URL = 'https://gutendex.com';


// Fuzzy-match books where ANY subject contains the selected category
export const fetchBooksByMatchingSubjects = async (selectedSubjects = []) => {
  const pagesToCheck = [1, 2]; // Load more pages if needed
  let allBooks = [];

  for (let page of pagesToCheck) {
    const res = await axios.get(`https://gutendex.com/books/?page=${page}`);
    allBooks.push(...res.data.results);
  }

  // Match subjects loosely
  const filtered = allBooks.filter((book) =>
    book.subjects?.some((subject) =>
      selectedSubjects.some((selected) =>
        subject.toLowerCase().includes(selected.toLowerCase())
      )
    )
  );

  return filtered;
};



export const fetchBookById = async (id) => {
  const res = await axios.get(`${BASE_URL}/books/${id}`);
  return res.data;
};
