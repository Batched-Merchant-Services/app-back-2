import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconReceiveCrypto = ({
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
      viewBox="0 0 31 20"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <Path
        fill={fillSecondary}
        d="M13.85.258L.082 18.335a.381.381 0 00.529.539L20.792 3.713a.659.659 0 00-.14-1.133L14.62.051a.65.65 0 00-.77.207"
        data-name="Fill 1"
      ></Path>
      <Path
        fill={fill}
        d="M.21 14.239L22.653.1a.649.649 0 01.717.016l6.117 4.232a.659.659 0 01-.166 1.166L.582 15.037a.443.443 0 01-.372-.8"
        data-name="Fill 4"
        transform="translate(1.133 4.894)"
      ></Path>
    </Svg>
  );
};

export default IconReceiveCrypto;