from flask import Flask, Response, request, render_template, send_file, redirect
import json, os, requests, base64, re, io, pandas as pd, math, numpy as np

def load_data_to_df(file_name):
    df = pd.read_excel(file_name)
    #print(df)
    return df

def load_data_to_dictarray(file_name):
    df = load_data_to_df(file_name)
    dict_array = df.to_dict('records')
    #print(dict_array)
    return dict_array


app = Flask("JP_Vocab Server")

@app.route("/")
def index():
    return render_template("index.html")

if __name__=="__main__":
    app.run(debug=True, port=5000)