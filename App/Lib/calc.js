export const psk = (dates, sum, bp = 30) => {
  const m = dates.length; // число платежей

  //Задаем базвый период bp
  // const bp=30;
  //Считаем число базовых периодов в году:
  const cbp = Math.round(365 / bp);

  //заполним массив с количеством дней с даты выдачи до даты к-го платежа
  const days = [];
  for (let k = 0; k < m; k++) {
    days[k] = (dates[k] - dates[0]) / (24 * 60 * 60 * 1000);
  }

  //посчитаем Ек и Qк для каждого платежа
  const e = [];
  const q = [];
  for (let k = 0; k < m; k++) {
    // e[k] = (days[k] % bp) / bp;
    e[k] = 0;

    // q[k] = Math.floor(days[k] / bp);
    q[k] = k;
  }

  //Втупую методом перебора начиная с 0 ищем i до максимального приблежения с шагом s
  let i = 0;
  let x = 1;
  let x_m = 0;
  const s = 0.000001;

  while (x > 0) {
    x_m = x;
    x = 0;
    for (let k = 0; k < m; k++) {
      x = x + sum[k] / ((1 + e[k] * i) * Math.pow(1 + i, q[k]));
    }
    i = i + s;
  }
  if (x > x_m) {
    i = i - s;
  }

  // i = Number(Math.round(i+'e2')+'e-2');
  //считаем ПСК
  // eslint-disable-next-line no-shadow
  const psk = i * cbp * 100;

  //выводим ПСК
  // alert("ПСК = " + psk + " %");
  //format value to 1.222
  const formated = Number(Math.round(psk + 'e3') + 'e-3');
  // forum has an error need to minus 0.002
  return Number(Math.round(formated - 0.002 + 'e3') + 'e-3');
};

export const round = (x) => Number(Math.round(x + 'e2') + 'e-2');

export const numberFormat = (num, currency) =>
  num
    .toFixed(2) // always two decimal digits
    .replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1')
    .replace('.', ',') // replace decimal point character with ,
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    .replace(/\./g, ' ')
    .replace(',', '.') +
  ' ' +
  currency;

export const calcCreditDiff = (values) => {
  const sum = parseFloat(values.sum);
  const percent = parseFloat(values.percent);
  const period = parseFloat(values.period);
  const comision = parseFloat(values.comision);
  const comisionType = values.comisionType;
  const monthComision = parseFloat(values.monthComision);
  const monthComisionType = values.monthComisionType;
  const periodType = values.periodType;

  const results = getDefaultResult;

  if (!sum || !percent || !period) {
    results.error = 'wrong input';
    return results;
  }

  const comisionValue = comision
    ? comisionType === 'sum'
      ? comision
      : (sum / 100) * comision
    : 0;
  const monthComisionValue = monthComision
    ? monthComisionType === 'sum'
      ? monthComision
      : (sum / 100) * monthComision
    : 0;
  const monthPeriod = periodType === 'month' ? period : period * 12;

  // чистый долг в месяц
  const cleanDebtInMonth = round(sum / monthPeriod);
  // Начисленные проценты за месяц
  const payInMonths = [];
  let leftSum = sum;
  let totalinterest = 0;
  for (let i = 0; i < monthPeriod; i++) {
    const percentDebtInMonth = round((leftSum * percent) / 100 / 12);
    const monthPay = cleanDebtInMonth + percentDebtInMonth;
    totalinterest += percentDebtInMonth;
    payInMonths.push(monthPay);
    leftSum = leftSum + (leftSum * percent) / 100 / 12 - monthPay;
  }

  results.paymentMin = round(payInMonths[0] + monthComisionValue);
  results.paymentMax = round(
    payInMonths[payInMonths.length - 1] + monthComisionValue,
  );
  results.total = round(
    sum + totalinterest + comisionValue + monthComisionValue * monthPeriod,
  );
  results.totalinterest = round(totalinterest);
  results.totalinterestWithCommission = round(
    totalinterest + comisionValue + monthComisionValue * monthPeriod,
  );
  results.paymentsCount = monthPeriod;
  results.error = null;

  const allPayments = [];
  for (let i = 0; i < results.paymentsCount; i++) {
    let resultPayment = round(payInMonths[i] + monthComisionValue);
    if (i === 0) {
      resultPayment += comisionValue;
    }

    allPayments.push(resultPayment);
  }
  results.effectivePercent = effectiveCalculate(sum, allPayments);

  return results;
};

