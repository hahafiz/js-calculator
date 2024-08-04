import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [lastPressedEquals, setLastPressedEquals] = useState(false);

  const handleNumber = (event) => {
    const number = event.target.textContent;

    if (waitingForOperand) {
      setCurrentValue(number);
      setDisplay(number);
      setWaitingForOperand(false);
    } else {
      setCurrentValue(
        currentValue === "0" || currentValue === "-"
          ? currentValue === "-"
            ? "-" + number
            : number
          : currentValue + number
      );
      setDisplay(
        currentValue === "0" || currentValue === "-"
          ? currentValue === "-"
            ? "-" + number
            : number
          : currentValue + number
      );
    }
    setLastPressedEquals(false);
  };

  const handleOperator = (event) => {
    const nextOperator = event.target.textContent;

    if (lastPressedEquals) {
      setPreviousValue(currentValue);
      setCurrentValue("0");
      setOperator(nextOperator);
      setWaitingForOperand(true);
      setLastPressedEquals(false);
      return;
    }

    if (waitingForOperand) {
      if (nextOperator === "-" && currentValue !== "-") {
        // Allow entering a negative number
        setCurrentValue("-");
        setDisplay("-");
        setWaitingForOperand(false);
      } else if (operator) {
        // If we already have an operator, update it (unless it's changing to a minus for negation)
        if (operator === "-" && nextOperator !== "-") {
          setPreviousValue(currentValue);
        }
        setOperator(nextOperator);
      } else {
        // First operator after a number
        setOperator(nextOperator);
      }
    } else {
      if (previousValue === null) {
        setPreviousValue(currentValue);
      } else if (operator) {
        const result = calculate(previousValue, currentValue, operator);
        setPreviousValue(result);
        setDisplay(result);
        setCurrentValue(result);
      }
      setOperator(nextOperator);
      setWaitingForOperand(true);
    }
    setLastPressedEquals(false);
  };

  const handleEqual = () => {
    if (!operator || waitingForOperand) return;

    const result = calculate(previousValue, currentValue, operator);
    setDisplay(result);
    setCurrentValue(result);
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
    setLastPressedEquals(true);
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setCurrentValue("0.");
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (!currentValue.includes(".")) {
      setCurrentValue(currentValue + ".");
      setDisplay(currentValue + ".");
    }
    setLastPressedEquals(false);
  };

  const handleClear = () => {
    setDisplay("0");
    setCurrentValue("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setLastPressedEquals(false);
  };

  const calculate = (a, b, op) => {
    a = parseFloat(a);
    b = parseFloat(b || a); // Use 'a' if 'b' is empty
    switch (op) {
      case "+":
        return (a + b).toString();
      case "-":
        return (a - b).toString();
      case "*":
        return (a * b).toString();
      case "/":
        return (a / b).toString();
      default:
        return b.toString();
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <div id="display" className="row">
          {display}
        </div>
        <div id="clear" className="row" onClick={handleClear}>
          AC
        </div>
        <div id="seven" onClick={handleNumber}>
          7
        </div>
        <div id="eight" onClick={handleNumber}>
          8
        </div>
        <div id="nine" onClick={handleNumber}>
          9
        </div>
        <div id="multiply" onClick={handleOperator}>
          *
        </div>
        <div id="four" onClick={handleNumber}>
          4
        </div>
        <div id="five" onClick={handleNumber}>
          5
        </div>
        <div id="six" onClick={handleNumber}>
          6
        </div>
        <div id="divide" onClick={handleOperator}>
          /
        </div>
        <div id="one" onClick={handleNumber}>
          1
        </div>
        <div id="two" onClick={handleNumber}>
          2
        </div>
        <div id="three" onClick={handleNumber}>
          3
        </div>
        <div id="add" onClick={handleOperator}>
          +
        </div>
        <div id="zero" onClick={handleNumber}>
          0
        </div>
        <div id="decimal" onClick={handleDecimal}>
          .
        </div>
        <div id="equals" onClick={handleEqual}>
          =
        </div>
        <div id="subtract" onClick={handleOperator}>
          -
        </div>
      </div>
    </div>
  );
}

export default App;
