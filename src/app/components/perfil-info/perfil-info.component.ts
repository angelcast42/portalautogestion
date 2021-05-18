import { Component, OnInit,ViewChild } from '@angular/core';
import {ClienteService} from '../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Http,Headers } from '@angular/http';
import { ModalErrorFormComponent } from '../../components/modal-error-form/modal-error-form.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-perfil-info',
  templateUrl: './perfil-info.component.html',
  styleUrls: ['./perfil-info.component.scss']
})
export class PerfilInfoComponent implements OnInit {
  @ViewChild('stepper') private stepper: MatStepper;

  primerNombre='Isabella'
  alias='Isa'
  correo='siarod@gmail.com'
  primerApellido='Rodriguez'
  nacimiento='24/05/1990'
  telefono='40502953'
  direccion='3a.calle A 32-69 zona 11'
  ciudad='Ciudad de Guatemala'
  patrono='Supertiendas La Barata, S.A.'
  ingresos='Q7,995.00'
  datapreca:any={}
  ofertasbool=false
  oferta1=false
  oferta2=false
  oferta3=false
  oferta4=false
  oferta5 = false
  isLinear=true
  constructor(private clienteService: ClienteService,
    public dialog: MatDialog,
    private http:Http,
    private activateRoute:ActivatedRoute) { 
      //this.getDataPreca(activateRoute.snapshot.paramMap.get('userID'))
      
      /*
      this.correo=this.activateRoute.snapshot.paramMap.get('email')
      this.telefono=this.activateRoute.snapshot.paramMap.get('telefono')
      this.primerNombre=this.activateRoute.snapshot.paramMap.get('dpi')
      this.patrono=this.activateRoute.snapshot.paramMap.get('patrono')
      */
  }
  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'number';
  }
  getDataPreca(userID){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    let item={
      userID:userID,
    }
    this.http.post('https://us-central1-encuestabot.cloudfunctions.net/getDataPreca',JSON.stringify(item),{headers:headers}).subscribe(
      (data:any) => {
        this.datapreca=JSON.parse(data._body)
        console.log(data)
      },
      err => {
        console.log(err)
      },
      () => {}
    );
  }
  ngOnInit(): void {
  }
  generatePdf(){
    let infoCliente={
      primerNombre:this.primerNombre,
      correo:this.correo,
      primerApellido:this.primerApellido,
      fechaNacimiento:this.nacimiento,
      telefono:this.telefono,
      direccion:this.direccion,
      ciudad:this.ciudad,
      patrono:this.patrono,
      ingresos:this.ingresos
    }
    this.clienteService.generatePdf(infoCliente)
  }
  activarOfertas(){
    this.ofertasbool=true
  }
  changeOferta1(){
    this.oferta1=!this.oferta1
  }
  changeOferta2(){
    this.oferta2=!this.oferta2
  }
  changeOferta3(){
    this.oferta3=!this.oferta3
  }
  changeOferta4(){
    this.oferta4=!this.oferta4
  }
  changeOferta5(){
    this.oferta5=!this.oferta5
  }
  openDialogError(){
    const dialogRef = this.dialog.open(ModalErrorFormComponent, {
      width: '550px',
      height:'228px',
      data:{tipo:'aprobado'}
    })
    dialogRef.afterClosed().subscribe(result => {
    })
  }
}
