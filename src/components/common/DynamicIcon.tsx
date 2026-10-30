import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', size }) => {
  // Map common or custom names
  const normalizedName = name.trim();
  const IconComponent = (LucideIcons as Record<string, any>)[normalizedName] || LucideIcons.ShieldCheck;

  return <IconComponent className={className} size={size} />;
};
