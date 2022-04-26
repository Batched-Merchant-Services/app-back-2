import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconSendCrypto = ({
  fill,
  fillSecondary,
  height,
  width,
  ...props
}) => {

  return (
    <Svg xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 27 25"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <Path
        fill={fill}
        d="M12.279 3.635l.035-.031L.133 18.717a.6.6 0 00-.133.4l.157 5.303a.58.58 0 001.024.369L4.264 21.1a.574.574 0 01.657-.166l6.224 2.534a.581.581 0 00.789-.454L15.684.393a.328.328 0 00-.577-.27z"
        data-name="Fill 1"
        transform="translate(11.282)"
      ></Path>
      <Path
        fill={fill}
        d="M24.555.557L7.5 16.2a.572.572 0 01-.546.145L.437 14.626a.6.6 0 01-.146-1.092L24.182.046a.319.319 0 01.373.51"
        data-name="Fill 4"
        transform="translate(0 .988)"
      ></Path>
    </Svg>
  );
};

export default IconSendCrypto;