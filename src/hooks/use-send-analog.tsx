import { useEffect, useState } from "react";

type SendAnalog = (value: number) => void;
type UseSendAnalog = [number, SendAnalog];
export default function useSendAnalog(): UseSendAnalog {
  const [analogState, setAnalogState] = useState(0);

  useEffect(() => {
    const a1Id = window.CrComLib.subscribeState("n", "1", (value: number) =>
      setAnalogState(value)
    );

    return () => {
      window.CrComLib.unsubscribeState("n", "1", a1Id);
    };
  }, []);

  const sendAnalog: SendAnalog = (value: number) => {
    window.CrComLib.publishEvent("n", "1", value);
    setAnalogState(value);
  };

  return [analogState, sendAnalog];
}
