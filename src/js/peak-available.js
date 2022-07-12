import data from "../Data/outputs.json";

const patientKeys = [
  "Hospital.physical ICU beds available",
  "Hospital Resources.max available ICU nurses",
  "Ventilators.ventilators available",
  "Hospital.physical ward beds available",
  "Hospital Resources.max available nurses",
  "PPE.PPE",
];

const peakKeys = [
  "Hospital.peak demand ICU beds",
  "Hospital.peak demand ICU nurses",
  "Hospital.peak demand ventilators",
  "Hospital.peak demand ward beds",
  "Hospital.peak demand nurses",
  "Hospital.peak demand PPE",
];

const getCategories = () => {
  let cats = [];
  peakKeys.forEach((el, idx) => {
    cats.push(
      el.split(".").at(-1) + " vs " + patientKeys[idx].split(".").at(-1)
    );
  });
  return cats;
};
const day = 80;
const getDataByDay = (day, data, keys) => {
  return Object.fromEntries(keys.map((k) => [k, Math.round(data[k][day])]));
};
const formatData = (data, keys) => {
  let formattedData = [];
  keys.forEach((el, idx) => {
    formattedData.push(data[el]);
  });
  return formattedData;
};
// FILTER THE DATA BY THE KEYS ABOVE AND THEN GET DATA FOR THE DAY (example day 80)
const cats = getCategories();
const resourceData = getDataByDay(day, data, patientKeys);
const peakData = getDataByDay(day, data, peakKeys);
const peakSeries = formatData(peakData, peakKeys);
console.log("peakSeries ", peakSeries);
const resourceSeries = formatData(resourceData, patientKeys);
const peakPercent = peakSeries.map((el, idx, arr) =>
  Math.round((el * 100) / resourceSeries[idx])
);
const resourcePercent = resourceSeries.map((el) => 100);

Highcharts.chart("container", {
  chart: {
    polar: true,
    type: "line",
  },

  title: {
    text: "Peak vs Resources",
    x: -80,
  },

  pane: {
    size: "80%",
  },

  xAxis: {
    categories: cats,
    tickmarkPlacement: "on",
    lineWidth: 0,
  },

  yAxis: {
    gridLineInterpolation: "polygon",
    lineWidth: 0,
    min: 0,
  },

  series: [
    {
      name: "Resources available",
      data: resourcePercent,
      pointPlacement: "on",
    },
    {
      name: "Peak Demand",
      data: peakPercent,
      pointPlacement: "on",
    },
  ],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
          },
          pane: {
            size: "70%",
          },
        },
      },
    ],
  },
});
