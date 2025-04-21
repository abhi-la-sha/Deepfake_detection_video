from flask import Flask, request, jsonify
from gradio_client import Client, handle_file
import os

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    if 'video' not in request.files:
        return jsonify({"error": "No video uploaded"}), 400

    video = request.files['video']
    path = os.path.join("/tmp", video.filename)
    video.save(path)

    client = Client("vjdevane/deepfake-detection")
    result = client.predict(
        video_file=handle_file(path),
        api_name="/predict"
    )
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)