import {Component, OnInit} from '@angular/core';
import {IButton} from './interfaces/button/button.interface';
import {Select, Store} from '@ngxs/store';
import {
  AddButtonAction,
  CalculatorRedux,
  CleanButtonAction,
  DotButtonAction,
  OperatorButtonAction,
  ResultButtonAction
} from './models/calculator/calculator.redux';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  @Select(CalculatorRedux.getView) view: Observable<string>;
  buttons: IButton[];

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.buttons = [
      {value: 'AC', sizeX: null}, {value: '+/-', sizeX: null}, {value: '%', sizeX: null}, {value: '/', sizeX: null},
      {value: '7', sizeX: null}, {value: '8', sizeX: null}, {value: '9', sizeX: null}, {value: '*', sizeX: null},
      {value: '4', sizeX: null}, {value: '5', sizeX: null}, {value: '6', sizeX: null}, {value: '-', sizeX: null},
      {value: '1', sizeX: null}, {value: '2', sizeX: null}, {value: '3', sizeX: null}, {value: '+', sizeX: null},
      {value: '0', sizeX: '70px'}, {value: '.', sizeX: null}, {value: '=', sizeX: null}
    ];
  }

  async onEvent(event: IButton): Promise<void> {
    switch (event.value) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        await this.store.dispatch(new AddButtonAction(event.value)).toPromise();
        break;
      case '+':
      case '-':
      case '/':
      case '*':
        await this.store.dispatch(new OperatorButtonAction(event.value)).toPromise();
        break;
      case 'AC':
        await this.store.dispatch(new CleanButtonAction()).toPromise();
        break;
      case '=':
        await this.store.dispatch(new ResultButtonAction()).toPromise();
        break;
      case '.':
        await this.store.dispatch(new DotButtonAction()).toPromise();
        break;
      default:
        break;
    }
  }
}
