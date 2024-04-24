import { Button, Divider, Flex, Layout, theme } from "antd";
import { FunctionComponent, useState } from "react";
import { sendDigitalPulse } from "../../helpers/crestron";
interface DoorProps {}

const Door: FunctionComponent<DoorProps> = () => {
  const [rand] = useState(Math.random());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     sentRand(Math.random());
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        backgroundColor: colorBgContainer,
      }}
    >
      <h1>Porta di casa</h1>
      <Divider />
      <Flex gap={32}>
        <div>
          <img
            style={{ borderRadius: 16, width: 640, height: 480 }}
            src={`http://192.168.179.15/api/camera/snapshot?width=640&height=480&fps=6&r=${rand}`}
          />
        </div>
        <Flex style={{}} vertical gap={32} justify="center">
          <Button size="large" type="primary" style={{ background: "#77cc77" }}>
            Apri cancello pedonale
          </Button>
          <Button size="large" type="primary" style={{ background: "#77cc77" }}>
            Apri cancello auto
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={() => sendDigitalPulse("Csig.Answer", 1000)}
          >
            Rispondi
          </Button>
          <Button
            size="large"
            danger
            type="primary"
            onClick={() => sendDigitalPulse("Csig.Hangup", 1000)}
          >
            Aggancia
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Door;
