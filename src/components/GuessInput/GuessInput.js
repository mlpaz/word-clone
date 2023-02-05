import React from "react";
import { NUM_OF_LENGTH_WORD } from "../../constants";

function GuessInput({
  guessCount,
  guessInput,
  handlerGuessInput,
  setGuessInput,
}) {
  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(event) => {
        event.preventDefault();
        console.log(guessInput);
        if (guessInput.length !== 5) {
          window.alert("Please enter exactly 5 (five) characters :) ");
        }
        handlerGuessInput();
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        disabled={guessCount >= 6}
        id="guess-input"
        type="text"
        value={guessInput}
        required
        maxLength={NUM_OF_LENGTH_WORD}
        pattern="[a-zA-Z]{5}"
        title="5 letter word"
        onChange={(event) => setGuessInput(event.target.value.toUpperCase())}
      />
    </form>
  );
}

export default GuessInput;
