import { useEffect, useState } from "react";

type SendDigital = (value: boolean) => void;
type SendPulse = () => void;
type UseSendDigital = [boolean, SendDigital, SendPulse];

export default function useSendDigital(id: string | number): UseSendDigital {
  const [digitalState, setDigitalState] = useState(false);

  useEffect(() => {
    const a1Id = window.CrComLib.subscribeState(
      "b",
      id.toString(),
      (value: boolean) => {
        setDigitalState(value);
      }
    );

    return () => {
      window.CrComLib.unsubscribeState("b", id.toString(), a1Id);
    };
  }, []);

  const sendDigital: SendDigital = (value: boolean) => {
    window.CrComLib.publishEvent("b", id.toString(), value);
    //setDigitalState(value);
  };

  const sendPulse: SendPulse = () => {
    sendDigital(true);
    setTimeout(() => {
      sendDigital(false);
    }, 1);
  };

  return [digitalState, sendDigital, sendPulse];
}
