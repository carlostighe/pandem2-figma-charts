import data from "../Data/outputs.json";

const patientKeys = [
  "Hospital Resources.total ICU nurses needed for incoming patients",
  "Hospital Resources.ICU nurses gap",

  "Hospital Resources.expected ICU nurses freed",
];

const nurseData = patientKeys.map((key) => {
  return {
    name: key,
    data: Object.values(data[key])
      .slice(70, 121)
      .map((val) => Math.round(val)),
  };
});
console.log("nurseData ", nurseData);

const xAxisNames = [];
for (var i = 1; i <= 170; i++) {
  xAxisNames.push("Day " + i);
}

Highcharts.chart("line", {
  colors: ["#0072B2", "#CC79A7", "#56B4E9"],

  chart: {
    width: 1400,
    height: 300,
  },
  title: false,
  yAxis: {},
  xAxis: {
    accessibility: {
      rangeDescription: "Range: 2010 to 2017",
    },
  },
  legend: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
  },
  plotOptions: {
    series: {
      marker: {
        enabled: false,
      },
      label: {
        connectorAllowed: false,
      },
      pointStart: 2010,
    },
  },
  series: nurseData,
});

Highcharts.chart("bar", {
  colors: ["#0072B2", "#CC79A7", "#56B4E9"],

  chart: {
    type: "column",
    width: 1400,

    height: 300,
  },
  title: false,
  legend: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
  },
  plotOptions: {
    series: {
      stacking: "normal",
      grouping: false,
      pointPadding: 0,
      groupPadding: 0.1,
      borderWidth: 0,
      shadow: false,
    },
  },
  series: nurseData,
});

Highcharts.chart("grouped", {
  colors: ["#0072B2", "#CC79A7", "#56B4E9"],
  chart: {
    type: "column",
    width: 1400,
    height: 300,
  },
  title: {
    style: {
      display: "none",
    },
  },
  yAxis: {
    label: false,
  },
  legend: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
  },
  plotOptions: {
    series: {
      pointPadding: 0,
      groupPadding: 0.05,
      borderWidth: 0,
      shadow: false,
    },
  },
  series: nurseData,
});
