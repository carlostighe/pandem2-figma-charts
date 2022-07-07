const regions = ["NL13", "NL21", "NL22"];
fetch("../Data/model_03.json")
  .then((response) => response.json())
  .catch((err) => console.log(err))
  .then((data) => {
    console.log("data ", data);
    console.log("data[0].sim_results, ", data[0].sim_results);
    const randomisedData = data[0].sim_results.map((val) => {
      if (val.value === 0) val.value = Math.round(Math.random() * 99);
      return val;
    });
    const adultData = randomisedData.filter((val) => val.Age === "Adult");
    const youngData = randomisedData.filter((val) => val.Age === "Young");
    console.log("adultData ", adultData);

    // console.log("nl13Data ", nl13Data);
    // const adultData = data[0].sim_results.map((val) => {
    //   return { x: val.Days, y: val.value, name: "day " + val.Days };
    // });
    regions.forEach((region) => {
      Highcharts.chart(region, {
        chart: {
          height: 26 + "%",
          width: 1200,
          marginTop: 0,
        },
        title: {
          text: "Reported Cases: " + region,
          align: "left",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: {
            text: null,
          },
        },
        tooltip: {
          crosshairs: true,
          shared: true,
        },
        series: [
          {
            name: "Adult Data " + region,
            data: adultData
              .filter((val) => val.Region === region)
              .map(({ Days, value }) => ({
                name: "day " + Days,
                x: Days,
                y: value,
              })),
            zIndex: 1,
            color: Highcharts.getOptions().colors[0],
          },
          {
            name: "Young Data " + region,
            data: youngData
              .filter((val) => val.Region === region)
              .map(({ Days, value }) => ({
                name: "day " + Days,
                x: Days,
                y: value,
              })),
            zIndex: 1,
            color: Highcharts.getOptions().colors[1],
          },
        ],
      });
    });
  });
