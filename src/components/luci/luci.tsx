import { Button, Slider } from "antd";
import { FunctionComponent } from "react";
import { CRESTRON_MAX_ANALOG_SIZE, percentage } from "../../helpers/crestron";
import useSendAnalog from "../../hooks/use-send-analog";
import useSendDigital from "../../hooks/use-send-digital";
import { ILuciComponent } from "./luci-config";

interface LuciComponentProps {
  onToggle?: () => void;
  item: ILuciComponent;
}

const LuciComponent: FunctionComponent<LuciComponentProps> = ({ item }) => {
  const [digitalState, __sendDigital, sendPulse] = useSendDigital(
    `Lighting_zone[${item.index}].Lighting_channel[${item.channel}].is_on`,
    `Lighting_zone[${item.index}].Lighting_channel[${item.channel}].toggle`
  );

  //Lighting_zone[0].Lighting_channel[0].current_value
  const [analogState, sendAnalog, toggleAnalog] = useSendAnalog(
    `Lighting_zone[${item.index}].Lighting_channel[${item.channel}].current_value`,
    `Lighting_zone[${item.index}].Lighting_channel[${item.channel}].set_value`
  );

  return (
    <div id="controlGroupWrapper">
      <div
        className="controlGroup"
        style={{
          display: "flex",
          width: "88px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 32,
          textAlign: "center",
        }}
      >
        <p
          style={{
            height: 42,
            padding: "0 16px",
            //overflow: "hidden",
          }}
        >
          {/* {percentage(analogState)} <br /> */}
          {item.name}
        </p>
        <Slider
          disabled={item.isOnOff}
          value={analogState}
          style={{ height: 240 }}
          min={0}
          max={CRESTRON_MAX_ANALOG_SIZE}
          step={CRESTRON_MAX_ANALOG_SIZE / 50}
          tooltip={{ formatter: (value) => percentage(value || 0) }}
          vertical
          defaultValue={analogState}
          onChange={(e) => (item.isOnOff ? null : sendAnalog(Number(e)))}
        />
        <Button
          size="large"
          type={digitalState ? "primary" : "default"}
          onClick={() => (item.isOnOff ? sendPulse() : toggleAnalog())}
          style={{
            //height: "48px",
            width: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {digitalState ? "ON" : "OFF"}
        </Button>
      </div>
    </div>
  );
};

export default LuciComponent;
