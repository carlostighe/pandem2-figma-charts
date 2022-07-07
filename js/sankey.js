Highcharts.chart("container", {
  title: {
    text: "Flight Origins: Romania",
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
        ["Romania", "Europe", 7000],
        ["Europe", "Germany", 2000],
        ["Germany", "Baden-Württemberg", 150],
        ["Germany", "Bayern", 50],
        ["Germany", "Berlin", 230],
        ["Germany", "Brandenburg", 350],
        ["Germany", "Bremen", 500],
        ["Germany", "Hamburg", 50],
        ["Germany", "Hessen", 50],
        ["Germany", "Niedersachsen", 120],
        ["Germany", "Mecklenburg-Vorpommern", 50],
        ["Germany", "Nordrhein-Westfalen", 50],
        ["Germany", "Rheinland-Pfalz", 50],
        ["Germany", "Saarland", 50],
        ["Germany", "Sachsen", 50],
        ["Germany", "Sachsen-Anhalt", 50],
        ["Germany", "Schleswig-Holstein", 98],
        ["Germany", "Thüringen", 102],
      ],
      type: "sankey",
      name: "Flights - Origins",
    },
  ],
});
