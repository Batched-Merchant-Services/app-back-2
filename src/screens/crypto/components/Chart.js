import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { processColor } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {CandleStickChart} from 'react-native-charts-wrapper';
import { verticalScale } from 'react-native-size-matters';
import { getChartCrypto } from '@utils/api/switch';
import LocalStorage from '@utils/localStorage';
import {
  View
} from '@components';
import styles from './styles';
import Colors from '@styles/Colors';


const Chart = ({shortName}) => {
  const shortNames = shortName? shortName: '';
  const [legend]=useState({enabled: true,textSize: 11,form: 'CIRCLE',wordWrapEnabled: true});
  const [marker]=useState({enabled: true,markerColor: processColor('#465494'),textColor: processColor('white')});
  const [dataChart,setDataChart]=useState([{shadowH: 0, shadowL: 0, open: 0, close: 0}]);

  useEffect(() => {
    getDataChart();
  }, []);

  async function getDataChart() {
    const token = await LocalStorage.get('auth_token');
    const response = await getChartCrypto(token,shortNames);
    if (response.code < 400) {
      setDataChart(response.data.data);
    } else{
      setDataChart([]);
    }
  }
  return (
    <View flex-1>
      <View style={styles.container}>
        <CandleStickChart
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
        />
      </View>
      <NavigationEvents
        onWillFocus={payload => {
          getDataChart(payload);
        }}
      />
    </View>
  );
};

Chart.propTypes = {
  onFill: PropTypes.func
};
export default Chart;
