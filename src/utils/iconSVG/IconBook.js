import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconBook = ({
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
        fill={fillSecondary}
        d="M12.556 15.794a19.155 19.155 0 00-5.817-.8 24.262 24.262 0 00-2.882.168l-1.721.2v-.215V.917A1.012 1.012 0 002.094.58 1.016 1.016 0 001.062.012h-.008a.755.755 0 00-.271 0A.894.894 0 000 .9V16.415A.54.54 0 00.63 17h11.765a.556.556 0 00.6-.5.626.626 0 00-.437-.7"
        data-name="Fill 1"
        transform="translate(0 3)"
      ></Path>
      <Path
        fill={fill}
        d="M.013 17a13.134 13.134 0 018.974-.686c0-.064.01-.117.01-.169Q9 8.559 9 .974A.267.267 0 008.856.7a6.584 6.584 0 00-.919-.412 7.746 7.746 0 00-3.926-.07A10.421 10.421 0 00.2 1.862a.441.441 0 00-.2.411q.012 7.221.013 14.443z"
        data-name="Fill 3"
        transform="translate(14)"
      ></Path>
      <Path
        fill={fillSecondary}
        d="M12 .817a.728.728 0 00-.05-.274.952.952 0 00-.978-.528.878.878 0 00-.723.9V15.4c-.142-.019-.259-.038-.376-.049-1.249-.119-2.5-.28-3.747-.344a16.2 16.2 0 00-5.675.783.63.63 0 00-.445.7A.541.541 0 00.6 17h10.923a.454.454 0 00.447-.4 1.735 1.735 0 00.03-.343V.817"
        data-name="Fill 5"
        transform="translate(14 3)"
      ></Path>
      <Path
        fill={fill}
        d="M8.987 17a13.134 13.134 0 00-8.974-.686c0-.064-.01-.117-.01-.169Q0 8.559 0 .974A.267.267 0 01.144.7a6.584 6.584 0 01.919-.412 7.746 7.746 0 013.926-.07A10.421 10.421 0 018.8 1.862a.441.441 0 01.2.411q-.012 7.221-.013 14.443z"
        data-name="Fill 8"
        transform="translate(4)"
      ></Path>
    </Svg>
  );
};

export default IconBook;