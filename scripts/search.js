"use strict";
if (currentUser) {
  // Lấy ra các DOM Element. Gán giá trị các phần tử vào các biến.
  const queryInput = document.getElementById("input-query");
  const newsContainer = document.getElementById("news-container");
  const navPageNum = document.getElementById("nav-page-num");
  const pageNum = document.getElementById("page-num");

  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const btnSubmit = document.getElementById("btn-submit");

  // Tạo biến global này để tính được số News tối đa trả về từ API
  let totalResults = 0;
  // Tạo biến global keywords gán = giá trị rỗng, để gán lại giá trị khi người dùng tìm kiếm với từ khóa
  let keywords = "";
  navPageNum.style.display = "none";

  // Bắt sự kiện click vào nút Submit Search
  btnSubmit.addEventListener("click", function () {
    pageNum.textContent = "1";
    newsContainer.innerHTML = "";

    // Kiểm tra xem người dùng đã nhập từ khóa keywword vào ô input Search chưa?
    if (queryInput.value.trim().length === 0) {
      alert("Please enter keywords to search!");
    } else {
      keywords = queryInput.value;
      // Gọi hàm để hiểm thị danh sách News đã được tìm kiếm lên trang ứng dụng
      getDataNewsSearch(keywords, 1);
    }
  });

  // Hàm lấy dữ liệu DataNews từ API và hiển thị với list keywords ra ứng dụng cho người dùng  // Everything
  async function getDataNewsSearch(keywords, page) {
    try {
      // sử dụng hàm fetch và goị API lấy dữ liệu
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${currentUser.pageSize}&page=${page}&apiKey=3b2e68e4cbb9433997b29dca0ce423d2`
      );
      console.log(res);

      const data = await res.json();
      console.log(data);

      // Nếu không có bài viết nào đươc tìm thấy bởi từ khóa thì thông báo
      if (data.totalResults == 0) {
        // Ẩn các nút chuyển trang tới và lùi , page num  nếu có lỗi
        navPageNum.style.display = "none";
        throw new Error(
          "Search failed, please try again with another keyword !"
        );
      }

      // // Check lỗi quá 100 lần request/ngày ( lỗi này khi ta kết nối đến API quá nhiều lần )
      if (data.status === "error" && data.code === "rateLimited") {
        throw new Error(data.message);
      }

      // Bắt lỗi khi chạy từ tập tin không thông qua Live-Server => chạy trên Sever sẽ không có lỗi này
      if (data.status === "error" && data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }

      // Hiển thị các nút chuyển trang nếu dữ liệu trả về thành công , không lỗi
      navPageNum.style.display = "block";
      // Gọi hàm để hiển thị list News
      displayListNew(data);

      // Phương thức catch ở cuối chuỗi sẽ bất được bất kỳ lỗi nào xảy ra ở bất kì nơi nào trong toàn bộ chuỗi promise
    } catch (err) {
      console.error(`${err}`);
      // Thông báo lỗi cho người dùng
      alert("Error:" + err.message);
    }
  }

  // Hàm kiểm tra điều kiện ẩn và ẩn nút Previous
  function checkBtnPrev() {
    // Nếu page number là 1 thì ẩn đi
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }

  // Hàm kiểm tra điều kiện ẩn và ẩn nút Next
  function checkBtnNext() {
    // Nếu page number bằng với làm tròn trên 1 số (tổng số News tối đa API trả về / số News hiển thị trên 1 trang ứng dụng New)
    if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }

  // Bắt sự kiện click vào nút Previous
  btnPrev.addEventListener("click", function () {
    // gọi hàm này để lấy dữ liệu trả về và hiển thị danh sách News trước
    getDataNewsSearch(keywords, --pageNum.textContent);
  });

  // Bắt sự kiện click vào nút Next
  btnNext.addEventListener("click", function () {
    // gọi hàm này để lấy dữ liệu trả về và hiển thị danh sách News tiếp theo
    getDataNewsSearch(keywords, ++pageNum.textContent);
  });

  // Hàm hiển thị listNew lên trang người dùng
  function displayListNew(data) {
    // Gán lại giá trị biến golbal
    totalResults = data.totalResults;

    // Kiểm tra điều kiện để ẩn các nút Previous , Next
    checkBtnPrev();
    checkBtnNext();

    // Tạo biến gán giá trị để tạo code HTML các News để  hiển thị
    // no_image_available.jpg để thay thế cho 1 số ảnh có đường dẫn lỗi
    let html = "";

    data.articles.forEach(function (article) {
      html += ` 
    <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
          <img src=${
            article.urlToImage ? article.urlToImage : "image_not_availabel.jpg"
          }  class="card-img" alt="img" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h6 class="card-title">${article.title}</h6>
              <p style="font-size: 0.8rem" class="card-text">${
                article.description
              }</p>
              <a href=${
                article.url
              } target="_blank" class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
    });
    newsContainer.innerHTML = html;
  }
} else {
  alert("Vui lòng đăng nhập / đăng ký để truy cập ứng dụng đọc tin tức");
  window.location.href = "../index.html";
}
