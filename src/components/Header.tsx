
import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Header: React.FC = () => {
  return (
    <header className="bg-background border-b py-4 px-6">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon name="Music2" size={24} className="text-primary" />
          <h1 className="text-xl font-bold">НейроМузыка</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-foreground hover:text-primary transition-colors">Главная</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">О проекте</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">Примеры</a>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Icon name="LogIn" size={16} />
            Войти
          </Button>
          <Button size="sm">
            Регистрация
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
