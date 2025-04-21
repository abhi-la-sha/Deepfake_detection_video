import React, { useState } from 'react';

function App() {
  const [video, setVideo] = useState(null);
  const [result, setResult] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", video);

    const response = await fetch("/predict", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setResult(JSON.stringify(data.result));
  };

  return (
    <div>
      <h2>Deepfake Detection</h2>
      <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
      <button onClick={handleUpload}>Detect</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
}

export default App;