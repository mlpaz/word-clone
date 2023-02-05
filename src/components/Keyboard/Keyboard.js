import React from "react";
import { range } from "../../utils";
import { KEYBOARD_LETTERS } from "../../constants";
function Keyboard({ keysMap }) {
  function lineOfKeys(init, end) {
    return (
      <p className="keys">
        {range(init, end).map((index) => {
          const key = KEYBOARD_LETTERS[index];
          const keyClass = `key ${keysMap[key]}`;
          return (
            <span className={keyClass} key={index}>
              {key}
            </span>
          );
        })}
      </p>
    );
  }
  return (
    <div className="keyboard">
      {lineOfKeys(0, 10)}
      {lineOfKeys(10, 19)}
      {lineOfKeys(19, 26)}
    </div>
  );
}

export default Keyboard;
