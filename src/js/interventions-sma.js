Highcharts.chart("interventions", {
  chart: {
    type: "xrange",
    width: 1200,
  },
  title: {
    visable: false,
  },

  xAxis: {
    type: "datetime",
  },
  yAxis: {
    title: {
      text: "",
    },
    categories: ["Mask Wearing", "Social Distancing", "Testing"],
    reversed: true,
  },

  series: [
    {
      // pointPadding: 0,
      // groupPadding: 0,
      borderColor: "gray",
      pointWidth: 40,
      data: [
        {
          x: Date.parse("2021-01-01"),
          x2: Date.parse("2021-02-29"),
          y: 0,
        },
        {
          x: Date.parse("2021-01-2"),
          x2: Date.parse("2021-02-5"),
          y: 1,
        },
        {
          x: Date.parse("2021-01-05"),
          x2: Date.parse("2021-01-19"),
          y: 2,
        },
        {
          x: Date.parse("2021-00-01"),
          x2: Date.parse("2021-00-20"),
          y: 1,
        },
        {
          x: Date.parse("2021-02-01"),
          x2: Date.parse("2021-02-23"),
          y: 2,
        },
      ],
      dataLabels: {
        enabled: true,
        inside: true,
        formatter: function () {
          return this.series.yAxis.categories[this.point.index];
        },
      },
    },
  ],
});
