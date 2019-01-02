import User from './User';

export default class Kotbaas extends User {
  constructor() {
    super();
  }

  getAllKotbazen() {
    console.log(super.users);
  }
}
