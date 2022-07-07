import json
import pandas as pd


def original_filter():
    df = pd.read_csv('flights.csv')
    column_names = ['TAIL_NUMBER', 'TAXI_OUT', 'WHEELS_OFF', 'AIR_SYSTEM_DELAY',
                    'SECURITY_DELAY', 'AIRLINE_DELAY', 'LATE_AIRCRAFT_DELAY', 'WEATHER_DELAY']
    # row = df[df['MONTH'] == '2'].index.tolist()[0]
    # df = df.iloc[:row-1]
    # df = df[:df[df['MONTH'] == 2].index[0]]

    for cname in column_names:
        print('cname: ', cname)
        df = df.drop(cname, axis=1)
    df.to_csv('flights_cut.csv')


def get_chord_data():
    df = pd.read_csv('flights_cut.csv')
    chord_df = df.filter(['ORIGIN_AIRPORT', 'DESTINATION_AIRPORT'], axis=1)
    df = chord_df.value_counts().to_frame('counts').reset_index()
    df['length'] = df['ORIGIN_AIRPORT'].str.len()
    df = df[df.length < 4]
    df = df.drop('length', axis=1)
    # df = df[:200]
    df = df[df['DESTINATION_AIRPORT'] == "LAX"]

    # df.to_csv('origin_to_dest.csv', header=False, index=False)
    # df.to_json('origin_to_dest.json')
    data = json.dumps({'data': df.reset_index(
        drop=True).T.reset_index().T.apply(list, axis=1).to_list()})

    print('data: ', data)
    # origin = df['ORIGIN_AIRPORT'].value_counts(dropna=False)
    # origin.to_csv('flight_origins.csv')
    # destination = df['DESTINATION_AIRPORT'].value_counts(dropna=False)
    # destination.to_csv('flight_dest.csv')

    # print('destination: ', destination)
    # origin_counts = df['ORIGIN_AIRPORT'].drop_duplicates().sort_values()
    # print('origin_counts: ', origin_counts)
    # destination_counts = df['DESTINATION_AIRPORT'].drop_duplicates(
    # ).sort_values()
    # print('destination_counts: ', destination_counts)


get_chord_data()
