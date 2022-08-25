"use strict";

// Class User để đại diện cho thông tin người dùng
class User {
  constructor(
    firstname,
    lastname,
    username,
    password,
    // Khai báo thêm tham số giá trị của cho mục số 7 news, và số 9 setting
    pageSize = 10,
    category = "business"
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    // 2 thuộc tính thêm vào để làm mục số 7 và số 9
    this.pageSize = pageSize;
    this.category = category;
  }
}

// Class Task để chứa các thông tin về Task trong Todo List
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// task: Nội dung công việc.
// owner: username của người tạo ra task.
// isDone: Task này đã hoàn thành hay chưa.
