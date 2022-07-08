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
  lineSeries = [];
  Object.keys(data[0]).forEach((elKey) => {
    newObj = { name: elKey };
    dataArray = data.map((el) => Math.round(el[elKey]));
    newObj["data"] = dataArray;
    lineSeries.push(newObj);
  });
  return lineSeries;
};

fetch("../Data/test_model_output.json")
  .then((response) => response.json())
  .catch((err) => {
    console.log(err);
    Highcharts.chart("error", {
      title: {
        text: error.text,
        align: "left",
        x: 40,
      },
    });
  })
  .then((data) => {
    hospitalData = filterDataByKey(data, "hospital.");
    resourceData = filterDataByKey(data, "resources");
    resourceNurses = filterDataByKey(resourceData, "nurses");
    wardData = filterDataByKey(hospitalData, "ward");
    // hospitalResources = filterDataByKey(data, "Hospital ");
    // hospitalSeriesData = hospitalData.map((el) => {});

    lineSeries = [];
    allData = createLineSeriesData(hospitalData);
    wardLineSeries = createLineSeriesData(wardData);
    resourceLineSeries = createLineSeriesData(resourceData);
    console.log("resourceLineSeries ", resourceLineSeries);
    resourceNursesLineSeries = createLineSeriesData(resourceNurses);
    console.log("resourceNursesLineSeries ", resourceNursesLineSeries);

    // let reformattedArray = hospitalData.map((obj) => {
    //   console.log("obj ", obj["Hospital.hospital admissions"]);
    //   return obj["Hospital.hospital admissions"];
    // });
    // console.log("reformattedArray ", reformattedArray);

    chartOptions = {};

    Highcharts.chart("hospital", {
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
  });
