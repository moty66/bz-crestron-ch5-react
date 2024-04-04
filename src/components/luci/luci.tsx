import { Button, Slider } from "antd";
import { FunctionComponent } from "react";
import useSendAnalog from "../../hooks/use-send-analog";
import useSendDigital from "../../hooks/use-send-digital";
import { IZoneComponent } from "./luci-config";
import { CRESTRON_MAX_ANALOG_SIZE, percentage } from "../../helpers/crestron";

interface LuciComponentProps {
  onToggle?: () => void;
  item: IZoneComponent;
}

const LuciComponent: FunctionComponent<LuciComponentProps> = ({ item }) => {
  // console.log({ item });
  const [digitalState] = useSendDigital(
    `Lighting_zone[${item.index}].Lighting_channel[${item.channel}].is_on`
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 32,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "1.1rem",
            height: 56,
            padding: "0 16px",
            overflow: "hidden",
            marginBottom: 8,
            marginTop: 8,
          }}
        >
          {item.name}
        </p>
        <h1
          style={{ fontSize: "1.1rem", marginBottom: 8, marginTop: 8 }}
          id="currentAnalogValue"
        >
          {percentage(analogState)}
        </h1>
        <Slider
          value={analogState}
          style={{ height: 320 }}
          min={0}
          max={CRESTRON_MAX_ANALOG_SIZE}
          step={CRESTRON_MAX_ANALOG_SIZE / 100}
          tooltip={{ formatter: (value) => percentage(value || 0) }}
          vertical
          defaultValue={analogState}
          onChange={(e) => sendAnalog(Number(e))}
        />
        <Button
          size="large"
          type={digitalState ? "primary" : "default"}
          onClick={() => toggleAnalog()}
          style={{
            //height: "48px",
            width: 92,
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
