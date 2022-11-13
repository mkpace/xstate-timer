import "./styles.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useMachine } from "@xstate/react";
import { timerMachine } from "./timerMachine";

const Timer = () => {
  const [state, send] = useMachine(timerMachine);

  const { elapsed, duration, lap, lapIdx } = state.context;

  return (
    <section>
      <label>
        <span>Elapsed time:</span>
        <output>{elapsed.toFixed(1)}s /</output>
        <progress max={duration} value={elapsed} />
      </label>
      <span>
        Lap: {lap[lapIdx]}s [{lapIdx}] / {lap.length}
      </span>
      <label>
        <span>Duration: {duration.toFixed(1)}s</span>
      </label>
      <label>
        <span>Duration:</span>
        <input
          type="range"
          min={0}
          max={30}
          value={duration}
          onChange={(e) => {
            send("DURATION.UPDATE", { value: +e.target.value });
          }}
        />
      </label>
      <button onClick={(_) => send("RESET")}>Reset</button>
      <button onClick={(_) => send("LAP")} style={{ marginTop: "1em" }}>
        LAP
      </button>
    </section>
  );
};

const App = () => {
  return <Timer />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
