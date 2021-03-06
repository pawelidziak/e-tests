import {Pipe, PipeTransform} from '@angular/core';
import {TestModel} from '../../core/models/Test';

@Pipe({
  name: 'searchTest'
})
export class SearchTestPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((test: TestModel) => {
      return test.name.toLowerCase().includes(searchText) ||
        test.desc.toLowerCase().includes(searchText) ||
        JSON.stringify(test.tags).toLowerCase().includes(searchText);
    });

  }
}
