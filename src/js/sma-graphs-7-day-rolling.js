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

const interventionsData = (max, mid, min) => {
  return [
    {
      name: "mask wearing",
      type: "xrange",
      pointWidth: 10,
      data: [
        {
          color: `hsl(42, 11%, 80%)`,
          x: Date.parse("2021-01-01"),
          x2: Date.parse("2021-03-29"),
          y: max + max / 10,
        },
      ],
    },
    {
      name: "Social Distancing",
      type: "xrange",
      pointWidth: 10,

      data: [
        {
          color: `hsl(222, 11%, 70%)`,
          x: Date.parse("2021-01-01"),
          x2: Date.parse("2021-02-05"),
          y: mid + max / 10,
        },
        {
          color: `hsl(222, 11%, 70%)`,
          x: Date.parse("2021-03-01"),
          x2: Date.parse("2021-03-31"),
          y: mid + max / 10,
        },
      ],
    },
    {
      name: "Testing",
      type: "xrange",
      pointWidth: 10,
      data: [
        {
          color: `hsl(180, 15%, 70%)`,
          x: Date.parse("2021-01-05"),
          x2: Date.parse("2021-01-19"),
          y: min + max / 10,
        },
        {
          color: `hsl(180, 15%, 70%)`,
          x: Date.parse("2021-02-01"),
          x2: Date.parse("2021-02-23"),
          y: min + max / 10,
        },
      ],
    },
  ];
};

function calculateSevenDayRollingAverage(data) {
  const rollingAverages = [];
  for (let i = 0; i < data.length; i++) {
    if (i < 6) {
      continue;
    }
    const window = data.slice(i - 6, i + 1);
    const sum = window.reduce((total, value) => total + value[1], 0);
    const average = sum / 7;

    rollingAverages.push([data[i][0], parseFloat(average.toFixed(2))]);
  }

  return rollingAverages;
}

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

const getMax = (data) =>
  Math.max(...data.flatMap((obj) => obj.data.map((point) => point[1])));

const getMin = (data) =>
  Math.min(...data.flatMap((obj) => obj.data.map((point) => point[1])));

const sentimentLineData = Object.keys(sentimentColors).map((sentiment) => ({
  data: calculateSevenDayRollingAverage(
    formatAnalysisData(sentimentData, sentiment)
  ),
  type: "spline",
  name: sentiment,
  color: sentimentColors[sentiment],
}));

const sentMax = getMax(sentimentLineData);
const sentMin = getMin(sentimentLineData);
const sentMid = (sentMax - sentMin) / 2;

const emotionLineData = Object.keys(emotionColors).map((emotion) => ({
  data: calculateSevenDayRollingAverage(
    formatAnalysisData(emotionData, emotion)
  ),
  type: "spline",
  name: emotion,
  color: emotionColors[emotion],
}));

const emoMax = getMax(emotionLineData);
const emoMin = getMin(emotionLineData);
const emoMid = (emoMax - emoMin) / 2;

const sentimentGraphData = interventionsData(sentMax, sentMid, sentMin).concat(
  sentimentLineData
);

const emotionGraphData = interventionsData(emoMax, emoMid, emoMin).concat(
  emotionLineData
);

Highcharts.setOptions({
  chart: {
    type: "xrange",
    width: 800,
    height: 500,
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
  series: sentimentGraphData,
});

var emotionChart = new Highcharts.Chart({
  title: {
    text: "Emotion Analysis: coronavirus topic",
  },
  chart: {
    renderTo: "emotion",
  },
  series: emotionGraphData,
});

// var volChart = new Highcharts.Chart({
//   title: {
//     text: "Volume: coronavirus topic",
//   },
//   chart: {
//     renderTo: "vol",
//   },
//   series: sentimentGraphData,
// });
