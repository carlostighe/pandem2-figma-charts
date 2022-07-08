const patientKeys = [
  "PANDEM2 Outputs.confirmed cases",
  "Hospital.hospital admissions",
  "Hospital.hospital discharges",
  "Hospital.ICU admissions",
  "Hospital.ICU discharges",
  "Hospital.deaths in hospital",
  "Hospital.Patients Waiting for Ward Bed",
  "Hospital.In Ward Overflow",
  "Hospital.ward admissions",
  "Hospital.Patients Waiting for ICU",
  "Hospital.In ICU Overflow",
  "Hospital.moving to ICU overflow",
  "Hospital.moving to ward overflow",
];

const peakKeys = [
  "Hospital.peak ICU demand",
  "Hospital.peak demand ICU beds",
  "Hospital.peak demand ICU nurses",
  "Hospital.peak demand ventilators",
  "Hospital.peak ward demand",
  "Hospital.peak demand ward beds",
  "Hospital.peak demand nurses",
  "Hospital.peak demand PPE",
];
const day = 80;
const getPatientDataByDay = (day, data, keys) => {
  return Object.fromEntries(
    patientKeys.map((k) => [k, Math.round(data[k][day])])
  );
};

fetch("../Data/outputs.json")
  .then((response) => response.json())
  .catch((err) => console.log(err))
  .then((data) => {
    // FILTER THE DATA BY THE KEYS ABOVE AND THEN GET DATA FOR THE DAY (example day 80)
    const patientData = getPatientDataByDay(day, data, patientKeys);
    const pd79 = getPatientDataByDay(79, data, patientKeys);
    const peakData = getPatientDataByDay(169, data, peakKeys);
    console.log("peakData ", peakData);
    const sankeyData1 = [
      // [
      //   "Confirmed cases",
      //   "non hospitalised",
      //   patientData["PANDEM2 Outputs.confirmed cases"] -
      //     patientData["Hospital.hospital admissions"],
      // ],
      [
        "Confirmed cases",
        "Admissions",
        patientData["Hospital.hospital admissions"],
      ],
      ["Admissions", "discharges", patientData["Hospital.hospital discharges"]],
      ["Admissions", "Deaths", patientData["Hospital.deaths in hospital"]],
      [
        "Admissions",
        "Ward Admissions",
        patientData["Hospital.ward admissions"],
      ],
      ["Admissions", "ICU Admissions", patientData["Hospital.ICU admissions"]],
      [
        "Admissions",
        "Waiting for Ward",
        patientData["Hospital.Patients Waiting for Ward Bed"],
      ],
      ["Admissions", "Ward Overflow", patientData["Hospital.In Ward Overflow"]],
      [
        "Admissions",
        "Waiting for ICU",
        patientData["Hospital.Patients Waiting for ICU"],
      ],
      ["Admissions", "ICU Overflow", patientData["Hospital.In ICU Overflow"]],
      [
        "ICU Admissions",
        "ICU discharges",
        patientData["Hospital.ICU discharges"],
      ],
    ];

    const sankeyData2 = [
      [
        "Admissions",
        "Unit Admissions",
        patientData["Hospital.hospital admissions"],
      ],
      ["Unit Admissions", "Ward", patientData["Hospital.ward admissions"]],
      ["Unit Admissions", "ICU", patientData["Hospital.ICU admissions"]],
      ["Ward", "Ward Admissions", patientData["Hospital.ward admissions"]],
      ["Ward", "Ward Overflow", patientData["Hospital.In Ward Overflow"]],
      [
        "Ward",
        "Patients Waiting for Ward Bed",
        patientData["Hospital.Patients Waiting for Ward Bed"],
      ],
      [
        "ICU",
        "Waiting for ICU Bed",
        patientData["Hospital.Patients Waiting for ICU"],
      ],
      ["ICU", "ICU Overflow", patientData["Hospital.In ICU Overflow"]],

      ["ICU", "ICU discharges", patientData["Hospital.ICU discharges"]],
    ];

    const sankeyData3 = [
      ["Ward", "Ward Admissions", patientData["Hospital.ward admissions"]],
      ["Ward", "Ward Discharges", patientData["Hospital.hospital discharges"]],
      [
        "Ward",
        "Patients Waiting for Ward Bed",
        patientData["Hospital.Patients Waiting for Ward Bed"],
      ],
      ["Ward", "Ward Overflow", patientData["Hospital.In Ward Overflow"]],
      [
        "Ward Admissions",
        "Admissions",
        patientData["Hospital.ward admissions"],
      ],
      [
        "Admissions",
        "Hospital Admissions",
        patientData["Hospital.hospital admissions"],
      ],
      [
        "Ward Discharges",
        "Discharges",
        patientData["Hospital.hospital discharges"],
      ],
      [
        "Patients Waiting for Ward Bed",
        "Patients waiting for Beds",
        patientData["Hospital.Patients Waiting for Ward Bed"],
      ],
      ["Ward Overflow", "Overflow", patientData["Hospital.In Ward Overflow"]],
      ["ICU", "ICU Admissions", patientData["Hospital.ICU admissions"]],
      ["ICU", "ICU Discharges", patientData["Hospital.ICU discharges"]],
      [
        "ICU",
        "Patients Waiting for ICU Bed",
        patientData["Hospital.Patients Waiting for ICU"],
      ],
      ["ICU", "ICU Overflow", patientData["Hospital.In ICU Overflow"]],
      ["ICU Admissions", "Admissions", patientData["Hospital.ICU admissions"]],
      ["ICU Discharges", "Discharges", patientData["Hospital.ICU discharges"]],
      [
        "Patients Waiting for ICU Bed",
        "Patients waiting for Beds",
        patientData["Hospital.Patients Waiting for ICU"],
      ],
      ["ICU Overflow", "Overflow", patientData["Hospital.In ICU Overflow"]],
    ];

    const sankeyData4 = [
      [
        "Hospital Admissions",
        "Hospital Occupancy",
        patientData["Hospital.hospital admissions"],
      ],
      [
        "Hospital Occupancy",
        "Ward Admissions",
        patientData["Hospital.ward admissions"],
      ],
      ["Ward Admissions", "Ward", patientData["Hospital.ward admissions"]],
      [
        "Hospital Occupancy",
        "ICU Admissions",
        patientData["Hospital.ICU admissions"],
      ],
      ["ICU Admissions", "ICU", patientData["Hospital.ICU admissions"]],
      ["Ward", "Ward Discharges", patientData["Hospital.hospital discharges"]],
      [
        "Hospital Occupancy",
        "Ward Overflow",
        patientData["Hospital.In Ward Overflow"],
      ],
      [
        "Hospital Occupancy",
        "ICU Overflow",
        patientData["Hospital.In ICU Overflow"],
      ],
      ["Ward Overflow", "Overflow", patientData["Hospital.In Ward Overflow"]],
      ["ICU Overflow", "Overflow", patientData["Hospital.In ICU Overflow"]],
      [
        "Hospital Occupancy",
        "Patients Waiting for Ward Bed",
        patientData["Hospital.Patients Waiting for Ward Bed"],
      ],
      [
        "Hospital Occupancy",
        "Patients Waiting for ICU Bed",
        patientData["Hospital.Patients Waiting for ICU"],
      ],
      [
        "Hospital Occupancy",
        "Deaths",
        patientData["Hospital.deaths in hospital"],
      ],
      [
        "Ward Discharges",
        "Discharges",
        patientData["Hospital.hospital discharges"],
      ],
      [
        "Patients Waiting for Ward Bed",
        "Patients waiting for Beds",
        patientData["Hospital.Patients Waiting for Ward Bed"],
      ],
      ["ICU Admissions", "ICU", patientData["Hospital.ICU admissions"]],
      ["ICU", "ICU Discharges", patientData["Hospital.ICU discharges"]],

      ["ICU Discharges", "Discharges", patientData["Hospital.ICU discharges"]],
      [
        "Patients Waiting for ICU Bed",
        "Patients waiting for Beds",
        patientData["Hospital.Patients Waiting for ICU"],
      ],
    ];

    Highcharts.chart("container", {
      chart: {
        height: "30%", // 16:9 ratio
        width: 1400,
      },
      title: {
        text: "Highcharts Patients Diagram",
      },
      accessibility: {
        point: {
          valueDescriptionFormat:
            "{index}. {point.from} to {point.to}, {point.weight}.",
        },
      },
      series: [
        {
          keys: ["from", "to", "weight"],
          data: sankeyData4,
          type: "sankey",
          name: "Sankey demo series",
        },
      ],
    });
  });
