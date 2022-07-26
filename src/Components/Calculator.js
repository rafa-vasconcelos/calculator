/* eslint-disable no-eval */
import React from "react";

const Calculator = () => {
  const [topScreen, setTopScreen] = React.useState("");

  const [bottomScreen, setBottomScreen] = React.useState("0");

  const [limitReached, setLimitReached] = React.useState(false);

  const handleClick = (event) => {
    const insertNumber = (num) => {
      if (topScreen.match(/=/)) {
        setTopScreen(num);
        setBottomScreen(num);
      } else if (topScreen.match(/[^.0]0$/) && num === "0") {
        return;
      } else if (bottomScreen === "0" && num === ".") {
        setBottomScreen("0.");
        setTopScreen((prevState) => `${prevState}.`);
      } else if (bottomScreen === "0") {
        setTopScreen(num);
        setBottomScreen(num);
      } else {
        if (bottomScreen.match(/\./g)?.length === 1 && num === ".") {
          return;
        }

        if (
          topScreen.split("").length < 30 &&
          bottomScreen.split("").length < 18
        ) {
          setTopScreen((prevState) => {
            return `${prevState.replace(/(?<=[^0-9.+-x/])0+/, "")}${num}`;
          });
        }
        if (
          bottomScreen.split("").length < 18 &&
          topScreen.split("").length < 30
        ) {
          setBottomScreen((prevState) => {
            return `${prevState.replace(/^0[^.]|\+|x|-|\//g, "")}${num}`;
          });
        }
        if (
          topScreen.split("").length === 30 ||
          bottomScreen.split("").length === 18
        ) {
          setLimitReached(true);
          setTimeout(() => setLimitReached(false), 800);
        }
        if (/\.+/.test(bottomScreen)) {
          setBottomScreen(
            (prevState) => `${prevState.replace(/(?<=[.])\.+/, "")}`
          );
          setTopScreen(
            (prevState) => `${prevState.replace(/(?<=[.])\.+/, "")}`
          );
        }
      }
    };

    const insertOperation = (operation) => {
      if (operation === "ac") {
        setTopScreen("");
        setBottomScreen("0");
      } else if (topScreen.match(/=/) && operation !== "=") {
        setTopScreen(
          (prevState) => `${prevState.match(/(?<=[=]).+/)}${operation}`
        );
        setBottomScreen(operation);
      } else if (topScreen.match(/(-|\+|x|\/)$/)) {
        setTopScreen((prevState) =>
          prevState.replace(/(-|\+|x|\/)$/, operation)
        );
        setBottomScreen(operation);
      } else if (operation === "=" && /=/.test(topScreen) === false) {
        setTopScreen(
          (prevState) =>
            `${prevState}${operation}${eval(prevState.replace("x", "*"))}`
        );
        setBottomScreen(eval(topScreen.replace("x", "*")));
      } else if (operation !== "=") {
        setTopScreen((prevState) => {
          return `${prevState}${operation}`;
        });
        setBottomScreen(operation);
      }
    };

    switch (event.target.id) {
      case "clear":
        return insertOperation("ac");
      case "divide":
        return insertOperation("/");
      case "add":
        return insertOperation("+");
      case "subtract":
        return insertOperation("-");
      case "multiply":
        return insertOperation("x");
      case "equals":
        return insertOperation("=");
      case "decimal":
        return insertNumber(".");
      case "zero":
        return insertNumber("0");
      case "one":
        return insertNumber("1");
      case "two":
        return insertNumber("2");
      case "three":
        return insertNumber("3");
      case "four":
        return insertNumber("4");
      case "five":
        return insertNumber("5");
      case "six":
        return insertNumber("6");
      case "seven":
        return insertNumber("7");
      case "eight":
        return insertNumber("8");
      case "nine":
        return insertNumber("9");
      default:
        return insertOperation("ac");
    }
  };

  const data = [
    { id: "clear", text: "AC" },
    { id: "divide", text: "/" },
    { id: "multiply", text: "x" },
    { id: "subtract", text: "-" },
    { id: "seven", text: "7" },
    { id: "eight", text: "8" },
    { id: "nine", text: "9" },
    { id: "four", text: "4" },
    { id: "five", text: "5" },
    { id: "six", text: "6" },
    { id: "one", text: "1" },
    { id: "two", text: "2" },
    { id: "three", text: "3" },
    { id: "zero", text: "0" },
    { id: "equals", text: "=" },
    { id: "decimal", text: "." },
    { id: "add", text: "+" },
  ].map((item, index) => {
    return (
      <button id={item.id} key={index} onClick={handleClick}>
        {item.text}
      </button>
    );
  });

  return (
    <div id="calculator">
      <div id="display">
        <div id="input">
          {limitReached ? "DIGIT LIMIT REACHED" : bottomScreen}
        </div>
        <div id="output">{topScreen}</div>
      </div>
      {data}
    </div>
  );
};

export default Calculator;
