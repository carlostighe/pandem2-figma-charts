import scenario1 from "../Data/modellingScenario1.json";
import scenario2 from "../Data/modellingScenario2.json";
import scenario3 from "../Data/modellingScenario3.json";

const caseKeys = ["d", "a", "b", "c"].map((letter) => "actual_cases_" + letter);
const admissionKeys = ["a", "b", "c"].map((l) => "hospital_admissions_" + l);
const deathKeys = ["a", "b", "c"].map((l) => "deaths_in_hospital_" + l);
const attackRateKeys = ["d", "a", "b", "c"].map((l) => "attack_rate_" + l);

const getData = (data, filterData) =>
  filterData.map((key) => ({
    name: key,
    data: data.day_results.map((days) => Math.fround(days[key])),
  }));

const getScenarioData = (scenario) => {
  return {
    cases: getData(scenario, caseKeys),
    admissions: getData(scenario1, admissionKeys),
    deaths: getData(scenario1, deathKeys),
    attackRate: getData(scenario1, attackRateKeys),
  };
};

const scenario1Data = getScenarioData(scenario1);
const scenario2Data = getScenarioData(scenario2);
const scenario3Data = getScenarioData(scenario3);

Highcharts.setOptions({
  colors: ["#0072B2", "#CC79A7", "#009E73", "#D55E00"],
  chart: {
    width: 400,
    height: 200,
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  yAxis: {
    title: {
      text: null,
    },
  },
  plotOptions: {
    series: {
      grouping: false,
      pointWidth: 5,
    },
  },
});

[scenario1Data, scenario2Data, scenario3Data].map((data) => {
  for (const graph in data) {
    var chartDiv = document.createElement("div");
    chartDiv.className = "chart";
    document.getElementById(graph).appendChild(chartDiv);
    Highcharts.chart(chartDiv, {
      title: {
        text: graph,
        align: "left",
        margin: 0,
        x: 30,
      },
      series: scenario1Data[graph],
    });
  }
});
