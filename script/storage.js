'use strict';


const btnSidebar = document.getElementById("sidebar");
const navEl = document.getElementById("sidebar");

// Bắt sự kiện click vào Sidebar
// Bổ sung Animation cho Sidebar
btnSidebar.addEventListener("click", function () {
    navEl.classList.toggle("active");
});


// Dữ liệu data cho sẵn mặc định để test mà không cần nhập lúc ban đầu
const data1 = {
    id: "P001",
    name: "Charlie Tux",
    age: 4,
    type: "Dog",
    weight: 5,
    length: 65,
    color: "#000",
    breed: "Husky",
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    date: new Date(),
};

const data2 = {
    id: "P002",
    name: "Tom Mix",
    age: 3,
    type: "Cat",
    weight: 5,
    length: 50,
    color: "#333",
    breed: "Tabby",
    vaccinated: false,
    dewormed: false,
    sterilized: false,
    date: new Date(),
};

// Dữ liệu breed cho sẵn mặc định để test mà không cần nhập lúc đầu
const breed1 = {
    breed: "Husky",
    type: "Dog",
};
const breed2 = {
    breed: "Tabby",
    type: "Cat",
};
const breed3 = {
    breed: "Chó Mỹ",
    type: "Dog",
};
const breed4 = {
    breed: "Mèo Ý",
    type: "Cat",
};

// Lấy dữ liệu petArr
if (!getFromStorage("petArr")) {
    saveToStorage("petArr", [data1, data2]);
}
// Tạo biến petArr là mảng lưu danh sách thú cưng
// Tạo biến  global petArr để sử dụng cho tất cả các page
const petArr = getFromStorage("petArr");

// Lấy dữ liệu breedArr
if (!getFromStorage("breedArr")) {
    saveToStorage("breedArr", [breed1, breed2, breed3, breed4]);
}
// Tạo biến  global breedArr để sử dụng cho tất cả các page
// Tạo biến  breedArr là mảng lưu giống thú cưng
const breedArr = getFromStorage("breedArr");



// API LocalStorage thực hiện lưu trữ các dữ liệu (String or Number)
// Theo cấu trúc Key-Value
// Thực hiện lấy dữ liệu từ localStorage theo Key tương ứng
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
    // return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

// Hàm nhận hai tham số là key, value
// Thực hiện việc lưu xuống localStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
