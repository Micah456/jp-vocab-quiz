from flask import Flask, render_template, Response
import pandas as pd
import json
import os


def load_data_to_df(file_name):
    df = pd.read_excel(file_name)
    # print(df)
    return df


def load_data_to_dictarray(file_name):
    df = load_data_to_df(file_name)
    dict_array = df.to_dict('records')
    # print(dict_array)
    return dict_array


template_dir = os.path.abspath('../templates')
static_dir = os.path.abspath('../static')
app = Flask("JP_Vocab Server", template_folder=template_dir, static_folder=static_dir)


@app.route("/")
def index():
    return render_template("vocab.html")

@app.route("/feedback")
def feedback():
    return render_template("feedback.html")


@app.route("/data")
def get_data():
    return Response(json.dumps(load_data_to_dictarray("data/jlptN4VocabData.xlsx")), mimetype='application/json', status=200)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
