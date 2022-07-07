function getPointCategoryName(point, dimension) {
  var series = point.series,
    isY = dimension === "y",
    axis = series[isY ? "yAxis" : "xAxis"];
  return axis.categories[point[isY ? "y" : "x"]];
}

const resourceKeys = [
  // "Hospital Resources.Beds",
  "Hospital.physical ward beds available",
  // "Hospital Resources.max available nurses",
  // "Hospital Resources.Nurses",
  "Hospital Resources.available nurses",
  "Hospital Resources.staffed ward beds available",
  // "Hospital Resources.ICU Beds",
  "Hospital.physical ICU beds available",
  // "Hospital Resources.max available ICU nurses",
  // "Hospital Resources.ICU Nurses",
  "Hospital Resources.available ICU nurses",
  // "Ventilators.ventilators in stock",
  "Ventilators.ventilators available",
  "Hospital Resources.staffed equipped ICU beds available",
  "PPE.PPE",
];

const getHeatMapData = (data) => {
  const heatMapObj = {
    axisNames: [],
  };
  heatMapObj["data"] = data
    .map((el, idx, arr) => {
      heatMapObj.axisNames.push(el.name);
      return el.data.map((val, index, arr2) => {
        return [index, idx, Math.round(val)];
      });
    })
    .flat();
  return heatMapObj;
};

const formatHeatMapData = (data) => {
  heatMapData = [];
  for (const [key, val] of Object.entries(data)) {
    let newObj = {
      name: key,
      data: [],
    };
    for (const [k, v] of Object.entries(val)) {
      newObj["data"].push(v);
    }
    heatMapData.push(newObj);
  }
  return heatMapData;
};

const normaliseData = (data) => {
  return data.map((el, idx, arr) => {
    const compareVal = el.data[0];
    el.data = el.data.map((val) => (Math.round(val) * 100) / compareVal);
    return el;
  });
};

