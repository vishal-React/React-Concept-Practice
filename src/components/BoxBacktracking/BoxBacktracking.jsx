import React, { useState } from "react";

const BoxBacktracking = () => {
  const [stack, setStack] = useState([]);
  const boxLength = 9;

  return (
    <div>
      {/* BoxBacktracking */}
      <div className="border h-52 w-52 grid grid-cols-3 place-items-center">
        {Array.from({ length: boxLength }).map((box, i) => {
          const isBoxSelected = stack.includes(i);
          return (
            <div
              key={i}
              className={`border h-10 w-10 grid place-items-center ${isBoxSelected && "bg-amber-400"}`}
              onClick={() => {
                if (isBoxSelected) return;

                setStack((prev) => {
                  const newStack = [i, ...prev];

                  if (newStack.length === boxLength) {
                    for (let i = 0; i < boxLength; i++) {
                      setTimeout(
                        () => {
                          setStack((prev) => prev.slice(1));
                        },
                        1000 + 300 * i,
                      );
                    }
                  }
                  return newStack;
                });
              }}
            >
              {i}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoxBacktracking;
