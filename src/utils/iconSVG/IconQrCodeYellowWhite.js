import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconQrCodeYellowWhite = ({
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
      viewBox="0 0 42.286 42.278"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <Path
        fill={fillSecondary}
        d="M18.716 18.722H.031c0-.045-.006-.089-.009-.132-.01-.122-.022-.237-.022-.354v-1.123-12.35A4.707 4.707 0 013.527.176 4.482 4.482 0 014.658.008C7.428 0 10.125 0 12.4 0h6.318v18.72zm-10.58-15.2h-3.3a1.149 1.149 0 00-1.312 1.3v9.949c0 .109.006.219.012.336 0 .053.006.108.008.165h11.717V3.523H8.136z"
        data-name="Fill 1"
        transform="translate(.008)"
      ></Path>
      <Path
        fill={fill}
        d="M18.723 18.711H0V0h13.827a4.745 4.745 0 014.9 4.913V18.702zM9.776 3.522H3.98c-.126 0-.251.008-.371.015l-.135.008v11.74H15.2V4.866c0-.917-.422-1.344-1.327-1.344z"
        data-name="Fill 3"
        transform="translate(23.549)"
      ></Path>
      <Path
        fill={fill}
        d="M10.145 18.719c-2.112 0-3.855 0-5.483-.011a4.663 4.663 0 01-3.242-1.341 4.517 4.517 0 01-1.4-3.2C-.009 10.781 0 7.339.007 4.01L.014.2A.5.5 0 01.03.092L.05 0h18.664v18.7l-.13.007c-.064 0-.119.007-.174.007h-3.928q-2.169.004-4.337.005zM3.533 3.453v10.419c0 .913.417 1.32 1.35 1.32h10.4V3.453z"
        data-name="Fill 6"
        transform="translate(0 23.55)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M0 0h11.636v3.4H3.442v3.512H0z"
        data-name="Fill 9"
        transform="translate(23.564 23.54)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M8.147 0h3.509c-.008 1.639.248 3.3-.7 4.787A4.439 4.439 0 017.3 6.988c-2.415.089-4.835.023-7.3.023V3.5h6.823c.91 0 1.323-.422 1.324-1.347z"
        data-name="Fill 11"
        transform="translate(30.604 35.244)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M0 6.915h3.463V0H0z"
        data-name="Fill 14"
        transform="translate(38.781 23.537)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M0 6.983h3.383V0H0z"
        data-name="Fill 16"
        transform="translate(23.547 35.242)"
      ></Path>
      <Path
        fill={fill}
        d="M0 4.6h4.594V0H0z"
        data-name="Fill 17"
        transform="translate(30.607 30.603)"
      ></Path>
      <Path
        fill={fill}
        d="M0 4.609h4.6V0H0z"
        data-name="Fill 18"
        transform="translate(7.08 7.071)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M0 4.6h4.591V0H0z"
        data-name="Fill 19"
        transform="translate(30.599 7.079)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M0 4.593h4.6V0H0z"
        data-name="Fill 20"
        transform="translate(7.072 30.598)"
      ></Path>
    </Svg>
  );
};

export default IconQrCodeYellowWhite;