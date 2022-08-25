"use strict";

if (currentUser) {
  // Lấy ra các DOM Element. Gán giá trị các phần tử vào các biến.
  const taskInput = document.getElementById("input-task");
  const todoList = document.getElementById("todo-list");

  const btnAdd = document.getElementById("btn-add");

  // Gọi hàm để hiển thị todoList
  displayTodoList();

  // Hàm hiển thị thông tin của todoList
  function displayTodoList() {
    let html = "";

    // Từ mảng todoArr lọc ra các todolist task của User đang login để hiển thị lên trang ứng dụng
    // // Hiển thị các Task có owner trùng với username của người dùng hiện tại.
    todoArr
      .filter((todo) => todo.owner === currentUser.username)
      .forEach(function (todo) {
        html += `<li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">x</span></li>`;
      });

    todoList.innerHTML = html;

    // Bắt sự kiện xóa task của người dùng đã thêm
    eventToggleTasks();
    // Bắt sự kiện đánh dấu task của người dùng đã xóa
    eventDeleteTasks();
  }

  // Bắt sự kiện click vào nút Add để thêm task
  btnAdd.addEventListener("click", function () {
    // Condition xem người dùng đã nhập tên task vào để click nút Add chưa?
    if (taskInput.value.trim().length === 0) {
      // thông báo cho người dùng nếu ô input chưa được nhập
      alert("Please add a task name");
    } else {
      // Lấy dữ liệu nhập từ Task
      const todo = new Task(taskInput.value, currentUser.username, false);

      // Thêm task mới vào mảng todoArr
      todoArr.push(todo);
      // Lưu dữ liệu (cập nhật dữ liệu) xuống localStorage
      saveToStorage("todoArr", todoArr);
      // Hiển thị list task lên Todo List
      displayTodoList();
      // sau nhị Add thành công thì clearInput dữ liệu ở form nhập dữ liệu
      taskInput.value = "";
    }
  });

  // Hàm sự kiện đánh dấu Toggle Task
  // Khi click vào một Task thì bạn có thể đánh dấu là Task đó đã hoàn thành hoặc chưa hoàn thành
  function eventToggleTasks() {
    // Lấy tất cả các phần tử li chứa thông tin của các task nhiệm vụ và bắt sự kiện click từng phần tử li
    // Bộ kết hợp (tổ hợp con cháu) "" (dấu cách ở giữa) tất cả các phần tử li nằm bên trong phần tử ul (vì ul có id="todo-list")
    // Sử dụng phương thức forEach để lặp qua tất cả các phần tử phù hợp.
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      console.log(document.querySelectorAll("#todo-list li"));
      // Bắt sự kiện click vào mục phần tử li
      liEl.addEventListener("click", function (e) {
        // Kiểm tra điều kiện , chuyển đổi giữa thêm và xóa tên lớp checked khỏi 1 phần tử bằng toggle

        // console.log("liEl.children[0]", liEl.children[0]);
        // console.log("e.target", e.target);
        if (e.target !== liEl.children[0]) {
          liEl.classList.toggle("checked");
          // console.log("liEl", liEl);

          // Tìm task vừa click vào
          const todo = todoArr.find(
            (todoItem) =>
              //   console.log(liEl.textContent.slice(0, -1));
              todoItem.owner === currentUser.username &&
              todoItem.task === liEl.textContent.slice(0, -1)
          );
          // console.log("todo", todo);

          // Sau đó thay đổi thuộc tính isDone của task đó
          // Phương thức contains() kiểm tra xem một chuỗi có chứa 1 chuỗi ký tự hay 0.
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          // console.log("todo.isDone", todo.isDone);

          // Lưu dữ liệu lại (cập nhật dữ liệu) xuống localStorage
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  // Hàm sự kiện xóa task
  function eventDeleteTasks() {
    // Lấy tất cả các phần tử từ nút delete và bắt sự kiện click trên từng phần tử
    // console.log(document.querySelectorAll("#todo-list .close"));
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        // Thông báo cho người dùng có chắn chắn muốn xóa hay không?
        const isDelete = confirm("Surely you want to delete this task?");
        // console.log("isDelete", isDelete);

        if (isDelete) {
          // Tìm vị trí của task mà người dùng click xóa trong mảng todoArr
          // xác định tên User và task
          const index = todoArr.findIndex(
            (item) =>
              item.owner === currentUser.username &&
              item.task === closeEl.parentElement.textContent.slice(0, -1)
            // Thuộc tính parentElement trả về phần tử cha của phần tử đã chỉ định.
            // xác định tên task bị xóa và so sánh
          );
          // xóa task đó ra khởi mảng todoArr
          todoArr.splice(index, 1);
          // Lưu dữ liệu  (cập nhật dữ liệu) xuống localStorage
          saveToStorage("todoArr", todoArr);
          // Hiển thị lại list todo
          displayTodoList();
        }
      });
    });
  }

  // Nếu người dùng chưa đăng nhập thì thông báo người dùng đăng nhập để được phép truy cập vào ứng dụng và chuyển đến trang để login/register
} else {
  alert("Please login/register to access the app !");
  window.location.href = "../index.html";
}
