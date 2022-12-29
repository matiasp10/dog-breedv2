import { createContext, useState, useEffect } from 'react';
import '../styles/globals.css';

export const favoriteContext = createContext({});

export default function App({ Component, pageProps }) {
  const [isFavorited, setIsFavorited] = useState([]);

  const initializeStateFromLocalStorage = () => {
    // Check if the 'favorites' key is set in the local storage
    if (window.localStorage.getItem('favorites') !== null) {
      // Get the 'favorites' key from the local storage
      const favoritesJson = window.localStorage.getItem('favorites');

      // Parse the JSON string back into an array
      const favorites = JSON.parse(favoritesJson);

      // Update the state with the array of favorite images
      setIsFavorited(favorites);
    }
  };

  // Initialize the state when the component mounts
  useEffect(() => {
    initializeStateFromLocalStorage();
  }, []);

  // Listen for changes to the local storage and update the state accordingly
  useEffect(() => {
    window.addEventListener('storage', initializeStateFromLocalStorage);
    return () =>
      window.removeEventListener('storage', initializeStateFromLocalStorage);
  }, []);

  const toggleFavorite = (image) => {
    if (isFavorited.includes(image)) {
      setIsFavorited((favorites) =>
        favorites.filter((favorite) => favorite !== image)
      );
    } else {
      setIsFavorited(isFavorited.concat(image));
    }
  };

  useEffect(() => {
    if (isFavorited.length > 0) {
      window.localStorage.setItem('favorites', JSON.stringify(isFavorited));
    }
  }, [isFavorited]);

  return (
    <favoriteContext.Provider value={{ isFavorited, toggleFavorite }}>
      <Component {...pageProps} />
    </favoriteContext.Provider>
  );
}
