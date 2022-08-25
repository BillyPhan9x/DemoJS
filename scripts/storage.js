"use strict";

// Thực hiện lấy dữ liệu từ localStorage theo Key tương ứng
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
  // return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

// API LocalStorage thực hiện lưu trữ các dữ liệu (String or Number)
// Theo cấu trúc Key-Value
// Hàm nhận hai tham số là key, value
// Thực hiện việc lưu xuống localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// const KEY = "USER_ARRAY';
// const UserArr = JSON.parse(getFromStorage(KEY) || []);

// Để quản lý người dùng, bạn có thể tạo một mảng gọi là userArr, mảng này sẽ chứa các Instance được tạo từ Class User. Sau đó, bạn có thể lưu userArray này xuống localStorage, mỗi lần vào trang Register sẽ cần load lại userArr từ Localstorage.
// Lấy dữ liệu userArr từ localStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
// Nếu không sử dụng toán tử 3 ngôi (điều kiện) thì lấy dữ liệu userArr từ localStorage là null với trường hợp chưa có người dùng nào đăng nhập
console.log(users);

// ParseUser là 1 đại diện cục bộ của dữ liệu người dùng có thể được lưu và truy xuất từ ​​đám mây Phân tích cú pháp.
//Phương thức map() này tạo 1 mảng mới được điền với result của việc 1 một hàm được cung cấp trên mọi phần tử trong mảng đang gọi.
// Chuyển đổi về dạng Class Instance
const userArr = users.map((user) => parseUser(user));
console.log(userArr);
// sẽ trả về 1 mảng chứa các instance của Class User

// Do khi lưu xuống LocalStorage, bạn chỉ có thể lưu được các JS Object chứ không phải Class Instance (chỉ lưu được các thuộc tính chứ các hàm trong class đó sẽ không lưu được). Bạn sẽ cần viết một hàm để chuyển từ JS Object sang Class Instance như sau:
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    // thêm 2 thuộc tính này để làm tính năng Setting mục 9
    userData.pageSize,
    userData.category
  );

  return user;
}

// Lấy dữ liệu user đang đăng nhập
let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

////////////////////////////////////////
// Lấy dữ liệu todoArr từ localStorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

// Hàm chuyển đổi từ JS Object sang Class Instance của Class Task
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);

  return task;
}

// Chuyển đổi về dạng Class Instance
const todoArr = todos.map((todo) => parseTask(todo));
