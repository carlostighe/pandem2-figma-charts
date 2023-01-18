import data from "../Data/model_output_via_api_jan23.json";

const wardAbsenteeism = "ward_nurse_absenteeism_rate";
const icuAbsenteeism = "icu_nurse_absenteeism_rate";
const totalAbsenteeism = "all_nurses_absenteeism_rate";

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
  "Ward Nurse": getData(data, wardAbsenteeism),
  "ICU Nurse": getData(data, icuAbsenteeism),
  "Total Nurse": getData(data, totalAbsenteeism),
};

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
      width: 190,
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
