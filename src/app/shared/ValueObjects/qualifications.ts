enum EQualifications {
    Cliente = 1,
    Fornecedor = 2,
    Colaborador = 3
  }

const EQualificationsToString = {
  [EQualifications.Cliente]: 'Cliente',
  [EQualifications.Fornecedor]: 'Fornecedor',
  [EQualifications.Colaborador]: 'Colaborador',
};

export {EQualifications, EQualificationsToString};