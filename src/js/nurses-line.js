import data from "../Data/test_model_output.json";

const filterDataByKey = (data, string) => {
  // RETURNS AN OBJECT FILTERED BY SUBSTRING
  return data.map((el) => {
    const newObj = {
      // Days: el["Days"],
      // "PANDEM2 Outputs.confirmed cases": el["PANDEM2 Outputs.confirmed cases"],
    };
    return Object.keys(el)
      .filter((key) => key.toLowerCase().includes(string))
      .reduce((obj, key) => {
        return Object.assign(newObj, {
          [key]: el[key],
        });
      });
  });
};

const createLineSeriesData = (data) => {
  let lineSeries = [];
  Object.keys(data[0]).forEach((elKey) => {
    let newObj = { name: elKey };
    let dataArray = data.map((el) => Math.round(el[elKey]));
    newObj["data"] = dataArray;
    lineSeries.push(newObj);
  });
  return lineSeries;
};

// const hospitalData = filterDataByKey(data, "hospital.");
const resourceData = filterDataByKey(data, "resources");
const resourceNurses = filterDataByKey(resourceData, "nurses");
// const wardData = filterDataByKey(hospitalData, "ward");

// const lineSeries = [];
// const allData = createLineSeriesData(hospitalData);
// const wardLineSeries = createLineSeriesData(wardData);
// const resourceLineSeries = createLineSeriesData(resourceData);
const resourceNursesLineSeries = createLineSeriesData(resourceNurses);

Highcharts.chart("hospital", {
  chart: {
    // width: 1400,
    height: 400,
  },
  yAxis: {
    title: {
      text: "Number of Employees",
    },
  },

  xAxis: {
    accessibility: {
      rangeDescription: "Range: 2010 to 2017",
    },
  },

  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: 2010,
    },
  },
  series: resourceNursesLineSeries,
});
