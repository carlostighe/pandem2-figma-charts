from fileinput import filename
import sys
import json
import pandas as pd

# filename = sys.argv[1]


def get_output_names(filename):
    df = pd.read_csv(filename)
    data = list(df.columns)
    data.sort()
    with open('data/output_run1_output_names.json', 'w') as f:
        json.dump(data, f)
