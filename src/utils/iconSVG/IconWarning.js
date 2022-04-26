import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconWarning = ({
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
		  viewBox="0 0 31 13"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <Path
        fill={fillSecondary}
        d="M39.4 33.3l-17-29.4c-1.1-1.9-3.8-1.9-4.9 0L.5 33.3c-1.1 1.9.3 4.2 2.4 4.2H37c2.1 0 3.5-2.3 2.4-4.2z"
      ></Path>
      <Path
        fill={fill}
        d="M18.1 23.9v-9.5c0-1 .8-1.9 1.9-1.9 1 0 1.9.8 1.9 1.9v9.5c0 1-.8 1.9-1.9 1.9-1 0-1.9-.9-1.9-1.9zM20 28c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6 1.4 0 2.6-1.1 2.6-2.6S21.4 28 20 28z"
      ></Path>
    </Svg>
  );
};

export default IconWarning;