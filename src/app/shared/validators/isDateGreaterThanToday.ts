import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function isDateGreaterThanToday(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const value: Date = new Date(control.value);
    const today: Date = new Date();

    return value > today ? { dateGreaterThanToday: true } : null;
  };
}
