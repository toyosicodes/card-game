import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/images/ari.jpg", matched: false },
  { src: "/images/beyx.jpg", matched: false },
  { src: "/images/doja.jpg", matched: false },
  { src: "/images/lisa.jpg", matched: false },
  { src: "/images/tay.jpg", matched: false },
  { src: "/images/tems.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCardOne(null);
    setCardTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
  };

  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true);
      if (cardOne.src === cardTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.src === cardTwo.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          })
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [cardOne, cardTwo]);
  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            handleChoice={handleChoice}
            card={card}
            key={card.id}
            flipped={card === cardOne || card === cardTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
