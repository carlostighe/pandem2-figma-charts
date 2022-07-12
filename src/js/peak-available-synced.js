import data from "../Data/outputs.json";

const patientKeys = [
  "Hospital.physical ICU beds available",
  "Hospital Resources.max available ICU nurses",
  "Ventilators.ventilators available",
  "Hospital.physical ward beds available",
  "Hospital Resources.max available nurses",
  "PPE.PPE",
];

const peakKeys = [
  "Hospital.peak demand ICU beds",
  "Hospital.peak demand ICU nurses",
  "Hospital.peak demand ventilators",
  "Hospital.peak demand ward beds",
  "Hospital.peak demand nurses",
  "Hospital.peak demand PPE",
];

const getCategories = () => {
  let cats = [];
  peakKeys.forEach((el, idx) => {
    cats.push(
      el.split(".").at(-1) + " vs " + patientKeys[idx].split(".").at(-1)
    );
  });
  return cats;
};

const getData = (data, keys) => {
  const returnData = [];
  const dataObj = Object.fromEntries(keys.map((k) => [k, data[k]]));
  for (let [k, v] of Object.entries(dataObj)) {
    let newObj = {};
    newObj["name"] = k;
    newObj["data"] = Object.values(v).map((val) => Math.round(val));
    returnData.push(newObj);
  }
  return returnData;
};

/**
 * Synchronize zooming through the setExtremes event handler.
 */
function syncExtremes(e) {
  var thisChart = this.chart;

  if (e.trigger !== "syncExtremes") {
    // Prevent feedback loop
    Highcharts.each(Highcharts.charts, function (chart) {
      if (chart !== thisChart) {
        if (chart.xAxis[0].setExtremes) {
          // It is null while updating
          chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
            trigger: "syncExtremes",
          });
        }
      }
    });
  }
}

/**
 * In order to synchronize tooltips and crosshairs, override the
 * built-in events with handlers defined on the parent element.
 */
["mousemove", "touchmove", "touchstart"].forEach(function (eventType) {
  document.getElementById("synced").addEventListener(eventType, function (e) {
    var chart, point, i, event;

    for (i = 0; i < Highcharts.charts.length; i = i + 1) {
      chart = Highcharts.charts[i];
      // Find coordinates within the chart
      event = chart.pointer.normalize(e);
      // Get the hovered point
      point = chart.series[0].searchPoint(event, true);

      if (point) {
        point.highlight(e);
      }
    }
  });
});

/**
 * Override the reset function, we don't need to hide the tooltips and
 * crosshairs.
 */
Highcharts.Pointer.prototype.reset = function () {
  return undefined;
};

/**
 * Highlight a point by showing tooltip, setting hover state and draw crosshair
 */
Highcharts.Point.prototype.highlight = function (event) {
  event = this.series.chart.pointer.normalize(event);
  this.onMouseOver(); // Show the hover marker
  this.series.chart.tooltip.refresh(this); // Show the tooltip
  this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};

// FILTER THE DATA BY THE KEYS ABOVE AND THEN GET DATA FOR THE DAY (example day 80)
const cats = getCategories();
const resourceData = getData(data, patientKeys);
const peakData = getData(data, peakKeys);

cats.forEach((el, idx, arr) => {
  Highcharts.chart("synced" + idx, {
    chart: {
      marginLeft: 40, // Keep all charts left aligned
      spacingTop: 20,
      spacingBottom: 20,
      width: 1400,
      height: 200,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      crosshair: true,
      events: {
        setExtremes: syncExtremes,
      },
      labels: {
        format: "{value} km",
      },
      accessibility: {
        description: "Kilometers",
        rangeDescription: "0km to 6.5km",
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      positioner: function () {
        return {
          // right aligned
          x: this.chart.chartWidth - this.label.width,
          y: 10, // align to title
        };
      },
      borderWidth: 0,
      backgroundColor: "none",
      pointFormat: "{point.y}",
      headerFormat: "",
      shadow: false,
      style: {
        fontSize: "18px",
      },
    },
    series: [peakData[idx], resourceData[idx]],
  });
});
