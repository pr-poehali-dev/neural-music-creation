
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface MusicParameters {
  genre: string;
  tempo: number;
  mood: string;
  duration: number;
}

const genres = ["Поп", "Рок", "Электронная", "Хип-хоп", "Классическая", "Джаз", "Эмбиент"];
const moods = ["Веселая", "Грустная", "Энергичная", "Спокойная", "Мистическая"];

// Используем гарантированно публичные аудиофайлы
const genreAudios = {
  "Поп": "https://file-examples.com/storage/fef1706276a764f06984236/2017/11/file_example_MP3_700KB.mp3",
  "Рок": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "Электронная": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "Хип-хоп": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "Классическая": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "Джаз": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "Эмбиент": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
};

const MusicGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  
  const [parameters, setParameters] = useState<MusicParameters>({
    genre: "Электронная",
    tempo: 120,
    mood: "Энергичная",
    duration: 30,
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
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

  // Имитация получения аудиофайла
  const simulateAudioGeneration = () => {
    setTimeout(() => {
      // Выбираем аудио в зависимости от выбранного жанра
      const generatedAudio = genreAudios[parameters.genre] || genreAudios["Электронная"];
      setAudioUrl(generatedAudio);
      setIsGenerating(false);
    }, 1000);
  };

  const handleSliderChange = (name: keyof MusicParameters, value: number[]) => {
    setParameters({ ...parameters, [name]: value[0] });
  };

  const handleSelectChange = (name: keyof MusicParameters, value: string) => {
    setParameters({ ...parameters, [name]: value });
  };

  const handleDownload = () => {
    if (audioUrl) {
      // Создаем прямую ссылку для скачивания
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `${parameters.genre}-${parameters.mood}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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

        {audioUrl && !isGenerating && (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg p-4 border bg-accent/20">
              <div className="space-y-3">
                <p className="text-sm font-medium">
                  {parameters.genre} • {parameters.mood} • {parameters.tempo} BPM
                </p>
                
                {/* Стандартный HTML5 аудио-плеер с контролами */}
                <audio 
                  controls 
                  className="w-full" 
                  src={audioUrl} 
                  controlsList="nodownload"
                >
                  Ваш браузер не поддерживает аудио элемент.
                </audio>
                
                <Button onClick={handleDownload} variant="secondary" size="sm" className="w-full">
                  <Icon name="Download" className="mr-2" />
                  Скачать трек
                </Button>
              </div>
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
