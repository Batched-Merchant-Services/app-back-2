import { Typography } from '@styles/Typography';
import Colors from '@styles/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

const FLEX_KEY_PATTERN = /^flex(G|S)?(-\d*)?$/;
const HEIGHT_KEY_PATTERN = /^height(G|S)?(-\d*)?$/;
const WIDTH_KEY_PATTERN = /^width(G|S)?(-\d*)?$/;
const PADDING_KEY_PATTERN = /^padding[LTRBHV]?(-\d*)?$/;
const MARGIN_KEY_PATTERN = /^margin[LTRBHV]?(-\d*)?$/;

const HEADERS = [
  'h32',
  'h30',
  'h28',
  'h26',
  'h24',
  'h22',
  'h20',
  'h18',
  'h16',
  'h15',
  'h14',
  'h13',
  'h12',
  'h11',
  'h8',
  'h9',
  'h17',
  'h10',
  'h7',
];
const FONT_WEIGHTS = ['regular', 'medium', 'semibold', 'bold'];
const TEXT_ALIGNMENTS = ['center', 'left', 'right'];

const PADDING_VARIATIONS = {
  padding : 'padding',
  paddingL: 'paddingLeft',
  paddingT: 'paddingTop',
  paddingR: 'paddingRight',
  paddingB: 'paddingBottom',
  paddingH: 'paddingHorizontal',
  paddingV: 'paddingVertical'
};
const MARGIN_VARIATIONS = {
  margin : 'margin',
  marginL: 'marginLeft',
  marginT: 'marginTop',
  marginR: 'marginRight',
  marginB: 'marginBottom',
  marginH: 'marginHorizontal',
  marginV: 'marginVertical'
};


let getLastProp = (availables, props) => {
  const keys = Object.keys(props);
  const propsKeys = keys.filter(key => availables.includes(key));
  return propsKeys[propsKeys.length - 1];
};

let getKeyValueStyle = (type, props) => {
  let style = {},
    pattern,
    scaleFn = d => d;
  if (type === 'height') {
    pattern = HEIGHT_KEY_PATTERN;
    scaleFn = verticalScale;
  }
  if (type === 'width') {
    pattern = WIDTH_KEY_PATTERN;
    scaleFn = scale;
  }
  if (type === 'flex') {
    pattern = FLEX_KEY_PATTERN;
  }

  for (let prop in props) {
    if (pattern.test(prop)) {
      const [key, value] = prop.split('-');
      style[key] = scaleFn(value ? Number(value) : 0);
    }
  }

  return style;
};

let getPMStyle = (type, props) => {
  let style = {},
    pattern,
    variations,
    validValues;
  const keys = Object.keys(props);

  if (type === 'padding') {
    pattern = PADDING_KEY_PATTERN;
    variations = PADDING_VARIATIONS;
  }
  if (type === 'margin') {
    pattern = MARGIN_KEY_PATTERN;
    variations = MARGIN_VARIATIONS;
  }

  validValues = keys.filter(key => pattern.test(key) && key);

  validValues.forEach(validValue => {
    const [key, value] = validValue.split('-');
    for (style.type in variations) {
      if (style.type === key) {
        const styleName = variations[style.type];
        if (styleName === 'padding') {
          style['paddingVertical'] = verticalScale(value ? Number(value) : 0);
          style['paddingHorizontal'] = scale(value ? Number(value) : 0);
        } else if (
          styleName === 'paddingVertical'
          || styleName === 'paddingTop'
          || styleName === 'paddingBottom'
        ) {
          style[styleName] = verticalScale(value ? Number(value) : 0);
        } else {
          style[styleName] = scale(value ? Number(value) : 0);
        }
      }
    }
  });

  return style;
};

