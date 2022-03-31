import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'overUnder',
})
export class OverUnderPipe implements PipeTransform {
  transform(value: number | null, index: number): string {
    return `${index === 0 ? 'O' : 'U'} ${value}`;
  }
}
