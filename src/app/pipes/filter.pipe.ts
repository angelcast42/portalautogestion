import { Pipe, PipeTransform,  } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if (term === undefined) return items
    return items.filter(function(item) {
      for(let property in item){
        if (item[property] != null){
          if(item[property].toString().toLowerCase()===term.toLowerCase()){
            return true;
          }
        }else{
        continue
        }

      }
      return false;
    });
  }

}
