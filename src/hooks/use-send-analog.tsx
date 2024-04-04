import { useEffect, useState } from "react";
import { CRESTRON_MAX_ANALOG_SIZE } from "../helpers/crestron";

type sendAnalog = (value: number) => void;
type toggleAnalog = () => void;
type UseSendAnalog = [number, sendAnalog, toggleAnalog];
export default function useSendAnalog(
  feedback: string | number,
  command?: string | number
): UseSendAnalog {
  const [analogState, setAnalogState] = useState(0);

  useEffect(() => {
    const a1Id = window.CrComLib.subscribeState(
      "n",
      feedback.toString(),
      (value: number) => setAnalogState(value)
    );

    return () => {
      window.CrComLib.unsubscribeState("n", feedback.toString(), a1Id);
    };
  }, []);

  const sendAnalog: sendAnalog = (value) => {
    command && window.CrComLib.publishEvent("n", command.toString(), value);
    //setAnalogState(value);
  };

  const toggleAnalog = () => {
    sendAnalog(analogState === 0 ? CRESTRON_MAX_ANALOG_SIZE : 0);
  };

  return [analogState, sendAnalog, toggleAnalog];
}
