import { observable } from "mobx";

export default class LoginModel {
  @observable username;
  @observable password;

  @action
  setUsername(username) {
  	this.username = username;
  }

  @action
  setPassword(password) {
  	this.password = password;
  }
}
