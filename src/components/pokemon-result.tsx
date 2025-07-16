import type { GameState } from "../hooks/use-game-manager";

interface Props {
  loadNewPokemon: () => void;
  gameState: GameState;
}

const PokemonResult = ({ loadNewPokemon, gameState }: Props) => {

  if (gameState === "playing") {
    return null; // No mostrar nada si el juego está en curso
  }

  return (
    <div className={`alert alert-${gameState === "correct" ? "success" : "danger"} text-center`}>
      {gameState === "correct" ?
        (
          <h2>
            ¡Correcto! <i className="bi bi-check-circle"></i>
          </h2>
        ) : (
          <h2>
            ¡Incorrecto! <i className="bi bi-x-circle"></i>
          </h2>
        )}
      <button
        onClick={loadNewPokemon}
        className="btn btn-dark mt-3"
      >Volver a jugar</button>
    </div>
  )
}
export default PokemonResult