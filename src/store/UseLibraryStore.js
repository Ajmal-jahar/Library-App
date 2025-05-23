import { create } from "zustand";
import { persist } from "zustand/middleware";

const predefinedSubjects = [
  "Philosophy",
  "History",
  "Fiction",
  "Drama",
  "Horror tales"
];

export const useLibraryStore = create(
  persist(
    (set) => ({
      user: null,
      subjects: [],
      selectedBooks: [],

      login: (email) => set({ user: { email } }),
      logout: () => set({ user: null, selectedBooks: [], subjects: [] }),

      setSubjects: (subjects) => set({ subjects }),

      addBook: (book) => {
        let wasAdded = false;

        set((state) => {
          const selected = state.selectedBooks;

          // Prevent duplicates
          if (selected.find((b) => b.id === book.id)) return state;

          // Max 5 total
          if (selected.length >= 5) return state;

          // Find predefined subject match
          const bookSubjects = book.subjects || [];

          const matchedCategory = predefinedSubjects.find((ps) =>
            bookSubjects.some((sub) =>
              sub.toLowerCase().includes(ps.toLowerCase())
            )
          );

          if (matchedCategory) {
            const categoryCount = selected.filter((b) =>
              (b.subjects || []).some((sub) =>
                sub.toLowerCase().includes(matchedCategory.toLowerCase())
              )
            ).length;

            if (categoryCount >= 3) return state;
          }

          wasAdded = true;
          return { selectedBooks: [...selected, book] };
        });

        return wasAdded;
      },

      removeBook: (id) =>
        set((state) => ({
          selectedBooks: state.selectedBooks.filter((b) => b.id !== id),
        })),

      resetBooks: () => set({ selectedBooks: [] }),
    }),
    {
      name: "library-store",
    }
  )
);
