import * as React from 'react';
import Svg, { Path,G } from 'react-native-svg';

const IconChangeNip = ({
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
		  viewBox="0 0 22 20"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <G data-name="Group 7 Copy">
        <Path
          fill={fillSecondary}
          d="M1.57 0v1.311L.5.656l-.5.933 1.065.656L0 2.9l.5.933 1.07-.655V4.49h1.01V3.178l1.065.655.506-.933-1.065-.655 1.065-.656-.506-.933-1.065.655V0z"
          data-name="Fill 1"
        ></Path>
        <Path
          fill={fillSecondary}
          d="M1.571 0v1.311L.5.656l-.5.933 1.066.656L0 2.9l.5.933 1.066-.655V4.49h1.015V3.178l1.064.655.506-.933-1.065-.655 1.065-.656-.505-.933-1.064.655V0z"
          data-name="Fill 2"
          transform="translate(5.811)"
        ></Path>
        <Path
          fill={fillSecondary}
          d="M1.57 0v1.311L.505.656 0 1.589l1.066.656L0 2.9l.505.933 1.065-.655V4.49h1.011V3.178l1.064.655.506-.933-1.065-.655 1.065-.656-.506-.933-1.064.655V0z"
          data-name="Fill 3"
          transform="translate(12.038)"
        ></Path>
        <Path
          fill={fillSecondary}
          d="M1.571 0v1.311L.5.656l-.5.933 1.065.656L0 2.9l.5.933 1.066-.655V4.49h1.01V3.178l1.065.655.51-.933-1.065-.655 1.065-.656-.505-.933-1.065.655V0z"
          data-name="Fill 4"
          transform="translate(17.849)"
        ></Path>
        <Path
          fill={fill}
          d="M21.008 13.878H.991A.969.969 0 010 12.936V.941A.968.968 0 01.991 0h20.017A.969.969 0 0122 .941v11.995a.969.969 0 01-.992.942zm-3.989-6.123v.816h4.151v-.816zm-5.4 0v.816h4.151v-.816zm-5.4 0v.816h4.151v-.816zm-5.4 0v.816h4.162v-.816zm0-4.9v3.268H21.17V2.857z"
          data-name="Fill 5"
          transform="translate(0 6.122)"
        ></Path>
      </G>
    </Svg>
  );
};

export default IconChangeNip;