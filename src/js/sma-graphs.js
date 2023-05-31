import emotionData from "../Data/sma-emotion.json";
import sentimentData from "../Data/sma-sentiment.json";
import volumeData from "../Data/sma-volume.json";

const sentimentColors = {
  neutral: "#0072B2",
  positive: "#009E73",
  negative: "#D55E00",
};
const emotionColors = {
  disgust: "#000000",
  fear: "#E69F00",
  sadness: "#56B4E9",
  trust: "#009E73",
  anticipation: "#F0E442",
  surprise: "#0072B2",
  anger: "#D55E00",
  joy: "#CC79A7",
};

const topics = [
  {
    name: "coronavirus",
    _id: "63e615d022023f3fc7003726",
  },
  {
    name: "pandemic",
    _id: "63e6160b22023f3fc7026355",
  },
  {
    name: "covid case",
    _id: "63e6164222023f3fc704e4f2",
  },
  {
    name: "vaccine",
    _id: "63e6165822023f3fc705f14a",
  },

  {
    name: "covid",
    _id: "63e6170e22023f3fc70e5619",
  },
];
const getNameById = (id) => {
  const topic = topics.find((topic) => topic._id === id);
  return topic ? topic.name : null;
};

function formatVolData(data) {
  return data.data.reduce((result, entry) => {
    const base = entry.total;
    entry.split.forEach((splitEntry) => {
      const { split_value, total } = splitEntry;
      const splitVal = getNameById(split_value);
      const existingEntry = result.find((obj) => obj.name === splitVal);
      existingEntry
        ? existingEntry.data.push((total / base) * 100)
        : result.push({ name: splitVal, data: [total] });
    });
    return result;
  }, []);
}

const dataForVolGraph = formatVolData(volumeData);

const interventionsData = (graphPos1, graphPos2, graphPos3) => {
  return [
    {
      name: "mask wearing",
      type: "xrange",
      pointWidth: 15,
      data: [
        {
          color: `hsla(201,97%,14%, 0.5)`,
          x: Date.parse("2021-01-01"),
          x2: Date.parse("2021-03-29"),
          y: graphPos1,
          dataLabels: {
            enabled: true,
            inside: true,
            formatter: function () {
              return this.series.name;
            },
          },
        },
      ],
    },
    {
      name: "Social Distancing",
      type: "xrange",
      pointWidth: 15,
      data: [
        {
          color: `hsla(201, 97%, 21%, 0.5)`,
          x: Date.parse("2021-01-01"),
          x2: Date.parse("2021-02-05"),
          y: graphPos2,
          dataLabels: {
            enabled: true,
            inside: true,
            formatter: function () {
              return this.series.name;
            },
          },
        },
        {
          color: `hsla(201, 97%,21%, 0.5)`,
          x: Date.parse("2021-03-01"),
          x2: Date.parse("2021-03-31"),
          y: graphPos2,
          dataLabels: {
            enabled: true,
            inside: true,
            formatter: function () {
              return this.series.name;
            },
          },
        },
      ],
    },
    {
      name: "Testing",
      type: "xrange",
      pointWidth: 15,
      data: [
        {
          color: `hsla(201, 40%,28%, 0.5)`,
          x: Date.parse("2021-01-05"),
          x2: Date.parse("2021-01-19"),
          y: graphPos3,
          dataLabels: {
            enabled: true,
            inside: true,
            formatter: function () {
              return this.series.name;
            },
          },
        },
        {
          color: `hsla(201, 40%,28%, 0.5)`,
          x: Date.parse("2021-02-01"),
          x2: Date.parse("2021-02-23"),
          y: graphPos3,
          dataLabels: {
            enabled: true,
            inside: true,
            formatter: function () {
              return this.series.name;
            },
          },
        },
      ],
    },
  ];
};

const formatAnalysisData = (data, analysisValue) => {
  return data.data.reduce((acc, entry) => {
    const { date, total, split: splitEntries } = entry;
    const splitEntry = splitEntries.find(
      (obj) => obj.split_value === analysisValue
    );
    acc.push([Date.parse(date), splitEntry ? splitEntry.total : 0]);
    return acc;
  }, []);
};

const sentimentLineData = Object.keys(sentimentColors).map((sentiment) => ({
  data: formatAnalysisData(sentimentData, sentiment),
  type: "spline",
  name: sentiment,
  color: sentimentColors[sentiment],
}));

const emotionLineData = Object.keys(emotionColors).map((emotion) => ({
  data: formatAnalysisData(emotionData, emotion),
  type: "spline",
  name: emotion,
  color: emotionColors[emotion],
}));

// get top value so we can put interventions at the top of the chart
const getMax = (data) =>
  Math.max(...data.flatMap((obj) => obj.data.map((point) => point[1])));
const sentMax = getMax(sentimentLineData);
const emoMax = getMax(emotionLineData);

const sentimentGraphData = interventionsData(
  sentMax + sentMax / 3,
  sentMax + sentMax / 6,
  sentMax
).concat(sentimentLineData);

const emotionGraphData = interventionsData(
  emoMax + emoMax / 3,
  emoMax + emoMax / 6,
  emoMax
).concat(emotionLineData);

Highcharts.setOptions({
  chart: {
    type: "xrange",
    width: 800,
    height: 400,
    spacingTop: 0,
  },
  legend: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
  },
  xAxis: {
    type: "datetime",
    ordinal: true,
    labels: {
      formatter: function () {
        return Highcharts.dateFormat("%Y-%m-%d", this.value);
      },
    },
  },

  plotOptions: {
    series: {
      marker: {
        enabled: false,
      },
    },
  },
});

var sentimentChart = new Highcharts.Chart({
  title: {
    text: "Sentiment Analysis: coronavirus topic",
  },
  chart: {
    renderTo: "sentiment",
  },
  yAxis: {
    endOnTick: false,
    max: sentMax + 5,
  },
  series: sentimentGraphData,
});

var emotionChart = new Highcharts.Chart({
  title: {
    text: "Emotion Analysis: coronavirus topic",
  },
  chart: {
    renderTo: "emotion",
  },
  yAxis: {
    endOnTick: false,
    max: emoMax + 5,
  },
  series: emotionGraphData,
});

var volChart = new Highcharts.Chart({
  title: {
    text: "Volume: coronavirus topic",
  },
  yAxis: {
    endOnTick: false,
    max: 25,
  },
  chart: {
    type: "spline",
    width: 1000,
    height: 200,
    renderTo: "vol",
  },
  series: dataForVolGraph,
});
