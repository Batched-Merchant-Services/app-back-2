import * as React from 'react';
import Svg, { Path,G,Defs,ClipPath } from 'react-native-svg';

const IconSwapConfirmation = ({
  fill,
  fillSecondary,
  height,
  width,
  ...props
}) => {

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      height={height} 
      width={width}
    >
      <Path
        fill={fill}
        d="M150 0a150 150 0 10150 150A150.055 150.055 0 00150 0zm67 193.9c-13.7 13-27.3 26.1-41 39.1-1.5 1.4-3 2.4-5.1 2.2a5.633 5.633 0 01-5.3-6v-25h-2.2c-16 0-32.1.2-48.1-.1-27.8-.4-52.3-21.5-57.1-49-.4-2.2-.7-4.4-1-6.6v-17.4c1.9-3.6 4.2-4.9 7.1-4.2 3 .7 4.4 3 4.5 7.1.5 19.7 16.2 36.8 35.9 38.9a45.33 45.33 0 005.2.3h55.7V149c0-2.8.8-5 3.5-6.2s5-.2 7.1 1.8c13.6 13.1 27.3 26.1 40.9 39.1 3.6 3.5 3.6 6.7-.1 10.2zm25.9-26.1a5.771 5.771 0 01-5.9 5.5 5.941 5.941 0 01-5.7-5.9 40.176 40.176 0 00-10.4-27c-7.7-8.6-17.5-13.4-29.1-13.5-18.8-.2-37.5-.1-56.3-.1a6.245 6.245 0 00-1.2.1v24.8c0 3.9-2.8 6.5-6.5 5.9a6.407 6.407 0 01-3.3-1.6q-21.3-20.1-42.4-40.4a5.606 5.606 0 010-8.5q21.15-20.25 42.4-40.4a20.742 20.742 0 013.2-1.9h1.5c4.3 1.6 5.2 2.8 5.2 7.5v23.6h2.3c16.1 0 32.2-.2 48.3.1 27.5.4 52.1 21.7 56.9 48.9 1.4 7.6 1 15.3 1 22.9z"
      ></Path>
    </Svg>
  );
};

export default IconSwapConfirmation;