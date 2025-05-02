
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const features = [
  {
    icon: "Sparkles",
    title: "ИИ-генерация",
    description: "Наша нейросеть создает уникальные музыкальные композиции на основе ваших предпочтений"
  },
  {
    icon: "Download",
    title: "Скачивание",
    description: "Загружайте сгенерированную музыку в высоком качестве для любого использования"
  },
  {
    icon: "Settings",
    title: "Гибкая настройка",
    description: "Настраивайте жанр, темп, настроение и другие параметры для вашей идеальной музыки"
  }
];

const InfoSection: React.FC = () => {
  return (
    <section className="py-12 px-6 bg-accent/30">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Как это работает</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card shadow-sm border-2 hover:shadow-md transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name={feature.icon as any} className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Технология</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Наша технология использует продвинутые алгоритмы машинного обучения и нейронные сети для анализа тысяч 
            музыкальных произведений. На основе этих данных ИИ создает новые уникальные композиции, соответствующие 
            вашим пожеланиям и параметрам.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
