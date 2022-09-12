import data from "../Data/latest_outputs.json";

const available = [
  "Hospital Resources.ICU Beds",
  "Hospital Resources.max available ICU nurses",
  "Hospital Resources.Beds",
  "Hospital Resources.max available nurses",
  "Ventilators.ventilators in stock",
];

const peaks = [
  "Hospital.peak demand ICU beds",
  "Hospital.peak demand ICU nurses",
  "Hospital.peak demand ward beds",
  "Hospital.peak demand nurses",
  "Hospital.peak demand ventilators",
];

const proportions = {
  "Hospital_resource_params.proportion_of_beds_available_for_pandemic": 0.5,
  "Hospital_resource_params.proportion_of_ICU_beds_available_for_pandemic": 0.5,
  "Hospital_resource_params.proportion_of_nurses_available_for_pandemic": 0.5,
  "Hospital_resource_params.proportion_of_ICU_nurses_available_for_pandemic": 0.5,
};

const getMaxData = (key) => {
  let tempData = Object.values(data[key]).map((val) => Math.round(val));
  return [key.split(".").pop(), Math.max.apply(Math, tempData)];
};
// get the total number of resources - (max available / proportion available for pandemic)
const getAllResources = (resData, proportionVals) => {
  return [
    [
      "ICU Beds",
      resData[0][1] /
        proportionVals[
          "Hospital_resource_params.proportion_of_ICU_beds_available_for_pandemic"
        ],
    ],
    [
      "max available ICU nurses",
      resData[1][1] /
        proportionVals[
          "Hospital_resource_params.proportion_of_ICU_nurses_available_for_pandemic"
        ],
    ],
    [
      "Beds",
      resData[2][1] /
        proportionVals[
          "Hospital_resource_params.proportion_of_beds_available_for_pandemic"
        ],
    ],
    [
      "max available nurses",
      resData[3][1] /
        proportionVals[
          "Hospital_resource_params.proportion_of_nurses_available_for_pandemic"
        ],
    ],
  ];
};

const peakData = peaks.map((key) => getMaxData(key));
console.log("peakData ", peakData);
const resourceData = available.map((key) => getMaxData(key));
console.log("resourceData ", resourceData);
const allResources = getAllResources(resourceData, proportions);
console.log("allResources ", allResources);

Highcharts.chart("container0", {
  chart: {
    type: "column",
  },
  title: {
    text: "Peak Values vs Max Resources Available",
    align: "left",
  },
  subtitle: {
    text: "Comparing total resources available, resources made available for the pandemic, and peak scenario values",
    align: "left",
  },
  plotOptions: {
    series: {
      grouping: false,
      borderWidth: 0,
    },
    column: {
      groupPadding: 0.3,
      borderWidth: 1,
    },
  },
  legend: {
    enabled: true,
  },
  tooltip: {
    shared: true,
    headerFormat:
      '<span style="font-size: 15px">{point.point.name}</span><br/>',
    pointFormat:
      '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} </b><br/>',
  },
  xAxis: {
    type: "category",
    accessibility: {
      description: "Resources",
    },
  },
  series: [
    {
      color: "rgb(158, 159, 163)",
      pointPlacement: -0.2,
      // linkedTo: "main",
      data: allResources,
      name: "Total Available",
      dataSorting: {
        enabled: true,
        matchByName: true,
      },
    },
    {
      name: "Proportion made available for Pandemic",
      id: "main",
      dataSorting: {
        enabled: true,
        matchByName: true,
      },
      dataLabels: [
        {
          enabled: true,
          inside: true,
          style: {
            fontSize: "14px",
          },
        },
      ],
      data: resourceData,
    },
    {
      color: "rgb(160, 0, 0)",
      name: "Peak needs during scenario",
      id: "peak",
      pointPlacement: 0.33,
      // linkedTo: "main",
      dataSorting: {
        enabled: true,
        matchByName: true,
      },
      dataLabels: [
        {
          enabled: true,
          inside: true,
          style: {
            fontSize: "12px",
          },
        },
      ],
      data: peakData,
    },
  ],
  exporting: {
    allowHTML: true,
  },
  credits: {
    enabled: false,
  },
});
