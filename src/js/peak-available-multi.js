import data from "../Data/outputs.json";

const patientKeys = [
  "Hospital.physical ICU beds available",
  "Hospital Resources.max available ICU nurses",
  "Ventilators.ventilators available",
  "Hospital.physical ward beds available",
  "Hospital Resources.max available nurses",
  "PPE.PPE",
];

const peakKeys = [
  "Hospital.peak demand ICU beds",
  "Hospital.peak demand ICU nurses",
  "Hospital.peak demand ventilators",
  "Hospital.peak demand ward beds",
  "Hospital.peak demand nurses",
  "Hospital.peak demand PPE",
];

const getCategories = () => {
  let cats = [];
  peakKeys.forEach((el, idx) => {
    cats.push(
      el.split(".").at(-1) + " vs " + patientKeys[idx].split(".").at(-1)
    );
  });
  return cats;
};

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
const cats = getCategories();
const resourceData = getData(data, patientKeys);
const peakData = getData(data, peakKeys);

cats.forEach((el, idx, arr) => {
  Highcharts.chart("container" + idx, {
    chart: {
      width: 330,
      height: 200,
    },
    credits: {
      enabled: false,
    },
    title: {
      style: {
        display: "none",
      },
    },
    subtitle: {
      text: cats[idx],
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

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: [peakData[idx], resourceData[idx]],

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
