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
    data: data.day_results.map((days) => Math.round(days[key])),
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

/**
 * In order to synchronize tooltips and crosshairs, override the
 * built-in events with handlers defined on the parent element.
 */
// const highlightSeries = (eventType) => {
//   let chart, point, i, event;
//   for (i = 0; i < Highcharts.charts.length; i++) {
//     chart = Highcharts.charts[i];
//     event = chart.pointer.normalize(eventType);
//     for (let j = 0; j < chart.series.length; ++j) {
//       point = chart.series[j].searchPoint(event, true);
//     }
//     if (!point) return;

//     if (eventType.type === "mousemove") {
//       point.onMouseOver();
//       chart.xAxis[0].drawCrosshair(event, point);
//     } else {
//       point.onMouseOut();
//       chart.tooltip.hide(point);
//       chart.xAxis[0].hideCrosshair();
//     }
//   }
// };

// ["mousemove", "touchmove", "touchstart"].forEach((eventType) => {
//   // for (const graph in scenario1Data) {
//   document.getElementById("cases").addEventListener(eventType, highlightSeries);
//   // }
// });

// // Override the reset function, we don't need to hide the tooltips and crosshairs.
// Highcharts.Pointer.prototype.reset = () => undefined;

// // Highlight a point by showing tooltip, setting hover state and draw crosshair
// Highcharts.Point.prototype.highlight = function (event) {
//   event = this.series.chart.pointer.normalize(event);
//   this.onMouseOver(); // Show the hover marker
//   this.series.chart.tooltip.refresh(this); // Show the tooltip
//   this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
// };

// Synchronize zooming through the setExtremes event handler.
// const syncExtremes = (e) => {
//   if (e.trigger !== "syncExtremes") {
//     Highcharts.each(Highcharts.charts, function (chart) {
//       if (chart !== this.chart) {
//         if (chart.xAxis[0].setExtremes) {
//           chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
//             trigger: "syncExtremes",
//           });
//         }
//       }
//     });
//   }
// };

// Get the data. The contents of the data file can be viewed at
for (const graph in scenario1Data) {
  // var chartDiv = document.createElement("div");
  // chartDiv.className = "chart";
  // document.getElementById("sync-heat").appendChild(chartDiv);

  Highcharts.chart(graph, {
    // chart: {
    //   marginLeft: 40, // Keep all charts left aligned
    //   spacingTop: 20,
    //   spacingBottom: 20,
    // },
    chart: {
      height: 200,
      // width: 360,
    },
    title: {
      text: graph,
      align: "left",
      margin: 0,
      x: 30,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      crosshair: true,
      events: {
        setExtremes: syncExtremes,
      },
      labels: {
        format: "day {value}",
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      positioner: function () {
        return {
          // right aligned
          x: this.chart.chartWidth - this.label.width,
          y: 10, // align to title
        };
      },
      borderWidth: 0,
      backgroundColor: "none",
      pointFormat: "{point.y}",
      headerFormat: "",
      shadow: false,
      style: {
        fontSize: "18px",
      },
      valueDecimals: 0,
    },
    plotOptions: {
      series: {
        grouping: false,
        pointWidth: 5,
      },
    },
    series: scenario1Data[graph],
  });
}
