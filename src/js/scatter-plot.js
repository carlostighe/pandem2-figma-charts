import data1 from "../Data/scatter-plot1.json";
import data2 from "../Data/scatter-plot2.json";

Highcharts.chart("scatter-plot", {
  chart: {
    type: "scatter",
    zoomType: "xy",
  },
  title: {
    text: "Scenario 1 vs Scenario 2",
  },
  subtitle: {
    text: "Source: Heinz  2003",
  },
  xAxis: {
    title: {
      enabled: true,
      text: "Scenario 2",
    },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true,
  },
  yAxis: {
    title: {
      text: "Scenario",
    },
  },
  legend: {
    layout: "vertical",
    align: "left",
    verticalAlign: "top",
    x: 100,
    y: 70,
    floating: true,
    backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
    borderWidth: 1,
  },
  plotOptions: {
    scatter: {
      marker: {
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: "rgb(100,100,100)",
          },
        },
      },
      states: {
        hover: {
          marker: {
            enabled: false,
          },
        },
      },
      tooltip: {
        headerFormat: "<b>{point.x}</b><br>",
        pointFormat: "{point.x} x, {point.y} y",
      },
    },
  },
  series: [
    {
      name: "Scenario 1",
      color: "rgba(255, 0, 0)",
      data: data1,
    },
    {
      name: "Scenario 2",
      color: "rgba(0, 83, 200, .5)",
      data: data2,
    },
  ],
});
