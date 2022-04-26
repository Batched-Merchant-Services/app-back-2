import * as React from 'react';
import Svg, { Path,G } from 'react-native-svg';

const IconRequestCash = ({
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
		  viewBox="0 0 25.041 19.115"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <Path
        fill={fillSecondary} 
        d="M31.349 30.006H7.972a.832.832 0 01-.832-.831v-.077a.832.832 0 01.832-.831h23.377a.832.832 0 01.832.831v.077a.832.832 0 01-.832.831M19.37 10.89a9.585 9.585 0 00-7.076 16.052h2.344a7.9 7.9 0 119.464 0h2.344A9.585 9.585 0 0019.37 10.89"
        transform="translate(-7.14 -10.89)"
      ></Path>
      <Path
        fill={fill}
        d="M20.538 26.942h-2.336a6.419 6.419 0 112.336 0zm-3.117-5l-.384.862a3.713 3.713 0 002.09.708v.947h.7v-.956c1.222-.125 1.98-.8 1.98-1.758 0-1.141-.937-1.462-1.98-1.715v-1.723a3.522 3.522 0 011.382.46l.349-.862a3.635 3.635 0 00-1.732-.52v-.947h-.7v.964c-1.211.116-1.962.789-1.962 1.758 0 1.149.928 1.472 1.962 1.724v1.706a3.263 3.263 0 01-1.705-.65zm2.406.633v-1.512c.439.125.887.313.887.759 0 .51-.482.69-.886.751zm-.7-2.722c-.446-.131-.859-.312-.859-.741s.306-.691.86-.778v1.515z"
        transform="translate(-7.14 -10.89)"
      ></Path>
    </Svg>
  );
};

export default IconRequestCash;