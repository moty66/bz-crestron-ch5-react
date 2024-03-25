import { FunctionComponent } from "react";
import useSendAnalog from "../hooks/use-send-analog";
import useSendDigital from "../hooks/use-send-digital";
import useSendSerial from "../hooks/use-send-serial";
import ChButton from "./hoc/ch-button";

interface TestComponentProps {}

const TestComponent: FunctionComponent<TestComponentProps> = () => {
  const [digitalState, sendDigital] = useSendDigital(1);
  const [analogState, sendAnalog] = useSendAnalog(1);
  const [serialState, sendSerial] = useSendSerial(1);

  return (
    <div id="controlGroupWrapper">
      <div className="controlGroup">
        <ChButton
          id="sendDigitalButton"
          className="btn"
          onPress={() => sendDigital(true)}
          onRelease={() => sendDigital(false)}
          text="Toggle Digital"
        />

        <p id="currentDigitalValue">{digitalState.toString()}</p>
      </div>
      <div className="controlGroup">
        <p id="currentAnalogValue">{analogState}</p>
        <input
          type="range"
          min="0"
          max="65535"
          value={analogState}
          placeholder="32767"
          id="analogSlider"
          onChange={(e) => sendAnalog(Number(e.target.value))}
        />
      </div>
      <div className="controlGroup">
        <input
          type="text"
          name="Data"
          id="currentSerialValue"
          placeholder="Placeholder"
          value={serialState}
          onChange={(e) => sendSerial(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TestComponent;
