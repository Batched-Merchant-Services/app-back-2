import * as React from 'react';
import Svg, { Path,G,Defs,ClipPath } from 'react-native-svg';

const IconTransfer = ({
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
      viewBox="0 0 25.75 18.75"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <Path
        fill='#fff' 
        d="M.689 14.824h21.755V1.533H.689z"
        transform="translate(0 .75) translate(0 2)"
      ></Path>
      <Path
        fill={fill}
        d="M21.394 15.815H1.582A1.591 1.591 0 010 14.218V1.6A1.591 1.591 0 011.582 0h19.812a1.591 1.591 0 011.581 1.6v12.618a1.591 1.591 0 01-1.581 1.597zm-4.107-4.447a.308.308 0 00-.306.309v2.007a.308.308 0 00.306.309h3.862a.308.308 0 00.306-.309v-2.007a.308.308 0 00-.306-.309zm-15.453 0a.308.308 0 00-.306.309v.462a.308.308 0 00.306.309h3.855A.308.308 0 006 12.139v-.462a.308.308 0 00-.306-.309zm15.453-2.65a.308.308 0 00-.306.309v.462a.308.308 0 00.306.309h3.855a.308.308 0 00.306-.309v-.462a.308.308 0 00-.306-.309zm-5.151 0a.308.308 0 00-.306.309v.462a.308.308 0 00.306.309h3.855a.308.308 0 00.306-.309v-.462a.308.308 0 00-.306-.309zm-5.151 0a.308.308 0 00-.306.309v.462a.308.308 0 00.306.309h3.855a.308.308 0 00.306-.309v-.462a.308.308 0 00-.306-.309zm-5.151 0a.308.308 0 00-.306.309v.462a.308.308 0 00.306.309h3.855A.308.308 0 006 9.488v-.461a.308.308 0 00-.306-.309zm0-5.232a.308.308 0 00-.306.309v2.814a.308.308 0 00.306.309h3.773a.308.308 0 00.306-.309V3.794a.308.308 0 00-.306-.309z"
        transform="translate(0 .75) translate(0 2)"
      ></Path>
      <Path
        fill="none"
        stroke={fillSecondary} 
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M2 0h20.346A2.65 2.65 0 0125 2.647V15"
        transform="translate(0 .75)"
      ></Path>
    </Svg>
  );
};

export default IconTransfer;