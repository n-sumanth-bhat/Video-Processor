// src/components/UploadVideo.js
import React, { useState } from 'react';
import axios from 'axios';


const UploadVideo = () => {
    const [title, setTitle] = useState('');
    const [videoFile, setVideoFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('video_file', videoFile);

        try {
            await axios.post('http://localhost:8000/api/upload-video/', formData);
            alert('Video uploaded successfully');
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
                Video File:
                <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} required />
            </label>
            <button type="submit">Upload Video</button>
        </form>
    );
};

export default UploadVideo;
