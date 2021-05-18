import { Component, OnInit,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  tipo: string
}
@Component({
  selector: 'app-modal-error-form',
  templateUrl: './modal-error-form.component.html',
  styleUrls: ['./modal-error-form.component.scss']
})
export class ModalErrorFormComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ModalErrorFormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }

}
