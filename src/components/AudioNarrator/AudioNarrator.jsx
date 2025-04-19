import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faShareSquare } from '@fortawesome/free-solid-svg-icons'; // Pretpostavka ikonica
import { useTranslations } from '../../hooks/useTranslations'; // Import hooka za prevode
import './AudioNarrator.css';

// Utility funkcija za formatiranje vremena
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

function AudioNarrator({ audioSr, audioEn, language }) {
  const t = useTranslations();
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [audioSrc, setAudioSrc] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Efekat za promenu izvora zvuka pri promeni jezika
  useEffect(() => {
    const newSrc = language === 'sr' ? audioSr : audioEn;
    setAudioSrc(newSrc);

    if (audioRef.current) {
      // Ako audio element već postoji, pauziraj i promeni src
      audioRef.current.pause();
      audioRef.current.src = newSrc;
      audioRef.current.load(); // Ponovo učitaj audio
      // Resetuj stanje plejera
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0); 
      setPlaybackRate(1);
      audioRef.current.playbackRate = 1;
    }
    // Zavisnosti: promena jezika ili samih audio fajlova
  }, [language, audioSr, audioEn]);

  // Efekat za dodavanje event listenera na audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return; // Izlaz ako ref još nije postavljen

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleAudioEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      // Opciono: setPlaybackRate(1); audio.playbackRate = 1;
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleAudioEnded);

    // Cleanup funkcija za uklanjanje listenera
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, [audioSrc]); // Ponovo pokreni ako se audioSrc promeni (iako ref ostaje isti)

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const changePlaybackRate = (rate) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const handleShare = () => {
    const url = window.location.href;

    // Provera da li je Clipboard API dostupan
    if (!navigator.clipboard) {
      console.warn('Clipboard API not available in this context (requires HTTPS or localhost).');
      // Ovde možeš prikazati i poruku korisniku umesto/pored warninga
      // Na primer, postaviti neki state za error toast
      // setShowErrorToast(true);
      // setTimeout(() => setShowErrorToast(false), 3000);
      return; // Prekini izvršavanje ako API nije dostupan
    }

    navigator.clipboard.writeText(url).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }).catch(err => {
      console.error('Failed to copy URL: ', err);
      // Opciono: Prikazati korisniku poruku o grešci
      // setShowErrorToast(true, 'Copy failed!');
      // setTimeout(() => setShowErrorToast(false), 3000);
    });
  };

  // Ne renderuj ništa ako nema audio izvora
  if (!audioSrc) return null;

  // Provera za t.audioNarrator pre pristupa
  const narratorTranslations = t.audioNarrator || {};
  const listenText = narratorTranslations.listen || 'Listen to article';
  const shareText = narratorTranslations.share || 'Share';
  const copiedText = narratorTranslations.linkCopied || 'Link copied!';

  return (
    <div className="audio-narrator">
      <audio ref={audioRef} src={audioSrc} preload="metadata"></audio>
      
      <div className="narrator-left">
        <button onClick={togglePlayPause} className="narrator-button play-pause-button" aria-label={isPlaying ? "Pause" : "Play"}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <span className="narrator-info">
          {isPlaying ? formatTime(currentTime) : listenText}
        </span>
      </div>

      <div className="narrator-center">
        {isPlaying ? (
          <div className="speed-controls">
            {[0.5, 1, 1.5, 2].map((rate) => (
              <button 
                key={rate}
                onClick={() => changePlaybackRate(rate)}
                className={`narrator-button speed-button ${playbackRate === rate ? 'active-speed' : ''}`}
              >
                {rate}x
              </button>
            ))}
          </div>
        ) : (
          <span className="narrator-duration">
            {duration > 0 ? formatTime(duration) : '--:--'} 
          </span>
        )}
      </div>

      <div className="narrator-right">
        <button onClick={handleShare} className="narrator-button share-button">
          <FontAwesomeIcon icon={faShareSquare} /> 
          <span className="narrator-button-share-button-span">{shareText}</span>
        </button>
        {/* Toast poruka */} 
        <div className={`toast-message ${showToast ? 'visible' : ''}`}>
          {copiedText}
        </div>
      </div>
    </div>
  );
}

export default AudioNarrator; 