import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconBuyCrypto = ({
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
      viewBox="0 0 23 23"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <Path
        fill={fill}
        d="M7.495 12.552H5.188A6.322 6.322 0 010 6.33 6.333 6.333 0 016.341 0a6.328 6.328 0 011.154 12.552zM4.149 4.634a.6.6 0 00-.436 1.016l2.479 2.6a.6.6 0 00.872 0l2.48-2.6a.6.6 0 00-.872-.83L6.628 6.961l-2.043-2.14a.6.6 0 00-.436-.187z"
        data-name="Fill 1"
        transform="translate(5.739 3.275)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M23.875 0H.859a.858.858 0 100 1.715h23.016a.858.858 0 100-1.715z"
        transform="translate(0 17.133)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M4.794 15.828a7.805 7.805 0 119.349 0h2.315A9.461 9.461 0 100 9.452a9.408 9.408 0 002.479 6.376z"
        data-name="Path"
        transform="translate(2.611)"
      ></Path>
    </Svg>
  );
};

export default IconBuyCrypto;