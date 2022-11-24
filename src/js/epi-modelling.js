import data from "../Data/model_output_via_api_nov22.json";

const caseKeys = ["actual_cases_a", "actual_cases_b", "actual_cases_c"];
const admissionKeys = [
  "hospital_admissions_a",
  "hospital_admissions_b",
  "hospital_admissions_c",
];
const deathKeys = [
  "deaths_in_hospital_a",
  "deaths_in_hospital_b",
  "deaths_in_hospital_c",
];

function getData(data, filterData) {
  let tempData = data["day_results"]
    .slice(0, 220)
    .map((days) =>
      Object.fromEntries(
        Object.entries(days).filter(([key, val]) => filterData.includes(key))
      )
    );
  let res = [];
  res.push({
    name: "total",
    data: tempData.map((el) =>
      Object.values(el).reduce((a, b) => Math.round(a + b), 0)
    ),
  });
  filterData.forEach((key) => {
    res.push({
      name: key,
      data: tempData.slice(0, 170).map((el) => Math.round(el[key])),
    });
  });

  return res;
}

const graphData = {
  cases: getData(data, caseKeys),
  admissions: getData(data, admissionKeys),
  deaths: getData(data, deathKeys),
};

const stressCode = data["day_results"]
  .slice(0, 220)
  .map((days) =>
    Object.entries(days).filter(([key, val]) => key === "stress_code")
  )
  .flat(1)
  .map((el) => el[1]);

for (const graph in graphData) {
  Highcharts.chart(graph, {
    colors: ["#0072B2", "#CC79A7", "#009E73", "#D55E00"],

    chart: {
      height: 300,
      width: 300,
    },
    title: {
      text: graph,
    },
    yAxis: {},
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        grouping: false,
        pointWidth: 5,
      },
    },
    series: graphData[graph],
  });
}
Highcharts.chart("stress_code", {
  colors: ["#0072B2", "#CC79A7", "#009E73", "#D55E00"],

  chart: {
    type: "column",
    height: 300,
    width: 300,
  },
  title: {
    text: "Stress Code",
  },
  yAxis: {},
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    series: {
      grouping: true,
      pointWidth: 2,
      pointPadding: -1,
      zones: [
        {
          value: 2,
          color: "#F0E442",
        },
        {
          value: 3,
          color: "#D55E00",
        },
        {
          color: "#000000",
        },
      ],
      threshold: 0,
    },
  },
  series: [
    {
      name: "Stress Code",
      data: stressCode,
    },
  ],
});
