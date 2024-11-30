import { useEffect, useState } from "react";

/* 
## User Stories

-   [X] User can see a timer for 25 minutes - the **working** session
-   [X] After the **working** session is over, the User can see a timer for 5 minutes - the **break** session
-   [X] User can _start_ / _pause_, _stop_ and _reset_ the timers

## Bonus features

-   [ ] User can hear a sound playing when the timer hits `00:00` - denoting that the session has ended
-   [ ] User can change / customize the minutes in both sessions before starting
-   [ ] User can set a **long break** session of 10 minutes. This will be activated every 4th **break** session
*/

function App() {
  const [time, setTime] = useState(1500000);
  const [isActive, setIsActive] = useState(false);

  const commands = {
    toggle: () => {
      if (time > 0) {
        setIsActive(!isActive);
      }
    },
    reset: () => {
      setIsActive(false);
      setTime(1500000);
    },
    stop: () => {
      setIsActive(false);
      setTime(0);
    },
  };

  useEffect(() => {
    let timerId: number | undefined;

    if (isActive) {
      const timer = () => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerId);
            return 0;
          }
          return prevTime - 1000;
        });
      };

      timerId = setInterval(timer, 1000);
    }
    return () => clearInterval(timerId);
  }, [isActive]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1>{time <= 300000 ? "Time for a break" : "You got this stay focus"}</h1>
      <p>{formatTime(time)}</p>
      <div className="flex flex-row space-x-8">
        <button onClick={commands.toggle}>
          {isActive ? "pause" : "start"}
        </button>
        <button onClick={commands.stop}>stop</button>
        <button onClick={commands.reset}>reset</button>
      </div>
    </div>
  );
}

export default App;
