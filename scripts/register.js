"use strict";

// Lấy ra các DOM Element. Gán giá trị các phần tử vào các biến.
const firstNameErr = document.getElementById("firstname-error");
const lastNameErr = document.getElementById("lastname-error");
const userNameErr = document.getElementById("username-error");
const passwordErr = document.getElementById("password-error");
const confirmPasswordErr = document.getElementById("password-confirm-error");

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const confirmPassword = document.getElementById("input-password-confirm");

const btnSubmit = document.getElementById("btn-submit");

// Bắt sự kiện click vào nút Register
btnSubmit.addEventListener("click", function () {
  // Lấy dữ liệu từ người dùng nhập thông tin
  const user = new User(
    firstNameInput.value,
    lastNameInput.value,
    userNameInput.value,
    passwordInput.value
  );

  // Validate dữ liệu
  const isValidate = validateData(user);

  if (isValidate) {
    // Thêm dữ liệu vào mảng các dữ liệu người sử dụng
    userArr.push(user);
    // Lưu dữ liệu lại (cập nhật dữ liệu)
    saveToStorage("userArr", userArr);
    // thông báo cho người dùng đã thành công
    alert("successful registration !");

    // Sử dụng window.location.href để chuyển trang.
    window.location.href = "../pages/login.html";
    // window.location.assign("../pages/login.html");
  }
});

// Hàm validateData kiểm tra dữ liệu form hợp lệ
// Kiểm tra thông tin người dùng nhập vào theo các tiêu chí:
function validateData(user) {
  // Hàm trả về true nếu hợp lệ và false nếu không hợp lệ
  let isValidate = true;

  // 1. Không có trường nào bị bỏ trống.
  if (user.firstname.trim().length === 0) {
    firstNameErr.innerHTML = "Please Input For First Name (*)";
    isValidate = false;
  } else {
    firstNameErr.innerHTML = "";
  }

  if (user.lastname.trim().length === 0) {
    lastNameErr.innerHTML = "Please Input For Last Name (*)";
    isValidate = false;
  } else {
    lastNameErr.innerHTML = "";
  }

  if (user.username.trim().length === 0) {
    userNameErr.innerHTML = "Please Input For User Name (*)";
    isValidate = false;
  } else {
    userNameErr.innerHTML = "";
  }

  // Không dùng method .trim().length === 0 (strict) như các trường trên được vì dấu cách khoảng trắng cũng là 1 ký tự
  if (user.password === "") {
    passwordErr.innerHTML = "Please Input For Password (*)";
    isValidate = false;
    // Password phải có nhiều hơn 8 ký tự
  } else {
    passwordErr.innerHTML = "";
  }

  if (confirmPassword.value === "") {
    confirmPasswordErr.innerHTML = "Please Input For Confirm Password (*)";
    isValidate = false;
  } else {
    confirmPasswordErr.innerHTML = "";
  }

  // 2. Username không được trùng với Username của người dùng đã đăng ký trước đó
  for (let i = 0; i < userArr.length; i++) {
    if (user.username === userArr[i].username) {
      userNameErr.innerHTML = "Username already available!";
      isValidate = false;
      break;
    }
  }

  //  Nếu tồn tại 1 username nào đó trùng với username người dùng nhập thì
  //   if (
  //     !userArr.every((item) => (item.username !== user.username ? true : false))
  //   ) {
  //     alert("Username already available!");
  //     isValidate = false;
  //   }

  // 3. Password và Confirm Password phải giống nhau
  if (user.password !== confirmPassword.value) {
    confirmPasswordErr.innerHTML = "Invalid password (*)";
    isValidate = false;
  }

  // 4. Password phải có nhiều hơn 8 ký tự ==> tức > 8 ký tự
  if (user.password.length <= 8) {
    passwordErr.innerHTML = "Password must be 8 characters or more(*)";
    isValidate = false;
  }

  return isValidate;
}
