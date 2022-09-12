import data from "../Data/latest_outputs.json";

const available = [
  "Hospital.physical ICU beds available",
  "Hospital Resources.available ICU nurses",
  "Ventilators.ventilators available",
  "Hospital.physical ward beds available",
  "Hospital Resources.available nurses",
];

const peaks = [
  "Hospital.peak demand ICU beds",
  "Hospital.peak demand ICU nurses",
  "Hospital.peak demand ventilators",
  "Hospital.peak demand ward beds",
  "Hospital.peak demand nurses",
];

const peakData = peaks.map((key) => {
  let tempData = Object.values(data[key]).map((val) => Math.round(val));
  return {
    name: key.split(".").pop(),
    data: Math.max.apply(Math, tempData),
  };
});

const getData = (data, keys) => {
  const returnData = [];
  const dataObj = Object.fromEntries(keys.map((k) => [k, data[k]]));
  for (let [k, v] of Object.entries(dataObj)) {
    let newObj = {};
    newObj["name"] = k;
    newObj["data"] = Object.values(v).map((val) => Math.round(val));
    returnData.push(newObj);
  }
  return returnData;
};

// FILTER THE DATA BY THE KEYS ABOVE AND THEN GET DATA FOR THE DAY (example day 80)
const resourceData = getData(data, available);
console.log("resourceData ", resourceData);

const graphs = [
  {
    series: {
      name: "Peak vs Avaialble Ward beds",
      data: resourceData.filter((obj) => obj.name.includes("ward beds")),
    },
    yPlot: peakData.filter((obj) => obj.name.includes("ward beds")),
  },
  // {
  //   series: {
  //     name: "Peak vs Avaialble Ward Nurses",
  //     data: resourceData.filter((obj) => obj.name.includes("available nurses")),
  //   },
  //   yPlot: peakData.filter((obj) => obj.name.includes("demand nurses")),
  // },
  // {
  //   series: {
  //     name: "Peak vs Available ICU Beds",
  //     data: resourceData.filter((obj) => obj.name.includes("ICU beds")),
  //   },
  //   yPlot: peakData.filter((obj) => obj.name.includes("ICU beds")),
  // },
  // {
  //   series: {
  //     name: "Peak vs Available ICU Nurses",
  //     data: resourceData.filter((obj) => obj.name.includes("ICU nurses")),
  //   },
  //   yPlot: peakData.filter((obj) => obj.name.includes("ICU nurses")),
  // },
  // {
  //   series: {
  //     name: "Ventilators",
  //     data: resourceData.filter((obj) => obj.name.includes("ventilators")),
  //   },
  //   yPlot: peakData.filter((obj) => obj.name.includes("ventilators")),
  // },
];

graphs.forEach((el, idx, arr) => {
  console.log(graphs);

  // area charts
  // Highcharts.chart("container" + idx, {
  //   chart: {
  //     type: "area",
  //     width: 450,
  //     height: 200,
  //   },
  //   title: {
  //     style: {
  //       display: "none",
  //     },
  //   },
  //   subtitle: {
  //     text: graphs[idx]["series"]["name"],
  //   },
  //   legend: {
  //     enabled: false,
  //     layout: "vertical",
  //     align: "right",
  //     verticalAlign: "middle",
  //   },

  //   yAxis: {
  //     title: {
  //       enabled: false,
  //     },
  //     plotLines: [
  //       {
  //         value: graphs[idx]["yPlot"][0]["data"],
  //         color: "#A50026",
  //         dashStyle: "shortdash",
  //         width: 2,
  //         zIndex: 5,
  //         label: {
  //           text: graphs[idx]["yPlot"][0]["name"],
  //         },
  //       },
  //     ],
  //   },
  //   credits: {
  //     enabled: false,
  //   },

  //   plotOptions: {
  //     series: {
  //       label: {
  //         connectorAllowed: false,
  //       },
  //     },
  //   },

  //   series: graphs[idx]["series"]["data"],

  //   responsive: {
  //     rules: [
  //       {
  //         condition: {
  //           maxWidth: 500,
  //         },
  //         chartOptions: {
  //           legend: {
  //             layout: "horizontal",
  //             align: "center",
  //             verticalAlign: "bottom",
  //           },
  //         },
  //       },
  //     ],
  //   },
  // });
  // bar charts
  Highcharts.chart("container" + idx, {
    chart: {
      type: "column",
      width: 1400,
      height: 400,
    },
    title: {
      style: {
        display: "none",
      },
    },
    subtitle: {
      text: graphs[idx]["series"]["name"],
    },
    legend: {
      enabled: false,
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    yAxis: {
      title: {
        enabled: false,
      },
      plotLines: [
        {
          value: graphs[idx]["yPlot"][0]["data"],
          color: "#A50026",
          dashStyle: "shortdash",
          width: 2,
          zIndex: 5,
          label: {
            text: graphs[idx]["yPlot"][0]["name"],
          },
        },
      ],
    },
    credits: {
      enabled: false,
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: graphs[idx]["series"]["data"],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });
});

// Highcharts.chart("container2", {
//   chart: {
//     defaultSeriesType: "bar",
//   },
//   legend: {
//     enabled: false,
//   },
//   series: [
//     {
//       data: [
//         {
//           y: 10,
//           low: 5,
//         },
//         {
//           y: 2,
//           low: 8,
//         },
//         {
//           y: 4,
//           low: 7.5,
//         },
//       ],
//     },
//   ],
// });

// Data gathered from http://populationpyramid.net/germany/2015/

// Age categories
