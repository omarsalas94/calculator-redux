import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IButton} from '../../interfaces/button/button.interface';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() value: IButton;
  @Output() event: EventEmitter<IButton> = new EventEmitter<IButton>();
  constructor() { }

  ngOnInit(): void {
  }
  onEvent(): void {
    this.event.emit(this.value);
  }

}
