import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconSellCrypto = ({
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
      viewBox="0 0 26 20"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <Path
        fill={fill}
        d="M7.794 13.019h-2.4a6.613 6.613 0 01-3.848-2.231A6.568 6.568 0 016.594 0a6.6 6.6 0 016.076 4.009 6.533 6.533 0 01-1.028 6.778 6.614 6.614 0 01-3.848 2.231zm-1.2-7.5l2.125 2.219a.625.625 0 10.907-.861L7.048 4.183a.648.648 0 00-.907 0L3.562 6.878a.625.625 0 00.907.861l2.125-2.22z"
        data-name="Fill 1"
        transform="translate(6.267 3.397)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M24.83 0H.893a.889.889 0 100 1.779H24.83a.889.889 0 100-1.779z"
        transform="translate(0 17.77)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M4.986 16.416a8.1 8.1 0 1112.979-6.472 8.056 8.056 0 01-3.256 6.471h2.408A9.794 9.794 0 009.847 0a9.793 9.793 0 00-7.269 16.416z"
        data-name="Path"
        transform="translate(3.015)"
      ></Path>
    </Svg>
  );
};

export default IconSellCrypto;