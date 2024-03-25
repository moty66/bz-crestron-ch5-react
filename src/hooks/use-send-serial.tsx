import { useEffect, useState } from "react";

type SendSerial = (value: string) => void;
type UseSendSerial = [string, SendSerial];
export default function useSendSerial(): UseSendSerial {
  const [serialState, setSerialtate] = useState("");

  useEffect(() => {
    const a1Id = window.CrComLib.subscribeState("s", "1", (value: string) =>
      setSerialtate(value)
    );

    return () => {
      window.CrComLib.unsubscribeState("s", "1", a1Id);
    };
  }, []);

  const sendSerial: SendSerial = (value: string) => {
    window.CrComLib.publishEvent("s", "1", value);
    setSerialtate(value);
  };

  return [serialState, sendSerial];
}
