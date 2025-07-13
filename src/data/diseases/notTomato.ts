import { DiseaseInfo } from '@/types/treatment';

export const notTomatoData: DiseaseInfo = {
  name: "Not a Tomato Plant",
  severity: "not_applicable",
  description: "The uploaded image does not contain a tomato leaf. Our AI system is specifically designed to analyze tomato plant health and cannot provide accurate diagnosis for other plants or objects.",
  expectedRecovery: "N/A - Please upload an image of a tomato leaf for analysis",
  symptoms: [
    "Image does not show tomato plant characteristics",
    "May contain other plants, objects, or people",
    "Cannot be analyzed by our tomato-specific AI model"
  ],
  treatments: [],
  prevention: [
    "Ensure you are photographing tomato plant leaves",
    "Take clear, well-lit photos of the leaf surface",
    "Avoid backgrounds that might confuse the AI",
    "Focus on individual leaves rather than entire plants"
  ],
  farmingTips: [
    "For accurate tomato plant diagnosis, photograph individual leaves",
    "Ensure good lighting when taking photos",
    "Remove any non-tomato elements from the frame",
    "Take multiple photos from different angles if unsure"
  ]
};