import data from "../Data/modelling-heatmap.json";

function getPointCategoryName(point, dimension) {
  var series = point.series,
    isY = dimension === "y",
    axis = series[isY ? "yAxis" : "xAxis"];
  return axis.categories[point[isY ? "y" : "x"]];
}

const resourceKeys = [
  "Hospital Resources.Beds",
  "Hospital.physical ward beds available",
  "Hospital Resources.max available nurses",
  "Hospital Resources.Nurses",
  "Hospital Resources.available nurses",
  "Hospital Resources.staffed ward beds available",
  "Hospital Resources.ICU Beds",
  "Hospital.physical ICU beds available",
  "Hospital Resources.max available ICU nurses",
  "Hospital Resources.ICU Nurses",
  "Hospital Resources.available ICU nurses",
  "Ventilators.ventilators in stock",
  "Ventilators.ventilators available",
  "Hospital Resources.staffed equipped ICU beds available",
  "PPE.PPE",
];

const getHeatMapData = (data) => {
  const heatMapObj = {
    axisNames: [],
  };
  heatMapObj["values"] = data
    .map((el, idx, arr) => {
      heatMapObj.axisNames.push(el.name.split(".")[1]);
      return el.values.map((val, index, arr2) => {
        return [index, idx, Math.round(val)];
      });
    })
    .flat();
  console.log("heatMapObj ", heatMapObj);
  return heatMapObj;
};

const hospitalData = data.filter((obj) =>
  obj.name.toLowerCase().includes("hospital.")
);
const wardData = hospitalData.filter((obj) =>
  obj.name.toLowerCase().includes("ward")
);
const icuData = hospitalData.filter((obj) =>
  obj.name.toLowerCase().includes("icu")
);
const xAxisNames = [];
for (var i = 1; i <= 170; i++) {
  xAxisNames.push("Day " + i);
}
const hospitalHeatMapData = getHeatMapData(hospitalData);
const wardHeatData = getHeatMapData(wardData);
const icuHeatData = getHeatMapData(icuData);

const heatMapMax = Math.max(...hospitalHeatMapData.values.flat());
const heatMapMin = Math.min(...hospitalHeatMapData.values.flat());

Highcharts.chart("users", {
  chart: {
    type: "heatmap",
    height: 380,
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
    categories: hospitalHeatMapData.axisNames,
    title: null,
    minPadding: 0,
    maxPadding: 0,
    startOnTick: false,
    endOnTick: false,
    tickPositions: hospitalHeatMapData.axisNames.map((val, idx) => idx),
    tickWidth: 1,
    min: 0,
    max: 23,
    reversed: true,
  },

  colorAxis: {
    stops: [
      [0, "#ffffcc"],
      [0.1, "#ffeda0"],
      [0.2, "#fed976"],
      [0.3, "#feb24c"],
      [0.4, "#fd8d3c"],
      [0.5, "#fc4e2a"],
      [0.6, "#e31a1c"],
      [0.7, "#bd0026"],
      [0.8, "#800026"],
    ],
    min: 0,
    max: 1000,
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
      data: hospitalHeatMapData.values,
    },
    {
      boostThreshold: 100,
      borderWidth: 0,
      nullColor: "#EFEFEF",
      colsize: 24 * 170, // one day
      turboThreshold: Number.MAX_VALUE, // #3404, remove after 4..5 release
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
Highcharts.chart("wards", {
  chart: {
    type: "heatmap",
    height: 300,
  },

  boost: {
    useGPUTranslations: true,
  },

  title: {
    text: "Ward Resources",
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
    categories: wardHeatData.axisNames,
    title: null,
    minPadding: 0,
    maxPadding: 0,
    startOnTick: false,
    endOnTick: false,
    tickPositions: wardHeatData.axisNames.map((val, idx) => idx),
    tickWidth: 1,
    min: 0,
    max: wardHeatData.axisNames.length,
    reversed: true,
  },

  colorAxis: {
    stops: [
      [0, "#a50026"],
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
    max: 10000,
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
    // symbolHeight: 280,
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
      borderWidth: 1,
      data: wardHeatData.values,
    },
    {
      boostThreshold: 100,
      borderWidth: 0,
      nullColor: "#EFEFEF",
      colsize: 24 * 170, // one day
      turboThreshold: Number.MAX_VALUE, // #3404, remove after 4..5 release
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
Highcharts.chart("icu", {
  chart: {
    type: "heatmap",
    height: 300,
  },

  boost: {
    useGPUTranslations: true,
  },

  title: {
    text: "ICU Resources",
    align: "left",
    x: 40,
  },

  xAxis: {
    categories: xAxisNames,
  },

  yAxis: {
    categories: icuHeatData.axisNames,
    title: null,
    minPadding: 0,
    maxPadding: 0,
    startOnTick: false,
    endOnTick: false,
    tickPositions: icuHeatData.axisNames.map((val, idx) => idx),
    tickWidth: 1,
    min: 0,
    max: icuHeatData.axisNames.length,
    reversed: true,
  },

  colorAxis: {
    stops: [
      [0, "#fff5f0"],
      [0.1, "#fee0d2"],
      [0.2, "#fcbba1"],
      [0.4, "#fc9272"],
      [0.5, "#fb6a4a"],
      [0.6, "#ef3b2c"],
      [0.8, "#cb181d"],
      [1, "#99000d"],
    ],
    min: 0,
    max: 1000,
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
    // symbolHeight: 280,
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
      borderWidth: 1,
      data: icuHeatData.values,
    },
    {
      boostThreshold: 100,
      borderWidth: 0,
      nullColor: "#EFEFEF",
      colsize: 24 * 170, // one day
      turboThreshold: Number.MAX_VALUE, // #3404, remove after 4..5 release
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
