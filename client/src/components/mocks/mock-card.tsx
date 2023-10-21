import React, { useState } from "react";
import { createEvent } from "../../network/services/events";

type mockProps = {
  primaryLabel: string;
  secondaryLabel: string;
  buttonLabel: string;
  action: string;
  onClick: (args: {
    input1: string;
    input2: string;
    action: string;
  }) => unknown;
};

function MockCard({
  primaryLabel,
  secondaryLabel,
  buttonLabel,
  action,
  onClick,
}: mockProps) {
  const [primaryInput, setPrimaryInput] = useState("");
  const [secondaryInput, setSecondaryInput] = useState("");

  return (
    <div className="flex p-10 justify-center ">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4 flex flex-col justify-center items-center">
            <label
              className=" text-gray-700 text-sm font-bold mb-2 justify-center"
              htmlFor="name"
            >
              {primaryLabel}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="primary"
              type="text"
              placeholder={primaryLabel}
              onChange={(v) => setPrimaryInput(v.target.value)}
              value={primaryInput}
            />
          </div>
          <div className="mb-4 flex flex-col justify-center items-center">
            <label
              className=" text-gray-700 text-sm font-bold mb-2 justify-center"
              htmlFor="username"
            >
              {secondaryLabel}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="secondary"
              type="text"
              placeholder={secondaryLabel}
              onChange={(v) => setSecondaryInput(v.target.value)}
              value={secondaryInput}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded   text-xs disabled:bg-gray-200"
              type="button"
              disabled={
                primaryInput.length === 0 || secondaryInput.length === 0
              }
              onClick={() =>
                onClick({
                  input1: primaryInput,
                  input2: secondaryInput,
                  action: action,
                })
              }
            >
              {buttonLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MockCard;
