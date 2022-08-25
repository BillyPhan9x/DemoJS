"use strict";

// Lấy ra các DOM Element. Gán giá trị các phần tử vào các biến.
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");

const btnSubmit = document.getElementById("btn-submit");

// Bắt sự kiện click vào nut Login
btnSubmit.addEventListener("click", function () {
  const user = new User(null, null, usernameInput.value, passwordInput.value);
  console.log("user", user);

  // Gọi hàm  và gán để Kiểm tra xem người dùng đã nhập đủ Username và Password hay chưa ?
  const isValidate = validateData();
  if (isValidate) {
    // tìm kiếm trong userArr thông tin người dùng user nhập vào có đúng hay không (trùng khớp với đăng ký) ?
    // Phương thức find() trả về phần tử đầu tiên trong mảng được cung cấp đáp ứng chức năng kiểm tra được cung cấp. Nếu 0 có giá trị nào đáp ứng chức năng kiểm tra, undefined được trả về.
    const user = userArr.find(
      (item) =>
        item.username === usernameInput.value &&
        item.password === passwordInput.value
    );
    console.log("user", user);

    if (user) {
      // thông báo cho người dùng đã đăng nhập thành công
      alert("successful registration !");
      // Lưu thông tin  user người dùng hiện tại xuống dưới LocalStorage, để sau các trang khác có thể lấy được dữ liệu về người dùng đã đăng nhập.
      saveToStorage("currentUser", user);
      // chuyển hướng đến trang chủ Home
      // Đối window.locationtượng có thể được sử dụng để lấy địa chỉ trang hiện tại (URL) và chuyển hướng trình duyệt đến một trang mới.
      window.location.href = "../index.html";
      //
    } else {
      alert("incorrect login information, please check again !");
      usernameInput.focus();
    }
  }
});

// Hàm validateData kiểm tra dữ liệu form hợp lệ
function validateData() {
  // Hàm trả về true nếu hợp lệ và false nếu không hợp lệ
  let isValidate = true;

  // Không có trường nào bị bỏ trống.
  if (usernameInput.value === "") {
    alert("Please Input For User Name (*)");
    usernameInput.focus();
    isValidate = false;
  }

  if (passwordInput.value === "") {
    alert("Please Input For Password (*)");
    passwordInput.focus();
    isValidate = false;
  }

  return isValidate;
}
