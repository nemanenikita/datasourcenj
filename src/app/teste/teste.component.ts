import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-teste",
  templateUrl: "./teste.component.html",
  styleUrls: ["./teste.component.css"]
})
export class TesteComponent implements OnInit {
  @Output() showpopup = new EventEmitter<any>();
  @Output() closemodal = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  showpopupChild(e) {

    console.log('click')
    this.showpopup.emit(e);
  }

  closemodalChild(e) {
    this.closemodal.emit(e);
  }
}
