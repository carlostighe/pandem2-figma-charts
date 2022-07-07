Highcharts.chart("container", {
  data: {
    csv: document.getElementById("csv").innerHTML,
  },

  chart: {
    type: "heatmap",
  },

  boost: {
    useGPUTranslations: true,
  },

  title: {
    text: "Highcharts heat map",
    align: "left",
    x: 40,
  },

  subtitle: {
    text: "Temperature variation by day and hour through 2017",
    align: "left",
    x: 40,
  },

  xAxis: {
    type: "datetime",
    min: Date.UTC(2021, 0, 1),
    max: Date.UTC(2021, 06, 31, 23, 59, 59),
    labels: {
      align: "left",
      x: 5,
      y: 14,
      format: "{value:%B}", // long month
    },
    showLastLabel: false,
    tickLength: 10,
  },

  yAxis: {
    title: {
      text: null,
    },
    labels: {
      format: "{value}:00",
    },
    minPadding: 0,
    maxPadding: 0,
    startOnTick: false,
    endOnTick: false,
    tickPositions: [0, 6, 12, 18, 24],
    tickWidth: 1,
    min: 0,
    max: 23,
    reversed: true,
  },

  colorAxis: {
    stops: [
      [0, "#3060cf"],
      [0.5, "#fffbbc"],
      [0.9, "#c4463a"],
      [1, "#c4463a"],
    ],
    min: -15,
    max: 25,
    startOnTick: false,
    endOnTick: false,
    labels: {
      format: "{value}℃",
    },
  },

  series: [
    {
      boostThreshold: 100,
      borderWidth: 0,
      nullColor: "#EFEFEF",
      colsize: 24 * 180, // one day
      tooltip: {
        headerFormat: "Temperature<br/>",
        pointFormat: "{point.x:%e %b, %Y} {point.y}:00: <b>{point.value} ℃</b>",
      },
      turboThreshold: Number.MAX_VALUE, // #3404, remove after 4.0.5 release
    },
  ],
});

// const run_data = [
//   "run1",
//   "run2",
//   "run3",
//   "run4",
//   "run5",
//   "run6",
//   "run7",
//   "run8",
//   "run9",
//   "run10",
//   "run11",
//   "run12",
//   "run13",
//   "run14",
//   "run15",
//   "run16",
//   "run17",
//   "run18",
//   "run19",
//   "run20",
//   "run21",
//   "run22",
//   "run23",
//   "run24",
//   "run25",
//   "run26",
//   "run27",
//   "run28",
//   "run29",
//   "run30",
// ];

// fetch("resource_data.csv")
//   .then((response) => response.text())
//   .catch((err) => console.log(err))
//   .then((data) => {
//     console.log("data ", data);
//     Highcharts.chart("container", {
//       data: {
//         csv: data,
//       },
//       chart: {
//         type: "heatmap",
//       },
//       boost: {
//         useGPUTranslations: true,
//       },
//       title: {
//         text: "Resource Capacity heat map",
//         align: "left",
//         x: 40,
//       },
//       subtitle: {
//         text: "Resource Capacity",
//         align: "left",
//         x: 40,
//       },
//       xAxis: {
//         type: "datetime",
//         min: Date.UTC(2022, 0, 1),
//         max: Date.UTC(2022, 11, 31, 23, 59, 59),
//         labels: {
//           align: "left",
//           x: 5,
//           y: 14,
//           format: "{value:%B}", // long month
//         },
//         showLastLabel: false,
//         tickLength: 16,
//       },

//       yAxis: {
//         title: {
//           text: null,
//         },
//         formatter: function () {
//           return run_data[this.pos - 1];
//         },
//         minPadding: 0,
//         maxPadding: 0,
//         startOnTick: false,
//         endOnTick: false,
//         tickPositions: [0, 6, 12, 18, 24],
//         tickWidth: 1,
//         min: 0,
//         max: 23,
//         reversed: false,
//       },

//       colorAxis: {
//         stops: [
//           [0, "#ffffff"],
//           [0.1, "#ffffcc"],
//           [0.2, "#ffeda0"],
//           [0.3, "#fed976"],
//           [0.4, "#feb24c"],
//           [0.5, "#fd8d3c"],
//           [0.6, "#fc4e2a"],
//           [0.7, "#e31a1c"],
//           [0.8, "#bd0026"],
//           [1, "#800026"],
//         ],
//         min: 0,
//         max: 100,
//         startOnTick: false,
//         endOnTick: false,
//         labels: {
//           format: "{value}",
//         },
//       },

//       series: [
//         {
//           boostThreshold: 100,
//           borderWidth: 0,
//           nullColor: "#EFEFEF",
//           colsize: 24 * 36e5, // one day
//           tooltip: {
//             headerFormat: "Resource Capacity %<br/>",
//             pointFormat: "{pointx:%e %b, %Y} {pointy} <b>{pointvalue}</b>",
//           },
//           turboThreshold: Number.MAX_VALUE, // #3404, remove after 405 release
//         },
//       ],
//     });
//   });
