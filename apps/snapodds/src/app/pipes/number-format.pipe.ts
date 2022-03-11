import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
})
export class NumberFormatPipe implements PipeTransform {
  /**
   * Prepend a plus sign for positive numbers to improve readability
   * @param value
   */
  transform(value: number | null): string {
    if (!value) return '';
    return value >= 0 ? `+${value}` : `${value}`;
  }
}
