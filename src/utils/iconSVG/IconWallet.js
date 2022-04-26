import * as React from 'react';
import Svg, { Path,G,Defs,ClipPath } from 'react-native-svg';

const IconWallet = ({
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
      viewBox="0 0 24 20"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            fill="none"
            d="M0 0h16.868v14.149H0z"
            transform="translate(.142 .218)"
          ></Path>
        </ClipPath>
      </Defs>
      <Path
        fill={fillSecondary}
        d="M16.437 16.772a.637.637 0 01-.612-.659V6.391a2.368 2.368 0 00-2.272-2.449H.792a.637.637 0 01-.612-.66.637.637 0 01.612-.659h12.761a3.643 3.643 0 013.5 3.768v9.722a.637.637 0 01-.612.659"
        transform="translate(3)"
      ></Path>
      <Path
        fill="none"
        d="M.142.218H17.01v14.149H.142z"
        transform="translate(3) translate(2.176)"
      ></Path>
      <G clipPath="url(#a)" transform="translate(3) translate(2.176)">
        <Path
          fill={fillSecondary}
          d="M16.399 14.367a.637.637 0 01-.612-.659V5.98a4.3 4.3 0 00-4.123-4.443H.754a.637.637 0 01-.612-.66.637.637 0 01.612-.659h10.91a5.573 5.573 0 015.347 5.762v7.727a.637.637 0 01-.612.659"
        ></Path>
      </G>
      <Path
        fill={fill}
        d="M1.956.05A2.054 2.054 0 000 2.16v15.107a2.367 2.367 0 002.294 2.434H16.04a1.79 1.79 0 001.735-1.841V6.872a1.791 1.791 0 00-1.735-1.841H8.269l-4.564-.02h-.2a2.2 2.2 0 01-1.3-.253 2.324 2.324 0 01.114-3.96c.01 0 .157-.091.168-.095A.358.358 0 002.246.05h-.29z"
      ></Path>
      <Path
        fill='#fff'
        d="M15 12.5a1.5 1.5 0 10-1.5 1.5 1.5 1.5 0 001.5-1.5"
      ></Path>
    </Svg>
  );
};

export default IconWallet;