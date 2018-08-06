import { configure, observable, computed, action } from "mobx";

configure({enforceActions: true})

class Login {
  @observable username="admin";  // 用户名
  @observable password="admin";  // 密码
  @observable login_info="";     // 提示信息 

  @action
  setUsername(username) {
  	self.username = username;
  }

  @action
  setPassword(password) {
  	self.password = password;
  }

  @action
  showLoginInfo(login_info) {
    self.login_info = login_info
  }
}

const self = new Login();
export default self;