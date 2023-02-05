import React from "react";

function GuessInput({
  guessListLength,
  guessInput,
  handlerGuessInput,
  setGuessInput,
}) {
  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(event) => {
        event.preventDefault();
        handlerGuessInput(event.target.value);
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        disabled={guessListLength >= 6}
        id="guess-input"
        type="text"
        value={guessInput}
        maxLength="5"
        onChange={(event) => setGuessInput(event.target.value.toUpperCase())}
      />
    </form>
  );
}

export default GuessInput;
