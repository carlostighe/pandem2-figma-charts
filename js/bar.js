Highcharts.chart("container", {
  chart: {
    type: "bar",
  },
  title: {
    text: "Flight Origins",
  },
  xAxis: {
    categories: [
      "Baden-Württemberg",
      "Bayern",
      "Berlin",
      "Brandenburg",
      "Bremen",
      "Hamburg",
      "Hessen",
      "Niedersachsen",
      "Mecklenburg-Vorpommern",
      "Nordrhein-Westfalen",
      "Rheinland-Pfalz",
      "Saarland",
      "Sachsen",
      "Sachsen-Anhalt",
      "Schleswig-Holstein",
      "Thüringen",
    ],
    title: {
      text: null,
    },
  },
  yAxis: {
    min: 0,
    labels: {
      overflow: "justify",
    },
  },
  tooltip: {
    valueSuffix: " millions",
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true,
      },
    },
  },
  series: [
    {
      data: [
        150, 50, 230, 350, 500, 50, 50, 120, 50, 50, 50, 50, 50, 50, 98, 10,
      ],
    },
  ],
});
