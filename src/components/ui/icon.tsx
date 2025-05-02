
import React from "react";
import * as LucideIcons from "lucide-react";

interface IconProps {
  name: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  fallback?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  name,
  color,
  size = 24,
  strokeWidth = 2,
  className = "",
  fallback = "CircleAlert",
  onClick,
}) => {
  // Проверяем, существует ли такая иконка в библиотеке
  const IconComponent = 
    (name in LucideIcons) 
      ? LucideIcons[name as keyof typeof LucideIcons] 
      : (fallback in LucideIcons)
        ? LucideIcons[fallback as keyof typeof LucideIcons]
        : LucideIcons.HelpCircle;

  return (
    <IconComponent
      color={color}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      onClick={onClick}
    />
  );
};

export default Icon;
