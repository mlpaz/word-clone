import React from "react";
import GuessInput from "../GuessInput";
import GuessResults from "../GuessResults";
import BannerResult from "../BannerResult";
import Keyboard from "../Keyboard";
import { sample } from "../../utils";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";
import {
  NUM_OF_LENGTH_WORD,
  NUM_OF_GUESSES_ALLOWED,
  KEYBOARD_LETTERS,
  states,
} from "../../constants";
// Pick a random word on every pageload.
let answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guessInput, setGuessInput] = React.useState("");
  const [guessList, setGuessList] = React.useState([]);
  const [status, setStatus] = React.useState("inGame");

  const intialKeyMap = {};
  KEYBOARD_LETTERS.forEach((key) => {
    intialKeyMap[key] = states.UNUSED;
  });

  const [keysMap, setKeysMap] = React.useState(intialKeyMap);
  function restartGame() {
    setGuessInput("");
    setGuessList([]);
    setStatus("inGame");
    setKeysMap(intialKeyMap);
    answer = sample(WORDS);
    console.info({ answer });
  }
  function handlerGuessInput() {
    const checkGuessResult = checkGuess(guessInput, answer);
    const newGuessList = [...guessList];
    newGuessList.push(checkGuessResult);
    setGuessList(newGuessList);
    setGuessInput("");

    const lettersCorrect = checkGuessResult.filter(
      (letter) => letter.status === "correct"
    );

    // check win and loose conditions
    if (lettersCorrect.length === NUM_OF_LENGTH_WORD) {
      setStatus("win");
    } else if (newGuessList.length === NUM_OF_GUESSES_ALLOWED) {
      setStatus("loose");
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
        tries={guessList.length}
        answer={answer}
        restartGame={restartGame}
      ></BannerResult>
      <GuessResults guessList={guessList}></GuessResults>
      <GuessInput
        guessInput={guessInput}
        handlerGuessInput={handlerGuessInput}
        setGuessInput={setGuessInput}
        guessListLength={guessList.length}
      ></GuessInput>
      <Keyboard keysMap={keysMap}></Keyboard>
    </>
  );
}

export default Game;
