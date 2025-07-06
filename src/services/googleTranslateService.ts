
// Browser-compatible translation service with fallback translations
class GoogleTranslateService {
  private isConfigured = false;

  constructor() {
    // Google Cloud Translate is not available in browser environment
    // Using fallback translations only
    console.log('Using fallback translations - Google Translate requires server-side implementation');
    this.isConfigured = false;
  }

  async translateText(text: string, targetLanguage: string = 'tw'): Promise<string> {
    // Always use fallback translations in browser environment
    return this.getFallbackTranslation(text);
  }

  private getFallbackTranslation(text: string): string {
    // Comprehensive fallback translations for common treatment terms
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
      'Natural antifungal spray made from neem tree extract that disrupts fungal cell membranes': 'Abɔdeɛ aduru a efi neem nnua mu a ɛko tia mmoawa a ɛsɛe afuom',
      'Mild soap solution that helps control fungal growth': 'Samina aduru brɛooɔ a ɛko tia mmoawa a ɛsɛe afuom',
      'Mild soap solution that helps control fungal growth and removes spores': 'Samina aduru brɛooɔ a ɛko tia mmoawa a ɛsɛe afuom na ɛyi mmoawa aba',
      'Alkaline spray that prevents fungal spore germination': 'Aduru a ɛsiw mmoawa aba sɛ ɛnnya baabi ntete',
      'Physical removal of diseased plant parts to prevent spread': 'Yi nhaban a ayareɛ ako so no fi hɔ sɛnea ayareɛ no ntrɛw',
      'Increase spacing between plants to reduce humidity': 'Ma ntam wɔ afuom no ntam na mframa nkɔ so yiye',
      'Avoid overhead watering to keep leaves dry': 'Nngugu nsuo wɔ nhaban no so na ɛnyɛ fɔkyɛ',
      
      // Instructions
      'Mix 2 tablespoons of neem oil with 1 gallon of water': 'Fra neem nsuo aduru nkatasoɔ mmienu ne nsuo galɔn baako',
      'Mix 2 tablespoons of neem oil with 1 gallon of water and a few drops of mild soap': 'Fra neem nsuo aduru nkatasoɔ mmienu ne nsuo galɔn baako ne samina kakra',
      'Spray on affected areas in the evening': 'Gugu wɔ beaeɛ a ayareɛ ako so wɔ anwummerɛ',
      'Spray on affected areas in the evening to avoid leaf burn': 'Gugu wɔ beaeɛ a ayareɛ ako so wɔ anwummerɛ na nhaban no nnya hyeɛ',
      'Mix 1 tablespoon of mild dish soap with 1 gallon of water': 'Fra samina nkataso baako ne nsuo galɔn baako',
      'Spray gently on affected leaves, rinse after 30 minutes': 'Gugu brɛooɔ wɔ nhaban a ayareɛ ako so, na hohor wɔ simma 30 akyi',
      'Mix 1 teaspoon baking soda with 1 quart water and few drops of soap': 'Fra baking soda nkataso ketewaa baako ne nsuo ne samina kakra',
      'Spray weekly as preventive treatment': 'Gugu dapɛn biara sɛ aduru a ɛsiw ayareɛ',
      'Cut infected leaves and stems with clean, sharp tools': 'Fa adwinnade a ɛyɛ fi na ano yɛ nam twa nhaban ne dua no mu',
      'Dispose of removed plant material away from garden': 'Fa nhaban a woayii no kɔ baabi a ɛnne turo no',
      'Prune lower branches and thin overcrowded areas': 'Twa mman a ɛwɔ ase ne beaeɛ a afuom no hyɛ hɔ ma',
      'Position plants to catch morning sun and evening breeze': 'To afuom no baabi a anɔpatutuutu owia ne anwummerɛ mframa bɛka',
      'Water at soil level using drip irrigation or soaker hose': 'Gugu nsuo wɔ fam no so fa pipe a nsuo fi mu ba brɛooɔ anaa hose',
      'Water early morning to allow soil to dry during day': 'Gugu nsuo anɔpatutuutu na fam no wo awiaberɛ',

      // Healthy Plant Treatments
      'Continued Care': 'Kɔ So Hwɛ So',
      'Maintain optimal growing conditions': 'Ma tebea a ɛyɛ papa ma afuom nyini yiye no nkɔ so',
      'Continue regular watering and fertilization schedule': 'Kɔ so gugu nsuo ne ma adwadze sɛnea woyɛ daa no',
      'Daily monitoring': 'Da biara hwɛ so',
    };

    return fallbackTranslations[text] || text;
  }

  async translateTreatmentContent(content: string): Promise<string> {
    if (!content || content.trim() === '') return content;
    
    // Check if it's already in Twi (contains Twi-specific characters)
    if (this.isTwiText(content)) {
      return content;
    }

    return this.getFallbackTranslation(content);
  }

  private isTwiText(text: string): boolean {
    // Check for common Twi characters and words
    const twiPatterns = /[ɛɔ]|wɔ|ho|yi|ma|fa|nnua|nsuo|aduru|afuom|nhaban/i;
    return twiPatterns.test(text);
  }
}

export const googleTranslateService = new GoogleTranslateService();
