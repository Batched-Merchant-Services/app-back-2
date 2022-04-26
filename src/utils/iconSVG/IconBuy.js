import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconBuy = ({
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
		  viewBox="0 0 23 23"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <Path
        fill={fill}
        d="M12.98 12.778a.563.563 0 01-.419-.195.534.534 0 01-.121-.448 1.169 1.169 0 01.233-.517 6.441 6.441 0 00.683-1.094l-12.363.01a.635.635 0 01-.6-.441 7.712 7.712 0 011.827-7.85A7.491 7.491 0 017.58 0c.14 0 .282 0 .42.012a7.5 7.5 0 015.019 2.341 7.671 7.671 0 01.35 10.238.5.5 0 01-.389.187zm-.628-6.3a8.52 8.52 0 01.083 1.183 8.439 8.439 0 01-.176 1.716h1.529a6.354 6.354 0 00.122-2.9h-1.559zm-4.309 0v2.9h3.046a7.09 7.09 0 00.108-2.9zm-4.078 0a6.913 6.913 0 00.113 2.9H6.9v-2.9zm-2.715 0a6.354 6.354 0 00.123 2.9h1.533a8.133 8.133 0 01-.094-2.9H1.249zm8.482-4.947A8.165 8.165 0 0112.1 5.326h1.483a6.474 6.474 0 00-3.851-3.795zm-2.258.76a.573.573 0 01.569.575v2.46h2.866a7.026 7.026 0 00-3.331-3.92l-.054.029-.1.052a7.08 7.08 0 00-3.17 3.839H6.9v-2.46a.573.573 0 01.574-.575zm-2.033-.766a6.475 6.475 0 00-3.869 3.8h1.492a8.267 8.267 0 012.377-3.8z"
        data-name="Fill 1"
        transform="translate(6.273)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M14.664 9.882h-9a.566.566 0 01-.553-.431L3.068 1.128H.569A.567.567 0 010 .564.567.567 0 01.569 0h2.947a.567.567 0 01.553.431l.453 1.845h11.615a.567.567 0 01.444.212.556.556 0 01.111.476l-1.473 6.478a.565.565 0 01-.555.44zM13.449 3.4v5.354h.759L15.425 3.4zm-2.65 0v5.354h1.582V3.4zm-2.649 0v5.354h1.582V3.4zm-3.35 0l1.311 5.354h.971V3.4H4.8z"
        data-name="Fill 3"
        transform="translate(0 9.376)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M1.568 0A1.553 1.553 0 000 1.533a1.553 1.553 0 001.568 1.534 1.553 1.553 0 001.568-1.534A1.553 1.553 0 001.568 0"
        data-name="Fill 6"
        transform="translate(11.5 19.933)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M1.568 0A1.553 1.553 0 000 1.533a1.553 1.553 0 001.568 1.534 1.553 1.553 0 001.568-1.534A1.553 1.553 0 001.568 0"
        data-name="Fill 8"
        transform="translate(4.705 19.933)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M.012.561l.794 3.406a.472.472 0 00.789.222l.273-.267a.477.477 0 01.663 0l1.6 1.565a.476.476 0 00.663 0l.818-.8a.451.451 0 000-.648l-1.6-1.565a.451.451 0 010-.648l.273-.267a.455.455 0 00-.228-.771L.573.012a.464.464 0 00-.561.549"
        data-name="Fill 1"
        transform="translate(17.25 15.845)"
      ></Path>
    </Svg>
  );
};

export default IconBuy;