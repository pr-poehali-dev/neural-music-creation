
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  allowDownload?: boolean;
  onError?: (error: any) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioUrl, 
  title, 
  allowDownload = true,
  onError
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Создаем HTML5 Audio элемент программно
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    // Устанавливаем обработчики событий
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('canplay', () => setIsLoading(false));
    audio.addEventListener('error', handleError);
    
    // Принудительно загружаем аудио
    audio.load();
    
    return () => {
      // Очистка при размонтировании
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('play', () => setIsPlaying(true));
        audioRef.current.removeEventListener('pause', () => setIsPlaying(false));
        audioRef.current.removeEventListener('canplay', () => setIsLoading(false));
        audioRef.current.removeEventListener('error', handleError);
      }
    };
  }, [audioUrl]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleError = (e: Event) => {
    setIsLoading(false);
    setError("Ошибка загрузки аудио. Пожалуйста, попробуйте еще раз.");
    console.error("Ошибка аудио:", e);
    if (onError) onError(e);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Используем Promise для обработки асинхронного воспроизведения
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Воспроизведение успешно началось
            })
            .catch(err => {
              console.error("Ошибка воспроизведения:", err);
              setError("Не удалось начать воспроизведение. Пожалуйста, попробуйте еще раз.");
            });
        }
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = pos * duration;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleDownload = () => {
    // Создаем временную ссылку для скачивания
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.mp3`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
    }, 100);
  };

  return (
    <div className="rounded-lg bg-accent/20 p-4 w-full">
      {error ? (
        <div className="text-destructive text-sm py-2">{error}</div>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-2">
            <Button 
              onClick={togglePlayPause} 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 rounded-full flex-shrink-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icon name="Loader2" className="animate-spin" />
              ) : (
                <Icon name={isPlaying ? "Pause" : "Play"} />
              )}
            </Button>
            <div className="flex-grow overflow-hidden">
              <p className="text-sm font-medium truncate">{title}</p>
            </div>
            {allowDownload && (
              <Button 
                onClick={handleDownload} 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 flex-shrink-0"
              >
                <Icon name="Download" size={18} />
              </Button>
            )}
          </div>
          
          <div 
            ref={progressRef}
            className="h-2 w-full bg-secondary/50 rounded-full cursor-pointer overflow-hidden mb-1"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-primary transition-all duration-100"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          
          {/* Скрытый аудио элемент для браузеров, где Audio API не полностью поддерживается */}
          <audio 
            style={{ display: 'none' }}
            src={audioUrl}
            preload="auto"
            controls
          />
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
