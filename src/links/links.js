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
  { url: "cases-heatmap.html", link: "cases-heatmap" },
  { url: "contact-tracing.html", link: "contact-tracing" },
];
const chartLinks = document.createElement("div");
chartLinks.className = "links";
links.forEach((entry) => {
  const element = document.createElement("a");
  element.className = "button";
  element.innerHTML = entry.link;
  element.setAttribute("type", "button");
  element.setAttribute("href", entry.url);
  chartLinks.appendChild(element);
});
document.getElementById("linksList").appendChild(chartLinks);
