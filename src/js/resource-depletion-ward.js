import data from "../Data/latest_outputs.json";

const cats = [
  "Hospital Resources.staffed ward beds available",
  "Hospital Resources.staffed ward beds needed",
  "Hospital Resources.staffed ward beds gap",

  "Hospital.physical ward beds available",
  "Hospital.physical ward beds needed",
  "Hospital.physical ward beds gap",

  "Hospital Resources.available nurses",
  "Hospital Resources.occupied nurses",
  "Hospital Resources.nurses gap",
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
  //   name: "Staffed Ward Beds Available",
  //   data: compositeResourceData.filter((obj) => obj.name.includes("staffed")),
  // },
  {
    name: "Physical Ward Beds",
    data: compositeResourceData.filter((obj) => obj.name.includes("physical")),
  },
  {
    name: "Ward Nurses",
    data: compositeResourceData.filter((obj) =>
      obj.name.toLowerCase().includes("nurses")
    ),
  },
];

graphs.forEach((el, idx, arr) => {
  Highcharts.chart("container" + idx, {
    chart: {
      type: "area",
      width: 330,
      height: 400,
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
