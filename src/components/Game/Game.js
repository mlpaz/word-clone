import React from "react";
import GuessInput from "../GuessInput";
import GuessResults from "../GuessResults";
import BannerResult from "../BannerResult";
import Keyboard from "../Keyboard";
import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";
import {
  NUM_OF_LENGTH_WORD,
  NUM_OF_GUESSES_ALLOWED,
  KEYBOARD_LETTERS,
  states,
  gameStatus,
} from "../../constants";
// Pick a random word on every pageload.
let answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guessInput, setGuessInput] = React.useState("");

  const [status, setStatus] = React.useState(gameStatus.RUNNING);
  const initGuessList = range(6).map((row) => {
    return range(5).map((column) => {
      return {
        id: `r${row}c${column}-${crypto.randomUUID()}`,
        letter: "",
      };
    });
  });

  const [guessCount, setGuessCount] = React.useState(0);
  const [guessList, setGuessList] = React.useState(initGuessList);
  const intialKeyMap = {};
  KEYBOARD_LETTERS.forEach((key) => {
    intialKeyMap[key] = states.UNUSED;
  });

  const [keysMap, setKeysMap] = React.useState(intialKeyMap);

  function restartGame() {
    setGuessInput("");
    setGuessList(initGuessList);
    setStatus(gameStatus.RUNNING);
    setKeysMap(intialKeyMap);
    setGuessCount(0);
    answer = sample(WORDS);
    console.info({ answer });
  }

  function updateGuessRow(checkGuessResult) {
    const newGuessList = [...guessList];
    const newGuess = newGuessList[guessCount];
    checkGuessResult.forEach((checkLetter, index) => {
      const currentLetter = newGuess[index];
      currentLetter.status = checkLetter.status;
      currentLetter.letter = checkLetter.letter;
    });
    newGuessList.push(checkGuessResult);
    setGuessList(newGuessList);
  }

  function handlerGuessInput() {
    const checkGuessResult = checkGuess(guessInput, answer);
    updateGuessRow(checkGuessResult);
    setGuessInput("");
    const newGuessCount = guessCount + 1;
    setGuessCount(newGuessCount);

    const lettersCorrect = checkGuessResult.filter(
      (letter) => letter.status === "correct"
    );

    // check win and loose conditions
    if (lettersCorrect.length === NUM_OF_LENGTH_WORD) {
      setStatus(gameStatus.WIN);
    } else if (newGuessCount === NUM_OF_GUESSES_ALLOWED) {
      setStatus(gameStatus.LOOSE);
    }

    // update keyboard
    const newKeysMap = { ...keysMap };
    checkGuessResult.forEach((item) => {
      newKeysMap[item.letter] = item.status;
    });
    setKeysMap(newKeysMap);
  }

  return (
    <>
      <BannerResult
        status={status}
        tries={guessCount}
        answer={answer}
        restartGame={restartGame}
      ></BannerResult>
      <GuessResults guessList={guessList}></GuessResults>
      <GuessInput
        status={status}
        guessInput={guessInput}
        handlerGuessInput={handlerGuessInput}
        setGuessInput={setGuessInput}
      ></GuessInput>
      <Keyboard keysMap={keysMap}></Keyboard>
    </>
  );
}

export default Game;
