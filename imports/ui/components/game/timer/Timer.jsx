import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Timer.scss";

function useInterval(callback) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
}

const Timer = props => {
  const [count, setCount] = useState(0);

  // Increment the counter.
  useInterval(() => {
    setCount(count + 1);
  });

  let timeout = 2;
  switch (props.size) {
  case 10:
    timeout = 10;
    break;
  case 15:
    timeout = 20;
    break;
  case 20:
    timeout = 30;
    break;
  }

  return <p className='timer'>Seconds remaining: {timeout * 60 - count}</p>;
};

Timer.propTypes = {
  size: PropTypes.number
};

export default Timer;
