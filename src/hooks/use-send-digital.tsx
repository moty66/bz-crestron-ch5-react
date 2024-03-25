import { useEffect, useState } from "react";

type SendDigital = (value: boolean) => void;
type UseSendDigital = [boolean, SendDigital];

export default function useSendDigital(): UseSendDigital {
  const [digitalState, setDigitaltate] = useState(false);

  useEffect(() => {
    const a1Id = window.CrComLib.subscribeState("b", "1", (value: boolean) =>
      setDigitaltate(value)
    );

    return () => {
      window.CrComLib.unsubscribeState("b", "1", a1Id);
    };
  }, []);

  const sendDigital: SendDigital = (value: boolean) => {
    window.CrComLib.publishEvent("b", "1", value);
    setDigitaltate(value);
  };

  return [digitalState, sendDigital];
}
