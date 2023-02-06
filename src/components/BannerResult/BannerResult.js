import React from "react";

import { gameStatus } from "../../constants";

function BannerResult({ status, tries, answer, restartGame }) {
  const winLooseClass = status === "win" ? "happy" : "sad";
  return (
    status !== gameStatus.RUNNING && (
      <div className={`${winLooseClass} banner`}>
        {status === gameStatus.WIN && (
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{tries} guesses</strong>.
          </p>
        )}
        {status === gameStatus.LOOSE && (
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        )}
        <button onClick={restartGame}>
          <strong>Restart Game </strong>
        </button>
      </div>
    )
  );
}

export default BannerResult;
