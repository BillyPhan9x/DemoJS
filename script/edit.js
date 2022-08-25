'use strict';

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");

const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");


// Hiển thị dữ liệu các thú cưng vào bảng ( dữ liệu đã nhập ở Pet Management)
// Được lưu vào localStorega
renderTableData(petArr);


// Hàm: Hiển thị dữ liệu các thú cưng vào bảng
function renderTableData(petArr) {

    // Xóa nội dung hiện có của bảng
    tableBodyEl.innerHTML = "";

    // Với mỗi thú cưng có trong petArr -> tạo 1 hàng chứa dữ liệu của thú cưng đó trên bảng 
    petArr.forEach((pet) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <th scope="row">${pet.id}</th>
        <td>${pet.name}</td>
        <td>${pet.age}</td>
        <td>${pet.type}</td>
        <td>${pet.weight} kg</td>
        <td>${pet.length} cm</td>
        <td>${pet.breed}</td>
        <td><i class = "bi bi-square-fill" style = "color: ${pet.color}"></i></td>
        <td><i class="bi ${pet.vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
            }"></i></td>
        <td><i class="bi ${pet.dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
            }"></i></td>
        <td><i class="bi ${pet.sterilized ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
            }"></i></td>
        <td>
            ${displayTime(pet.date).slice(8, 10)}
            /${displayTime(pet.date).slice(5, 7)}
            /${displayTime(pet.date).slice(0, 4)}
        </td>
        <td><button onclick="editPet('${pet.id}')" type="button" style="background-color: #ffc100; color: #000; border-radius: 5px; border: none" class="btn btn-danger">Edit</button></td>
        `;

        tableBodyEl.appendChild(row);
    });

    // // Bắt sự kiện edit
    // editEvent();
}
// console.log((getFromStorage("petArr")));


// function editEvent() {
//     const editElList = document.querySelectorAll(".btn.btn-danger");
//     editElList.forEach((editEl) => {
//         // Bắt sự kiện click vào nút editEL
//         editEl.addEventListener("click", function () {
//             // Tạo biến id gán id thú cưng cần được edit
//             const id = editEl.parentElement.parentElement.children[0].innerHTML;  // Bài 13
//             // Gọi lại hàm edit để edit pet
//             eidtPet(id);
//         });
//     });
// }


// Hàm: Hiển thị thời gian
function displayTime(date) {
    if (typeof date === "string") {
        return date;
    } else if (typeof date === "object") {
        return JSON.parse(JSON.stringify(date));
    }
}



// Hàm: Chỉnh sửa dữ liệu thông tin thú cưng pet
function editPet(id) {
    // hiển thị form nhập dữ liệu, loại bỏ class ẩn hide
    formEl.classList.remove("hide");
    // Tạo biến gán bằng dữ liệu của thú cưng pet cần edit
    // Chức năng tìm
    const pet = petArr.find((petItem) => petItem.id === id);
    // Hiên thị thông tin của thú cưng lên form nhập input theo id
    idInput.value = id;
    nameInput.value = pet.name;
    ageInput.value = pet.age;
    typeInput.value = pet.type;
    weightInput.value = pet.weight;
    lengthInput.value = pet.length;
    colorInput.value = pet.color;
    //  Để breedInput ở đây không hiển thị thông tin lên form input
    vaccinatedInput.checked = pet.vaccinated;
    dewormedInput.checked = pet.dewormed;
    sterilizedInput.checked = pet.sterilized;

    // Hiển thị đúng các loại giống cho từng loại Dog - Cat khi người dùng cần edit
    renderBreed();
    // Hiển thị dữ liệu loại giống thú cưng (dữ liệu ban đầu trước khi edit) ==> Để ở đây mới được
    breedInput.value = `${pet.breed}`;
}


// Bắt sự kiện nhấp vào typeInput => Sau đó hiển thị các loại giống đúng theo home
typeInput.addEventListener("click", renderBreed);


// Hàm: Hiển thị giống thú cưng theo từng loại (Dog -Cat)
function renderBreed() {
    breedInput.innerHTML = "<option>Select Breed</option>";
    // Nếu type là Dog
    if (typeInput.value === "Dog") {
        // Mảng chứa các loại giống của Dog
        const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
        breedDogs.forEach(function (breedItem) {
            const option = document.createElement("option");
            option.innerHTML = `${breedItem.breed}`;
            breedInput.appendChild(option);
        });
        // Nếu type là Cat
    } else if (typeInput.value === "Cat") {
        // Mảng chứa các loại giống của Cat
        const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
        breedCats.forEach(function (breedItem) {
            const option = document.createElement("option");
            option.innerHTML = `${breedItem.breed}`;
            breedInput.appendChild(option);
        });
    }
}

//1. Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {

    // 11. Lấy được dữ liệu từ các Input Form
    // Gán tất cả vào một Object  
    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        length: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        // date: new Date(),
    };
    // console.log(data);

    // 3. Validate dữ liệu
    // Nếu hợp lệ : thực thi
    // Không hợp lệ: Nếu có lỗi thì bạn sẽ hiển thị lỗi ra cho người dùng 
    const isValidate = validateData(data);
    // console.log(isValidate);
    if (isValidate) {
        // tạo biến index gán bằng petArr để tìm pet trong index với id
        const index = petArr.findIndex((pet) => pet.id === data.id);
        // Vẫn giữ ngày thêm thú cưng - Date Added như cũ
        data.date = petArr[index].date;
        // Lưu dữ liệu lại (cập nhật dữ liệu) thú cưng đó
        petArr[index] = data;
        saveToStorage(("petArr"), petArr);
        // Ẩn form input đi và hiển thị lại bảng thú cưng pet
        formEl.classList.add("hide");
        // Hiển thị danh sách thú cưng
        renderTableData(petArr);
        // Xóa thông tin từ form nhập input
        // clearInput();
    }
});


//3. Validate dữ liệu hợp lệ
// Giá trị ID không được trùng với các thú cưng còn lại. Nếu không hợp lệ, hãy đưa ra thông báo "ID must unique!". Thêm thú cưng vào danh sách trên hệ thống
function validateData(data) {
    // Xác thực các dữ liệu Input đầu vào
    // Không có trường hợp nào bị nhập thiếu dữ liệu.
    // Khai báo biến cờ hiệu
    let isValidate = true;

    // input name - Pet Name
    if (data.name.trim() === "") {
        document.getElementById("name-error").innerHTML = "Please Input For Pet Name";
        isValidate = false;
    } else {
        document.getElementById("name-error").innerHTML = "";
    }
    // input age - Age
    if (!data.age) {
        document.getElementById("age-error").innerHTML = "Please Input For Age";
        isValidate = false;
    } else if (data.age < 1 || data.age > 15) {
        document.getElementById("age-error").innerHTML = "Age must be between 1 and 15!";
        isValidate = false;
    } else {
        document.getElementById("age-error").innerHTML = "";
    }
    // input weight - Weight
    if (!data.weight) {
        document.getElementById("weight-error").innerHTML = "Please Input For Weight";
        isValidate = false;
    } else if (data.weight < 1 || data.weight > 15) {
        document.getElementById("weight-error").innerHTML = "Weight must be between 1 and 15!";
        isValidate = false;
    } else {
        document.getElementById("weight-error").innerHTML = "";
    }
    // input length - Length
    if (!data.length) {
        document.getElementById("length-error").innerHTML = "Please Input For Length";
        isValidate = false;
    } else if (data.length < 1 || data.length > 100) {
        document.getElementById("length-error").innerHTML = "Length must be between 1 and 100!";
        isValidate = false;
    } else {
        document.getElementById("length-error").innerHTML = "";
    }
    // input type - Type
    if (data.type === "Select Type") {
        document.getElementById("type-error").innerHTML = "Please select Type!";
        isValidate = false;
    } else {
        document.getElementById("type-error").innerHTML = "";
    }
    // input breed - Breed
    if (data.breed === "Select Breed") {
        document.getElementById("breed-error").innerHTML = "Please select Breed!";
        isValidate = false;
    } else {
        document.getElementById("breed-error").innerHTML = "";
    }
    return isValidate;
};















