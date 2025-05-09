
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const ZenAudio = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    const audioElement = audioRef.current;
    
    // Auto-play with user interaction required by browsers
    const handleFirstInteraction = () => {
      if (audioElement && isPlaying) {
        audioElement.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
      
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    
    // Clean up
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, []);
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  const togglePlayback = () => {
    setIsPlaying(prev => !prev);
  };
  
  return (
    <div className="sound-control">
      <button 
        onClick={togglePlayback} 
        className="p-2 rounded-full bg-zen-paper/30 text-zen-moss hover:bg-zen-paper/50 transition-all"
        aria-label={isPlaying ? "Mute sound" : "Unmute sound"}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
};

export default ZenAudio;
