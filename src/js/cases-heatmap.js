import colors from "./colors.json";
import jsonData from "../Data/owid-cases.json";

data = jsonData["data"];
dates = jsonData["dates"].map((date) => Date.parse(date));

const inferno = colors["inferno"];
function getPointCategoryName(point, dimension) {
  var series = point.series,
    isY = dimension === "y",
    axis = series[isY ? "yAxis" : "xAxis"];
  return axis.categories[point[isY ? "y" : "x"]];
}

const xAxisNames = [];
for (var i = 1; i <= 170; i++) {
  xAxisNames.push("Day " + i);
}

const countries = Object.keys(data);
console.log("countries ", countries);
const heatmapData = Object.values(data)
  .map((val) => val.cases)
  .flat();

Highcharts.chart("resources", {
  chart: {
    type: "heatmap",
    height: 1200,
    inverted: true,
  },
  // colors: inferno,
  credits: {
    enabled: false,
  },
  // plotOptions: {
  //   heatmap: {
  //     color: inferno,
  //   },
  // },
  boost: {
    useGPUTranslations: true,
  },
  title: {
    text: "Cases per country",
  },

  yAxis: {
    type: "datetime",
    categories: dates,
  },

  xAxis: {
    type: "category",
    categories: countries,
    labels: {
      formatter: function () {
        return this.value;
      },
      step: 1,
    },
  },
  colorAxis: {
    stops: [
      [0, "#4575b4"],
      [0.01, "#74add1"],
      [0.03, "#abd9e9"],
      [0.04, "#e0f3f8"],
      [0.05, "#ffffbf"],
      [0.1, "#fee090"],
      [0.2, "#fdae61"],
      [0.3, "#f46d43"],
      [0.4, "#d73027"],
      [0.5, "#a50026"],
      [1, "#000000"],
    ],
    min: 0,
    max: 50000,
    startOnTick: false,
    endOnTick: false,
    labels: {
      format: "{value}",
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      data: heatmapData,
      boostThreshold: 100,
      borderWidth: 0,
      tooltip: {
        headerFormat: "Cases<br/>",
        pointFormat: "<b>{point.value}</b>",
      },
      turboThreshold: Number.MAX_VALUE,
    },
  ],
});
