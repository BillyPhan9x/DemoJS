"use strict";

if (currentUser) {
  // Lấy ra các DOM Element. Gán giá trị các phần tử vào các biến.
  const pageSizeInput = document.getElementById("input-page-size");
  const categoryInput = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");

  // Bắt sự kiện click vào nút Submit
  btnSubmit.addEventListener("click", function () {
    if (validateData()) {
      // Lưu dữ liệu lại (cập nhật dữ liệu) currentUser
      currentUser.pageSize = Number.parseInt(pageSizeInput.value);
      currentUser.category = categoryInput.value;
      saveToStorage("currentUser", currentUser);

      // Cập nhật lại mảng userArr khi người dùng setting
      const index = userArr.findIndex(
        (userItem) => userItem.username === currentUser.username
      );
      userArr[index] = currentUser;
      // Lưu dữ liệu lại (cập nhật dữ liệu) userArr
      saveToStorage("userArr", userArr);
      // clear input form và thông báo cho người dùng đã cài đặt setting thành công
      alert("successful setting✅");
      pageSizeInput.value = "";
      categoryInput.value = "General";
    }
  });

  // Hàm validateData kiểm tra dữ liệu form hợp lệ
  function validateData() {
    let isValidate = true;

    // Kiểm tra News per page: Lượng bài viết trong 1 trang.
    if (Number.isNaN(pageSizeInput.value) || pageSizeInput.value === "") {
      alert("News per page is not valid");
      isValidate = false;
    }

    // News Category: Danh mục của các tin tức muốn hiển thị trên bảng tin
    if (categoryInput.value === "General") {
      alert("Please select News Category");
      isValidate = false;
    }

    return isValidate;
  }
  // Nếu người dùng chưa đăng nhập thì thông báo người dùng đăng nhập để được phép truy cập vào ứng dụng và chuyển đến trang để login/register
} else {
  alert("Please login/register to access the app !");
  window.location.href = "../index.html";
}

// Please enter News per page
