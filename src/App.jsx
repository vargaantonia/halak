import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [halak, setHalak] = useState([]);
  const [fogasok, setFogasok] = useState([]);
  const [top3Hal, setTop3Hal] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7083/api/Halak/(halak/to)")
      .then((res) => {
        console.log("Halak adatok:", res.data);
        setHalak(res.data);
      })
      .catch(console.error);
      

    axios.get("https://localhost:7083/api/Halak/fogasok")
      .then((res) => {
        console.log("Fogások adatok:", res.data);
        setFogasok(res.data);
      })
      .catch(console.error);

    axios.get("https://localhost:7083/api/Halak/3legnagyobbHal")
      .then((res) => {
        console.log("Top 3 legnagyobb hal adatok:", res.data);
        setTop3Hal(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      <h1 className="title">Halak és Fogások</h1>

      <section className="section">
      <h2 className="subtitle">Fogások</h2>
      <ul className="list">
        {fogasok.map((f, index) => (
          <li key={index} className="list-item">
            <div className="catch-info">
              <p className="angler"><span>Horgász:</span> {f.horgaszNev}</p>
              <p className="catch"><span>Fogás:</span> {f.halNev} ({f.halFaj})</p>
              <p className="date"><span>Dátum:</span> {new Date(f.datum).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>

    <section className="section">
      <h2 className="subtitle">Halak és tavak</h2>
      <ul className="list">
        {halak.map((h, index) => (
          <li key={index} className="list-item">
            <div className="fish-info">
              <p><span>Hal:</span> {h.halNev}</p>
              <p><span>Tó:</span> {h.toNev}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>

    <section className="section">
      <h2 className="subtitle">Top 3 hal</h2>
      <ul className="list">
        {top3Hal.map((h, index) => (
          <li key={index} className="list-item">
            <div className="top-fish-info">
              <p className="fish-name"><span>Hal:</span> {h.halNev}</p>
              <p className="fish-size"><span>Méret:</span> {h.meretCm} cm</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
    </div>
  );
}
