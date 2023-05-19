import data from "../Data/cases-real-data.json";

console.log("data ", data);
const confirmedCases = {
  name: "Confirmed Cases",
  type: "spline",
  data: data.data.map((cases) => [Date.parse(cases.date), cases.total]),
};
console.log("confirmedCases ", confirmedCases);

const arrayOfVals = confirmedCases.data.map((data) => data[1]);
const graphMax = Math.max(...arrayOfVals);
const add = graphMax / 10;
const graphMin = Math.min(...arrayOfVals);
const graphMid = (graphMax - graphMin) / 2;

const casesData = [
  {
    name: "mask wearing",
    type: "xrange",
    pointWidth: 20,
    data: [
      {
        color: "#ffcf94",
        x: Date.parse("2021-01-01"),
        x2: Date.parse("2021-03-29"),
        y: graphMax + add,
      },
    ],
  },
  {
    name: "Social Distancing",
    type: "xrange",
    pointWidth: 20,

    data: [
      {
        color: "#ffc7db",
        x: Date.parse("2021-01-01"),
        x2: Date.parse("2021-02-05"),
        y: graphMid + add,
      },
      {
        color: "#ffc7db",
        x: Date.parse("2021-03-01"),
        x2: Date.parse("2021-04-20"),
        y: graphMid + add,
      },
    ],
  },
  {
    name: "Testing",
    type: "xrange",
    pointWidth: 20,
    data: [
      {
        color: "#a8e5ff",
        x: Date.parse("2021-01-05"),
        x2: Date.parse("2021-01-19"),
        y: graphMin,
      },
      {
        color: "#a8e5ff",
        x: Date.parse("2021-02-01"),
        x2: Date.parse("2021-02-23"),
        y: graphMin,
      },
    ],
  },
  confirmedCases,
];

Highcharts.chart("interventions", {
  title: {
    text: "Interventions alongside line graph for SMA demo",
  },
  chart: {
    type: "xrange",
    width: 1400,
    height: 250,
  },

  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
  },

  xAxis: {
    type: "datetime",
    // This is from the Highcharts Stock - Stock license required
    ordinal: true,
    labels: {
      // Format the date
      formatter: function () {
        this.value;
        console.log("this.value; ", this.value);
        return Highcharts.dateFormat("%Y-%m-%d", this.value);
      },
    },
  },
  plotOptions: {
    spline: {
      marker: {
        enable: false,
      },
    },
    xrange: {
      color: ["#ffcf94", "#a8e5ff", "#ffc7db"],
    },
  },
  series: casesData,
});
