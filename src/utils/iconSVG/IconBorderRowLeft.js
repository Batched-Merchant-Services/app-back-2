import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconBorderRowLeft = ({
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
      viewBox="0 0 40 40"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <Path fill={fill} d="M18.3,18.9h-6l4.3-3.6c0.5-0.4,0.5-1.1,0.2-1.6c-0.4-0.5-1.1-0.5-1.6-0.2l-6.7,5.5c-0.3,0.2-0.4,0.5-0.4,0.9
      s0.1,0.6,0.4,0.9l6.7,5.5c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.6-0.1,0.9-0.4c0.4-0.5,0.3-1.2-0.2-1.6l-4.3-3.6h6
      c0.6,0,1.1-0.5,1.1-1.1S18.9,18.9,18.3,18.9z" />
      <Path fill={fill} d="M25.2,18.9h-2.3c-0.6,0-1.1,0.5-1.1,1.1s0.5,1.1,1.1,1.1h2.3c0.6,0,1.1-0.5,1.1-1.1S25.8,18.9,25.2,18.9z" />
      <Path fill={fill} d="M30.8,18.9h-1.3c-0.6,0-1.1,0.5-1.1,1.1s0.5,1.1,1.1,1.1h1.3c0.6,0,1.1-0.5,1.1-1.1S31.4,18.9,30.8,18.9z" />
	    </Svg>
  );
};

export default IconBorderRowLeft;	
	
	
	