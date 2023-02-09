import { useEffect, useState } from "react";
import "./App.css";

const InitialState = {
  A1: {
    value: "",
    player: "",
  },
  B1: {
    value: "",
    player: "",
  },
  C1: {
    value: "",
    player: "",
  },

  A2: {
    value: "",
    player: "",
  },
  B2: {
    value: "",
    player: "",
  },
  C2: {
    value: "",
    player: "",
  },

  A3: {
    value: "",
    player: "",
  },
  B3: {
    value: "",
    player: "",
  },
  C3: {
    value: "",
    player: "",
  },
};

const playersInitialState = {
  playerOne: "Player 1",
  playerTwo: "Player 2",
};

const TicTacToeGame = () => {
  const [count, setCount] = useState(0);
  const [player, setPlayer] = useState("X");
  const [section, setSection] = useState(InitialState);
  const [draw, setDraw] = useState({
    count: 0,
    draw: false,
  });
  const [total, setTotal] = useState(0);
  const [winner, setWinner] = useState({
    playerOne: 0,
    playerTwo: 0,
    winner: false,
  });

  const [changeNamemodal, setChanceNameModal] = useState(false);
  const [endGameModal, setEndGameModal] = useState({
    draw: false,
    winner: false,
  });
  const [players, setPlayers] = useState(playersInitialState);
  const [savePlayersName, setSavePlayersName] = useState(playersInitialState);

  const handlePlayerChange = (e: any) => {
    setSavePlayersName(players);
    setPlayers({ ...players, [e.target.name]: e.target.value });
  };

  const handleClick = (e: any) => {
    if (winner.winner) return;

    const { id } = e.target;
    const { value } = section[id];

    if (value === "") {
      setCount(count + 1);
      setSection({
        ...section,
        [id]: {
          value: player,
          player,
        },
      });
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const reset = () => {
    setCount(0);
    setPlayer("X");
    setSection(InitialState);
    setWinner({
      playerOne: winner.playerOne,
      playerTwo: winner.playerTwo,
      winner: false,
    });
    setDraw({
      count: draw.count,
      draw: false,
    });
  };

  const winConditions = [
    ["A1", "B1", "C1"],
    ["A2", "B2", "C2"],
    ["A3", "B3", "C3"],
    ["A1", "A2", "A3"],
    ["B1", "B2", "B3"],
    ["C1", "C2", "C3"],
    ["A1", "B2", "C3"],
    ["A3", "B2", "C1"],
  ];

  useEffect(() => {
    winConditions.forEach((condition: string[]) => {
      const [first, second, third] = condition;

      console.log(first);

      if (
        section[first].value &&
        section[first].value === section[second].value &&
        section[first].value === section[third].value
      ) {
        player === "X"
          ? setWinner({
              playerOne: winner.playerOne,
              playerTwo: winner.playerTwo + 1,
              winner: true,
            })
          : setWinner({
              playerOne: winner.playerOne + 1,
              playerTwo: winner.playerTwo,
              winner: true,
            });

        setTotal(total + 1);
      }

      if (count === 9) {
        setDraw({
          count: draw.count + 1,
          draw: true,
        });
        setTotal(total + 1);
      }
    });
  }, [section]);

  useEffect(() => {
    if (winner.winner) {
      setEndGameModal({ draw: false, winner: true });
    } else if (draw.draw) {
      setEndGameModal({ draw: true, winner: false });
    }
  }, [winner.winner, draw.draw]);

  return (
    <>
      <header className="header">Jogo da Velha</header>

      <div className="container">
        <div className="ranking">
          <div className="player1">
            <div
              className="player1Name"
              onClick={() => setChanceNameModal(!changeNamemodal)}
            >
              {players.playerOne}: {winner.playerOne}
            </div>

            <div
              className="player1Name"
              onClick={() => setChanceNameModal(!changeNamemodal)}
            >
              {players.playerTwo}: {winner.playerTwo}
            </div>

            <div className="player1Name">Empate: {draw.count}</div>

            <div className="player1Name">Total: {total}</div>

            <div className="player1Name">Rodada: {count}</div>
          </div>
        </div>

        <div className="contentHolder">
          <>
            <div className="A1" id="A1" onClick={handleClick}>
              {section.A1.value}
            </div>

            <div className="B1" id="B1" onClick={handleClick}>
              {section.B1.value}
            </div>

            <div className="C1" id="C1" onClick={handleClick}>
              {section.C1.value}
            </div>
          </>

          <>
            <div className="A2" id="A2" onClick={handleClick}>
              {section.A2.value}
            </div>

            <div className="B2" id="B2" onClick={handleClick}>
              {section.B2.value}
            </div>

            <div className="C2" id="C2" onClick={handleClick}>
              {section.C2.value}
            </div>
          </>

          <>
            <div className="A3" id="A3" onClick={handleClick}>
              {section.A3.value}
            </div>

            <div className="B3" id="B3" onClick={handleClick}>
              {section.B3.value}
            </div>

            <div className="C3" id="C3" onClick={handleClick}>
              {section.C3.value}
            </div>
          </>
        </div>

        <div className="footer">
          <div className="playerTurn">Vez do player: {player}</div>

          <button className="reset" onClick={reset}>
            Novo jogo
          </button>
        </div>

        {changeNamemodal && (
          <div className="modal">
            <div className="changeNamemodal">
              <div className="modalContent">
                <input
                  placeholder="Player 1"
                  name="playerOne"
                  value={players.playerOne}
                  onChange={handlePlayerChange}
                  id="playerOne"
                />

                <input
                  placeholder="Player 2"
                  name="playerTwo"
                  value={players.playerTwo}
                  onChange={handlePlayerChange}
                  id="playerTwo"
                />

                <div className="modalContentButtonHolder">
                  <button
                    className="reset"
                    style={{ marginRight: "10px" }}
                    onClick={() => setChanceNameModal(!changeNamemodal)}
                  >
                    Salvar
                  </button>

                  <button
                    onClick={() => {
                      setPlayers(savePlayersName);
                      setChanceNameModal(!changeNamemodal);
                    }}
                    className="reset"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {endGameModal.winner && (
          <div className="modal">
            <div className="modalContentEndGame">
              <h1>
                {player === "X" ? players.playerTwo : players.playerOne} venceu!
              </h1>

              <div>
                <button
                  className="reset"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    setEndGameModal({ draw: false, winner: false });
                    reset();
                  }}
                >
                  Novo jogo
                </button>

                <button
                  onClick={() => {
                    setEndGameModal({ draw: false, winner: false });
                  }}
                  className="reset"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {endGameModal.draw && (
          <div className="modal">
            <div className="modalContentEndGame">
              <h1>Empate!</h1>

              <div>
                <button
                  className="reset"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    setEndGameModal({ draw: false, winner: false });
                    reset();
                  }}
                >
                  Novo jogo
                </button>

                <button
                  onClick={() => {
                    setEndGameModal({ draw: false, winner: false });
                  }}
                  className="reset"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TicTacToeGame;
