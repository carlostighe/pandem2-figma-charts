const links = [
  { url: "index.html", link: "home" },
  {
    url: "modelling-heatmap.html",
    link: "modelling-heatmap",
  },
  { url: "nurses-bar.html", link: "nurses-bar" },
  { url: "nurses-area.html", link: "nurses-area" },
  { url: "nurses-line.html", link: "nurses-line" },
  { url: "patients-sankey.html", link: "patients-sankey" },
  { url: "peak-available-radar.html", link: "peak-available-radar" },
  { url: "peak-available-multi.html", link: "peak-available-multi" },
  { url: "peak-available-synced.html", link: "peak-available-synced" },
  { url: "resource-heatmap.html", link: "resource-heatmap" },
  { url: "resource-line.html", link: "resource-line" },
  { url: "scatter-plot.html", link: "scatter-plot" },
  { url: "explore.html", link: "explore" },
  { url: "resource-depletion.html", link: "resource-depletion" },
  {
    url: "resource-depletion-ward.html",
    link: "resource-depletion-ward",
  },
  { url: "peaks.html", link: "peaks" },
  { url: "peak-column-comparison.html", link: "peak-col-comparison" },
  { url: "epi-modelling.html", link: "epi-modelling" },
  { url: "epi2.html", link: "epi2" },
  { url: "stress-indicators.html", link: "stress-indicators" },
  { url: "absenteeism.html", link: "absenteeism" },
  { url: "cases-heatmap.html", link: "cases-heatmap" },
  { url: "contact-tracing.html", link: "contact-tracing" },
  { url: "sync-heat.html", link: "sync-heat" },
  { url: "interventions-line.html", link: "interventions-line" },
  { url: "interventions-sma.html", link: "interventions-sma" },
  { url: "sma-graphs.html", link: "sma-graphs" },
  { url: "sma-graphs-7-day-rolling.html", link: "sma-graphs-7-day-rolling" },
];
const chartLinks = document.createElement("div");
chartLinks.className = "links";
links.forEach((entry) => {
  const row = document.createElement("div");
  row.className = "row";
  const element = document.createElement("a");
  element.className = "button";
  element.innerHTML = entry.link;
  element.setAttribute("type", "button");
  element.setAttribute("href", entry.url);
  row.appendChild(element);
  chartLinks.appendChild(row);
});
document.getElementById("linksList").appendChild(chartLinks);
