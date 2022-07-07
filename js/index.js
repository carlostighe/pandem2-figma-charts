let finalResult;
const urls = ["sweden", "luxemborg"];
Promiseall(urlsmap((url) => fetch(url + "json").then((e) => ejson()))).then(
  (data) => {
    const swedenData = data[0],
      lux = data[1];
    const covIncidence = lux;
    map(({ new_cases }) => {
      if (new_cases > 8000) new_cases = 8000;
      return [new_cases];
    });
    splice(0, 108);
    reverse();

    const covRange = covIncidencemap(([val]) => {
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

    HighchartssetOptions({
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

    Highchartschart("users", {
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
          color: HighchartsgetOptions().colors[4],
          marker: {
            fillColor: HighchartsgetOptions().colors[4],
            lineWidth: 1,
            lineColor: HighchartsgetOptions().colors[4],
          },
        },
      ],
    });
    Highchartschart("incidence", {
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
          color: HighchartsgetOptions().colors[5],
          marker: {
            fillColor: HighchartsgetOptions().colors[5],
            lineWidth: 1,
            lineColor: HighchartsgetOptions().colors[5],
          },
        },
        {
          name: "Confidence level",
          data: ranges,
          type: "arearange",
          lineWidth: 0,
          linkedTo: ":previous",
          color: HighchartsgetOptions().colors[0],
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
          color: HighchartsgetOptions().colors[2],
          marker: {
            fillColor: HighchartsgetOptions().colors[2],
            lineWidth: 1,
            lineColor: HighchartsgetOptions().colors[2],
          },
        },
        {
          name: "Covid confidence range",
          data: covRange,
          type: "arearange",
          lineWidth: 0,
          linkedTo: ":previous",
          color: HighchartsgetOptions().colors[2],
          fillOpacity: 03,
          zIndex: 0,
          marker: {
            enabled: false,
          },
        },
      ],
    });
    Highchartschart("visits", {
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
          color: HighchartsgetOptions().colors[6],
          marker: {
            fillColor: HighchartsgetOptions().colors[6],
            lineWidth: 1,
            lineColor: HighchartsgetOptions().colors[6],
          },
        },
        {
          name: "Confidence level",
          data: visitRanges,
          type: "arearange",
          lineWidth: 0,
          linkedTo: ":previous",
          color: HighchartsgetOptions().colors[6],
          fillOpacity: 03,
          zIndex: 0,
          marker: {
            enabled: false,
          },
        },
      ],
    });
  }
);

// var ranges = [
//     [1246406400000, 143, 277],
//     [1246492800000, 145, 278],
//     [1246579200000, 155, 296],
//     [1246665600000, 167, 307],
//     [1246752000000, 165, 250],
//     [1246838400000, 178, 257],
//     [1246924800000, 135, 248],
//     [1247011200000, 105, 214],
//     [1247097600000, 92, 238],
//     [1247184000000, 116, 218],
//     [1247270400000, 107, 237],
//     [1247356800000, 110, 233],
//     [1247443200000, 116, 237],
//     [1247529600000, 118, 207],
//     [1247616000000, 126, 224],
//     [1247702400000, 136, 196],
//     [1247788800000, 114, 226],
//     [1247875200000, 132, 250],
//     [1247961600000, 142, 216],
//     [1248048000000, 131, 171],
//     [1248134400000, 122, 155],
//     [1248220800000, 120, 208],
//     [1248307200000, 120, 171],
//     [1248393600000, 127, 183],
//     [1248480000000, 124, 194],
//     [1248566400000, 126, 199],
//     [1248652800000, 119, 202],
//     [1248739200000, 110, 193],
//     [1248825600000, 108, 178],
//     [1248912000000, 118, 185],
//     [1248998400000, 108, 161],
//   ],
//   averages = [
//     [1246406400000, 215],
//     [1246492800000, 221],
//     [1246579200000, 23],
//     [1246665600000, 238],
//     [1246752000000, 214],
//     [1246838400000, 213],
//     [1246924800000, 183],
//     [1247011200000, 154],
//     [1247097600000, 164],
//     [1247184000000, 177],
//     [1247270400000, 175],
//     [1247356800000, 176],
//     [1247443200000, 177],
//     [1247529600000, 168],
//     [1247616000000, 177],
//     [1247702400000, 163],
//     [1247788800000, 178],
//     [1247875200000, 181],
//     [1247961600000, 172],
//     [1248048000000, 144],
//     [1248134400000, 137],
//     [1248220800000, 157],
//     [1248307200000, 146],
//     [1248393600000, 153],
//     [1248480000000, 153],
//     [1248566400000, 158],
//     [1248652800000, 152],
//     [1248739200000, 148],
//     [1248825600000, 144],
//     [1248912000000, 15],
//     [1248998400000, 136],
//   ];
