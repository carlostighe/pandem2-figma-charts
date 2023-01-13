import data from "../Data/model_output_via_api_jan23.json";

const wardDemand = "pandemic_ward_demand_factor";
const icuDemand = "pandemic_icu_demand_factor";

function getData(data, filterData) {
  let tempData = data["day_results"]
    .slice(0, 220)
    .map((days) =>
      Object.fromEntries(
        Object.entries(days).filter(([key, val]) => filterData.includes(key))
      )
    );
  return {
    name: filterData,
    data: tempData.slice(0, 170).map((el) => Math.fround(el[filterData])),
  };
}

const graphData = {
  wardDemand: getData(data, wardDemand),
  icuDemand: getData(data, icuDemand),
};

const peakWardDemand = Math.max(...graphData.wardDemand.data);
console.log("peakWardDemand ", peakWardDemand);

const peakICUDemand = Math.max(...graphData.icuDemand.data);
console.log("peakICUDemand ", peakICUDemand);

const stressCode = data["day_results"]
  .slice(0, 220)
  .map((days) =>
    Object.entries(days).filter(([key, val]) => key === "stress_code")
  )
  .flat(1)
  .map((el) => el[1]);

for (const graph in graphData) {
  console.log("graph ", graph);
  console.log("graphData ", graphData);
  console.log("graphData[graph] ", graphData[graph]);
  Highcharts.chart(graph, {
    colors: ["#0072B2", "#CC79A7", "#009E73", "#D55E00"],

    chart: {
      height: 200,
      width: 200,
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
    series: [
      {
        name: graph,
        data: graphData[graph].data,
      },
    ],
  });
}
Highcharts.chart("stress_code", {
  colors: ["#0072B2", "#CC79A7", "#009E73", "#D55E00"],

  chart: {
    type: "column",
    height: 200,
    width: 200,
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
