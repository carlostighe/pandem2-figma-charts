import data from "../Data/latest_outputs.json";
Highcharts.setOptions({
  colors: [
    "#009E73",
    "#0072B2",
    "#D55E00",
    "#000000",
    "#56B4E9",
    "#CC79A7",
    "#F0E442",
    "#E69F00",
  ],
});
const cats = [
  "Hospital Resources.staffed equipped ICU beds available",
  "Hospital Resources.staffed equipped ICU beds needed",
  "Hospital Resources.staffed equipped ICU beds gap",
  "Hospital.physical ICU beds available",
  "Hospital.physical ICU beds needed",
  "Hospital.physical ICU beds gap",
  "Hospital Resources.available ICU nurses",
  "Hospital Resources.occupied ICU nurses",
  "Hospital Resources.ICU nurses gap",
  "Ventilators.ventilators available",
  "Ventilators.ventilators in use",
  "Ventilators.gap in ventilators",
];

const compositeResourceData = cats.map((key) => {
  let keySplitArr = key.split(".").pop();
  return keySplitArr.includes("gap")
    ? {
        name: keySplitArr,
        data: Object.values(data[key]).map((val) => Math.round(-val)),
      }
    : {
        name: keySplitArr,
        data: Object.values(data[key]).map((val) => Math.round(val)),
      };
});

const graphs = [
  // {
  //   name: "Staffed Equipped ICU Beds",
  //   data: compositeResourceData.filter((obj) => obj.name.includes("equipped")),
  // },
  {
    name: "Physical ICU Beds",
    data: compositeResourceData.filter((obj) => obj.name.includes("physical")),
  },
  {
    name: "ICU Nurses",
    data: compositeResourceData.filter((obj) =>
      obj.name.toLowerCase().includes("nurses")
    ),
  },
  {
    name: "Ventilators",
    data: compositeResourceData.filter((obj) =>
      obj.name.includes("ventilators")
    ),
  },
];

graphs.forEach((el, idx, arr) => {
  Highcharts.chart("container" + idx, {
    chart: {
      type: "area",
      width: 220,
      height: 250,
    },
    title: {
      style: {
        display: "none",
      },
    },
    subtitle: {
      text: graphs[idx]["name"],
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    yAxis: {
      title: {
        enabled: false,
      },
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

    series: graphs[idx]["data"],

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
