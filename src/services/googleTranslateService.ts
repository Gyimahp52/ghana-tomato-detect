
import { Translate } from '@google-cloud/translate/build/src/v2';

// Note: In production, you'll need to set up Google Cloud credentials
// For now, we'll use a fallback system with manual translations
class GoogleTranslateService {
  private translate: Translate | null = null;
  private isConfigured = false;

  constructor() {
    try {
      // Initialize Google Translate if credentials are available
      // In production, set GOOGLE_CLOUD_PROJECT_ID and credentials
      this.translate = new Translate();
      this.isConfigured = true;
    } catch (error) {
      console.log('Google Translate not configured, using fallback translations');
      this.isConfigured = false;
    }
  }

  async translateText(text: string, targetLanguage: string = 'tw'): Promise<string> {
    if (!this.isConfigured || !this.translate) {
      // Fallback to manual translations for common phrases
      return this.getFallbackTranslation(text);
    }

    try {
      const [translation] = await this.translate.translate(text, {
        from: 'en',
        to: targetLanguage === 'tw' ? 'ak' : targetLanguage, // 'ak' is Akan/Twi code
      });
      
      console.log('Google Translate result:', translation);
      return translation;
    } catch (error) {
      console.error('Google Translate error:', error);
      return this.getFallbackTranslation(text);
    }
  }

  private getFallbackTranslation(text: string): string {
    // Fallback translations for common treatment terms
    const fallbackTranslations: Record<string, string> = {
      // Treatment methods
      'Neem Oil Spray': 'Neem Nnua Nsuo Aduru',
      'Soap Water Solution': 'Samina ne Nsuo Aduru',
      'Baking Soda Spray': 'Baking Soda Aduru',
      'Remove Affected Leaves': 'Yi Nhaban a Ayareɛ Ako So',
      'Improve Air Circulation': 'Ma Mframa Nkɔ Afuom No So Yiye',
      'Water at Plant Base': 'Gugu Nsuo Wɔ Afuom No Ase',
      
      // Common descriptions
      'Natural antifungal spray made from neem tree extract': 'Abɔdeɛ aduru a efi neem nnua mu a ɛko tia mmoawa',
      'Mild soap solution that helps control fungal growth': 'Samina aduru brɛooɔ a ɛko tia mmoawa a ɛsɛe afuom',
      'Alkaline spray that prevents fungal spore germination': 'Aduru a ɛsiw mmoawa aba sɛ ɛnnya baabi ntete',
      'Physical removal of diseased plant parts': 'Yi nhaban a ayareɛ ako so no fi hɔ sɛnea ayareɛ no ntrɛw',
      'Increase spacing between plants to reduce humidity': 'Ma ntam wɔ afuom no ntam na mframa nkɔ so yiye',
      'Avoid overhead watering to keep leaves dry': 'Nngugu nsuo wɔ nhaban no so na ɛnyɛ fɔkyɛ',
      
      // Instructions
      'Mix 2 tablespoons of neem oil with 1 gallon of water': 'Fra neem nsuo aduru nkatasoɔ mmienu ne nsuo galɔn baako',
      'Spray on affected areas in the evening': 'Gugu wɔ beaeɛ a ayareɛ ako so wɔ anwummerɛ',
      'Mix 1 tablespoon of mild dish soap with 1 gallon of water': 'Fra samina nkataso baako ne nsuo galɔn baako',
      'Cut infected leaves and stems with clean, sharp tools': 'Fa adwinnade a ɛyɛ fi na ano yɛ nam twa nhaban ne dua no mu',
      'Water at soil level using drip irrigation': 'Gugu nsuo wɔ fam no so fa pipe a nsuo fi mu ba brɛooɔ',
    };

    return fallbackTranslations[text] || text;
  }

  async translateTreatmentContent(content: string): Promise<string> {
    if (!content || content.trim() === '') return content;
    
    // Check if it's already in Twi (contains Twi-specific characters)
    if (this.isTwiText(content)) {
      return content;
    }

    return await this.translateText(content, 'tw');
  }

  private isTwiText(text: string): boolean {
    // Check for common Twi characters and words
    const twiPatterns = /[ɛɔ]|wɔ|ho|yi|ma|fa|nnua|nsuo|aduru|afuom|nhaban/i;
    return twiPatterns.test(text);
  }
}

export const googleTranslateService = new GoogleTranslateService();
