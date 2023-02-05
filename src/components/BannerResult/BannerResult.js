import React from "react";

function BannerResult({ status, tries, answer, restartGame }) {
  const winLooseClass = status === "win" ? "happy" : "sad";
  return (
    status !== "inGame" && (
      <div className={`${winLooseClass} banner`}>
        {status === "win" && (
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{tries} guesses</strong>.
          </p>
        )}
        {status === "loose" && (
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
