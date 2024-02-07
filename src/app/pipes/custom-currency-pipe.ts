import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CustomCurrency',
})
export class CustomCurrency implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (value.length > 0) {
      const valueList = value.split('');
      let newValue = '';
      console.log(valueList);
      valueList.forEach((element: string) => {
        if (!isNaN(Number(element))) {
          newValue = newValue + element;
        }
      });
      return newValue;
    }
    return value;
  }
}
