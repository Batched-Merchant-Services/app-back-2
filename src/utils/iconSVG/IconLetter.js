import * as React from 'react';
import Svg, { Path,G } from 'react-native-svg';

const IconLetter = ({
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
		  viewBox="0 0 24 24"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
    	 <G data-name="Group 11">
        <Path
          fill={fill}
          d="M10.06 5.549L.731.069A.478.478 0 000 .438V11.4a.478.478 0 00.731.368l9.328-5.48a.419.419 0 000-.736"
          data-name="Fill 1"
          transform="translate(0 11.038)"
        ></Path>
        <Path
          fill={fill}
          d="M8.7.069L.22 5.05a.432.432 0 00.256.805h16.959a.432.432 0 00.256-.805L9.212.069a.511.511 0 00-.512 0"
          data-name="Fill 3"
          transform="translate(3.227 17.916)"
        ></Path>
        <Path
          fill={fill}
          d="M.219 5.944l8.748 5.138a.478.478 0 00.731-.368V.438a.478.478 0 00-.731-.369L.219 5.208a.419.419 0 000 .736"
          data-name="Fill 5"
          transform="translate(14.085 11.379)"
        ></Path>
        <Path
          fill={fill}
          d="M4.294.054L.1 3.141a.243.243 0 00.167.438h8.388a.243.243 0 00.167-.438L4.629.054a.287.287 0 00-.335 0"
          data-name="Fill 7"
          transform="translate(7.43)"
        ></Path>
        <Path
          fill={fillSecondary} 
          d="M10.106 11.549L.3 5.8a.589.589 0 01-.3-.5V.6A.631.631 0 01.655 0h18.9a.631.631 0 01.655.6v5.038a.59.59 0 01-.3.507l-9.8 5.4zm-8.39-9.212a.377.377 0 00-.392.36v2.041a.377.377 0 00.392.36h3.512a.377.377 0 00.392-.36V2.7a.377.377 0 00-.392-.36zm12.13-.791a.722.722 0 00-.75.689.722.722 0 00.75.689h4.044a.722.722 0 00.75-.689.722.722 0 00-.75-.689z"
          data-name="Fill 9"
          transform="translate(1.786 4.784)"
        ></Path>
      </G>
    </Svg>
  );
};

export default IconLetter;