import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './App.css';

import song1 from './p1.mp3';
import song2 from './p2.mp3';
import image2 from './image.png';

const App = () => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState(song1);
  const [currentImage, setCurrentImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC1CDS1Y-lyoEFpcEhA64nJXGp3M33cVhY8w&s');
  const [currentTitle, setCurrentTitle] = useState('ori varri song');

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentTime(0);
    if (currentSong === song1) {
      setCurrentImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC1CDS1Y-lyoEFpcEhA64nJXGp3M33cVhY8w&s');
      setCurrentTitle('ori varri song');
    } else if (currentSong === song2) {
      setCurrentImage(image2);
      setCurrentTitle('GULABI SADI SONG');
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    }
  };

  const handleForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    }
  };

  const handlePreviousSong = () => {
    if (playerRef.current) {
      if (currentSong === song2) {
        setCurrentSong(song1);
        setCurrentTime(0);
        setIsPlaying(false);
      }
    }
  };

  const handleNextSong = () => {
    if (playerRef.current) {
      if (currentSong === song1) {
        setCurrentSong(song2);
        setCurrentTime(0);
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="player">
      <img src={currentImage} alt="Cover" className="cover" />
      <div className="title text-red-600">{currentTitle}</div>
      <input
        type="range"
        className="progress"
        min={0}
        max={playerRef.current ? playerRef.current.getDuration() : 0}
        value={currentTime}
        onChange={(e) => playerRef.current && playerRef.current.seekTo(parseFloat(e.target.value))}
      />
      <div className="controls">
        <button onClick={handlePreviousSong}>⏮</button>
        <button onClick={handleRewind}>◄</button>
        <button onClick={handlePlayPause}>
          {isPlaying ? '❚❚' : '►'}
        </button>
        <button onClick={handleForward}>►</button>
        <button onClick={handleNextSong}>⏭</button>
      </div>
      <ReactPlayer
        key={currentSong}
        ref={playerRef}
        url={currentSong}
        playing={isPlaying}
        controls={false}
        width="0"
        height="0"
      />
    </div>
  );
};

export default App;