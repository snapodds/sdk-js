import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { TranslationEntries } from './translation-entries';
import { TRANSLATION_ENTRIES_DE } from './translation-entries.de';
import { TRANSLATION_ENTRIES_EN } from './translation-entries.en';

export class FileTranslateLoader implements TranslateLoader {
  /**
   * Map of translation entries which are inlined during build time, so they don't have to be externally loaded
   * @private
   */
  private readonly translations: Map<string, TranslationEntries> = new Map([
    ['en', TRANSLATION_ENTRIES_EN],
    ['de', TRANSLATION_ENTRIES_DE],
  ]);

  /**
   * Retrieves the translation entries for the given language
   * @param lang: two letter language code
   */
  getTranslation(lang: string): Observable<TranslationEntries | undefined> {
    return of(this.translations.get(lang));
  }
}