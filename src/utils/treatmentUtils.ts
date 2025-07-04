
import { Leaf, Droplets, Scissors, Microscope, ShieldCheck } from 'lucide-react';

export const getTypeIcon = (type: string) => {
  switch (type) {
    case 'organic': return Leaf;
    case 'cultural': return Scissors;
    case 'biological': return Microscope;
    case 'chemical': return Droplets;
    case 'preventive': return ShieldCheck;
    default: return Leaf;
  }
};

export const getTypeColor = (type: string) => {
  switch (type) {
    case 'organic': return 'bg-green-100 text-green-800 border-green-200';
    case 'cultural': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'biological': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'chemical': return 'bg-red-100 text-red-800 border-red-200';
    case 'preventive': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getTypeHoverColor = (type: string) => {
  switch (type) {
    case 'organic': return 'border-green-200 hover:bg-green-50';
    case 'cultural': return 'border-blue-200 hover:bg-blue-50';
    case 'biological': return 'border-purple-200 hover:bg-purple-50';
    case 'chemical': return 'border-red-200 hover:bg-red-50';
    case 'preventive': return 'border-gray-200 hover:bg-gray-50';
    default: return 'border-gray-200 hover:bg-gray-50';
  }
};

export const getCostColor = (cost: string) => {
  switch (cost) {
    case 'low': return 'text-green-600';
    case 'medium': return 'text-yellow-600';
    case 'high': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

export const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case 'common': return 'text-green-600';
    case 'moderate': return 'text-yellow-600';
    case 'rare': return 'text-red-600';
    default: return 'text-gray-600';
  }
};
