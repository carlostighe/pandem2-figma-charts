import data from "../Data/latest_outputs.json";
import scenarioData from "../Data/scenario1.json";

function addPlotline(plotlineParam) {
  // If plotline selected find the index of the selected item and remove it from the graph data array
  let plotlineIndex = graphDataArray.findIndex(
    (obj) => obj.name === plotlineParam
  );
  let plotlineDataArray = graphDataArray.splice(plotlineIndex, 1);
  return Math.max(...plotlineDataArray[0].data);
}

const graphKeys = [
  "Hospital Resources.available nurses",
  "Hospital Resources.occupied nurses",
  "Hospital Resources.nurses gap",
  "Hospital Resources.max available nurses",
  "Hospital.peak demand nurses",
];

const graphDataArray = [];
const graphDataObj = Object.fromEntries(graphKeys.map((k) => [k, data[k]]));
for (const [k, v] of Object.entries(graphDataObj)) {
  graphDataArray.push({
    name: k,
    data: Object.values(v).map((val) => Math.round(val)),
  });
}
console.log("graphDataArray ", graphDataArray);

let plotlineParam1 = "Hospital Resources.max available nurses";
let plotlineParam2 = "Hospital.peak demand nurses";
let plotlineMaxVal1 = addPlotline(plotlineParam1);
let plotlineMaxVal2 = addPlotline(plotlineParam2);

Highcharts.chart("line", {
  chart: {
    // width: 1400,
    height: 300,
  },
  title: false,
  yAxis: {
    plotLines: [
      {
        value: plotlineMaxVal1,
        // color: "#A50026",
        dashStyle: "shortdash",
        zIndex: 5,
        width: 3,
        label: {
          text: plotlineParam1,
        },
      },
      {
        value: plotlineMaxVal2,
        // color: "#A50026",
        dashStyle: "shortdash",
        zIndex: 5,
        width: 3,
        label: {
          text: plotlineParam2,
        },
      },
    ],
  },

  xAxis: {
    accessibility: {
      rangeDescription: "Range: 2010 to 2017",
    },
  },

  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: 2010,
    },
  },
  series: graphDataArray,
});

Highcharts.chart("bar", {
  chart: {
    type: "column",
    height: 300,
  },
  title: false,
  yAxis: {
    plotLines: [
      {
        value: plotlineMaxVal1,
        // color: "#A50026",
        dashStyle: "shortdash",
        zIndex: 5,
        width: 3,
        label: {
          text: plotlineParam1,
        },
      },
      {
        value: plotlineMaxVal2,
        // color: "#A50026",
        dashStyle: "shortdash",
        zIndex: 5,
        width: 3,
        label: {
          text: plotlineParam2,
        },
      },
    ],
  },

  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
  },

  plotOptions: {
    column: {
      pointPadding: 0.8,
      borderWidth: 0.2,
    },
  },
  series: graphDataArray,
});

Highcharts.chart("area", {
  chart: {
    type: "area",
    height: 300,
  },
  title: {
    style: {
      display: "none",
    },
  },
  yAxis: {
    label: false,
    plotLines: [
      {
        value: plotlineMaxVal1,
        // color: "#A50026",
        dashStyle: "shortdash",
        zIndex: 5,
        width: 3,
        label: {
          text: plotlineParam1,
        },
      },
      {
        value: plotlineMaxVal2,
        // color: "#A50026",
        dashStyle: "shortdash",
        zIndex: 5,
        width: 3,
        label: {
          text: plotlineParam2,
        },
      },
    ],
  },

  xAxis: {
    accessibility: {
      rangeDescription: "Range: 2010 to 2017",
    },
  },

  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: 2010,
    },
  },
  series: graphDataArray,
});
