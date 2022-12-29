import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Nunito } from '@next/font/google';
import Link from 'next/link';
import { favoriteContext } from '../_app';
import Heart from '../../components/Heart';
const nunito = Nunito({ subsets: ['latin'] });

function index() {
  const [dog, setDog] = useState([]);

  const router = useRouter();
  const { breed } = router.query;

  useEffect(() => {
    if (!breed) {
      return;
    }
    const fetchData = async () => {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random/10`
      );
      const dogs = await response.json();
      setDog(dogs.message);
    };
    fetchData();
  }, [breed]);

  const { isFavorited, toggleFavorite } = useContext(favoriteContext);

  return (
    <main className={nunito.className}>
      <section className="title">
        <Link href={`/`} className="links">
          <h1>Dog breeds</h1>
        </Link>
        <Heart fill={'#EE4957'} />
      </section>
      <section className="collectionContainer">
        {dog.map((dog) => {
          const isFavorite = isFavorited.includes(dog);
          return (
            <div key={dog} className="imageContainer">
              <img src={dog} alt="" className="image" />
              <button onClick={() => toggleFavorite(dog)} className="imgBtn">
                <Heart fill={isFavorite ? '#EE4957' : '#FFFFFF'} />
              </button>
            </div>
          );
        })}
        {}
      </section>
      <div className="divisor"></div>
      <section className="favoritesContainer">
        <div className="titleFavorite">
          <Heart fill={'#EE4957'} />
          <h1>Favorites </h1>
        </div>

        <div className="favoriteContainer">
          {isFavorited.map((dog) => {
            const isFavorite = isFavorited.includes(dog);
            return (
              <div key={dog} className="imageContainer">
                <img src={dog} alt="" className="image" />
                <button onClick={() => toggleFavorite(dog)} className="imgBtn">
                  <Heart fill={isFavorite ? '#EE4957' : '#FFFFFF'} />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default index;
