'use strict';

// Chức năng: Quản lý Breed

const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");

const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// Danh sách các Breed được lưu trữ ở trong LocalStorage.

// Mỗi Breed sẽ có: Tên Breed, Breed đó thuộc cho loài nào (Chó hoặc Mèo).

// Có thể thêm/xóa được các Breed.

// a. Lấy dữ liệu Breed từ LocalStorage và hiển thị trong bảng
renderBreedTable(breedArr);

// b. Thêm Breed

// Bắt sự kiện click cho nút "Submit" sau đó sẽ xử lý tương tự như chức năng quản lý thú cưng, bao gồm các bước sau:
submitBtn.addEventListener("click", function (e) {

    // Tạo Object chứa dữ liệu lấy từ các input.
    const data = {
        breed: inputBreed.value,
        type: inputType.value
    };
    // console.log(data);

    // Validate 2 trường không được bỏ trống, thêm object vào mảng. Nếu Validate thành công thì tiếp tục thực hiện, ngược lại thì thông báo ra lỗi.
    const isValidate = validateData(data);

    if (isValidate) {
        // Cập nhật dữ liệu  mảng vào các breed.
        breedArr.push(data);
        // Lưu dữ liệu lại(cập nhật dữ liệu)
        saveToStorage("breedArr", breedArr);
        // Gọi lại hàm renderBreedTable để hiển thị dữ liệu.
        renderBreedTable(breedArr);
        // Gọi lại hàm clearInputBreed để xóa dữ liệu trên Form Input
        clearInputBreed();
    }
});

// Phần này bạn sử dụng cơ chế tương tự với phần quản lý thú cưng. Bạn cần thêm sự kiện click cho nút Delete, sau đó gọi hàm deleteBreed và truyền vào breedId tương ứng muốn xóa.

// Để hoàn thành yêu cầu này, bạn cần viết các đoạn code trong file breed.js để tạo chức năng trên. Việc sử dụng LocalStorage tương tự như việc quản lý thú cưng


// Hàm: Validate dữ liệu
function validateData(data) {
    // Xác thực các dữ liệu input đầu vào
    let isValidate = true;
    // b1. Không có trường nào bị nhập thiếu
    if (inputBreed.value.trim().length === 0) {
        document.getElementById("breed-error").innerHTML = "Please Input For Breed!"
        isValidate = false;
    } else {
        document.getElementById("breed-error").innerHTML = "";
    }
    if (data.type === "Select Type") {
        document.getElementById("type-error").innerHTML = "Please select Breed";
        isValidate = false;
    } else {
        document.getElementById("type-error").innerHTML = "";
    }
    return isValidate;
};

// Hàm: Hiển thị thông tin các Breed lên table
function renderBreedTable() {
    tableBodyEl.innerHTML = "";

    // Cứ mỗi loại breed ta sẽ có thêm 1 dòng (row) dữ liệu vào table
    //     for (let i = 0; i < breedArr.length; i++)
    //     breedArr.forEach((pet) => {
    //         const row = document.createElement("tr");
    //         row.innerHTML = `<tr>
    //                         <th>${id}</th>
    //                         <td>${breedArr[i].name}</td>
    //                         <td>${breedArr[i].type}</td>
    //                         <td><button class="btn btn-danger" onclick="deletePet('${breedArr[i].id}')">Delete</button></th>
    //                         <td>
    //                     </tr>`;
    //         tableBodyEl.appendChild(row);
    //     });
    // }
    breedArr.forEach((breedItem, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td scope="col">${index + 1}</td>
        <td scope="col">${breedItem.breed}</td>
        <td scope="col">${breedItem.type}</td>
        <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${breedItem.breed}')">Delete</button>
        <td>`;

        tableBodyEl.appendChild(row);
    });
};
// console.log(renderBreedTable(breedArr));

// Hàm: Xóa các dữ liệu nhập trên Form Input
function clearInputBreed() {
    inputBreed.value = "";
    inputType.value = "Select Type";
};


// c. Xóa breed
// Hàm: Delete một thú cưng khỏi mảng breedArr
function deleteBreed(breed) {
    // Tạo biến để xác định khi xóa hiện thị thông báo cho người dùng
    const isDelete = confirm("Are you sure?");
    if (isDelete) {
        // Thực hiện bước xóa ở trong đây
        for (let i = 0; i < breedArr.length; i++)
            if (breed === breedArr[i].breed) {
                // Xóa khỏi mảng dùng methods splice
                breedArr.splice(i, 1);
                // Lưu lại dữ liệu vào localStorage
                saveToStorage("breedArr", breedArr);
                // Gọi làm hàm renderBreedTable để hiển thị dữ liệu
                renderBreedTable(breedArr);
                break;
            }
    }
};