import { useEffect, useState } from "react";

type SendDigital = (value: boolean) => void;
type SendPulse = () => void;
type UseSendDigital = [boolean, SendDigital, SendPulse];

export default function useSendDigital(
  feedback: string | number,
  command?: string | number
): UseSendDigital {
  const [digitalState, setDigitalState] = useState(false);

  useEffect(() => {
    const a1Id = window.CrComLib.subscribeState(
      "b",
      feedback.toString(),
      (value: boolean) => {
        setDigitalState(value);
      }
    );

    return () => {
      window.CrComLib.unsubscribeState("b", feedback.toString(), a1Id);
    };
  }, []);

  const sendDigital: SendDigital = (value: boolean) => {
    command && window.CrComLib.publishEvent("b", command.toString(), value);
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
