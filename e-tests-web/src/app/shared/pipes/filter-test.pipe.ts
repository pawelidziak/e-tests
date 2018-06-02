import {Pipe, PipeTransform} from '@angular/core';
import {TestShortInfo} from '../../core/models/TestShortInfo';

@Pipe({
  name: 'filterTest'
})
export class FilterTestPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((test: TestShortInfo) => {
      return test.testName.toLowerCase().includes(searchText) || test.author.toLowerCase().includes(searchText);
    });
    // TODO sections
  }
}
