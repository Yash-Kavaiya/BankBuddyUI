import os
from flask import Flask ,render_template ,jsonify , request
from dialogflow_api import *
import uuid
app = Flask(__name__)
app.secret_key="Kuch_bhi"

@app.route("/")
def hello_world():
    global session_id
    session_id=uuid.uuid4()
    print("session_id",session_id)
    return render_template('index.html')
@app.route("/fetch_message",methods=['POST'])
def fetch_message():
    try:
        lists=request.get_json(force=True)
        print("Lists Data from front",lists)
        res=run_sample(lists['prompt'],session_id)
        print("res",res)
        return jsonify(res)
    except Exception as e:
        print(e)
        return jsonify("error":str(e)),400

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))