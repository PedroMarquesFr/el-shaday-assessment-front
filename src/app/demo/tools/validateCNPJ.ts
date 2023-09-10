function validateCNPJ(cnpj: string): boolean {
    // Remove any non-numeric characters from the CNPJ
    cnpj = cnpj.replace(/\D/g, '');
  
    if (cnpj.length !== 14) {
      return false; // CNPJ must have 14 digits
    }
  
    // Check for known invalid CNPJs
    const invalidCNPJs = [
      '00000000000000',
      '11111111111111',
      '22222222222222',
      '33333333333333',
      '44444444444444',
      '55555555555555',
      '66666666666666',
      '77777777777777',
      '88888888888888',
      '99999999999999',
    ];
  
    if (invalidCNPJs.includes(cnpj)) {
      return false;
    }
  
    // Calculate the first verification digit
    let sum = 0;
    let factor = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * factor;
      factor = factor === 2 ? 9 : factor - 1;
    }
    let remainder = sum % 11;
    if (remainder < 2) {
      remainder = 0;
    } else {
      remainder = 11 - remainder;
    }
    if (remainder !== parseInt(cnpj.charAt(12))) {
      return false;
    }
  
    // Calculate the second verification digit
    sum = 0;
    factor = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * factor;
      factor = factor === 2 ? 9 : factor - 1;
    }
    remainder = sum % 11;
    if (remainder < 2) {
      remainder = 0;
    } else {
      remainder = 11 - remainder;
    }
    if (remainder !== parseInt(cnpj.charAt(13))) {
      return false;
    }
  
    return true;
  }
  
export default validateCNPJ;