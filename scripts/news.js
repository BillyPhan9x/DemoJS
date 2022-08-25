"use strict";

// Để lấy được dữ liệu các tin tức, bạn sẽ cần sử dụng một API từ newsapi.org.
// https://newsapi.org/v2/top-headlines

// country: Mã code của đất nước mà bạn muốn lấy tin tức.
// category: Danh mục của tin tức.
// pageSize: Số lượng bài viết trả về khi gọi API.
// page: Thứ tự của lần trả về dữ liệu. Ví dụ có tất cả 10 bài viết, lần thứ nhất (page = 1) sẽ trả về 5 bài từ 1 --> 5 thì lần thứ 2 (page = 2) sẽ trả về 5 bài tiếp theo từ 6 --> 10.
// apiKey: Khóa để xác thực, đây là tham số bắt buộc để bạn có thể sử dụng được API.
// pageSize Số lượng kết quả trả về trên mỗi trang (yêu cầu). 20 là mặc định, 100 là tối đa.

if (currentUser) {
  // Lấy ra các DOM Element. Gán giá trị các phần tử vào các biến.
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");
  const newsContainer = document.getElementById("news-container");

  // Tạo biến global này để tính được số News tối đa trả về từ API
  let totalResults = 0;

  getDataNews("us", 1);

  // Hàm lấy dữ liệu DataNews từ API và hiển thị với listNews ra ứng dụng cho người dùng
  // Sử sụng async, await để xử lý bất đồng bộ cho hàm
  // async hàm bất đồng bộ sẽ chạy dưới background là web API, trong async dùng các từ khóa await để chờ các câu lệnh thực thi và trả về kết quả. Sau đó, mới thực thi nhưng dòng code bên dưới
  async function getDataNews(country, page) {
    try {
      // sử dụng hàm fetch và goị API lấy dữ liệu
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=3b2e68e4cbb9433997b29dca0ce423d2`
      );

      // const res = await fetch(
      //   `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=283026dff66f4d5e8fbfe37d4eb8900f`
      // );

      // console.log(res);
      // currentUser.category & currentUser.pageSize ở mục setting theo yêu cầu số 9

      // Phương thức json() của  giao diện Response nhận một luồng phản hồi và đọc nó đến khi hoàn thành. Nó trả về một lời hứa sẽ giải quyết bằng kết quả phân tích cú pháp văn bản nội dung là JSON.
      //  phương thức được đặt tên json(), kết quả không phải là JSON mà thay vào đó là kết quả của việc lấy JSON làm đầu vào và phân tích cú pháp nó để tạo ra một đối tượng JavaScript.
      const data = await res.json();
      // console.log(data);

      // Check lỗi quá 100 lần request/ngày ( lỗi này khi ta kết nối đến API quá nhiều lần )
      if (data.status === "error" && data.code === "rateLimited") {
        throw new Error(data.message);
      }

      // Bắt lỗi khi chạy từ tập tin không thông qua Live-Server => chạy trên Sever sẽ không có lỗi này
      // {status: 'error', code: 'corsNotAllowed', message: 'Requests from the browser are not allowed on the Developer plan, except from localhost.'}
      if (data.status === "error" && data.code === "corsNotAllowed") {
        // data.status Mã trạng thái của phản hồi. (Điều này sẽ 200thành công).
        throw new Error(data.message);
      }

      // Gọi hàm để hiển thị list News
      displayListNew(data);

      // Phương thức catch ở cuối chuỗi sẽ bất được bất kỳ lỗi nào xảy ra ở bất kì nơi nào trong toàn bộ chuỗi promise
    } catch (err) {
      console.error(`${err}`);
      // renderError(`Someting went wrong ${err.message}. Try again 💥`);
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
    getDataNews("us", --pageNum.textContent);
  });

  // Bắt sự kiện click vào nút Next
  btnNext.addEventListener("click", function () {
    // gọi hàm này để lấy dữ liệu trả về và hiển thị danh sách News tiếp theo
    getDataNews("us", ++pageNum.textContent);
  });

  // Hàm hiển thị listNew lên trang người dùng (News)
  function displayListNew(data) {
    // Gán lại giá trị biến golbal
    totalResults = data.totalResults;

    // Kiểm tra điều kiện để ẩn các nút Previous , Next
    checkBtnPrev();
    checkBtnNext();

    // Tạo biến gán giá trị để tạo code HTML các News để  hiển thị
    // image_not_availabel.jpg để thay thế cho 1 số ảnh có đường dẫn lỗi
    let html = "";

    // articles kết quả của yêu cầu.
    // urlToImage URL đến một hình ảnh có liên quan cho bài viết.
    // description Mô tả hoặc đoạn trích từ bài báo.
    // title Tiêu đề hoặc tiêu đề của bài báo.
    // url URL trực tiếp đến bài viết.
    data.articles.forEach(function (article) {
      html += ` 
    <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src=${
              article.urlToImage
                ? article.urlToImage
                : "image_not_availabel.jpg"
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

// <div class="new-content">

/* <div class="img-banner">
<img src=${
  article.urlToImage ? article.urlToImage : "image_not_availabel.jpg"
} alt="img" />
</div>
<div class="content">
<h4>${article.title}</h4>
<p>${article.description}</p>
<button><a href=${article.url} target="_blank">View</a></button>
</div>
</div>  */
