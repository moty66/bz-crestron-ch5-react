import { useEffect, useState } from "react";

type SendAnalog = (value: number) => void;
type UseSendAnalog = [number, SendAnalog];
export default function useSendAnalog(id: string | number): UseSendAnalog {
  const [analogState, setAnalogState] = useState(0);

  useEffect(() => {
    const a1Id = window.CrComLib.subscribeState(
      "n",
      id.toString(),
      (value: number) => setAnalogState(value)
    );

    return () => {
      window.CrComLib.unsubscribeState("n", id.toString(), a1Id);
    };
  }, []);

  const sendAnalog: SendAnalog = (value: number) => {
    window.CrComLib.publishEvent("n", id.toString(), value);
    setAnalogState(value);
  };

  return [analogState, sendAnalog];
}
