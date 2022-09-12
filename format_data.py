from email.utils import decode_rfc2231
from fileinput import filename
import sys
import json
from matplotlib.pyplot import get
import pandas as pd
import math
# filename = sys.argv[1]


def get_output_names(filename):
    # df = pd.read_csv(filename)
    df = pd.read_json(filename)
    data = list(df['name'])
    with open('data/output_names_model_5.json', 'w') as f:
        json.dump(data, f)


# get_output_names(filename)


def scatter_data(scenario1="data/test_model_output_run1.csv", scenario2="data/test_model_output_run2.csv"):
    df1 = pd.read_csv(scenario1)
    data = list(df1.columns)
    df2 = pd.read_csv(scenario2)
    rows1 = list([col, df1.iloc[90][col].round(0)] for col in data)
    with open('data/scatter-plot1.json', 'w') as f:
        json.dump(rows1, f)

    rows2 = list([col, df2.iloc[90][col].round(0)] for col in data)
    with open('data/scatter-plot2.json', 'w') as f:
        json.dump(rows2, f)


def csv_to_json(filename="./src/Data/model_inputs_outputs_for_CLAR.csv"):
    df = pd.read_csv(filename)
    df = df.to_json('./src/Data/latest_outputs.json', orient="columns")


get_output_names("./src/Data/model5.json")
