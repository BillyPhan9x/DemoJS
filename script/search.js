'use strict';


const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const submitBtn = document.getElementById("submit-btn");
const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");


// Bắt đầu vào : Hiển thị thông tin dữ liệu lên bảng browser
renderTableData(petArr);

// Bắt sự kiện click vào nút Find
// Tìm kiếm thú cưng theo điều kiện nhập vào form và hiển thị thông tin các thú cưng tương ứng
findBtn.addEventListener("click", function () {
    // Lưu ý: 1. Nếu người dùng nhập các trường dữ liệu để tìm kiếm mà ấn nút Submit thì cũng hiển thị toàn bộ danh sách thú cưng vì coi như điều kiện ràng buộc là không có nên sẽ đưa ra toàn bộ dữ liệu
    // 2. Nếu người dùng nhập nhiều trường dữ liệu để tìm kiếm thì sẽ kết hợp nhiều điểu kiện để đưa ra kết quả phù hợp cho người dùng 

    let petArrFind = petArr;
    // Nếu nhập vào id thì tìm theo id
    if (idInput.value) {
        petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
    }
    // Nếu nhập vào name thì tìm theo name
    if (nameInput.value) {
        petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
    }
    //Nếu nhập vào type thì tìm theo type
    if (typeInput.value !== "Select Type") {
        petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
    }
    //Nếu nhập vào breed thì tìm theo breed
    if (breedInput.value !== "Select Breed") {
        petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
    }
    // Nếu check vào Vaccinated thì tìm theo Vaccinated
    if (vaccinatedInput.checked === true) {
        petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
    }
    // Nếu check vào Dewormed thì tìm theo Dewormerd
    if (dewormedInput.checked === true) {
        petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
    }
    // Nếu check vào Sterilized thì tìm theo Sterilized
    if (sterilizedInput.checked === true) {
        petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
    }

    // Hiển thị các thú cưng thỏa mãn điều kiện tìm kiếm
    renderTableData(petArrFind);
});

// Hàm: Hiển thị danh sách thú cưng
function renderTableData(petArr) {

    // Xóa nội dung hiện có của bảng
    tableBodyEl.innerHTML = "";

    // Tạo biến row gán để tạo ra hàng ô
    petArr.forEach((pet) => {
        const row = document.createElement("tr");
        row.innerHTML = `<tr>
        <th scope="row">${pet.id}</th>
        <td>${pet.name}</td>
        <td>${pet.age}</td>
        <td>${pet.type}</td>
        <td>${pet.weight} kg</td>
        <td>${pet.length} cm</td>
        <td>${pet.breed}</td>
        <td><i class = "bi bi-square-fill" style = "color: ${pet.color}"></i></td>
        <td><i class = "bi ${pet.vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td>
        <td><i class = "bi ${pet.dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td>
        <td><i class = "bi ${pet.sterilized ? "bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td>
        <td>
        ${displayTime(pet.date).slice(8, 10)}
        /${displayTime(pet.date).slice(5, 7)}
        /${displayTime(pet.date).slice(0, 4)}
        </td>
        </tr > `;
        tableBodyEl.appendChild(row);
    });
}

// Hàm: Hiển thị thời gian
function displayTime(date) {
    if (typeof date === "string") {
        return date;
    } else if (typeof date === "object") {
        return JSON.parse(JSON.stringify(date));
    }
}

// Hiển thị các loại giống breed
renderBreed();

// Hàm: Hiển thị tất cả các giống breed
// Note: Tất cả các loại giống thú cưng: Không phân biệt loại chó hay mèo
function renderBreed() {
    breedArr.forEach(function (breedItem) {
        const option = document.createElement("option");
        option.innerHTML = `${breedItem.breed}`;
        breedInput.appendChild(option);
    });
}




