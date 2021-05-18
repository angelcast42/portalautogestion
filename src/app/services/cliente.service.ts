import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';
import * as xml2js from 'xml2js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  dataCliente
  dataPatron
  dataPersonales
  dataLaborales
  resultData
  constructor(
    private http:Http,
    private soap: NgxSoapService,
  ) { 

  }

  generatePdf(infoCliente){
    var docDefinition = {
      content: [
        {
          style:'table',
          table:{//titulo ive e imagen
            widths:['*',180,'*'],
            body:[
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:'\n'
                },
                {
                  rowSpan: 4,
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  width: 70,
                  style:{
                    alignment: 'center',
                  },
                  image: 'data:image/jpeg;base64,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',
                  
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:'\n'
                },
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'FORMULARIO IVE-NF-30',
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Número o Código de Cliente:',
                }
              ],
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text:'10101'//variable codigo cliente o numero
                }
              ],
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text:'FORMULARIO PARA INICIO DE RELACIONES',
                  style:{
                    alignment: 'center',
                    bold: true,
                  }
                }
              ]
            ]
          }
        },//fin table titulo ive e imagen
        {
          style:'table',
          table:{//titulo ive e imagen
            widths:['15%','50%','15%','20%'],
            body:[
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '1. LUGAR:',
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: infoCliente.ciudad,//variable lugar
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '2. FECHA:',
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text:'18/01/2021',//variable fecha
                }
              ]
            ]
          }
        },
        {
          style:'table',
          table:{//titulo ive e imagen
            widths:['5%','35%','25%','35%'],
            body:[
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#000000',
                  text: '3.',
                  style:{
                    color: '#ffffff'
                  }
                },
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#000000',
                  text: 'DATOS DE LA PERSONA OBLIGADA (PO)',//variable lugar
                  style:{
                    color: '#ffffff',
                    alignment: 'center'
                  }
                },
                '',
                ''
              ],
              [
                {
                  border:[true,true,false,true],
                  fillColor:'#cccccc',
                  text: '3.1'
                },
                {
                  colSpan: 2,
                  border:[false,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Nombre Completo o Razón Social y Nombre Comercial:'//variable lugar
                },
                '',
                ''
              ],
              [
                {
                  border:[true,true,false,true],
                  fillColor:'#cccccc',
                  text: '3.2'
                },
                {
                  colSpan: 2,
                  border:[false,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Nombre de la central, sucursal o agencia donde se solicita el producto o servicio:'//variable lugar
                },
                '',
                {
                  border:[false,true,true,true],
                  fillColor:'#cccccc',
                  text: '3.2.1 Código de agencia o sucursal:'//variable lugar
                }
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Central'//variable nombre central,sucursal
                },
                '',
                '',
                ''
              ]
            ]
          }
        },
        {
          style:'table',
          table:{//Datos personales
            widths:['5%','15%','20%','20%','20%','20%'],
            body:[
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#000000',
                  text: '4.',
                  style:{
                    color: '#ffffff'
                  }
                },
                {
                  colSpan: 5,
                  border:[true,true,true,true],
                  fillColor:'#000000',
                  text: 'DATOS PERSONALES DEL SOLICITANTE / CLIENTE',
                  style:{
                    color: '#ffffff',
                    alignment: 'center'
                  }
                },
                '',
                '',
                '',
                ''
              ],
              [
                {
                  border:[true,true,false,true],
                  fillColor:'#cccccc',
                  text: '4.1'
                },
                {
                  colSpan: 2,
                  border:[false,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Tipo de Persona:'
                },
                '',
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Individual'//variable tipo persona
                },
                '',
                ''
              ],
              [
                {
                  border:[true,true,false,true],
                  fillColor:'#cccccc',
                  text: '4.2'
                },
                {
                  colSpan: 3,
                  border:[false,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Nombre completo de la persona individual o Representante Legal de la persona jurídica:'
                },
                '',
                '',
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: infoCliente.primerNombre+' '+infoCliente.primerApellido//variable Nombre completo de la persona individual
                },
                ''
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.2.1 Primer apellido:'
                },
                '','',
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.2.2 Segundo apellido:'
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.2.3 Apellido de casada:'
                },
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: infoCliente.primerApellido//variable Primer apellido
                },
                '','',
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable segundo apellido
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable apellido de casada
                },
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.2.4 Primer nombre:'
                },
                '','',
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.2.5 Segundo nombre:'
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.2.6 Otros nombres:'
                },
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: infoCliente.primerNombre//variable Primer nombre
                },
                '','',
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable segundo nombre
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable otros nombres
                },
              ],
              [
                {
                  border:[true,true,false,true],
                  fillColor:'#cccccc',
                  text: '4.3'
                },
                {
                  colSpan: 5,
                  border:[false,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Datos específicos de la persona individual o Representante Legal de la persona jurídica:'
                },
                '',
                '',
                '',
                ''
              ],
              [
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.3.1 Lugar de nacimiento:'
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.3.2 Género:'
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.3.3 Estado Civil:'
                },
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.3.4 Prefesión u oficio:'
                },
                ''
              ],
              [
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Guatemala'//variable lugar de nacimiento
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Femenino'//variable de genero
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Soltero'//variable Estado civil
                },
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable profesión
                },
                ''
              ],
              [
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.3.5 Tipo de identificación:'
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.3.5.1 Número de identificación:'
                },
                {
                  colSpan:3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  table:{
                    widths:['*','*','*'],
                    style:{
                      margin:[0, 0, 0, 0]
                    },
                    body:[
                      [
                        {
                          colSpan: 3,
                          border:[false,false,false,false],
                          fillColor:'#cccccc',
                          text: '4.3.5.2 Lugar de emisión:'
                        },
                        '',
                        ''
                      ],
                      [
                        {
                          border:[false,false,false,false],
                          fillColor:'#cccccc',
                          text: 'Departamento:'
                        },
                        {
                          border:[false,false,false,false],
                          fillColor:'#cccccc',
                          text: 'Municipio:'
                        },
                        {
                          border:[false,false,false,false],
                          fillColor:'#cccccc',
                          text: 'País:'
                        }
                      ]
                    ]
                  }
                },
                '',
                ''
              ],
              [
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Guatemala'//variable tipo identificacion
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable numero de identificacion
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable de departamento
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable de municipio
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable de pais
                }
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.3.6 Condición migratoria:'
                },
                '','',
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable condicion migratoria
                }
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.4 Razón Social/Nombre Comercial (Persona jurídica):'
                },
                '','',
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable nombre comercial
                }
              ],
              [
                {
                  colSpan: 6,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.5 Información general de la persona individual o jurídica:'
                }
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.5.1 Fecha nacimiento (PI) creación o constitución (PJ):'
                },
                '','',
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.5.2 Nacionalidad (PI)/País de Constitución (PJ):'
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.5.3 Otra nacionalidad (PI):'
                },
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: infoCliente.fechaNacimiento//variable fecha nacimiento
                },
                '','',
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable nacionalidad
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable otra nacionalidad
                },
              ],
              [
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.5.4 Número de identificación tributaria (NIT):'
                },
                '',

                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.5.5 Teléfono (línea fija):'
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.5.6 Celular / Móvil:'
                },
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.5.7 Correo electrónico / e-mail:'
                }
              ],
              [
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: '82608949'//variable nit
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable telefono fijo
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable movil
                },
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable email
                },
              ],
            ]
          }
        },
        {
          style:'table',
          table:{//titulo ive e imagen
            widths:['*',180,'*'],
            body:[
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:'\n'
                },
                {
                  rowSpan: 4,
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  width: 70,
                  style:{
                    alignment: 'center',
                  },
                  image: 'data:image/jpeg;base64,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',
                  
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:'\n'
                },
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'FORMULARIO IVE-NF-30',
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Número o Código de Cliente:',
                }
              ],
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text:'10101'//variable codigo cliente o numero
                }
              ],
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text:'FORMULARIO PARA INICIO DE RELACIONES',
                  style:{
                    alignment: 'center',
                    bold: true,
                  }
                }
              ]
            ]
          }
        },//fin table titulo ive e imagen
        {
          style:'table',
          table:{
            widths:['*','*','*','*'],
            body:[
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.5.8 Dirección particular o sede social completa: (No. de calle o avenida, No. de casa, colonia, sector, lote, manzana, otros)',
                },
                '','',''
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: infoCliente.direccion//variable direccion particular
                },
                '','',''
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Zona:\n 11'//variable zona direccion
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Departamento:\n '//variable depto direccion
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Municipio:\n '//variable municipio direccion
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'País:\n '//variable pais direccion
                }
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.6 El solicitante/cliente actúa en nombre propio (PI) o en beneficio de la entidad antes descrita (Rep. Legal):',
                },
                '','',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable PI - Rep. legal
                },
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '4.6.1 Si la respuesta anterior es negativa, proporcionar el nombre completo de la persona y/o razón social de la entidad en nombre de quien actúa:',
                },
                '','',''
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable descripcion PI
                },
                '','',''
              ],
            ]
          }
        },
        {
          style:'table',
          table:{
            widths:['25%','25%','25%','25%'],
            body:[
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#000000',
                  text: '5. INFORMACIÓN ECONÓMICO-FINANCIERA DEL SOLICITANTE/CLIENTE',
                  style:{
                    color: '#ffffff',
                    alignment: 'center'
                  }
                },
                '','',''
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#474747',
                  text: 'Información persona individual:',
                  style:{
                    color: '#ffffff'
                  }
                },
                '','',''
              ],
              [
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.1 Fuentes de ingreso:'
                },
                '',
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable fuente de ingresos
                },
                ''
              ],
              [
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.1.1 Nombre de empresa/institución donde trabaja o del negocio:'
                },
                '',
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable nombre empresa
                },
                ''
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.1.1.1 Puesto o cargo que desempeña:'
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable puesto 
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.1.1.2 Número(s) de teléfono(s):'
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable numeros telefono
                }
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.1.1.3 Dirección o sede social completa de la empresa/institución donde trabaja o del negocio: (No. de calle o avenida, No. de casa, colonia, sector, lote, manzana, otros)',
                },
                '','',''
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable direccion
                },
                '','',''
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Zona:\n 21'//variable zona direccion
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Departamento:\n '//variable depto direccion
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Municipio:\n '//variable municipio direccion
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'País:\n '//variable pais direccion
                }
              ],
              [
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.1.2 Otras fuentes o ingresos adicionales especificar:'
                },
                '',
                {
                  colSpan: 2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable otra fuentes
                },
                ''
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#474747',
                  text: 'Información persona individual con negocio propio:',
                  style:{
                    color: '#ffffff'
                  }
                },
                '','',''
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.1.1.1 Número de identificación tributaria (NIT):'
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable puesto 
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.1.1.2 Número(s) de teléfono(s):'
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable numeros telefono
                }
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.1.1.3 Dirección o sede completa de la empresa/institución donde trabaja o del negocio: (No. de calle o avenida, No. de casa, colonia, sector, lote, manzana, otros)',
                },
                '','',''
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable direccion
                },
                '','',''
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Zona:\n 21'//variable zona direccion
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Departamento:\n '//variable depto direccion
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'Municipio:\n '//variable municipio direccion
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'País:\n '//variable pais direccion
                }
              ]
            ]
          },
          pageBreak: 'after'
        },
        {
          style:'table',
          table:{//titulo ive e imagen
            widths:['*',180,'*'],
            body:[
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:'\n'
                },
                {
                  rowSpan: 4,
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  width: 70,
                  style:{
                    alignment: 'center',
                  },
                  image: 'data:image/jpeg;base64,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',
                  
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:'\n'
                },
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'FORMULARIO IVE-NF-30',
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Número o Código de Cliente:',
                }
              ],
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text:'10101'//variable codigo cliente o numero
                }
              ],
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text:'FORMULARIO PARA INICIO DE RELACIONES',
                  style:{
                    alignment: 'center',
                    bold: true,
                  }
                }
              ]
            ]
          }
        },
        {
          style: 'table',
          table:{
            widths:['25%','25%','25%','25%'],
            body:[
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#474747',
                  text: 'Información persona individual con negocio propio o de la personas jurídica:',
                  style:{
                    color: '#ffffff'
                  }
                },
                '','',''
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text:[ '5.2',
                  { text: ' Actividad económica en que la entidad, negocio o empresa se desarrolla: Indicar la actividad específica desarrollada en el sector económico al que pertenece, tales como:', fontSize: 11, bold: true }, 
                  {text:' Comercio de vehículos, joyas, vestuario; Producción de alimentos, calzado; Agricultura de café, cardamomo, banano, papa; Ganadería bovina, vacuna, porcina; Servicios Profesionales privados de abogacía y notariado, auditoría y contaduría pública, médicos; Sector Público tal como Municipalidad, Ministerio, Secretaría, Superintendencia;  entre otros.',fontSize:10}
                ]
              },
                '','',''
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable Actividad económica
                },
                '','',''
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.2.1 No. de subsidiarias, agencias, oficinas, etc.:'
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable numero de agencias 
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.2.2 No. estimado de empleados que laboran en la entidad:'
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable numero de empleados
                }
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.3 Nombre y país de ubicación de los principales proveedores y clientes (cuando aplique):',
                },
                '','',''
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.3.1 Nombre proveedor(es)',
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'País ubicación proveedor(es)',
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.3.2 Nombre cliente(s)',
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'País ubicación cliente(s)',
                }
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable nombre proveedor 1
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable pais ubicacion proveedor 1
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable nombre cliente 1
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable pais cliente 1
                }
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable nombre proveedor 2
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable pais ubicacion proveedor 2
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable nombre cliente 2
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable pais cliente 2
                }
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#474747',
                  text: 'Información persona individual o jurídica:',
                  style:{
                    color: '#ffffff'
                  }
                },
                '','',''
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.6 Ingresos y Egresos mensuales aproximados Persona Individual:',
                },
                '',
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '5.7 Ingresos y Egresos mensuales aproximados Personas Jurídica:',
                },
                ''
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Ingresos'
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Egresos'
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Ingresos'
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Egresos'
                }
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable ingresos persona individual
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable egresos persona individual
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable ingresos persona juridica
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable egresos persona juridica
                },
              ]
            ]
          }
        },
        {
          style:'table',
          table:{
            widths:['25%','25%','25%','25%'],
            body:[
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#000000',
                  text: '6. DATOS DEL PRODUCTO O SERVICIO SOLICITADO POR EL SOLICITANTE / CLIENTE',
                  style:{
                    color: '#ffffff',
                    alignment: 'center'
                  }
                },
                '','',''
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '6.1 Tipo de producto o servicio:',
                },
                '',
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '6.2 Valor total del producto o servicio (monto):',
                },
                ''
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable tipo producto
                },
                '',
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable valor del producto
                },
                ''
              ],
              [
                {
                  colSpan:4,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '6.3 Descripción o datos generales del producto o servicio:',
                },
                '','',''
              ],
              [
                {
                  colSpan:4,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable descripcion producto
                },
                '','',''
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '6.4 Monto inicial a manejar en el producto o servicio:',
                },
                '',
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '6.5 Monto mensual a manejar en el producto o servicio:',
                },
                ''
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//monto inicial producto
                },
                '',
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable monto mensual de producto
                },
                ''
              ],
              [
                {
                  colSpan:4,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '6.6 Propósito o destino del producto o servicio:',
                },
                '','',''
              ],
              [
                {
                  colSpan:4,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable proposito del producto
                },
                '','',''
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text:[ '6.7',
                  { text: ' Procedencia u origen de los fondos, valores o bienes para el inicio o durante la relación comercial:', fontSize: 11, bold: true }, 
                  {text:' Indicar si son sueldos, salarios, remesas, manutención, pensiones por jubilación, ahorros personales, intereses, dividendos, utilidades, venta de inmuebles o vehículos, ventas o servicios del negocio, arrendamiento, préstamo o cancelación de cuenta o inversión (adicional indicar la entidad).',fontSize:10}
                ]
                },
                '','',''
              ],
              [
                {
                  colSpan:4,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable origen de los fondos
                },
                '','',''
              ]
            ]
          },
          pageBreak: 'after'
        },
        {
          style:'table',
          table:{//titulo ive e imagen
            widths:['*',180,'*'],
            body:[
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:'\n'
                },
                {
                  rowSpan: 4,
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  width: 70,
                  style:{
                    alignment: 'center',
                  },
                  image: 'data:image/jpeg;base64,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',
                  
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:'\n'
                },
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'FORMULARIO IVE-NF-30',
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Número o Código de Cliente:',
                }
              ],
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text:'10101'//variable codigo cliente o numero
                }
              ],
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text:'FORMULARIO PARA INICIO DE RELACIONES',
                  style:{
                    alignment: 'center',
                    bold: true,
                  }
                }
              ]
            ]
          }
        },
        {
          style: 'table',
          table:{
            widths:['25%','25%','25%','25%'],
            body:[
              [
                {
                  colSpan:3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '6.8 Realizará transferencias o traslado de fondos, valores o bienes: (Si es afirmativa, indicar la información siguiente)',
                },
                '','',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable traslado de fondos
                }
              ],
              [
                {
                  colSpan:3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '6.8.1 Las transferencias o traslado de fondos, valores o bienes se realizaran a nivel:',
                },
                '','',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable nivel traslado de fondos
                }
              ]
            ]
          }
        },
        {
          style:'table',
          table:{
            widths:['25%','25%','25%','25%'],
            body:[
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#000000',
                  text: '7. PERSONA EXPUESTA POLÍTICAMENTE (PEP) -Persona individual o Representante Legal de la persona jurídica-',
                  style:{
                    color: '#ffffff',
                    alignment: 'center'
                  }
                },
                '','',''
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text:[
                  { text: 'PEP:', fontSize: 11, bold: true }, 
                  {text:' Quien desempeñe o haya desempeñado un cargo público relevante en Guatemala u otro país, un cargo prominente en un organismo internacional, dirigentes de  partidos políticos nacionales o de otro país.',fontSize:10}
                ]
                },
                '','',''
              ],
              [
                {
                  colSpan:3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '7.1 El solicitante (Persona individual o Representante Legal) es Persona Expuesta Políticamente (PEP):',
                },
                '','',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable persona es pep si/no
                }
              ],
              [
                {
                  colSpan:3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '7.2 El solicitante (Persona individual o Representante Legal) tiene parentesco con una PEP:',
                },
                '','',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable parentesco con pep si/no
                },
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '7.2.1 Indicar parentesco:',
                },
                '',
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable tipo parentesco
                },
                ''
              ],
              [
                {
                  colSpan:3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '7.3 El solicitante (Persona individual o Representante Legal) es asociado cercano de una PEP:',
                },
                '','',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable asociado de un pep si/no
                },
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '7.3.1 Indicar motivos:',
                },
                '',
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable motivo asociacion
                },
                ''
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '7.4 Datos de la persona que desempeña el cargo público relevante (PEP):',
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '7.4.1 Condición:'
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//condición nacional/extranjero
                }
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '7.4.2 Primer apellido:',
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Segundo apellido:',
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Apellido de casada:',
                },
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable primer apellido
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable segundo apellido
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable apellido de casada
                }
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Primer nombre:',
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Segundo nombre:',
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Otros nombres:',
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '7.4.3 Género',
                },
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable primer nombre
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable segundo nombre
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable otros nombres
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable genero
                }
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '7.4.4 Nombre de la institución o ente donde trabaja::',
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '7.4.5 Puesto que desempeña:',
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '7.4.3 Género:',
                },
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable nombre institucion
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable puesto 
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable genero
                }
              ],
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text:[ '7.5',
                  { text: ' En el caso del que el solicitante sea PEP (relacionado con numeral 7.1), indicar el origen o procedencia de su riqueza:', fontSize: 11, bold: true }, 
                  {text:' Riqueza: Conjunto de bienes inmuebles y muebles que éste posea de acuerdo a lo estipulado en los artículos 445, 446 y 451, del Código Civil, Decreto Ley Número 106; y, puede tener como origen herencias, negocios propios, servicios profesionales, desempeño en puestos de trabajo anteriores, préstamos bancarios, entre otros. ',fontSize:10}
                ]
                },
                '','',''
              ],
              [
                {
                  colSpan:4,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable origen riqueza
                },
                '','',''
              ]
            ]
          },
          pageBreak: 'after'
        },
        {
          style:'table',
          table:{//titulo ive e imagen
            widths:['*',180,'*'],
            body:[
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:'\n'
                },
                {
                  rowSpan: 4,
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  width: 70,
                  style:{
                    alignment: 'center',
                  },
                  image: 'data:image/jpeg;base64,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',
                  
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:'\n'
                },
              ],
              [
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'FORMULARIO IVE-NF-30',
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Número o Código de Cliente:',
                }
              ],
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text:'10101'//variable codigo cliente o numero
                }
              ],
              [
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
                {
                  border:[false,false,false,false],
                  fillColor:'#ffffff',
                  text:''
                },
              ],
              [
                {
                  colSpan: 3,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text:'FORMULARIO PARA INICIO DE RELACIONES',
                  style:{
                    alignment: 'center',
                    bold: true,
                  }
                }
              ]
            ]
          }
        },
        {
          style: 'table',
          table:{
            widths:['25%','25%','25%','25%'],
            body:[
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#000000',
                  text: '8. REFERENCIAS DEL SOLICITANTE / CLIENTE',
                  style:{
                    color: '#ffffff',
                    alignment: 'center'
                  }
                },
                '','',''
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '8.1 Personales: (nombres de dos personas que no sean familiares)',
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Teléfono (línea fija):',
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Celular / Móvil:',
                }
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable nombre personales 1
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable personal telefono 1
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable personal movil 1
                }
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable nombre personales 2
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable personal telefono 2
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable personal movil 2
                }
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: '8.2 Laborales, Comerciales o Bancarias: (nombre de patronos, empresas o bancos)',
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Teléfono (línea fija):',
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#cccccc',
                  text: 'Celular / Móvil:',
                }
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable nombre personales 1
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable personal telefono 1
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable personal movil 1
                }
              ],
              [
                {
                  colSpan:2,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: 'A'//variable nombre personales 2
                },
                '',
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable personal telefono 2
                },
                {
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: ''//variable personal movil 2
                }
              ]
            ]
          }
        },
        {
          style:'table',
          table:{
            widths:['25%','25%','25%','25%'],
            body:[
              [
                {
                  colSpan: 4,
                  border:[true,true,true,true],
                  fillColor:'#000000',
                  text: '9. DOCUMENTOS QUE SE DEBEN ANEXAR AL FORMULARIO PARA INICIO DE RELACIONES',
                  style:{
                    color: '#ffffff',
                    alignment: 'center'
                  }
                },
                '','',''
              ],
              [
                {
                  colSpan:4,
                  border:[true,true,true,true],
                  fillColor:'#ffffff',
                  text: '9.1 Cuando el espacio del formulario sea insuficiente, sírvase incluir la información en hojas por separado, indicando el numeral al que corresponde.\n 9.2 Anexar al presente formulario como mínimo y según las políticas, normas, procedimientos y controles internos de la PO, la documentación siguiente:\n 9.2.1 Fotocopia legible de los documentos de identificación del solicitante/cliente, personas individual o Representante Legal de la persona jurídica.\n 9.2.2 Fotocopia legible de un recibo, ya sea de agua, luz o teléfono u otro servicio similar, u otro documento similar, que registre la dirección de la residencia o sede comercial indicada por el solicitante/cliente, de la persona individual o jurídica, según corresponda.\n 9.2.3 En el caso de la persona individual con negocio propio o la persona jurídica, adjuntar constancia de inscripción o de actualización ante la Superintendencia de Administración Tributaria -SAT-; el mismo debe estar ratificado en el año que inicie su solicitud o inicio de relación.\n 9.2.4 En el caso de la persona individual con negocio propio o la persona jurídica, adjuntar fotocopia legible de patente de empresa, patente de sociedad, Acuerdo Gubernativo u otro documento similar, según corresponda.\n 9.2.5 Fotocopia legible del nombramiento del Representante Legal, debidamente registrado o primer testimonio de la escritura de mandato debidamente registrado.',
                },
              ]
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        table: {
          margin: [0, 5, 0, 5]
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: 'blue',
          fillOpacity: 0.3
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
    };
    
    pdfMake.createPdf(docDefinition).open();
   }



  setDataCliente(dpi){
    //console.log("dpi data cliente ",dpi)
    return new Promise<any>((resolve, reject) => {
    this.http.get('http://172.16.188.184:8015/api/Personalizacion/consultaCliente?dpi='+dpi).subscribe(data=>{
      this.dataCliente=data.json().cliente
      console.log('data full',data.json())
      resolve(data.json().cliente)
        }, error => {
          reject()
          console.log(error);
      })
    })
  }
  getDataEstado(dpi){
    return new Promise<any>((resolve, reject) => {
      this.http.get('http://172.16.188.184:8015/api/Personalizacion/consultaCliente?dpi='+dpi).subscribe(data=>{
        resolve(data.json())
        }, error => {
          console.log(error);
          reject(error)
      })
    })
  }
  getListaPatrones(item){
    
    return new Promise<any>((resolve, reject) => {
      this.http.get('http://172.16.188.184:8015/api/Personalizacion/consultaPatrono?numeroPatrono='+item.numero+'&descripcionPatrono='+item.nombre).subscribe(data=>{
        resolve(data.json().patrono)
        }, error => {
          reject(error)
          console.log(error);
      })
      })
  }
  sendToken(token,telefono){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    let item={
      'numeroTelefono':telefono,
      'emailEmisor':'',
      'emailReceptor':'',
      'mensaje':'Estimado cliente tu token para autoevaluación Bantrab es: '+token
    }
    return new Promise<any>((resolve, reject) => {
      this.http.post('http://172.16.188.184:8015/api/Personalizacion/enviaToken',JSON.stringify(item),{headers:headers}).subscribe(data=>{
        resolve()
        }, error => {
          reject()
          console.log(error);
      })
      })
  }
  sendEmail(email,message){ 
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    let item={
      'numeroTelefono':'',
      'emailEmisor':'canaleselectronicos@bantrab.net.gt',
      'emailReceptor':email,
      'mensaje':message
    }
    return new Promise<any>((resolve, reject) => {
      this.http.post('http://172.16.188.184:8015/api/Personalizacion/enviaToken',JSON.stringify(item),{headers:headers}).subscribe(data=>{
        resolve()
        }, error => {
          reject()
          console.log(error);
      })
      })
  }
  getDataCliente(){
    return this.dataCliente
  }
  setDataPersonales(data){
    this.dataPersonales=data
  }
  getDataPersonales(){
    return this.dataPersonales
  }
  setDataLaborales(data){
    this.dataLaborales=data
  }
  setReglon(reglon){
    this.dataPatron.RENGLON_CLIENTE=reglon
  }
  getDataLaborales(){
    return this.dataLaborales
  }
  setDataPatron(data){
    console.log("data patron",data)
    this.dataPatron=data
  }
  getDataPatron(){
    return this.dataPatron
  }
  setResultData(data){
    this.resultData=data
  }
  getResultData(){
    return this.resultData
  }
}
