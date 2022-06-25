import React, { useEffect } from "react";

function Timer() {
  const [minute, setMinute] = React.useState(0);
  const [second, setSecond] = React.useState(0);
  const [id, setId] = React.useState(0);
  const [timer, setTimer] = React.useState({
    start: false,
    pause: false,
    stop: false,
  });

  const calculateTime = (second) => {
    let setIntervalID = setInterval(() => {
      if (second === 59) {
        setSecond(0);
        setMinute((m) => m + 1);
        if (minute === 59) setMinute(0);
      } else {
        second += 1;
        setSecond(second);
      }
    }, 1000);
    setId(setIntervalID);
  };

  const startTimer = () => {
    if (timer.start) return;

    setTimer({
      start: true,
      pause: false,
      stop: false,
    });
    calculateTime(0);
  };

  const stopTimer = () => {
    setTimer({
      start: false,
      pause: false,
      stop: true,
    });
  };

  const pauseTimer = () => {
    if (timer.pause) {
      setSecond(second);
      setMinute(minute);
      calculateTime(second);

      setTimer({
        start: true,
        pause: false,
        stop: false,
      });
    } else
      setTimer({
        start: false,
        pause: true,
        stop: false,
      });
  };

  useEffect(() => {
    if (!timer.start && timer.stop) {
      clearInterval(id);
      setSecond(0);
      setMinute(0);
    }

    if (!timer.start && timer.pause) {
      clearInterval(id);
      setSecond(second);
      setMinute(minute);
    }
  }, [timer]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: "10px" }}>
          {minute} : {second}
        </h1>
        <div>
          <button onClick={startTimer} style={{ margin: "10px" }}>
            Start
          </button>
          <button onClick={pauseTimer} style={{ margin: "10px" }}>
            {timer.pause && !timer.start ? "Resume" : "Pause"}
          </button>
          <button onClick={stopTimer} style={{ margin: "10px" }}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
