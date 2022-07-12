Highcharts.chart("container", {
  title: {
    text: "Flights Where are they coming from",
  },

  accessibility: {
    point: {
      valueDescriptionFormat:
        "{index}. From {point.from} to {point.to}: {point.weight}.",
    },
  },

  series: [
    {
      keys: ["from", "to", "weight"],
      data: [
        ["Romania", "Germany", 2000],
        ["Romania", "Austria", 2500],
        ["Romania", "China", 6000],
        ["Romania", "Canada", 500],
        ["Romania", "Egypt", 500],
        ["Romania", "Australia", 410],
        ["Romania", "Poland", 1200],
        ["Romania", "Greece", 500],
        ["Romania", "Japan", 500],
        ["Romania", "USA", 500],
      ],
      type: "dependencywheel",
      name: "Flights - Origin to Destination",
      dataLabels: {
        color: "#333",
        textPath: {
          enabled: true,
          attributes: {
            dy: 5,
            rotation: 90,
          },
        },
        distance: 15,
      },
      size: "95%",
    },
  ],
});
