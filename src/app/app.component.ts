import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Http,Headers } from '@angular/http';
import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';
import * as xml2js from 'xml2js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'autogestion';
  client: Client;
  message;
  constructor(private http:Http,private soap: NgxSoapService){
    //this.evaluacionPrecredit()
  }
  async consutaProducto(){/*
    console.log('consulta')
    this.client =await this.soap.createClient('http://172.16.188.111/PreCREDITPRO.wsIntegracionAutoEvaluacion.QA/ConsultaProductoCliente');
    const body={
      'MSGPRE':{
        'PROSPECTO':{
          'CODIGO_USUARIO':'usAutoEvaluacion',
          'DPI':'2514797732003'
        }
      }
    };
    (<any>this.client).Add(body).subscribe((res: ISoapMethodResponse) => this.message = res.result.AddResult);
    console.log('Message:'+this.message);
    let xmlString=`
    <MSGPRE>
      <PROSPECTO>
        <CODIGO_USUARIO>usAutoEvaluacion</CODIGO_USUARIO>
        <DPI>2514797732003</DPI>						    
      </PROSPECTO>
    </MSGPRE>`
    */
    
    console.log("consulta")
    const oParser = new DOMParser();
    let headers=new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    headers.append('SOAPAction','http://tempuri.org/ConsultaProductoCliente'); 
    let sr =
    `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
      <ConsultaProductoCliente xmlns="http://tempuri.org/">
      <strXmlRequest>
      <string xmlns="http://tempuri.org/">
        <MSGPRE>
          <PROSPECTO>
            <CODIGO_USUARIO>usAutoEvaluacion</CODIGO_USUARIO>
            <DPI>2514797732003</DPI>						    
          </PROSPECTO>
        </MSGPRE>
        </string>
        </strXmlRequest>
        </ConsultaProductoCliente>
      </soap:Body>
      </soap:Envelope>
    `
    let request=`<MSGPRE>
    <PROSPECTO>
    <CODIGO_USUARIO>usAutoEvaluacion</CODIGO_USUARIO><DPI>2514797732003</DPI></PROSPECTO></MSGPRE>`
    request=request.replace(/\s/g, '')
    let doc=oParser.parseFromString(sr,'text/xml');
    console.log('doc',doc)
    this.http.get('http://172.16.188.111/PreCREDITPRO.wsIntegracionAutoEvaluacion.QA/IntegracionPreCREDITPRO.asmx/ConsultaProductoCliente?strXmlRequest='+request)
    .subscribe(data => {
      console.log("asd")
      console.log(data);
    }, error => {
      console.log(error);
  });
    
  }
  evaluacionPrecredit(){
    console.log("evaluacion precredit")
    /*let request=`<Transaccion id=""150"">
    <Parametro nombre=""LC_CODIGO_TRAMA"">150</Parametro>     
    <Parametro nombre=""LC_DESCRIPCION"">                                             
                   <![CDATA[<ROWSET>
                   <ROW>
                                 <CODIGO_AGENCIA>1950</CODIGO_AGENCIA >      
                                 <NIU>6581</NIU>                                                             
                                 <CODIGO_PRODUCTO>130</CODIGO_PRODUCTO>       
                                 <CODIGO_EJECUTIVO>A2860</CODIGO_EJECUTIVO>    
                                 <BENEFICIARIOS>
                                                <DATO>
                                                               <PRIMER_NOMBRE>MILAGRO5</PRIMER_NOMBRE>             
                                                               <SEGUNDO_NOMBRE>ENARIO5</SEGUNDO_NOMBRE>        
                                                               <PRIMER_APELLIDO>MARTINEZ5</PRIMER_APELLIDO>          
                                                               <SEGUNDO_APELLIDO/>                                                                  
                                                               <PARENTESCO>4</PARENTESCO>                                                  
                                                               <PORCENTAJE>50</PORCENTAJE>                                                  
                                                </DATO>
                                                <DATO>
                                                               <PRIMER_NOMBRE>MILAGRO66</PRIMER_NOMBRE>
                                                               <SEGUNDO_NOMBRE>ENARIO66</SEGUNDO_NOMBRE>
                                                               <PRIMER_APELLIDO>MARTINEZ66</PRIMER_APELLIDO>
                                                               <SEGUNDO_APELLIDO/>
                                                               <PARENTESCO>5</PARENTESCO>
                                                               <PORCENTAJE>50</PORCENTAJE>
                                                </DATO>
                                                </BENEFICIARIOS>
                                 </ROW>
                   </ROWSET>]]>
    </Parametro>
</Transaccion>`*/
let request=`<Transaccion id=""150"">
<Parametro nombre="LC_CODIGO_TRAMA">1</Parametro> 
<Parametro nombre="LC_INGNIU">6581</Parametro>  
</Transaccion>`
request=request.replace(/\s/g, '')
    let item = {
      intCanalIn: '1',
      intCanalOut: '1',
      strReference: '7535',
      intTipo: '1',
      strXML:request
    }
  this.http.post("http://172.16.188.169:3072/wsBancaMA.asmx/BancaMA"+request,JSON.stringify(item))
    .subscribe(data => {
      console.log("asd")
      let x:any=data
      console.log(x._body);
      //const parser = new xml2js.Parser({ strict: false, trim: true });
      xml2js.parseString(x._body, (err, result) => {
        //console.log("xmlparse",result.string._)
        xml2js.parseString(result.string._,(err, res) => {
          console.log("result",res)
        })
      });

    }, error => {
      console.log(error);
  });
  }
  xmlStringToJson(xml: string)
    {
      const oParser = new DOMParser();
      const xmlDoc = oParser.parseFromString(xml, "application/xml");
      return this.xmlToJson(xmlDoc);
  }
  xmlToJson(xml)
  {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  }
}
