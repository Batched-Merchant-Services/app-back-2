import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconUnic = ({
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
      <Path
        fill={fill}
        d="M5.115 11.466V13H3.469v-1.479A7.321 7.321 0 010 10.469l.891-2.018a6.016 6.016 0 003.167.955c1.125 0 1.563-.319 1.563-.789C5.621 7.081.164 8.2.164 4.606c0-1.521 1.084-2.807 3.3-3.084V0h1.651v1.493a6.657 6.657 0 012.785.816l-.838 2.034A5.64 5.64 0 004.4 3.6c-1.138 0-1.55.388-1.55.872 0 1.48 5.444.374 5.444 3.942 0 1.465-1.043 2.738-3.181 3.056"
        data-name="Fill 1"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M5.225 12.567a.589.589 0 01-.236-.062c-1.409-.641-2.84-1.294-4.224-1.925l-.025-.012A1.157 1.157 0 010 9.444v-4.95c0-.211.1-.336.259-.336a.484.484 0 01.2.049l.138.063L4.96 6.258a.813.813 0 01.513.8V12.2c-.002.243-.085.367-.248.367zm1.375-.006a.264.264 0 01-.193-.076.4.4 0 01-.1-.3c.014-.62.011-1.25.009-1.859v-.718-.735-1.8a.836.836 0 01.538-.83c1.046-.472 2.107-.955 3.133-1.422l.047-.021 1.295-.59a.5.5 0 01.2-.052c.162 0 .254.126.254.347v4.917a1.167 1.167 0 01-.748 1.152l-.923.426H10.1c-1.079.49-2.2 1-3.288 1.506a.505.505 0 01-.212.055zm-.721-7.01c-.069-.022-.138-.041-.2-.06a2.37 2.37 0 01-.4-.137c-1-.488-2.011-.988-2.991-1.471L.559 3.031C.447 2.975.343 2.9.344 2.752s.1-.222.217-.277l.864-.426.65-.321 4.084 2a.817.817 0 00.721 0l1.505-.744a.225.225 0 00.128-.2.227.227 0 00-.128-.2L4.357.6l.6-.3.3-.15A1.436 1.436 0 015.9 0a1.421 1.421 0 01.629.154L9 1.374h.007l.03.015 2.2 1.087a.305.305 0 01.206.268.308.308 0 01-.211.28l-1.428.7a293.45 293.45 0 01-3.316 1.64 2.157 2.157 0 01-.415.135 4.64 4.64 0 00-.194.052z"
        data-name="Fill 3"
        transform="translate(19.211 .433)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M0 1.733h5.676V0H0z"
        data-name="Fill 5"
        transform="translate(10.915 4.333)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M0 1.733h5.676V0H0z"
        data-name="Fill 7"
        transform="translate(10.915 7.367)"
      ></Path>
    </Svg>
  );
};

export default IconUnic;