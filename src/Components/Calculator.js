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
      } else if (bottomScreen === "0") {
        setTopScreen(num);
        setBottomScreen(num);
      } else {
        if (
          topScreen.split("").length < 30 &&
          bottomScreen.split("").length < 18
        ) {
          setTopScreen((prevState) => {
            return `${prevState.replace(/(?<=[^0-9])0+/, "")}${num}`;
          });
        }
        if (
          bottomScreen.split("").length < 18 &&
          topScreen.split("").length < 30
        ) {
          setBottomScreen((prevState) => {
            return `${prevState.replace(/^0|\+|x|-|\//g, "")}${num}`;
          });
        }
        if (
          topScreen.split("").length === 30 ||
          bottomScreen.split("").length === 18
        ) {
          setLimitReached(true);
          setTimeout(() => setLimitReached(false), 800);
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

    switch (event.target.className) {
      case "ac":
        return insertOperation("ac");
      case "divide":
        return insertOperation("/");
      case "plus":
        return insertOperation("+");
      case "minus":
        return insertOperation("-");
      case "multiply":
        return insertOperation("x");
      case "equal":
        return insertOperation("=");
      case "dot":
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
    { className: "ac", text: "AC" },
    { className: "divide", text: "/" },
    { className: "multiply", text: "x" },
    { className: "minus", text: "-" },
    { className: "seven", text: "7" },
    { className: "eight", text: "8" },
    { className: "nine", text: "9" },
    { className: "four", text: "4" },
    { className: "five", text: "5" },
    { className: "six", text: "6" },
    { className: "one", text: "1" },
    { className: "two", text: "2" },
    { className: "three", text: "3" },
    { className: "zero", text: "0" },
    { className: "equal", text: "=" },
    { className: "dot", text: "." },
    { className: "plus", text: "+" },
  ].map((item, index) => {
    return (
      <button className={item.className} key={index} onClick={handleClick}>
        {item.text}
      </button>
    );
  });

  return (
    <div id="calculator">
      <div className="num-screen">
        <div className="bottom-screen">
          {limitReached ? "DIGIT LIMIT REACHED" : bottomScreen}
        </div>
        <div className="top-screen">{topScreen}</div>
      </div>
      {data}
    </div>
  );
};

export default Calculator;
