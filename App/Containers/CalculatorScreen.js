import React, {PureComponent} from 'react';
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Text,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {RadioButton} from 'react-native-paper';
import {Formik} from 'formik';
import BottomModal from '../Components/BottomModal';
import Tooltip from 'react-native-walkthrough-tooltip';

// Styles
import styles from './Styles/Styles';
import Translate from '../Components/Translate';
import {
  calcCreditAnn,
  calcCreditDay,
  calcCreditDiff,
  numberFormat,
} from '../Lib/calc';
import images from '../Themes/Images';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import {adUnitId} from '../Lib/ads';

export default class CalculatorScreen extends PureComponent {
  state = {
    sum: 0,
    percent: 0,
    percentType: 'year',
    period: 0,
    periodType: 'year',
    creditType: 'ann',
    comision: 0,
    comisionType: 'sum',
    monthComision: 0,
    monthComisionType: 'sum',
    isVisible: false,
    toolTipVisible: false,
    results: {
      payment: null,
      paymentMin: null,
      paymentMax: null,
      total: null,
      totalinterest: null,
      totalinterestWithCommission: null,
      paymentsCount: null,
      effectivePercent: null,
      error: null,
    },
  };

  handleValidate = (values) => {
    let errors = {};
    if (!values.sum) {
      errors.sum = 'emptySum';
    }
    if (!values.percent) {
      errors.percent = 'emptyRate';
    } else if (parseFloat(values.percent) >= 100) {
      errors.percent = 'wrongValue';
    }
    if (!values.period) {
      errors.period = 'emptyPeriod';
    }
    if (
      values.comisionType === 'percent' &&
      parseFloat(values.comision) >= 100
    ) {
      errors.comision = 'wrongValue';
    }
    if (
      values.monthComisionType === 'percent' &&
      parseFloat(values.monthComision) >= 100
    ) {
      errors.monthComision = 'wrongValue';
    }
    return errors;
  };

  handleCalculate = (values) => {
    if (!values.creditType) {
      return null;
    }
    const isDayPercent = values.percentType === 'day';
    let results;
    if (isDayPercent) {
      results = calcCreditDay(values);
    } else {
      results =
        values.creditType === 'ann'
          ? calcCreditAnn(values)
          : calcCreditDiff(values);
    }

    if (!results || results.error) {
      return null;
    } else {
      this.setState(
        {
          ...values,
          results,
        },
        () => this.handleShowResult(),
      );
    }
  };

