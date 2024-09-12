import React, { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ video }) => {
    const [subtitles, setSubtitles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); // Loading state
    const videoRef = useRef(null);

    useEffect(() => {
        if (video) {
            fetch(`http://localhost:8000/api/get-subtitle/${video.id}/`)
                .then(response => response.json())
                .then(data => {
                    const formattedSubtitles = data.map(sub => ({
                        ...sub,
                        vttURL: createVTTBlobURL(convertToWEBVTT(parseSRT(sub.content)))
                    }));
                    setSubtitles(formattedSubtitles);
                })
                .catch(error => console.error('Error fetching subtitles:', error));
        }
    }, [video]);

    useEffect(() => {
        const player = videoRef.current;
        if (player) {
            // Remove existing tracks
            while (player.firstChild) {
                player.removeChild(player.firstChild);
            }

            // Add video source
            const source = document.createElement('source');
            source.src = `http://localhost:8000${video.video_file}`;
            source.type = 'video/mp4';
            player.appendChild(source);

            // Add subtitle tracks
            subtitles.forEach(sub => {
                const track = document.createElement('track');
                track.kind = 'subtitles';
                track.label = sub.language;
                track.srclang = sub.language;
                track.src = sub.vttURL;
                player.appendChild(track);
            });

            // Monitor buffering progress
            const handleProgress = () => {
                const duration = player.duration;
                if (player.buffered.length > 0 && player.buffered.end(0) >= duration) {
                    setLoading(false);
                    player.play();
                    player.removeEventListener('progress', handleProgress);
                }
            };

            // Add event listeners
            player.addEventListener('progress', handleProgress);
            player.load();

            // Cleanup event listeners on component unmount
            return () => {
                player.removeEventListener('progress', handleProgress);
            };
        }
    }, [subtitles]);

    const handleSearch = () => {
        if (!searchTerm || subtitles.length === 0) return;

        const srtContent = subtitles.map(sub => sub.content).join('\n\n');
        const srtSubtitles = parseSRT(srtContent);
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const result = srtSubtitles.find(sub => sub.text.toLowerCase().includes(lowerCaseSearchTerm));

        if (result) {
            const player = videoRef.current;
            player.currentTime = parseTime(result.startTime);
            player.play();
        } else {
            alert('Phrase not found in subtitles');
        }
    };

    const parseTime = (timeStr) => {
        const [hours, minutes, seconds] = timeStr.split(':');
        return (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseFloat(seconds);
    };

    const parseSRT = (srtContent) => {
        const subtitles = [];
        const srtBlocks = srtContent.split('\n\n');

        srtBlocks.forEach(block => {
            const lines = block.split('\n');
            if (lines.length >= 3) {
                const id = lines[0].trim();
                const timecode = lines[1].trim();
                const text = lines.slice(2).join('\n').trim();

                const [startTime, endTime] = timecode.split(' --> ').map(time => time.replace(',', '.'));

                subtitles.push({
                    id,
                    startTime,
                    endTime,
                    text
                });
            }
        });

        return subtitles;
    };

    const convertToWEBVTT = (srtSubtitles) => {
        let vttContent = 'WEBVTT\n\n';

        srtSubtitles.forEach(sub => {
            vttContent += `${sub.startTime} --> ${sub.endTime}\n${sub.text}\n\n`;
        });

        return vttContent;
    };

    const createVTTBlobURL = (vttContent) => {
        const blob = new Blob([vttContent], { type: 'text/vtt' });
        return URL.createObjectURL(blob);
    };

    if (!video) return <div>Select a video to play</div>;

    return (
        <div>
            <h2>{video.title}</h2>
            {loading && <div>Loading video...</div>}
            <video
                ref={videoRef}
                controls
                width="600"
                preload="auto"
            >
                Your browser does not support the video tag.
            </video>
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search in subtitles"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default VideoPlayer;