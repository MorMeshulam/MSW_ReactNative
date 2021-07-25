import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setForecast } from '../redux/actions/data.actions';

import { initForecastData } from '../services/msw.service';

import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Text, Icon } from 'react-native-elements';
import _ from 'lodash';

const mswUri = require('../assets/images/MSW.png');

import {
  LineChart,
  // BarChart,
  // PieChart,
  // ProgressChart,
  // ContributionGraph,
  // StackedBarChart,
} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MSWData: null,
      title: 'תחזית גלים',
      unitId: 'eu',
      periodUnitEn: 's',
      waveUnit: ' ft',
      keepers: null,
    };

    this.labels = [];
    this.swellData = [];
    this.chartSwell = null;
    this.lastDay = null;
  }

  componentDidMount() {
    this.props.setForecast();
  }

  renderChart = () => {
    return (
      <LineChart
        data={{
          labels: this.labels,
          datasets: [
            {
              data: this.swellData,
            },
          ],
        }}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        yAxisSuffix={this.state.waveUnit}
        chartConfig={{
          backgroundColor: '#ffff',
          backgroundGradientFrom: '#ffff',
          backgroundGradientTo: '#0000',
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            // borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#3cbbe8',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          // borderRadius: 16,
        }}
      />
    );
  };

  renderRating = forecast => {
    const rating = [];
    let index = 1;

    // Loop the solid rating on a single forecast object.
    for (var i = 0; i < forecast.solidRating; i++) {
      rating.push(<Icon key={index++} name="star" color={'#3fbbe8'} />);
    }

    // Loop the faded rating on a single forecast object.
    for (var i = 0; i < forecast.fadedRating; i++) {
      rating.push(<Icon key={index++} name="star" color={'#aee3f5'} />);
    }

    // Loop the faded rating on a single forecast object.
    for (var i = rating.length; i < 5; i++) {
      rating.push(<Icon key={index++} name="star" color={'#e8e8e8'} />);
    }

    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        {rating}
      </View>
    );
  };

  renderSwellConditions = forecast => {
    const { periodUnitEn } = this.state;

    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 15,
            width: 50,
            backgroundColor: '#f4f5f7',
            textAlign: 'center',
          }}>{`${forecast.height}${forecast.swell.unit}`}</Text>

        <Text
          style={{
            fontSize: 15,
            width: 50,
            backgroundColor: '#f4f5f7',
            textAlign: 'center',
          }}>{`${forecast.period}${periodUnitEn}`}</Text>
      </View>
    );
  };

  renderWind = forecast => {
    const windColor =
      forecast.wind.speed <= 6
        ? '#34ae60'
        : forecast.wind.speed > 6 && forecast.wind.speed < 12
        ? '#e67e22'
        : '#e64b3c';

    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            fontSize: 17,
            padding: 10,
            fontWeight: 'bold',
          }}>{`${forecast.wind.speed}${forecast.wind.unit}`}</Text>

        <Icon
          type="font-awesome"
          name="location-arrow"
          containerStyle={{
            backgroundColor: windColor,
            width: 50,
          }}
          iconStyle={{
            marginTop: 10,
            transform: [{ rotate: `0deg` }],
            transform: [{ rotate: `${forecast.wind.direction}deg` }],
          }}
          style={{
            alignSelf: 'center',
          }}
          color={'#fff'}
        />
      </View>
    );
  };

  renderSwell = forecast => {
    if (forecast.height === 'Flat') {
      return (
        <View
          style={{
            flex: 1,
          }}>
          <Text>{'No incoming swell'}</Text>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
        }}>
        {this.renderSwellConditions(forecast)}
        {this.renderRating(forecast)}
      </View>
    );
  };

  renderDayHeader = forecast => {
    if (this.lastDay === null || forecast.dayOfForecast !== this.lastDay) {
      this.lastDay = forecast.dayOfForecast;

      const day = forecast.dateOfForecast.getDate();
      const month = forecast.dateOfForecast.getMonth() + 1;

      return (
        <View style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', marginRight: 10 }}>
            {forecast.dayOfForecastEn}
          </Text>
          <Text>{`${day}/${month}`}</Text>
        </View>
      );
    }
    return null;
  };

  renderDaysForecast = data => {
    return (
      <View style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {data.map((f, i) => {
          return (
            <View
              key={i}
              style={{
                display: 'flex',
              }}>
              {this.renderDayHeader(f)}

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: screenWidth,
                  height: 60,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'gray',
                }}>
                <Text
                  style={{
                    backgroundColor: '#fff',
                    fontSize: 15,
                    color: 'gray',
                    padding: 10,
                    justifyContent: 'center',
                    width: 60,
                    left: -20,
                    transform: [{ rotate: '90deg' }],
                  }}>{`${f.dayPart}`}</Text>
                <Text
                  style={{
                    backgroundColor: '#47bee9',
                    fontSize: 20,
                    color: '#fff',
                    padding: 10,
                    justifyContent: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    width: 70,
                    left: -20,
                  }}>{`${f.height}${
                  f.height !== 'Flat' ? f.swell.unit : ''
                }`}</Text>

                <View
                  style={{
                    height: 50,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    left: -10,
                  }}>
                  {this.renderSwell(f)}
                </View>
                {this.renderWind(f)}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  renderSwellImagh = () => {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          top: 10,
          bottom: 10,
        }}>
        <Text style={{ fontSize: 25, margin: 10 }}>{'Swell Map'}</Text>
        <Image
          source={{ uri: this.chartSwell }}
          resizeMode="contain"
          style={styles.swellChart}
        />
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
          backgroundColor: '#000',
        }}>
        <Image source={mswUri} style={styles.mswLogo} />
        {/* <MswIcon width={100} height={50}/> */}

        <Text style={{ fontSize: 35, color: '#fff' }}>{this.state.title}</Text>
      </View>
    );
  };

  renderErrorState = () => {
    return (
      <View
        style={{
          flex: 'flex',
          flex: 1,
          // flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            color: 'red',
            textAlign: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          {'Data  is not available'}
        </Text>
      </View>
    );
  };

  render() {
    const { forecast, loading } = this.props;
    const responseData = initForecastData(forecast && forecast.data);

    if (!responseData) return this.renderErrorState();

    const { fetchedData, labels, swellData, chartSwell } = responseData;

    // console.log(fetchedData);

    this.labels = labels;
    this.swellData = swellData;
    this.chartSwell = chartSwell;

    return (
      <ScrollView style={styles.container}>
        {/* {this.renderHeader()} */}
        {/* <Text style={{ margin: 5, fontSize: 15 }}>5 days forecast</Text> */}

        <View style={styles.forecastContainer}>
          {fetchedData && this.renderChart(fetchedData)}
          {fetchedData && this.renderDaysForecast(fetchedData)}
          {fetchedData && this.renderSwellImagh(fetchedData)}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ data }) => {
  const { forecast, loading } = data;
  return {
    forecast,
    loading,
  };
};

const mapDispatchTopProps = dispatch => {
  return bindActionCreators({ setForecast }, dispatch);
};

export default connect(mapStateToProps, mapDispatchTopProps)(Forecast);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forecastContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  forecast: {
    fontSize: 35,
  },
  swellChart: {
    width: screenWidth,
    height: 200,
  },
  mswLogo: {
    width: 100,
    height: 50,
  },
});
