import data from "../Data/outputs.json";

const patientKeys = [
  "Hospital Resources.Absent ICU Nurses",
  "Hospital Resources.ICU nurses gap",
  "Hospital Resources.available ICU nurses",
  "Hospital Resources.occupied ICU nurses",
  "Hospital Resources.total ICU nurses needed for incoming patients",
  "Hospital Resources.expected ICU nurses freed",
];

const peak = "Hospital.peak demand ICU nurses";
const maxAvailable = "Hospital Resources.max available ICU nurses";

const nurseData = patientKeys.map((key) => {
  return key === "Hospital Resources.ICU nurses gap"
    ? {
        name: key,
        data: Object.values(data[key]).map((val) => Math.round(-val)),
      }
    : {
        name: key,
        data: Object.values(data[key]).map((val) => Math.round(val)),
      };
});
const xAxisNames = [];
for (var i = 1; i <= 170; i++) {
  xAxisNames.push("Day " + i);
}
const maxRate = data[maxAvailable][0];

Highcharts.chart("container", {
  chart: {
    type: "column",
    width: 1400,
  },
  title: {
    text: "Column chart with negative values",
  },
  xAxis: {
    categories: xAxisNames,
  },
  yAxis: {
    plotLines: [
      {
        value: maxRate,
        color: "#A50026",
        dashStyle: "shortdash",
        width: 2,
        label: {
          text: maxAvailable,
        },
      },
    ],
  },
  legend: {
    align: "right",
    verticalAlign: "top",
    layout: "vertical",
    x: 0,
    y: 100,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    series: {
      grouping: false,
      pointWidth: 5,
    },
  },
  series: nurseData,
});
