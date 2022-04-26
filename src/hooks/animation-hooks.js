import { useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Use a timing animated value
 * 
 * @param {Object} params
 * @param {Number} params.min
 * @param {Number} params.max
 * @param {Number} params.time
 */
export const useTimingValue = ({ min, max, time }) => {
  const value = useRef(new Animated.Value(0)).current;

  const animate = toValue => ({ onStart, immediately = false } = {}) =>
    Animated.timing(value, {
      toValue,
      duration: immediately ? 0 : time
    }).start(onStart);

  const toMin = animate(min);
  const toMax = animate(max);

  return [value, toMin, toMax];
};
