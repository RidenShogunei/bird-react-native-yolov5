// api.js
import axios from 'axios';

const http = axios.create({
  baseURL: 'https://chenjinxu.top:6003', // this should be the URL where your Flask app is running
  headers: {'Content-Type': 'application/json'}
});

// export 出 register函数，使其他文件可以引用
export async function register(username, password, realname) {
  try {
    const res = await http.post('/register', {
      username: username,
      password: password,
      realname: realname
    });
    alert('成功注册!!!')
    return res.data;  // return the uid
  } catch (err) {    
    alert("发生错误,可能原因:昵称重复");
    console.error(err);
    return null;

  }
}

// export 出 login函数，使其他文件可以引用
export async function login(username, password) {
  try {
    const res = await http.post('/login', {
      username: username,
      password: password
    });
    return res.data; // return the uid
  } catch (err) {
    console.error(err);
    return null;
  }
}