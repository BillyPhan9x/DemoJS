"use strict";

// Để làm được yêu cầu này, bạn có thể sử dụng giao diện ở file index.html. Trong giao diện này sẽ gồm hai <div> có id là login-modal và main-content. Bạn chỉ cần kiếm tra xem người dùng đã Login hay chưa và hiển thị ra thẻ <div> tương ứng.

// Lấy ra các DOM Element. Gán giá trị các phần tử vào các biến.
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");

const displayMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

// Gọi hàm để hiển thị giao diện Home
displayHome();

// Hàm hiển thị giao diện trang Home theo 2 chế độ
function displayHome() {
  // Nếu người dùng đã đăng nhập, bạn sẽ hiển thị thông điệp chào mừng như sau: "Welcome + Firstname" và nút Logout.
  // Ẩn loginModal và hiển thị mainContent
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    displayMessage.textContent = `Welcome ${currentUser.firstname}`;
    // Nếu người dùng chưa đăng nhập, bạn cần hiển thị màn hình gồm nút đăng nhập và đăng ký
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

// Bắt sự kiện vào click vào nút Logout đăng xuất cho ứng dụng
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Are you sure you want Logout?");
  if (isLogout) {
    // Gán lại giá trị currentUser về lại null để xác định người dùng chưa đăng nhập login
    currentUser = null;
    // Lưu lại dữ liệu( cập nhật lại) xuống localStorage
    saveToStorage("currentUser", currentUser);

    // Gọi hàm hiển thị trang Home về lại thiết lập khi chưa có người dùng đăng nhập
    displayHome();
  }
});
