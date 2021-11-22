import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { TranslationEntries } from './translation-entries';
import { TRANSLATION_ENTRIES_DE } from './translation-entries.de';
import { TRANSLATION_ENTRIES_EN } from './translation-entries.en';

export class FileTranslateLoader implements TranslateLoader {
  private readonly translations: Map<string, TranslationEntries> = new Map([
    ['en', TRANSLATION_ENTRIES_EN],
    ['de', TRANSLATION_ENTRIES_DE],
  ]);

  getTranslation(lang: string): Observable<TranslationEntries | undefined> {
    return of(this.translations.get(lang));
  }
}
