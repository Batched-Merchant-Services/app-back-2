import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { processColor } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { CandleStickChart } from 'react-native-charts-wrapper';
import { LineChart } from 'react-native-charts-wrapper';
import { verticalScale } from 'react-native-size-matters';
import { getChartCrypto } from '@utils/api/switch';
import LocalStorage from '@utils/localStorage';
import {
  View
} from '@components';
import styles from './styles';
import Colors from '@styles/Colors';
import { formatDate } from '../../../utils/formatters';
import moment from 'moment';

const greenBlue = Colors?.bgOrange02;
const petrel = Colors?.orange;


const Chart = ({ shortName }) => {
  const shortNames = shortName ? shortName : '';
  const [legend] = useState({ enabled: true, textSize: 11, form: 'CIRCLE', wordWrapEnabled: true });
  const [marker] = useState({ enabled: true, markerColor: processColor(Colors.bgOrange02), textColor: processColor('white') });
  const [dataChart, setDataChart] = useState([{x: 0, y: 0, marker: 0}]);

  useEffect(() => {
    getDataChart();
  }, []);

  async function getDataChart() {
    const token = await LocalStorage.get('auth_token');
    const response = await getChartCrypto(token, shortNames);
    if (response.code < 400) {
      setDataChart(response.data.data);
    } else {
      setDataChart([]);
    }
  }

  handleSelect = (event) => {
    console.log('eventtt',event)
    let entry = event.nativeEvent;
    if (entry == null) {
      //this.setState({ ...this.state, selectedEntry: null });
    } else {
      //this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }

    console.log(event.nativeEvent);
  }


  return (
    <View flex-1>
    <View style={styles.container}>
        <LineChart
          style={styles.chart}
          data={{
            dataSets: [
              {
                values:
                  (function () {
                    const data = dataChart;
                    const newSeries = [];
                    if (data.length > 0) {
                      data.map((s) => {
                        
                        var date = new Date(s.x); // Or the date you'd like converted.
                        var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
                        var dateString = new Date(isoDateTime).getTime();
                        const markerString = s.marker?s.marker.toString():s.marker;
                        newSeries.push({ y: s.y, x: dateString, marker: markerString });
                      });
                      return newSeries;
                    } else {
                      return newSeries;
                    }
                  }())
                ,
                label: 'Levels',
                config: {
                  mode: "CUBIC_BEZIER",
                  drawValues: false,
                  lineWidth: 2,
                  drawCircles: false,
                  circleColor: processColor(petrel),
                  drawCircleHole: false,
                  circleRadius: 5,
                  color: processColor(petrel),
                  drawFilled: true,
                  fillGradient: {
                    colors: [processColor("transparent"),processColor("transparent")],
                    positions: [0, 0.5],
                    angle: 90,
                    orientation: "TOP_BOTTOM"
                  },
                  fillAlpha: 1000,
                  valueTextSize: 15
                }
              },
            ]
          }}
          chartDescription={{ text: "Savvy Wallet" }}
          legend={{
            enabled: false
          }}
          marker={marker}
          xAxis={{
            enabled: true,
            granularity: 1,
            drawLabels: true,
            highlightEnabled: true,
            position: "BOTTOM",
            drawAxisLine: true,
            drawGridLines: false,
            fontFamily: "HelveticaNeue-Medium",
            fontWeight: "bold",
            textSize: 11,
            textColor: processColor("gray"),
            valueFormatter       : 'date',
            valueFormatterPattern: ('d MMM'),
            position             : 'BOTTOM',
            labelCount           : 9,
          }}
          yAxis={{
            left: {
              enabled: true,
              gridColor: processColor('transparent'),
              textColor: processColor(Colors?.white),
              drawGridLines: true,
              gridLineWidth: .2,
              labelCount: 7,
            },
            right: {
              enabled: false
            }
          }}
          animation={{
            durationX: 0,
            durationY: 1500,
            easingY: "EaseInOutQuart"
          }}
          drawGridBackground={false}
          drawBorders={false}
          dragDecelerationFrictionCoef={0.99}
          keepPositionOnRotation={false}
          touchEnabled
          dragEnabled={true}
          scaleEnabled={false}
          scaleXEnabled={false}
          scaleYEnabled={false}
          pinchZoom={false}
          doubleTapToZoomEnabled={false}
          dragDecelerationEnabled
          autoScaleMinMaxEnabled={false}
          
          
        />
        {/* <CandleStickChart
          style={styles.chart}
          pinchZoom={true}
          logEnabled={false}
          scaleYEnabled={true}
          drawGridBackground={true}
          mode={true}
          data={{
            dataSets: [
              {
                values: 
                (function () {
                  const data = dataChart;
                  const newSeries = [];
                  if (data.length > 0) {
                    data.map((s) => {
                      newSeries.push({ shadowH: s.shadowH, shadowL: s.shadowL, open: s.open, close: s.close});
                    });
                    return newSeries;
                  }else{
                    return newSeries;
                  }
                }())
                ,
                label : 'Levels',
                config: {
                  highlightColor         : processColor(Colors?.textBlueDark),
                  shadowColor            : processColor('black'),
                  shadowWidth            : verticalScale(2),
                  shadowColorSameAsCandle: true,
                  increasingColor        : processColor(Colors?.green),
                  increasingPaintStyle   : 'FILL',
                  decreasingColor        : processColor(Colors?.red),
                  neutralColor           : processColor(Colors?.bgOrange02),
                }
              },
            ]
          }}
          marker={marker}
          chartDescription={{ text: 'Savvy'}}
          legend={legend}
          xAxis={{
            enabled              : false,
            drawLabels           : true,
            drawGridLines        : true,
            gridColor            : processColor (Colors?.white),
            textColor            : processColor (Colors?.white),
            gridLineWidth        : .5,
            valueFormatter       : 'date',
            valueFormatterPattern: ('EEE, d MMM yyyy'),
            position             : 'BOTTOM',
            labelCount           : 4,
          }}
          yAxis={{
            right: {
              enabled       : false,
              gridColor     : processColor (Colors?.white),
              textColor     : processColor ('transparent'),
              drawGridLines : true,
              gridLineWidth : 1,
              labelCount    : 5,
              valueFormatter: ('###,###,###'),
            },
            left: {
              enabled: false,
            },
          }}
          maxVisibleValueCount={10}
          autoScaleMinMaxEnabled={true}
          zoom={{scaleX: 0, scaleY: 1, xValue: 0, yValue: 1}}
          //onChange={(event) => console.log(event.nativeEvent)}
        /> */}
      </View>
      {/* <NavigationEvents
        onWillFocus={payload => {
          getDataChart(payload);
        }}
      /> */}
    </View>
  );
};

Chart.propTypes = {
  onFill: PropTypes.func
};
export default Chart;
