import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  validateCNPJ(cnpj: string): boolean {
    // ... (Your CNPJ validation function)
    return true
  }

  validateCPF(cpf: string): boolean {
    // ... (Your CPF validation function)
    return true
  }
}