  renderResult = () => {
    const {percentType, creditType, results, percent} = this.state;
    const {
      currency,
      fullRateTxt2,
      fullRateTxt1,
    } = this.props.navigation.state.params.translate;
    const isDayPercent = percentType === 'day';
    const comision = parseFloat(this.state.comision);
    const monthComision = parseFloat(this.state.monthComision);
    return (
      <View>
        <View>
          <Translate style={styles.resultContainerTitleText} value="results" />
        </View>
        <View>
          <View>
            <Translate
              style={styles.resultContainerTitle}
              value={isDayPercent ? 'pay' : 'monthPay'}
            />
            <Text style={styles.resultContainerValue}>
              {results.payment || results.paymentMin
                ? creditType === 'ann'
                  ? numberFormat(results.payment, currency)
                  : `${numberFormat(
                      results.paymentMin,
                      currency,
                    )} - ... - ${numberFormat(results.paymentMax, currency)}`
                : ''}
            </Text>
          </View>
          {!isDayPercent ? (
            <View>
              <Translate style={styles.resultContainerTitle} value="payCount" />
              <Text style={styles.resultContainerValue}>
                {results.paymentsCount}
              </Text>
            </View>
          ) : null}
          <View>
            <Translate style={styles.resultContainerTitle} value="ratePay" />
            <Text style={styles.resultContainerValue}>
              {results.totalinterest
                ? numberFormat(results.totalinterest, currency)
                : ''}
            </Text>
          </View>
          <View>
            {comision || monthComision ? (
              <>
                <Translate
                  style={styles.resultContainerTitle}
                  value="comissionPay"
                />
                <Text style={styles.resultContainerValue}>
                  {results.totalinterestWithCommission
                    ? numberFormat(
                        results.totalinterestWithCommission,
                        currency,
                      )
                    : ''}
                </Text>
              </>
            ) : null}
          </View>
          <View>
            <Translate style={styles.resultContainerTitle} value="totalPay" />
            <Text style={styles.resultContainerValue}>
              {results.total ? numberFormat(results.total, currency) : ''}
            </Text>
          </View>
          <View>
            <Tooltip
              isVisible={this.state.toolTipVisible}
              content={
                <View>
                  <Text>{fullRateTxt1}</Text>
                  <Text>{fullRateTxt2}</Text>
                </View>
              }
              placement="bottom"
              onClose={() => this.setState({toolTipVisible: false})}
            />
            <TouchableHighlight
              onPress={() => {
                if (!isDayPercent) {
                  this.setState({toolTipVisible: true});
                }
              }}
              style={styles.touchable}>
              <View style={styles.row}>
                <Translate
                  style={styles.resultContainerTitle}
                  value={!isDayPercent ? 'fullCreditSum' : 'yearPercentRate'}
                />
                {!isDayPercent && (
                  <Image source={images.question} style={styles.questionIcon} />
                )}
              </View>
            </TouchableHighlight>
            <Text style={styles.resultContainerValue}>
              {isDayPercent
                ? results.effectivePercent + '%'
                : comision || monthComision
                ? results.effectivePercent
                : percent + '%'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  handleShowResult = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  render() {
    const {isVisible, results} = this.state;
    return (
      <>
        <ScrollView style={styles.mainContainer}>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            validate={(values) => this.handleValidate(values)}
            initialValues={this.state}
            onSubmit={(values) => this.handleCalculate(values)}>
            {({handleChange, setFieldValue, handleSubmit, values, errors}) => (
              <>
                {/*// Sum*/}
                <View style={styles.inputRow}>
                  <Translate style={styles.translatedText} value="creditSum" />
                  <TextInput
                    style={[
                      styles.textInput,
                      styles.textInputSum,
                      errors.sum && styles.errorInput,
                    ]}
                    onChangeText={handleChange('sum')}
                    value={values.sum}
                    placeholder="300 000"
                    keyboardType="numeric"
                  />
                  {errors.sum ? (
                    <Translate style={styles.error} value="emptySum" />
                  ) : null}
                </View>
                {/*// Rate*/}
                <View style={styles.inputRow}>
                  <Translate style={styles.translatedText} value="creditRate" />
                  <View style={[styles.row, styles.inputAndRadio]}>
                    <View>
                      <TextInput
                        style={[
                          styles.textInput,
                          errors.percent && styles.errorInput,
                        ]}
                        onChangeText={handleChange('percent')}
                        value={values.percent}
                        name="percent"
                        placeholder="18,5"
                        keyboardType="numeric"
                      />
                      {errors.percent ? (
                        <Translate style={styles.error} value="emptyRate" />
                      ) : null}
                    </View>
                    <RadioButton.Group
                      onValueChange={(newValue) => {
                        if (newValue === 'day') {
                          setFieldValue('creditType', 'ann');
                          setFieldValue('periodType', 'day');
                          setFieldValue('percentType', newValue);
                        } else {
                          setFieldValue('percentType', newValue);
                          setFieldValue('periodType', newValue);
                        }
                      }}
                      value={values.percentType}>
                      <View style={styles.row}>
                        <TouchableOpacity
                          onPress={() => {
                            setFieldValue('percentType', 'year');
                            setFieldValue('periodType', 'year');
                          }}
                          style={[styles.row, styles.radio]}>
                          <RadioButton.Android color="#43ba7b" value="year" />
                          <Translate value="year" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setFieldValue('creditType', 'ann');
                            setFieldValue('periodType', 'day');
                            setFieldValue('percentType', 'day');
                          }}
                          style={[styles.row, styles.radio]}>
                          <RadioButton.Android color="#43ba7b" value="day" />
                          <Translate value="day" />
                        </TouchableOpacity>
                      </View>
                    </RadioButton.Group>
                  </View>
                </View>
                {/*// Period*/}
                <View style={styles.inputRow}>
                  <Translate
                    style={styles.translatedText}
                    value="creditPeriod"
                  />
                  <View style={[styles.row, styles.inputAndRadio]}>
                    <View>
                      <TextInput
                        onChangeText={handleChange('period')}
                        value={values.period}
                        name="period"
                        style={[
                          styles.textInput,
                          errors.period && styles.errorInput,
                        ]}
                        placeholder="3"
                        keyboardType="numeric"
                      />
                      {errors.period ? (
                        <Translate style={styles.error} value="emptyPeriod" />
                      ) : null}
                    </View>
                    <RadioButton.Group
                      onValueChange={(newValue) =>
                        setFieldValue('periodType', newValue)
                      }
                      value={
                        values.percentType === 'day' ? 'day' : values.periodType
                      }>
                      <View style={styles.row}>
                        {values.percentType === 'day' ? (
                          <TouchableOpacity
                            onPress={() => {
                              setFieldValue('periodType', 'day');
                            }}
                            style={[styles.row, styles.radio]}>
                            <RadioButton.Android color="#43ba7b" value="day" />
                            <Translate value="day" />
                          </TouchableOpacity>
                        ) : (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                setFieldValue('periodType', 'year');
                              }}
                              style={[styles.row, styles.radio]}>
                              <RadioButton.Android
                                color="#43ba7b"
                                value="year"
                              />
                              <Translate value="year" />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                setFieldValue('periodType', 'month');
                              }}
                              style={[styles.row, styles.radio]}>
                              <RadioButton.Android
                                color="#43ba7b"
                                value="month"
                              />
                              <Translate value="month" />
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    </RadioButton.Group>
                  </View>
                </View>
                {/*// Credit Type*/}
                <View style={styles.inputRow}>
                  <Translate style={styles.translatedText} value="creditType" />
                  <View style={[styles.spaceAround]}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={[
                        styles.typeBtn,
                        values.creditType === 'ann' && styles.activeBtn,
                      ]}
                      onPress={() => setFieldValue('creditType', 'ann')}>
                      <Translate
                        style={[
                          styles.textCenter,
                          values.creditType === 'ann' && styles.activeBtnText,
                        ]}
                        value={'ann'}
                      />
                    </TouchableOpacity>
                    {values.percentType === 'day' ? null : (
                      <TouchableOpacity
                        activeOpacity={1}
                        style={[
                          styles.typeBtn,
                          values.creditType === 'diff' && styles.activeBtn,
                        ]}
                        onPress={() => setFieldValue('creditType', 'diff')}>
                        <Translate
                          style={[
                            styles.textCenter,
                            values.creditType === 'diff' &&
                              styles.activeBtnText,
                          ]}
                          value={'diff'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {/*One commission*/}
                <View style={styles.inputRow}>
                  <Translate
                    style={styles.translatedText}
                    value="creditComission"
                  />
                  <View style={[styles.row, styles.inputAndRadio]}>
                    <View>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('comision')}
                        value={values.comision}
                        name="percent"
                        placeholder="0"
                        keyboardType="numeric"
                      />
                    </View>
                    <RadioButton.Group
                      onValueChange={(newValue) =>
                        setFieldValue('comisionType', newValue)
                      }
                      value={values.comisionType}>
                      <View style={styles.row}>
                        <TouchableOpacity
                          onPress={() => {
                            setFieldValue('comisionType', 'sum');
                          }}
                          style={[styles.row, styles.radio]}>
                          <RadioButton.Android color="#43ba7b" value="sum" />
                          <Translate value="sum" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setFieldValue('comisionType', 'percent');
                          }}
                          style={[styles.row, styles.radio]}>
                          <RadioButton.Android
                            color="#43ba7b"
                            value="percent"
                          />
                          <Translate value="percent" />
                        </TouchableOpacity>
                      </View>
                    </RadioButton.Group>
                  </View>
                </View>
                {/*Month commission*/}
                <View style={styles.inputRow}>
                  <Translate
                    style={styles.translatedText}
                    value="creditMonthComission"
                  />
                  <View style={[styles.row, styles.inputAndRadio]}>
                    <View>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('monthComision')}
                        value={values.monthComision}
                        name="monthComision"
                        placeholder="0"
                        keyboardType="numeric"
                      />
                    </View>
                    <RadioButton.Group
                      onValueChange={(newValue) =>
                        setFieldValue('monthComisionType', newValue)
                      }
                      value={values.monthComisionType}>
                      <View style={[styles.row]}>
                        <TouchableOpacity
                          onPress={() => {
                            setFieldValue('monthComisionType', 'sum');
                          }}
                          style={[styles.row, styles.radio]}>
                          <RadioButton.Android color="#43ba7b" value="sum" />
                          <Translate value="sum" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setFieldValue('monthComisionType', 'percent');
                          }}
                          style={[styles.row, styles.radio]}>
                          <RadioButton.Android
                            color="#43ba7b"
                            value="percent"
                          />
                          <Translate value="percent" />
                        </TouchableOpacity>
                      </View>
                    </RadioButton.Group>
                  </View>
                </View>
                {/*submit*/}
                <View style={styles.submitContainer}>
                  <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={handleSubmit}>
                    <Translate
                      style={[styles.textCenter, styles.activeBtnText]}
                      value="calculate"
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
        <BottomModal
          isFullScreen
          onHide={this.handleShowResult}
          children={this.renderResult()}
          styles={styles}
          visible={isVisible && results.total}
        />
        <BannerAd
          style={{position: 'absolute', bottom: -3, backgroundColor: 'red'}}
          unitId={adUnitId}
          size={BannerAdSize.ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </>
    );
  }
}
