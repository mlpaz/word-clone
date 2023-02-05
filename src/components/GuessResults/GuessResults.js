import React from "react";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED, NUM_OF_LENGTH_WORD } from "../../constants";

function GuessResults({ guessList }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((index) => {
        const word = guessList[index];
        return (
          <p className="guess" key={index}>
            {range(NUM_OF_LENGTH_WORD).map((charIndex) => {
              const spanClass =
                word !== undefined && word[charIndex] !== undefined
                  ? `cell ${word[charIndex].status}`
                  : "cell";
              return (
                <span className={spanClass} key={charIndex}>
                  {word !== undefined && word[charIndex]
                    ? word[charIndex].letter
                    : ""}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

export default GuessResults;
