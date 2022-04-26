import * as React from 'react';
import Svg, { Path,G } from 'react-native-svg';

const IconCancelCard = ({
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
		  viewBox="0 0 26 26"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <G data-name="Group 6">
        <Path
          fill={fill}
          d="M13 26A13 13 0 013.807 3.808a13 13 0 1118.385 18.385A12.916 12.916 0 0113 26zm0-22.881a9.794 9.794 0 00-5.787 1.889 18.847 18.847 0 00-2.205 2.205 9.864 9.864 0 0013.779 13.779l2.205-2.205A9.794 9.794 0 0022.881 13 9.893 9.893 0 0013 3.119z"
          data-name="Fill 1"
        ></Path>
        <Path
          fill={fillSecondary}
          d="M17.735 11.143H.837A.8.8 0 010 10.387V.756A.8.8 0 01.837 0h16.9a.8.8 0 01.837.756v9.631a.8.8 0 01-.839.756zM.76 2.253v2.553h17.052V2.253z"
          data-name="Fill 3"
          transform="translate(3.714 7.429)"
        ></Path>
        <Path
          fill={fill}
          d="M2.358 0L0 2.358l18.071 18.071 2.358-2.358z"
          data-name="Fill 5"
          transform="translate(2.786 2.786)"
        ></Path>
      </G>
    </Svg>
  );
};

export default IconCancelCard;