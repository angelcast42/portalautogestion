import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCn'
})
export class FilterCnPipe implements PipeTransform {

  transform(items: any, term: any): any {

    if (term === '') return items
    let result:Array<any>= items.filter(function(item) {
          if(item['municipio'].toString().toLowerCase()==term.nombreMunicipio.toLowerCase()&&item['departamento'].toString().toLowerCase()==term.depto.toLowerCase()){
            return true;
          }
        
      return false;
    });
    if(result.length==0){
      result.push({direccion:'No contamos con un Centro de Negocios en este municipio. ',codigo:'0'})
      return result
    }
    else{
      return result
    }
  }
}
