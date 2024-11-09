/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import './standings.css';
import noseImage from '../../assets/images/nose-thumbnail.jpg';
import Error from '../../components/error/Error';

const hashPassword = CryptoJS.enc.Base64.stringify(
  CryptoJS.SHA256('brentz' + 'slkdfjlsdkj')
);

// console.dir(hashPassword);

export default function Standings() {
  const [isFetching, setIsFetching] = useState(false);
  const [standings, setStandings] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchStandings() {
      setIsFetching(true);

      try {
        const response = await fetch(
          'khttps://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m'
        );

        const resData = await response.json();
        console.dir(resData);

        if (!response.ok) {
          throw new Error('Failed to fetch the standings.');
        }

        setStandings(resData);
      } catch (error) {
        setError({ message: error.message || 'There was an error somewhere' });
      }

      setIsFetching(false);
    }

    fetchStandings();
  }, []);

  // console.dir(isFetching);
  // console.dir(standings);

  return (
    <section>
      <div>Standings</div>
      {error && <Error message={error.message} />}
    </section>
  );
}
