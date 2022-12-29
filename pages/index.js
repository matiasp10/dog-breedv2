import { useEffect, useState } from 'react';
import { Nunito } from '@next/font/google';
import Link from 'next/link';
import Heart from '../components/Heart';

const nunito = Nunito({ subsets: ['latin'] });

export default function Home() {
  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((response) => response.json())
      .then((dogs) => setBreed(Object.keys(dogs.message)));
  }, []);
  const [breed, setBreed] = useState([]);
  const [breedSearch, setBreedSearch] = useState('');
  const handleBreedSearch = (event) => {
    setBreedSearch(event.target.value);
  };
  const filteredBreeds = breed.filter((dogs) => {
    return dogs.toLowerCase().includes(breedSearch);
  });
  return (
    <>
      <main className={nunito.className}>
        <section className="title">
          <Link href={`/`} className="links">
            <h1>Dog breeds</h1>
          </Link>
          <Heart fill={'#EE4957'} />
        </section>
        <section className="navbarSection">
          <form className="navbar">
            <input
              type="text"
              value={breedSearch}
              onChange={handleBreedSearch}
            />
            <button>Search</button>
          </form>
        </section>
        <section className="listBreeds">
          <ul className="list">
            {breedSearch !== 0
              ? filteredBreeds.map((breed) => {
                  return (
                    <li key={breed}>
                      <Link href={`/${breed}`} className="links">
                        {breed}
                      </Link>
                    </li>
                  );
                })
              : breed.map((breed) => {
                  return (
                    <li key={breed}>
                      <Link href={`/${breed}`} className="links">
                        {breed}
                      </Link>
                    </li>
                  );
                })}
          </ul>
        </section>
      </main>
    </>
  );
}
