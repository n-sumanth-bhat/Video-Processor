import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoList = ({ onVideoSelect }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get-all-videos/');
                setVideos(response.data);
            } catch (err) {
                setError('Error fetching videos');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) return <div>Loading videos...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {videos.length === 0 ? (
                <p>No videos available</p>
            ) : (
                <ul>
                    {videos.map(video => (
                        <li key={video.id}>
                            <button
                                style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                                onClick={() => onVideoSelect(video)}
                            >
                                {video.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VideoList;