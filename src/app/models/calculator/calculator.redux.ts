import {Action, Selector, State, StateContext} from '@ngxs/store';

export interface IRCalculator {
  view: string; // Valor que se esta visualizando en el textarea
  savedValue: number; // Valor almacenado
  operator: string; // Operador
}

export class AddButtonAction {
  static readonly type = '[calculator] add';
  constructor(public value: string) {}
}
export class CleanButtonAction {
  static readonly type = '[calculator] clean';
  constructor() {}
}
export class OperatorButtonAction {
  static readonly type = '[calculator] operator';
  constructor(public operator: string) {}
}
export class DotButtonAction {
  static readonly type = '[calculator] dot';
  constructor() {}
}
export class ResultButtonAction {
  static readonly type = '[calculator] result';
  constructor() {}
}

@State<IRCalculator>({
  name: 'calculatorState',
  defaults: {
    view: '',
    savedValue: 0,
    operator: '',
  }
})
export class CalculatorRedux {
  constructor() {}
  @Selector()
  static getView(state: IRCalculator): string {
    return state.view;
  }
  @Action(AddButtonAction)
  addButtonAction(ctx: StateContext<IRCalculator>, action: AddButtonAction): void {
    let view = ctx.getState().view;
    const operator = ctx.getState().operator;
    // Elimina el operador del valor numerico
    if (operator !== '') {
      view = view.replace(operator, '');
    }
    if (action.value === '0') {
      if (view.length > 0) {
        ctx.patchState({view: view + action.value});
      }
    } else {
      ctx.patchState({view: view + action.value});
    }
  }
  @Action(CleanButtonAction)
  cleanButtonAction(ctx: StateContext<IRCalculator>, action: CleanButtonAction): void {
    ctx.setState({
      view: '',
      operator: '',
      savedValue: 0,
    });
  }
  @Action(OperatorButtonAction)
  operatorButtonAction(ctx: StateContext<IRCalculator>, action: OperatorButtonAction): void {
    const {view, operator} = ctx.getState();
    let savedValue: number = ctx.getState().savedValue;
    if (+view) {
      if (operator !== '') {
        savedValue = this.doOperation(operator, savedValue, +view);
      } else {
        savedValue = +view;
      }

      ctx.patchState({
        operator: action.operator,
        view: action.operator,
        savedValue,
      });
    } else {
      console.log('No se puede hacer la operación');
    }
  }

  @Action(ResultButtonAction)
  resultButtonAction(ctx: StateContext<IRCalculator>, action: OperatorButtonAction): void {
    const { view, savedValue, operator } = ctx.getState();
    if (view && savedValue && operator) {
      const res = this.doOperation(operator, savedValue, +view);
      ctx.patchState({
        savedValue: res,
        operator: '',
        view: res.toString(),
      });
    } else {
      console.log('No se puede hacer la operación');
    }
  }

  @Action(DotButtonAction)
  dotButtonAction(ctx: StateContext<IRCalculator>, action: DotButtonAction): void {
    let view = ctx.getState().view;
    const operator = ctx.getState().operator;
    if (!view.includes('.')) {
      // Elimina el operador del valor numerico
      if (operator !== '') {
        view = view.replace(operator, '');
      }

      ctx.patchState({
        view: view + '.',
      });
    } else {
      console.log('No se puede incluiar más de un punto');
    }
  }

  private doOperation(operator: string, savedValue: number, view: number): number {
    try {
      switch (operator) {
        case '+':
          savedValue = savedValue + view;
          break;
        case '-':
          savedValue = savedValue - view;
          break;
        case '*':
          savedValue = savedValue * view;
          break;
        case '/':
          savedValue = savedValue / view;
          break;
        default:
          savedValue = 0;
          break;
      }
    } catch (error) {
      savedValue = 0;
    }
    return +savedValue.toFixed(5);
  }
}
