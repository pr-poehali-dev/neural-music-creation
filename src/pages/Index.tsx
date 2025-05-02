
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MusicGenerator from "@/components/MusicGenerator";
import InfoSection from "@/components/InfoSection";

const Index = () => {
  // Используем проверенные публичные аудио
  const exampleAudios = [
    {
      id: 1,
      genre: "Электронная",
      mood: "Энергичная",
      bpm: 128,
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    {
      id: 2,
      genre: "Джаз",
      mood: "Спокойная",
      bpm: 95,
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },
    {
      id: 3,
      genre: "Поп",
      mood: "Веселая",
      bpm: 120,
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    }
  ];

  const handleDownloadExample = (url: string, id: number) => {
    // Прямое скачивание через программное нажатие на ссылку
    const link = document.createElement('a');
    link.href = url;
    link.download = `пример-${id}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-background to-accent/20">
          <div className="container max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Создавайте музыку с помощью ИИ
            </h1>
            <p className="text-xl mb-10 text-muted-foreground max-w-3xl mx-auto">
              Наша нейросеть генерирует уникальные музыкальные композиции на основе ваших предпочтений. 
              Просто выберите параметры и получите готовый аудиотрек.
            </p>
            
            <div className="flex justify-center">
              <MusicGenerator />
            </div>
          </div>
        </section>
        
        {/* Info Section */}
        <InfoSection />
        
        {/* Examples Section */}
        <section className="py-16 px-6">
          <div className="container max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Примеры сгенерированной музыки</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exampleAudios.map((example) => (
                <div key={example.id} className="bg-card p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Пример {example.id}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {example.genre} • {example.mood} • {example.bpm} BPM
                  </p>
                  
                  {/* Стандартный HTML5 аудио-плеер */}
                  <audio 
                    controls 
                    className="w-full mb-4" 
                    src={example.audio}
                    controlsList="nodownload"
                  >
                    Ваш браузер не поддерживает аудио элемент.
                  </audio>
                  
                  <Button 
                    onClick={() => handleDownloadExample(example.audio, example.id)}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    <Icon name="Download" className="mr-2" />
                    Скачать трек
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
