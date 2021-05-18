import { Component, OnInit,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-home-info',
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.scss']
})
export class HomeInfoComponent implements OnInit {
  @Output() goToForm = new EventEmitter<String>();
  constructor() { }

  ngOnInit(): void {
  }

}
