fetch("../Data/scenario1.json")
  .then((response) => response.json())
  .catch((err) => console.log(err))
  .then((data) => {
    const hospitalData = data.filter((obj) =>
      obj.name.toLowerCase().includes("hospital.")
    );
    const wardData = hospitalData.filter((obj) =>
      obj.name.toLowerCase().includes("ward")
    );
    const icuData = hospitalData.filter((obj) =>
      obj.name.toLowerCase().includes("icu")
    );

    Highcharts.chart("users", {
      chart: {
        zoomType: "x",
        height: 300,
        width: 1400,
      },
      title: {
        text: "Hospital Resources",
        align: "left",
        x: 40,
      },
      legend: {
        align: "right",
        verticalAlign: "top",
        layout: "vertical",
        x: 0,
        y: 100,
      },
      subtitle: {
        text:
          document.ontouchstart === undefined
            ? "Click and drag in the plot area to zoom in"
            : "Pinch the chart to zoom in",
      },
      boost: {
        useGPUTranslations: true,
      },
      series: hospitalData,
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              yAxis: {
                labels: {
                  formatter: function () {
                    return this.value.charAt(0);
                  },
                },
              },
            },
          },
        ],
      },
    });
    Highcharts.chart("wards", {
      chart: {
        zoomType: "x",
        height: 300,
        width: 1400,
      },
      title: {
        text: "Ward Resources",
        align: "left",
        x: 40,
      },
      legend: {
        align: "right",
        verticalAlign: "top",
        layout: "vertical",
        x: 0,
        y: 100,
      },
      subtitle: {
        text:
          document.ontouchstart === undefined
            ? "Click and drag in the plot area to zoom in"
            : "Pinch the chart to zoom in",
      },
      boost: {
        useGPUTranslations: true,
      },
      series: wardData,
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              yAxis: {
                labels: {
                  formatter: function () {
                    return this.value.charAt(0);
                  },
                },
              },
            },
          },
        ],
      },
    });
    Highcharts.chart("icu", {
      chart: {
        zoomType: "x",
        height: 300,
        width: 1400,
      },
      title: {
        text: "ICU Resources",
        align: "left",
        x: 40,
      },
      legend: {
        align: "right",
        verticalAlign: "top",
        layout: "vertical",
        x: 0,
        y: 100,
      },
      subtitle: {
        text:
          document.ontouchstart === undefined
            ? "Click and drag in the plot area to zoom in"
            : "Pinch the chart to zoom in",
      },
      boost: {
        useGPUTranslations: true,
      },
      series: icuData,
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              yAxis: {
                labels: {
                  formatter: function () {
                    return this.value.charAt(0);
                  },
                },
              },
            },
          },
        ],
      },
    });
  });
