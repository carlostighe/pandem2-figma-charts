let finalResult;
const urls = ["sweden", "luxemborg"];
Promise.all(
  urls.map((url) => fetch("./Data/" + url + ".json").then((e) => e.json()))
).then((data) => {
  console.log("data ", data);
  const swedenData = data[0],
    lux = data[1];
  const covIncidence = lux
    .map(({ new_cases }) => {
      if (new_cases > 8000) new_cases = 8000;
      return [new_cases];
    })
    .splice(0, 108)
    .reverse();

  const covRange = covIncidence.map(([val]) => {
    return [confidence(val)].flat();
  });

  const users = swedenData.map(({ year_week, tests_done }) => [
    year_week,
    tests_done,
  ]);
  const incidence = swedenData.map(({ year_week, new_cases }) => {
    new_cases = new_cases / 10;
    if (new_cases > 10000) new_cases = 10000;
    return [year_week, Math.round(new_cases)];
  });

  const visits = swedenData.map(({ year_week, testing_rate }) => {
    return [year_week, Math.round(((testing_rate / 100) * 10) / 10)];
  });

  function percent(initial) {
    return (initial * (Math.round(Math.random() * 99) + 1)) / 100;
  }

  function confidence(val) {
    if (val > 10000) val = 10000;
    return [Math.round(val - percent(val)), Math.round(val + percent(val))];
  }
  const ranges = swedenData.map(({ year_week, new_cases }) => {
    return [year_week, confidence(new_cases / 10)].flat();
  });

  const visitRanges = swedenData.map(({ year_week, testing_rate }) => {
    return [
      year_week,
      confidence(Math.round(((testing_rate / 100) * 10) / 10)),
    ].flat();
  });

  Highcharts.setOptions({
    colors: [
      "#E69F00",
      "#56B4E9",
      "#009E73",
      "#F0E442",
      "#0072B2",
      "#D55E00",
      "#CC79A7",
      "#000000",
    ],
  });

  Highcharts.chart("users", {
    chart: {
      height: 26 + "%",
      width: 1200,
    },
    title: {
      text: "Active Users (weekly)",
      align: "left",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
    },
    series: [
      {
        name: "Weekly Active Users",
        data: users,
        zIndex: 1,
        color: Highcharts.getOptions().colors[4],
        marker: {
          fillColor: Highcharts.getOptions().colors[4],
          lineWidth: 1,
          lineColor: Highcharts.getOptions().colors[4],
        },
      },
    ],
  });
  Highcharts.chart("incidence", {
    chart: {
      height: 26 + "%",
      width: 1200,
      marginTop: 0,
    },
    title: {
      text: "Incidence & Covid (ILI / per 1000)",
      align: "left",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
    },
    series: [
      {
        name: "Incidence (ILI / per 1000)",
        data: incidence,
        zIndex: 1,
        color: Highcharts.getOptions().colors[5],
        marker: {
          fillColor: Highcharts.getOptions().colors[5],
          lineWidth: 1,
          lineColor: Highcharts.getOptions().colors[5],
        },
      },
      {
        name: "Confidence level",
        data: ranges,
        type: "arearange",
        lineWidth: 0,
        linkedTo: ":previous",
        color: Highcharts.getOptions().colors[0],
        fillOpacity: 03,
        zIndex: 0,
        marker: {
          enabled: false,
        },
      },
      {
        name: "Covid (ILI / per 1000)",
        data: covIncidence,
        zIndex: 1,
        color: Highcharts.getOptions().colors[2],
        marker: {
          fillColor: Highcharts.getOptions().colors[2],
          lineWidth: 1,
          lineColor: Highcharts.getOptions().colors[2],
        },
      },
      {
        name: "Covid confidence range",
        data: covRange,
        type: "arearange",
        lineWidth: 0,
        linkedTo: ":previous",
        color: Highcharts.getOptions().colors[2],
        fillOpacity: 03,
        zIndex: 0,
        marker: {
          enabled: false,
        },
      },
    ],
  });
  Highcharts.chart("visits", {
    chart: {
      height: 26 + "%",
      width: 1200,
    },
    title: {
      text: "Visits Cumulative (ILI / per 100)",
      align: "left",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
    },
    height: "50%",
    series: [
      {
        name: "Visits Cumulative (ILI / per 100)",
        data: visits,
        zIndex: 1,
        color: Highcharts.getOptions().colors[6],
        marker: {
          fillColor: Highcharts.getOptions().colors[6],
          lineWidth: 1,
          lineColor: Highcharts.getOptions().colors[6],
        },
      },
      {
        name: "Confidence level",
        data: visitRanges,
        type: "arearange",
        lineWidth: 0,
        linkedTo: ":previous",
        color: Highcharts.getOptions().colors[6],
        fillOpacity: 03,
        zIndex: 0,
        marker: {
          enabled: false,
        },
      },
    ],
  });
});
