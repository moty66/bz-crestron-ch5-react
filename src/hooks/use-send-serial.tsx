import { useEffect, useState } from "react";

type SendSerial = (value: string) => void;
type UseSendSerial = [string, SendSerial];
export default function useSendSerial(id: string | number): UseSendSerial {
  const [serialState, setSerialtate] = useState("");

  useEffect(() => {
    const a1Id = window.CrComLib.subscribeState(
      "s",
      id.toString(),
      (value: string) => setSerialtate(value)
    );

    return () => {
      window.CrComLib.unsubscribeState("s", id.toString(), a1Id);
    };
  }, []);

  const sendSerial: SendSerial = (value: string) => {
    window.CrComLib.publishEvent("s", id.toString(), value);
    setSerialtate(value);
  };

  return [serialState, sendSerial];
}
