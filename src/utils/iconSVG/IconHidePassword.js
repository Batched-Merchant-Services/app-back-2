import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconHidePassword = ({
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
      <Path
        fill={fill}
        d="M38.9 16.1l-1-.7c-5.4-4.1-11.6-6.2-17.8-6.2H20h-.1c-6 0-11.9 1.9-17.2 5.8l-1.5 1.1c-1.1.8-1.3 2.3-.5 3.3.5.6 1.2 1 1.9 1 .5 0 1-.1 1.4-.5l1.5-1.1c2.3-1.6 4.7-2.9 7.2-3.7-.1.5-.1 1-.1 1.5 0 4.1 3.3 7.5 7.5 7.5 4.1 0 7.5-3.3 7.5-7.5 0-.5-.1-1-.1-1.5 2.7.9 5.3 2.2 7.7 4l1 .7c1.1.8 2.6.6 3.4-.5.5-.9.3-2.4-.7-3.2z"
      ></Path>
      <Path fill={fill} d="M32.5 22.4l-1.2.9c-7 5.1-16 5-23-.3l-.8-.6c-.8-.6-2-.5-2.6.4-.6.8-.5 2 .4 2.6l.7.6c4.2 3.2 9.1 4.8 13.9 4.8 4.7 0 9.4-1.5 13.5-4.5l1.2-.9c.8-.6 1-1.8.4-2.6-.5-.8-1.7-1-2.5-.4z"></Path>
	    </Svg>
  );
};

export default IconHidePassword;	
	
	
	