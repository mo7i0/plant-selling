import React, { useState, useEffect } from "react";

function Counter({ initialCount = 0, onQuantityChange, maxQuantity = 5 }) {
  const [count, setCount] = useState(initialCount);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (count > 2) {
      setMessage("Please, it's not enough for you to take. Let others also get it.");
    } else if (count === 1) {
      setMessage("You don't want to order another one? :(");
    } else {
      setMessage(null);
    }
  }, [count]);

  const increment = () => {
    if (count < maxQuantity) {
      const newCount = count + 1;
      setCount(newCount);
      if (onQuantityChange) onQuantityChange(newCount);
    }
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      if (onQuantityChange) onQuantityChange(newCount);
    }
  };

  const reset = () => {
    setCount(0);
    if (onQuantityChange) onQuantityChange(0);
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-2">
      <button data-testid="increment" onClick={increment} className="btn btn-outline-secondary me-2">
        +
      </button>
      <span data-testid="count" className="mx-3">
        {count}
      </span>
      <button data-testid="decrement" onClick={decrement} className="btn btn-outline-secondary me-2">
        -
      </button>
      <button data-testid="reset" onClick={reset} className="btn btn-outline-secondary me-2">
        Reset
      </button>
      {message && <p className="text-danger mt-2">{message}</p>}
    </div>
  );
}

export default Counter;