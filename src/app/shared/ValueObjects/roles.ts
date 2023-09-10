enum ERoles {
    User = 1,
    Admin = 2,
  }

const ERolesToString = {
  [ERoles.User]: 'User',
  [ERoles.Admin]: 'Admin',
};

export {ERoles, ERolesToString};