const StyleHelper = {
  
  extractTypographyValue: props => {
    const lastProp = getLastProp(HEADERS, props);

    return Typography.sizes.get(lastProp);
  },
  extractVarationValue: props => {
    const lastProp = getLastProp(FONT_WEIGHTS, props);

    return Typography.weight.get(lastProp);
  },

  extractColorValue: (props,theme) => {

    const themeObj = Object?.keys(theme??[]);
    const colors = Object?.keys(themeObj.length !== 0 ? theme : Colors);
    const lastProp = getLastProp(colors, props);
    const propsKeys = colors?.filter(key => key.includes(lastProp));
    return themeObj.length !== 0  ? { color: theme[propsKeys]?? 'white' } : Colors.get(lastProp);
  },

  extractBackgroundColorValue: (props,theme) => {
    const themeObj = Object?.keys(theme??[]);
    const colors = Object?.keys(themeObj.length !== 0 ? theme : Colors);
    const lastProp = getLastProp(colors, props);
    const propsKeys = colors?.filter(key => key.includes(lastProp));
    const getValueColors = Colors.get(lastProp)?.color;
    return themeObj.length !== 0  ? { backgroundColor: theme[propsKeys] } : { backgroundColor: getValueColors };
  },

  extractTintColorValue: (props,theme) => {
    const themeObj = Object?.keys(theme??[]);
    const colors = Object?.keys(themeObj.length !== 0 ? theme : Colors);
    const lastProp = getLastProp(colors, props);
    const propsKeys = colors?.filter(key => key.includes(lastProp));
    const getValueColors = Colors.get(lastProp)?.color;
    return themeObj.length !== 0  ? { tintColor: theme[propsKeys] } : { tintColor: getValueColors };
  },

  extractImageValue: (source,theme) => {
    const themeObj =  Object?.values(theme??[]);
    const propsKeys = themeObj?.filter(key => key === source );
    const lastProp = propsKeys[propsKeys?.length - 1];
    return  lastProp  ? { uri: lastProp } :  {source: source} ;
  },


  
  extractTextAlign: props => {
    const lastProp = getLastProp(TEXT_ALIGNMENTS, props);

    return lastProp ? { textAlign: lastProp } : null;
  },

  extractFlexValue: props => {
    return getKeyValueStyle('flex', props);
  },

  extractFlexDirection: props => {
    const keys = Object.keys(props);
    const validFlexDirection = keys.filter(
      key => key === 'row' || (key === 'column' && key)
    );
    const lastProp = validFlexDirection[validFlexDirection.length - 1];

    return lastProp ? { flexDirection: lastProp } : null;
  },

  extractAlignmentsValues: props => {
    const { row } = props;
    const alignments = {};
    const alignmentRules = {};

    if (row) {
      alignmentRules.justifyContent = ['left', 'right', 'centerH', 'spread'];
      alignmentRules.alignItems = ['top', 'bottom', 'centerV'];
    } else {
      alignmentRules.justifyContent = ['top', 'bottom', 'centerV', 'spread'];
      alignmentRules.alignItems = ['left', 'right', 'centerH'];
    }

    for (let aligment in alignmentRules) {
      const value = alignmentRules[aligment];

      for (let i in value) {
        const position = value[i];

        if (props[position]) {
          if (['top', 'left'].includes(position)) {
            alignments[aligment] = 'flex-start';
          } else if (['bottom', 'right'].includes(position)) {
            alignments[aligment] = 'flex-end';
          } else if (['centerH', 'centerV'].includes(position)) {
            alignments[aligment] = 'center';
          } else if (position === 'spread') {
            alignments[aligment] = 'space-between';
          }
        }
      }
    }

    return alignments;
  },

  extractHeight: props => {
    return getKeyValueStyle('height', props);
  },

  extractWidth: props => {
    return getKeyValueStyle('width', props);
  },

  extractPaddingVariation: props => {
    return getPMStyle('padding', props);
  },

  extractMarginVariation: props => {
    return getPMStyle('margin', props);
  },
};

export default StyleHelper;
