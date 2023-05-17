import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceComma',
})
export class replaceComma implements PipeTransform {
  transform(value: string): string {
    if (!!value) {
      return value.replace(/,/g, '.');
    } else {
      return '';
    }
  }
}
