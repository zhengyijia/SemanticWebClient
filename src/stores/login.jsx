import { configure, observable, computed, action } from "mobx";

configure({enforceActions: true})

class Login {
  @observable username="admin";  // 用户名
  @observable password="admin";  // 密码

  @action
  setUsername(username) {
  	self.username = username;
  }

  @action
  setPassword(password) {
  	self.password = password;
  }
}

const self = new Login();
export default self;