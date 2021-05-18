import { Component,Input, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
interface DialogData {
  listPatronos: [];
}
@Component({
  selector: 'app-modal-patronos',
  templateUrl: './modal-patronos.component.html',
  styleUrls: ['./modal-patronos.component.scss']
})
export class ModalPatronosComponent implements OnInit {
  @Input() dataCliente:any

  listPatronos=[]
  constructor(public dialogRef: MatDialogRef<ModalPatronosComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log("list patronos",data.listPatronos)
    data.listPatronos.forEach((patrono:any)=>{
      if(patrono.estado=='A'){
        this.listPatronos.push(patrono)
      }
    })
   }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
