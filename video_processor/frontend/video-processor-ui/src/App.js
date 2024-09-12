// src/App.js
import React, { useState } from 'react';
import UploadVideo from './components/UploadVideo';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';

const App = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <div className="container">
            <h1>Video Processor</h1>
            <UploadVideo />
            <VideoList onVideoSelect={setSelectedVideo} />
            <VideoPlayer video={selectedVideo} />
        </div>
    );
};

export default App;