fetch("../Data/outputs.json")
  .then((response) => response.json())
  .catch((err) => console.log(err))
  .then((data) => {
    const resourceData = Object.fromEntries(
      resourceKeys.map((k) => [k, data[k]])
    );
    const formattedData = formatHeatMapData(resourceData);
    const normalisedData = normaliseData(formattedData);
    const heatMapData = getHeatMapData(normalisedData);

    const xAxisNames = [];
    for (var i = 1; i <= 170; i++) {
      xAxisNames.push("Day " + i);
    }
    // const hospitalHeatMapData = getHeatMapData(hospitalData);

    // heatMapMax = Math.max(...hospitalHeatMapData.values.flat());
    // heatMapMin = Math.min(...hospitalHeatMapData.values.flat());

    Highcharts.chart("resources", {
      chart: {
        type: "heatmap",
        // height: 500,
      },

      boost: {
        useGPUTranslations: true,
      },

      title: {
        text: "Hospital Resources",
        align: "left",
        x: 40,
      },

      xAxis: {
        categories: xAxisNames,
        labels: {
          enabled: false,
        },
      },

      yAxis: {
        categories: heatMapData.axisNames,
        title: null,
        minPadding: 0,
        maxPadding: 0,
        startOnTick: false,
        endOnTick: false,
        tickPositions: heatMapData.axisNames.map((val, idx) => idx),
        tickWidth: 1,
        min: 0,
        max: heatMapData.axisNames.length,
        reversed: true,
      },

      colorAxis: {
        stops: [
          [0, "#000000"],
          [0.02, "#a50026"],
          [0.1, "#d73027"],
          [0.2, "#f46d43"],
          [0.3, "#fdae61"],
          [0.4, "#fee090"],
          [0.5, "#ffffbf"],
          [0.6, "#e0f3f8"],
          [0.7, "#abd9e9"],
          [0.8, "#74add1"],
          [0.9, "#4575b4"],
          [1, "#313695"],
        ],
        min: 0,
        max: 110,
        startOnTick: false,
        endOnTick: false,
        labels: {
          format: "{value}",
        },
      },

      legend: {
        align: "right",
        layout: "vertical",
        margin: 0,
        verticalAlign: "top",
        y: 25,
        symbolHeight: 280,
      },

      tooltip: {
        formatter: function () {
          return (
            "<b> On " +
            getPointCategoryName(this.point, "x") +
            "</b> the <br><b>" +
            getPointCategoryName(this.point, "y") +
            "</b> were <br><b>" +
            this.point.value +
            "</b>"
          );
        },
      },

      series: [
        {
          name: "Hospital Resources",
          borderWidth: 0.1,
          borderColor: "white",
          data: heatMapData.data,
        },
        {
          boostThreshold: 100,
          borderWidth: 0,
          nullColor: "#EFEFEF",
          colsize: 24 * 36e5, // one day
          turboThreshold: Number.MAX_VALUE, // #3404, remove after 4.0.5 release
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              yAxis: {
                labels: {
                  formatter: function () {
                    return this.value.charAt(0);
                  },
                },
              },
            },
          },
        ],
      },
    });
    // Highcharts.chart("wards", {
    //   chart: {
    //     type: "heatmap",
    //     height: 300,
    //   },

    //   boost: {
    //     useGPUTranslations: true,
    //   },

    //   title: {
    //     text: "Ward Resources",
    //     align: "left",
    //     x: 40,
    //   },

    //   xAxis: {
    //     categories: xAxisNames,
    //     labels: {
    //       enabled: false,
    //     },
    //   },

    //   yAxis: {
    //     categories: wardHeatData.axisNames,
    //     title: null,
    //     minPadding: 0,
    //     maxPadding: 0,
    //     startOnTick: false,
    //     endOnTick: false,
    //     tickPositions: wardHeatData.axisNames.map((val, idx) => idx),
    //     tickWidth: 1,
    //     min: 0,
    //     max: wardHeatData.axisNames.length,
    //     reversed: true,
    //   },

    //   colorAxis: {
    //     stops: [
    //       [0, "#a50026"],
    //       [0.1, "#d73027"],
    //       [0.2, "#f46d43"],
    //       [0.3, "#fdae61"],
    //       [0.4, "#fee090"],
    //       [0.5, "#ffffbf"],
    //       [0.6, "#e0f3f8"],
    //       [0.7, "#abd9e9"],
    //       [0.8, "#74add1"],
    //       [0.9, "#4575b4"],
    //       [1, "#313695"],
    //     ],
    //     min: 0,
    //     max: 10000,
    //     startOnTick: false,
    //     endOnTick: false,
    //     labels: {
    //       format: "{value}",
    //     },
    //   },

    //   legend: {
    //     align: "right",
    //     layout: "vertical",
    //     margin: 0,
    //     verticalAlign: "top",
    //     y: 25,
    //     // symbolHeight: 280,
    //   },

    //   tooltip: {
    //     formatter: function () {
    //       return (
    //         "<b> On " +
    //         getPointCategoryName(this.point, "x") +
    //         "</b> the <br><b>" +
    //         getPointCategoryName(this.point, "y") +
    //         "</b> were <br><b>" +
    //         this.point.value +
    //         "</b>"
    //       );
    //     },
    //   },

    //   series: [
    //     {
    //       name: "Hospital Resources",
    //       borderWidth: 1,
    //       data: wardHeatData.values,
    //     },
    //     {
    //       boostThreshold: 100,
    //       borderWidth: 0,
    //       nullColor: "#EFEFEF",
    //       colsize: 24 * 170, // one day
    //       turboThreshold: Number.MAX_VALUE, // #3404, remove after 4.0.5 release
    //     },
    //   ],

    //   responsive: {
    //     rules: [
    //       {
    //         condition: {
    //           maxWidth: 500,
    //         },
    //         chartOptions: {
    //           yAxis: {
    //             labels: {
    //               formatter: function () {
    //                 return this.value.charAt(0);
    //               },
    //             },
    //           },
    //         },
    //       },
    //     ],
    //   },
    // });
    // Highcharts.chart("icu", {
    //   chart: {
    //     type: "heatmap",
    //     height: 300,
    //   },

    //   boost: {
    //     useGPUTranslations: true,
    //   },

    //   title: {
    //     text: "ICU Resources",
    //     align: "left",
    //     x: 40,
    //   },

    //   xAxis: {
    //     categories: xAxisNames,
    //   },

    //   yAxis: {
    //     categories: icuHeatData.axisNames,
    //     title: null,
    //     minPadding: 0,
    //     maxPadding: 0,
    //     startOnTick: false,
    //     endOnTick: false,
    //     tickPositions: icuHeatData.axisNames.map((val, idx) => idx),
    //     tickWidth: 1,
    //     min: 0,
    //     max: icuHeatData.axisNames.length,
    //     reversed: true,
    //   },

    //   colorAxis: {
    //     stops: [
    //       [0, "#fff5f0"],
    //       [0.1, "#fee0d2"],
    //       [0.2, "#fcbba1"],
    //       [0.4, "#fc9272"],
    //       [0.5, "#fb6a4a"],
    //       [0.6, "#ef3b2c"],
    //       [0.8, "#cb181d"],
    //       [1, "#99000d"],
    //     ],
    //     min: 0,
    //     max: 1000,
    //     startOnTick: false,
    //     endOnTick: false,
    //     labels: {
    //       format: "{value}",
    //     },
    //   },

    //   legend: {
    //     align: "right",
    //     layout: "vertical",
    //     margin: 0,
    //     verticalAlign: "top",
    //     y: 25,
    //     // symbolHeight: 280,
    //   },

    //   tooltip: {
    //     formatter: function () {
    //       return (
    //         "<b> On " +
    //         getPointCategoryName(this.point, "x") +
    //         "</b> the <br><b>" +
    //         getPointCategoryName(this.point, "y") +
    //         "</b> were <br><b>" +
    //         this.point.value +
    //         "</b>"
    //       );
    //     },
    //   },

    //   series: [
    //     {
    //       name: "Hospital Resources",
    //       borderWidth: 1,
    //       data: icuHeatData.values,
    //     },
    //     {
    //       boostThreshold: 100,
    //       borderWidth: 0,
    //       nullColor: "#EFEFEF",
    //       colsize: 24 * 170, // one day
    //       turboThreshold: Number.MAX_VALUE, // #3404, remove after 4.0.5 release
    //     },
    //   ],

    //   responsive: {
    //     rules: [
    //       {
    //         condition: {
    //           maxWidth: 500,
    //         },
    //         chartOptions: {
    //           yAxis: {
    //             labels: {
    //               formatter: function () {
    //                 return this.value.charAt(0);
    //               },
    //             },
    //           },
    //         },
    //       },
    //     ],
    //   },
    // });
  });

//   [[100, #a50026],
// [90, #d73027],
// [80, #f46d43],
// [70, #fdae61],
// [60, #fee090],
// [50, #ffffbf],
// [40, #e0f3f8],
// [30, #abd9e9],
// [20, #74add1],
// [10, #4575b4],
// [0, #313695]]
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
