import { scale, verticalScale } from 'react-native-size-matters';

const Font = {
  Montserrat: {
    REGULAR : 'Montserrat-Regular',
    MEDIUM  : 'Montserrat-Medium',
    SEMIBOLD: 'Montserrat-SemiBold',
    BOLD    : 'Montserrat-Bold'
  }
};

export const Typography = {
  sizes: {
    h32: { fontSize: verticalScale(32) },
    h30: { fontSize: verticalScale(30) },
    h28: { fontSize: verticalScale(28) },
    h26: { fontSize: verticalScale(26) },
    h24: { fontSize: verticalScale(24) },
    h22: { fontSize: verticalScale(22) },
    h20: { fontSize: verticalScale(20) },
    h18: { fontSize: verticalScale(18) },
    h17: { fontSize: verticalScale(17) },
    h16: { fontSize: verticalScale(16) },
    h15: { fontSize: verticalScale(15) },
    h14: { fontSize: verticalScale(14) },
    h13: { fontSize: verticalScale(13) },
    h12: { fontSize: verticalScale(12) },
    h11: { fontSize: verticalScale(11) },
    h10: { fontSize: verticalScale(10) },
    h9 : { fontSize: verticalScale(9) },
    h8 : { fontSize: verticalScale(8) },
    h7 : { fontSize: verticalScale(7) },

    get: key => {
      const size = Typography.sizes[key];
      if (size) {
        return {
          ...size,
          fontFamily: Font.Montserrat.REGULAR,
          color     : '#fff'
        };
      }
      return null;
    }
  },

  weight: {
    regular: {
      fontFamily: Font.Montserrat.REGULAR
    },
    medium: {
      fontFamily: Font.Montserrat.MEDIUM
    },
    semibold: {
      fontFamily: Font.Montserrat.SEMIBOLD
    },
    bold: {
      fontFamily: Font.Montserrat.BOLD
    },
    get: key => (Typography.weight[key] ? Typography.weight[key] : null)
  }
};
