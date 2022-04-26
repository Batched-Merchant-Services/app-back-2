import * as React from 'react';
import Svg, { Path,G } from 'react-native-svg';

const IconManyCards = ({
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
		  viewBox="0 0 31 13"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
    	<G data-name="varias tarjetas">
        <G data-name="Group 19 Copy">
          <Path
            fill={fillSecondary}
            d="M4.679 3.25H.217A.225.225 0 010 3.018V.232A.225.225 0 01.217 0h4.462a.224.224 0 01.216.232v2.786a.225.225 0 01-.216.232"
            data-name="Fill 1"
            transform="translate(17.404)"
          ></Path>
          <Path
            fill={fillSecondary}
            d="M4.505 0H.389A.39.39 0 000 .39v6.8a.39.39 0 00.389.39h4.116a.39.39 0 00.389-.39V.39A.39.39 0 004.505 0"
            data-name="Fill 3"
            transform="translate(17.404 5.417)"
          ></Path>
          <Path
            fill={fillSecondary}
            d="M3.039 3.25H.225A.229.229 0 010 3.018V.232A.228.228 0 01.225 0h2.814a.228.228 0 01.224.232v2.786a.228.228 0 01-.224.232"
            data-name="Fill 5"
            transform="translate(23.93)"
          ></Path>
          <Path
            fill={fillSecondary}
            d="M2.86 0H.4a.4.4 0 00-.4.39v6.8a.4.4 0 00.4.39h2.46a.4.4 0 00.4-.39V.39a.4.4 0 00-.4-.39"
            data-name="Fill 7"
            transform="translate(23.93 5.417)"
          ></Path>
          <Path
            fill={fillSecondary}
            d="M1.369 0H.423A.416.416 0 000 .408v7.114a.416.416 0 00.423.408h.945a.416.416 0 00.424-.408V.408A.416.416 0 001.369 0"
            data-name="Fill 11"
            transform="translate(29.004 5.069)"
          ></Path>
          <Path
            fill={fillSecondary}
            d="M1.417 3.25H.215A.224.224 0 010 3.018V.232A.224.224 0 01.215 0h1.2a.224.224 0 01.214.232v2.786a.224.224 0 01-.214.232"
            data-name="Fill 9"
            transform="translate(29.369)"
          ></Path>
          <Path
            fill={fill}
            d="M15.527 3.029H.224A.22.22 0 010 2.812V.216A.22.22 0 01.224 0h15.3a.22.22 0 01.224.216v2.6a.22.22 0 01-.224.217"
            data-name="Fill 14"
            transform="translate(0 .03)"
          ></Path>
          <Path
            fill={fill}
            d="M15.373 7.584H.4A.393.393 0 010 7.2V.386A.393.393 0 01.4 0h14.973a.393.393 0 01.4.386V7.2a.393.393 0 01-.4.384zM1.709 1.275a.55.55 0 00-.527.569v.97a.55.55 0 00.527.569h2a.55.55 0 00.528-.569v-.97a.55.55 0 00-.528-.569z"
            data-name="Fill 17"
            transform="translate(0 5.417)"
          ></Path>
        </G>
      </G>
    </Svg>
  );
};

export default IconManyCards;