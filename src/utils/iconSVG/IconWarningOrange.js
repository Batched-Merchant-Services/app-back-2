import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconWarningOrange = ({
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
		  viewBox="0 0 51.982 57.716"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <Path
        fill={fillSecondary}
        d="M33.27 28.628s-9.308-2.439-5.621-5.827 4.822-9.074 4.02-13.738S27.644 0 21.865 0h-.546c-5.778 0-9 4.4-9.8 9.063s.334 10.352 4.021 13.738-5.621 5.827-5.621 5.827C-.967 32.473.023 39.173.023 39.173a33.017 33.017 0 008.458 2.274 100 100 0 0026.223 0 33.009 33.009 0 008.457-2.274s.991-6.7-9.891-10.545"
        data-name="Fill 1"
        transform="translate(3.434)"
      ></Path>
      <Path
        fill={fill}
        d="M6.961 1.174L4.928 2.348V0H3v2.348L.964 1.174 0 2.845l2.033 1.174L0 5.194l.964 1.67L3 5.69v2.349h1.93V5.69l2.031 1.174.965-1.67-2.033-1.175 2.033-1.174z"
        data-name="Fill 3"
        transform="translate(0 45.044)"
      ></Path>
      <Path
        fill={fill}
        d="M6.962 1.174L4.928 2.348V0H3v2.348L.965 1.174 0 2.845l2.034 1.174L0 5.193l.965 1.671L3 5.69v2.348h1.93V5.69l2.032 1.174.965-1.671-2.034-1.174 2.034-1.174z"
        data-name="Fill 5"
        transform="translate(11.014 48.133)"
      ></Path>
      <Path
        fill={fill}
        d="M6.962 1.174L4.928 2.348V0H3v2.348L.965 1.174 0 2.845l2.034 1.174L0 5.194l.965 1.67L3 5.69v2.349h1.928V5.69l2.034 1.174.965-1.67-2.034-1.175 2.034-1.174z"
        data-name="Fill 7"
        transform="translate(22.028 49.677)"
      ></Path>
      <Path
        fill={fill}
        d="M7.927 2.845l-.965-1.671-2.034 1.174V0H3v2.348L.965 1.174 0 2.845l2.034 1.174L0 5.194l.965 1.671L3 5.69v2.349h1.93V5.69l2.032 1.175.965-1.671-2.034-1.175z"
        data-name="Fill 12"
        transform="translate(44.056 45.044)"
      ></Path>
      <Path
        fill={fill}
        d="M6.961 1.174L4.928 2.348V0H3v2.348L.964 1.174 0 2.845l2.033 1.174L0 5.193l.964 1.671L3 5.69v2.348h1.93V5.69l2.031 1.174.965-1.671-2.033-1.174 2.033-1.174z"
        data-name="Fill 10"
        transform="translate(33.042 48.133)"
      ></Path>
    </Svg>
  );
};

export default IconWarningOrange;