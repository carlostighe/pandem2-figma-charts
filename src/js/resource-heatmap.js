import data from "../Data/outputs.json";

function getPointCategoryName(point, dimension) {
  var series = point.series,
    isY = dimension === "y",
    axis = series[isY ? "yAxis" : "xAxis"];
  return axis.categories[point[isY ? "y" : "x"]];
}

const resourceKeys = [
  "Hospital.physical ward beds available",
  "Hospital Resources.available nurses",
  "Hospital Resources.staffed ward beds available",
  "Hospital.physical ICU beds available",
  "Hospital Resources.available ICU nurses",
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
  let heatMapData = [];
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

const resourceData = Object.fromEntries(resourceKeys.map((k) => [k, data[k]]));
const formattedData = formatHeatMapData(resourceData);
const normalisedData = normaliseData(formattedData);
const heatMapData = getHeatMapData(normalisedData);

const xAxisNames = [];
for (var i = 1; i <= 170; i++) {
  xAxisNames.push("Day " + i);
}

Highcharts.chart("resources", {
  chart: {
    type: "heatmap",
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
