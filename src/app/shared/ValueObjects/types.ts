enum ETypes {
    Fisica = 1,
    Juridica = 2,
  }

const ETypesToString = {
  [ETypes.Fisica]: 'Fisica',
  [ETypes.Juridica]: 'Juridica',
};

export {ETypes, ETypesToString};