
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AudioPlayer from "@/components/AudioPlayer";

interface MusicParameters {
  genre: string;
  tempo: number;
  mood: string;
  duration: number;
}

const genres = ["Поп", "Рок", "Электронная", "Хип-хоп", "Классическая", "Джаз", "Эмбиент"];
const moods = ["Веселая", "Грустная", "Энергичная", "Спокойная", "Мистическая"];

// Предустановленные аудио для разных жанров
const genreAudios = {
  "Поп": "https://cdn.freesound.org/previews/635/635596_1089955-lq.mp3",
  "Рок": "https://cdn.freesound.org/previews/531/531482_701057-lq.mp3",
  "Электронная": "https://cdn.freesound.org/previews/612/612092_5674468-lq.mp3",
  "Хип-хоп": "https://cdn.freesound.org/previews/559/559703_10652870-lq.mp3",
  "Классическая": "https://cdn.freesound.org/previews/553/553827_5526075-lq.mp3",
  "Джаз": "https://cdn.freesound.org/previews/635/635369_6596651-lq.mp3",
  "Эмбиент": "https://cdn.freesound.org/previews/342/342166_4284968-lq.mp3",
};

const MusicGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [audioError, setAudioError] = useState<string | null>(null);
  
  const [parameters, setParameters] = useState<MusicParameters>({
    genre: "Электронная",
    tempo: 120,
    mood: "Энергичная",
    duration: 30,
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setAudioError(null);
    
    // Имитация процесса генерации музыки
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        const next = prev + Math.random() * 10;
        if (next >= 100) {
          clearInterval(interval);
          simulateAudioGeneration();
          return 100;
        }
        return next;
      });
    }, 300);
  };

  // Имитация получения аудиофайла (в реальном приложении здесь будет API-запрос)
  const simulateAudioGeneration = () => {
    setTimeout(() => {
      try {
        // Выбираем аудио в зависимости от выбранного жанра
        const generatedAudio = genreAudios[parameters.genre] || genreAudios["Электронная"];
        setAudioUrl(generatedAudio);
        setIsGenerating(false);
      } catch (error) {
        console.error("Ошибка при генерации аудио:", error);
        setAudioError("Произошла ошибка при генерации музыки. Пожалуйста, попробуйте еще раз.");
        setIsGenerating(false);
      }
    }, 1000);
  };

  const handleSliderChange = (name: keyof MusicParameters, value: number[]) => {
    setParameters({ ...parameters, [name]: value[0] });
  };

  const handleSelectChange = (name: keyof MusicParameters, value: string) => {
    setParameters({ ...parameters, [name]: value });
  };

  const handleAudioError = (error: any) => {
    console.error("Ошибка аудио:", error);
    setAudioError("Не удалось воспроизвести аудио. Пожалуйста, попробуйте сгенерировать трек еще раз.");
  };

  return (
    <Card className="w-full max-w-3xl bg-card border-2 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center">Генератор музыки с ИИ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Жанр</label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={parameters.genre === genre ? "default" : "outline"}
                  onClick={() => handleSelectChange("genre", genre)}
                  className="flex-grow"
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Настроение</label>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <Button
                  key={mood}
                  variant={parameters.mood === mood ? "default" : "outline"}
                  onClick={() => handleSelectChange("mood", mood)}
                  className="flex-grow"
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Темп: {parameters.tempo} BPM</label>
            <Slider
              value={[parameters.tempo]}
              min={60}
              max={200}
              step={1}
              onValueChange={(value) => handleSliderChange("tempo", value)}
              className="my-4"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Длительность: {parameters.duration} секунд</label>
            <Slider
              value={[parameters.duration]}
              min={15}
              max={120}
              step={5}
              onValueChange={(value) => handleSliderChange("duration", value)}
              className="my-4"
            />
          </div>
        </div>

        {isGenerating ? (
          <div className="space-y-2">
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-in-out"
                style={{ width: `${generationProgress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Нейросеть создаёт музыку... {Math.round(generationProgress)}%
            </p>
          </div>
        ) : (
          <Button 
            onClick={handleGenerate}
            className="w-full"
            size="lg"
          >
            <Icon name="Music" className="mr-2" />
            Создать музыку
          </Button>
        )}

        {audioError && !isGenerating && (
          <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
            {audioError}
            <Button 
              onClick={handleGenerate} 
              variant="outline" 
              size="sm" 
              className="mt-2 w-full"
            >
              Попробовать снова
            </Button>
          </div>
        )}

        {audioUrl && !isGenerating && !audioError && (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg p-4 border">
              <p className="text-sm font-medium mb-3">
                {parameters.genre} • {parameters.mood} • {parameters.tempo} BPM
              </p>
              
              <AudioPlayer 
                audioUrl={audioUrl} 
                title={`${parameters.genre} трек - ${parameters.mood}`}
                onError={handleAudioError}
              />
            </div>
            
            <Button onClick={handleGenerate} variant="outline" className="w-full">
              <Icon name="RefreshCw" className="mr-2" />
              Сгенерировать новый трек
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground pt-0">
        <p>Powered by NeuroMusic AI</p>
      </CardFooter>
    </Card>
  );
};

export default MusicGenerator;