export const calcCreditDay = (values) => {
  const sum = parseFloat(values.sum);
  const percent = parseFloat(values.percent);
  const period = parseFloat(values.period);
  const comision = parseFloat(values.comision);
  const comisionType = values.comisionType;
  const monthComision = parseFloat(values.monthComision);
  const monthComisionType = values.monthComisionType;
  const comisionValue = comision
    ? comisionType === 'sum'
      ? comision
      : (sum / 100) * comision
    : 0;
  const monthComisionValue = monthComision
    ? monthComisionType === 'sum'
      ? monthComision
      : (sum / 100) * monthComision
    : 0;
  const dayPeriod = period;
  const interest = percent / 100;

  const results = getDefaultResult;

  results.paymentsCount = 1;
  results.payment = round(sum + sum * interest * dayPeriod);
  results.total = round(results.payment + comisionValue + monthComisionValue);
  results.totalinterest = round(results.total - sum);
  results.totalinterestWithCommission = round(
    results.totalinterest + comisionValue + monthComisionValue,
  ); // monthComisionValue нужно умножать на количество месяцев. сейчас 1
  // results.effectivePercent = round((Math.pow(1 + (percent / 100) / dayPeriod, dayPeriod) - 1) * 100);
  results.effectivePercent = effectiveCalculate(sum, [results.total], period);
  return results;
};

export const calcCreditAnn = (values) => {
  const sum = parseFloat(values.sum);
  const percent = parseFloat(values.percent);
  const period = parseFloat(values.period);
  const comision = parseFloat(values.comision);
  const comisionType = values.comisionType;
  const monthComision = parseFloat(values.monthComision);
  const monthComisionType = values.monthComisionType;
  const periodType = values.periodType;
  const comisionValue = comision
    ? comisionType === 'sum'
      ? comision
      : (sum / 100) * comision
    : 0;
  const monthComisionValue = monthComision
    ? monthComisionType === 'sum'
      ? monthComision
      : (sum / 100) * monthComision
    : 0;
  const monthPeriod = periodType === 'month' ? period : period * 12;

  const results = getDefaultResult;

  // Get the user's input from the form. Assume it is all valid.
  // Convert interest from a percentage to a decimal, and convert from
  // an annual rate to a monthly rate. Convert payment period in years
  // to the number of monthly payments.
  const principal = sum;
  const interest = percent / 100 / 12;
  const payments = monthPeriod;
  // Now compute the monthly payment figure, using esoteric math.
  const x = Math.pow(1 + interest, payments);
  const monthly = (principal * x * interest) / (x - 1);
  // Check that the result is a finite number. If so, display the results.
  if (
    !isNaN(monthly) &&
    monthly !== Number.POSITIVE_INFINITY &&
    monthly !== Number.NEGATIVE_INFINITY
  ) {
    results.paymentsCount = monthPeriod;
    results.payment = round(monthly + monthComisionValue);
    results.totalinterest = round(monthly * payments - principal);
    results.totalinterestWithCommission = round(
      results.totalinterest + comisionValue + monthComisionValue * monthPeriod,
    );
    results.total = round(
      sum +
        results.totalinterest +
        comisionValue +
        monthComisionValue * monthPeriod,
    );

    const allPayments = [];
    for (let i = 0; i < results.paymentsCount; i++) {
      let resultPayment = round(results.payment);
      if (i === 0) {
        resultPayment += comisionValue;
      }

      allPayments.push(resultPayment);
    }
    results.effectivePercent = effectiveCalculate(sum, allPayments);
  }
  // Otherwise, the user's input was probably invalid, so don't
  // display anything.
  else {
    results.error = 'wrong input';
  }

  return results;
};

export const getDefaultResult = {
  payment: null,
  paymentMin: null,
  paymentMax: null,
  total: null,
  totalinterest: null,
  totalinterestWithCommission: null,
  paymentsCount: null,
  effectivePercent: null,
  error: null,
};

const effectiveCalculate = (totalPaid, payments, bp) => {
  let startStr = '2017-01-01';
  let CurrentDate = new Date(startStr);
  CurrentDate.setMonth(CurrentDate.getMonth());
  let paymentSumm = 0;
  const paymentsDates = payments.map((pay) => {
    CurrentDate.setMonth(CurrentDate.getMonth() + 1);
    paymentSumm += pay;
    return new Date(CurrentDate.getTime());
  });
  paymentsDates.unshift(new Date(startStr));
  payments.unshift(-1 * totalPaid);
  return psk(paymentsDates, payments, bp);
};
