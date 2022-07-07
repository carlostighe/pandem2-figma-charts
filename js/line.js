Highcharts.chart("container", {
  title: {
    text: "Flight Origin Locations",
  },

  yAxis: {
    title: {
      text: "Number",
    },
  },

  plotOptions: {},

  series: [
    {
      name: "Germany",
      data: [1000, 1200, 800, 2000],
    },
    {
      name: "Asia",
      data: [100, 250, 250, 400],
    },
    {
      name: "Americas",
      data: [80, 200, 320, 400],
    },
    {
      name: "Africa",
      data: [200, 250, 280, 270],
    },
    {
      name: "Oceania",
      data: [50, 80, 70, 300],
    },
  ],
});
