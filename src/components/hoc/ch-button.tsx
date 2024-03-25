import { Button, ButtonProps } from "antd";
import { FunctionComponent } from "react";

interface ChButtonProps extends ButtonProps {
  text: string;
  onPress?: () => void;
  onRelease?: () => void;
}

const ChButton: FunctionComponent<ChButtonProps> = ({
  text,
  onPress,
  onRelease,
  ...props
}) => {
  return (
    <Button
      {...props}
      onTouchStart={onPress}
      onTouchEnd={onRelease}
      onMouseDown={onPress}
      onMouseUp={onRelease}
    >
      {text}
    </Button>
  );
};

export default ChButton;
