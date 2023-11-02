import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./Style/Timer.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const time = 60;

function App() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [pause, setPause] = useState(false);
  const timeLeftRef = useRef(timeLeft);
  const pauseRef = useRef(pause);

  function clickHandler() {
    if (pause) {
      setPause(false);
      pauseRef.current = false;
    } else {
      setPause(true);
      pauseRef.current = true;
    }
  }
  function tickHandler() {
    timeLeftRef.current--;
    setTimeLeft(timeLeftRef.current);
  }
  useEffect(() => {
    timeLeftRef.current = time;
    setTimeLeft(timeLeftRef.current);

    const interval = setInterval(() => {
      if (pauseRef.current) {
        return;
      }

      if (timeLeftRef.current == 0) {
        return;
      }
      tickHandler();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const percentage = Math.round((timeLeft / time) * 100);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <div className="progess-bar-container">
        <CircularProgressbarWithChildren
          value={percentage}
          styles={buildStyles({
            pathColor: "green",
            trailColor: "rgba(255,255,255,.21",
          })}
        >
          <p className="time-text">
            {minutes} : {seconds}
          </p>
        </CircularProgressbarWithChildren>
      </div>
      <button onClick={clickHandler}>
        {pause == true ? "Start" : "Pause"}
      </button>
    </div>
  );
}

export default App;
