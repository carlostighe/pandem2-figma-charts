import colors from "./colors.json";
import data from "../Data/outputs.json";

const inferno = colors["inferno"];
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

const formatBarData = (data) => {
  let barMapData = [];
  for (const [key, val] of Object.entries(data)) {
    let newObj = {
      name: key,
      data: [],
    };
    for (const [k, v] of Object.entries(val)) {
      newObj["data"].push(v);
    }
    newObj["data"] = Math.max(...newObj["data"]);
    barMapData.push(newObj);
  }
  return barMapData;
};

const normaliseData = (data) => {
  return data.map((el, idx, arr) => {
    const compareVal = el.data[0];
    el.data = el.data.map((val) => (Math.round(val) * 100) / compareVal);
    return el;
  });
};

const formatSeries = (heatMapData, barData) => {
  let res = [];
  res.push({
    type: "heatmap",
    xAxis: 0,
    yAxis: 0,
    name: "Hospital Resources",
    borderWidth: 0.1,
    borderColor: "white",
    data: heatMapData.data,
  });
  res.push({
    type: "bar",
    name: "bar",
    xAxis: 1,
    yAxis: 1,
    opposite: true,
    data: barData.map((el) => Math.round(el.data)),
  });
  // res.push({
  //   boostThreshold: 100,
  //   borderWidth: 0,
  //   nullColor: "#EFEFEF",
  //   colsize: 24 * 36e5, // one day
  //   turboThreshold: Number.MAX_VALUE, // #3404, remove after 4..5 release
  // },)
  return res;
};

const resourceData = Object.fromEntries(resourceKeys.map((k) => [k, data[k]]));
const formattedData = formatHeatMapData(resourceData);
const formattedBarData = formatBarData(resourceData);
const normalisedData = normaliseData(formattedData);
const heatMapData = getHeatMapData(normalisedData);

const xAxisNames = [];
for (var i = 1; i <= 170; i++) {
  xAxisNames.push("Day " + i);
}

const combinedData = formatSeries(heatMapData, formattedBarData);
console.log("combinedData ", combinedData);

Highcharts.chart("resources", {
  chart: {
    width: 1200,
    height: 800,
  },

  boost: {
    useGPUTranslations: true,
  },

  title: {
    text: "Hospital Resources",
    align: "left",
    // x: 40,
  },

  yAxis: [
    {
      categories: xAxisNames,
    },
    {
      categories: xAxisNames,
    },
  ],

  xAxis: [
    {
      categories: heatMapData.axisNames,
      startOnTick: true,
      endOnTick: true,
      tickPositions: heatMapData.axisNames.map((val, idx) => idx),
      tickWidth: 1,
      offset: 0,
      width: "50%",
      // reversed: true,
    },
    {
      linkedTo: 0,
      min: 0,
      left: "50%",
      width: "45%",
    },
  ],
  // colorAxis: {
  //   stops: [
  //     [0, inferno[8]],
  //     [0.1, inferno[8]],
  //     [0.2, inferno[7]],
  //     [0.3, inferno[6]],
  //     [0.4, inferno[5]],
  //     [0.5, inferno[4]],
  //     [0.6, inferno[3]],
  //     [0.7, inferno[2]],
  //     [0.8, inferno[1]],
  //     [1, inferno[0]],
  //   ],
  //   min: 0,
  //   max: 110,
  //   startOnTick: false,
  //   endOnTick: false,
  //   labels: {
  //     format: "{value}",
  //   },
  // },
  credits: {
    enabled: false,
  },

  legend: {
    align: "center",
    layout: "horizontal",
    margin: 0,
    reversed: true,
    // verticalAlign: "bottom",
    // y: 25,
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
      type: "heatmap",
      xAxis: 0,
      name: "Hospital Resources",
      borderWidth: 0.1,
      borderColor: "white",
      data: heatMapData.data,
    },
    {
      type: "bar",
      name: "bar",
      xAxis: 1,
      opposite: true,
      data: formattedBarData.map((el) => Math.round(el.data)),
    },
  ],

  // responsive: {
  //   rules: [
  //     {
  //       condition: {
  //         maxWidth: 500,
  //       },
  //       chartOptions: {
  //         yAxis: {
  //           labels: {
  //             formatter: function () {
  //               return this.value.charAt(0);
  //             },
  //           },
  //         },
  //       },
  //     },
  //   ],
  // },
});
