
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
  const IconComponent = LucideIcons[name as keyof typeof LucideIcons] || 
                         LucideIcons[fallback as keyof typeof LucideIcons];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found and fallback "${fallback}" also not found`);
    return null;
  }

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
