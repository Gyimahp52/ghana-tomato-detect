
import { TreatmentMethod } from '@/types/treatment';
import { googleTranslateService } from './googleTranslateService';

export class EnhancedTranslationService {
  private cache: Map<string, string> = new Map();

  async translateTreatment(treatment: TreatmentMethod, targetLanguage: 'en' | 'tw'): Promise<TreatmentMethod> {
    if (targetLanguage === 'en') {
      return treatment; // Return original if English
    }

    console.log('Translating treatment to Twi:', treatment.name);

    try {
      const [translatedName, translatedDescription, translatedApplication, translatedFrequency] = await Promise.all([
        this.getCachedTranslation(treatment.name),
        this.getCachedTranslation(treatment.description),
        this.getCachedTranslation(treatment.application),
        this.getCachedTranslation(treatment.frequency),
      ]);

      const translatedIngredients = treatment.ingredients 
        ? await Promise.all(treatment.ingredients.map(ingredient => this.getCachedTranslation(ingredient)))
        : undefined;

      return {
        ...treatment,
        name: translatedName,
        description: translatedDescription,
        application: translatedApplication,
        frequency: translatedFrequency,
        ingredients: translatedIngredients,
      };
    } catch (error) {
      console.error('Translation error:', error);
      return treatment; // Return original on error
    }
  }

  private async getCachedTranslation(text: string): Promise<string> {
    if (this.cache.has(text)) {
      return this.cache.get(text)!;
    }

    // Use the browser-compatible fallback translation service
    const translation = await googleTranslateService.translateTreatmentContent(text);
    this.cache.set(text, translation);
    return translation;
  }

  async translateContent(content: string, targetLanguage: 'en' | 'tw'): Promise<string> {
    if (targetLanguage === 'en') {
      return content;
    }

    return await this.getCachedTranslation(content);
  }
}

export const enhancedTranslationService = new EnhancedTranslationService();
