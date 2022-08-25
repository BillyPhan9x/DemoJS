"use strict";

// Lấy ra các DOM Element
// Gán giá trị các phần tử vào các biến. Bắt sự kiện Click vào nút "Submit"

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
const btnShowHealthyPet = document.getElementById("healthy-btn");
const tableBodyEl = document.getElementById("tbody");

// // Tạo biến global petArr là mảng lưu danh sách thú cưng
// const petArr = getFromStorage("petArr");
// console.log(JSON.parse(localStorage.getItem("PetArr")));

// Hiển thị danh sách thú cưng đã nhập trước đó
renderTableData(petArr);
// Bắt sự kiện click vào typeInput (type) để hiên thị loại giống theo đúng loại
typeInput.addEventListener("click", renderBreed);

// Hàm hiển thị các loại giống đúng với từng loại Dog - Cat
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  let breedArr = getFromStorage("breedArr");
  // console.log("breedArr", breedArr);
  // console.log(breedDogs);
  // console.log(breedCats);

  // Nếu type là Dog
  if (typeInput.value === "Dog") {
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    // Mảng chứa các loại giống của Dog
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
  //2.Lấy được dữ liệu từ các Input Form
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
    date: new Date(),
  };

  // 3. Validate dữ liệu
  // Nếu hợp lệ : Thực hiện 4, 0, 5, 6
  // Không hợp lệ: Nếu có lỗi thì bạn sẽ hiển thị lỗi ra cho người dùng
  const isValidate = validateData(data);
  // console.log(isValidate);
  if (isValidate) {
    // 4. Thêm dữ liệu vào mảng các pet
    petArr.push(data);
    // 0. Lưu dữ liệu lại (cập nhật dữ liệu)
    saveToStorage("petArr", petArr);
    // 5. Hiển thị danh sách thú cưng
    renderTableData(petArr);
    // 6. Xóa thông tin từ form nhập input
    clearInput();
  }
});

// Hàm validateData dữ liệu hợp lệ
function validateData(data) {
  // Xác thực các dữ liệu Input đầu vào
  // Không có trường hợp nào bị nhập thiếu dữ liệu.
  // Khai báo biến cờ hiệu
  let isValidate = true;
  // data.id là 1 string "   abc    "  ==> "abc"
  if (data.id.trim() === "") {
    document.getElementById("id-error").innerHTML = "Please Input For Pet ID";
    isValidate = false;
  } else {
    document.getElementById("id-error").innerHTML = "";
  }
  // input name - Pet Name
  if (data.name.trim() === "") {
    document.getElementById("name-error").innerHTML =
      "Please Input For Pet Name";
    isValidate = false;
  } else {
    document.getElementById("name-error").innerHTML = "";
  }
  // input age - Age
  if (!data.age) {
    document.getElementById("age-error").innerHTML = "Please Input For Age";
    isValidate = false;
  } else if (data.age < 1 || data.age > 15) {
    document.getElementById("age-error").innerHTML =
      "Age must be between 1 and 15!";
    isValidate = false;
  } else {
    document.getElementById("age-error").innerHTML = "";
  }
  // input weight - Weight
  if (!data.weight) {
    document.getElementById("weight-error").innerHTML =
      "Please Input For Weight";
    isValidate = false;
  } else if (data.weight < 1 || data.weight > 15) {
    document.getElementById("weight-error").innerHTML =
      "Weight must be between 1 and 15!";
    isValidate = false;
  } else {
    document.getElementById("weight-error").innerHTML = "";
  }
  // input length - Length
  if (!data.length) {
    document.getElementById("length-error").innerHTML =
      "Please Input For Length";
    isValidate = false;
  } else if (data.length < 1 || data.length > 100) {
    document.getElementById("length-error").innerHTML =
      "Length must be between 1 and 100!";
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
  // Kiểm tra ID có phải là duy nhất hay không ?
  // Duyệt qua các mảng petArr đã có để kiểm tra
  // Giá trị ID không được trùng với các thú cưng còn lại. Nếu không hợp lệ, hãy đưa ra thông báo "ID must unique!". Thêm thú cưng vào danh sách trên hệ thống
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      document.getElementById("id-error").innerHTML = "ID must unique!";
      isValidate = false;
      break;
    }
  }
  return isValidate;
}

//     // Xác thực các dữ liệu Input đầu vào
//     // Sử dụng hàm alert() để đưa ra thông báo cho người dùng
//     if (!data.id) {

//         document.getElementById("input-id").innerHTML = "Please Input For Pet ID";
//         check = false;
//     }
//     if (!data.name) {
//         alert("Please Input For Pet Name");
//         check = false;
//     }
//     if (!data.age) {
//         alert("Please Input For Age");
//         check = false;
//     }
//     if (!data.weight) {
//         alert("Please Input For Weight");
//         check = false;
//     }
//     if (!data.length) {
//         alert("Please Input For Length");
//         check = false;
//     }

//     if (data.age < 1 || data.age > 15) {
//         alert("Age must be between 1 and 15!");
//         check = false;
//     }
//     if (data.weight < 1 || data.weight > 15) {
//         alert("Weight must be between 1 and 15!");
//         check = false;
//     }
//     if (data.length < 1 || data.length > 100) {
//         alert("Length must be between 1 and 100!");
//         check = false;
//     }
//     if (data.type === "Select Type") {
//         alert("Please select Type!");
//         check = false;
//     }
//     if (data.breed === "Select Breed") {
//         alert("Please select Breed!");
//         check = false;
//     }
//     return check;
// }

// Hàm: 5.Hiển thị danh sách thú cưng

function renderTableData(petArr) {
  // Xoá nội dung hiện có của bảng.
  tableBodyEl.innerHTML = "";
  // Duyệt qua các phần tử trong petArr
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = genRow(pet);
    tableBodyEl.appendChild(row);
  });
  // console.log(getFormStorage(petArr));
}

function genRow(row) {
  return `
        <th>${row.id}</th>
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.type}</td>
        <td>${row.weight} kg</td>
        <td>${row.length} cm</td>
        <td>${row.breed}</td>
        <td><i class = "bi bi-square-fill" style = "color: ${
          row.color
        }"></i></td>
        <td><i class="bi ${
          row.vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
        }"></i></td>
        <td><i class="bi ${
          row.dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
        }"></i></td>
        <td><i class="bi ${
          row.sterilized ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
        }"></i></td>
        <td>
        ${displayTime(row.date).slice(8, 10)}
        /${displayTime(row.date).slice(5, 7)}
        /${displayTime(row.date).slice(0, 4)}
        </td>
        <td><button type="button" class="btn btn-danger" onclick="deletePet('${
          row.id
        }')">Delete</button></td>
        `;

  // <td>${row.date.getDate()} / ${row.date.getMonth() + 1} / ${row.date.getFullYear()}</td>
  // <td><button type="button" class="btn btn-danger btn-delete" id="btn-delete" data-id="${row.id
  // }">Delete</button></td>
}

// Hàm: Hiển thị thời gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}

//Hàm: 6.Xoá các dữ liệu vừa nhập trên Form Input
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// Hàm: 7.Xoá một thú cưng khỏi mảng
// tableBodyEl.addEventListener("click", function (e) {
//   if (e.target.id != "btn-delete") return;
//   const petId = e.target.getAttribute("data-id");
//   if (!petId) return;
//   const isConfirm = confirm("Are you sure?");
//   if (!isConfirm) return;
//   // console.log(`Delete pet with id = ${petId}`);
//   // remove
//   for (var i = 0; i < petArr.length; i++) {
//     if (petArr[i].id === petId) {
//       petArr.splice(i, 1);
//     }
//   }

//   renderTableData(petArr);
// });

function deletePet(petId) {
  const isDelete = confirm("Are you sure ?");
  if (isDelete) {
    // Thực hiện bước xóa ở đây
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        // Xóa khỏi mảng
        petArr.splice(i, 1);
        // Cập nhật lại dữ liệu dưới dạng localStorage
        saveToStorage("petArr", petArr);
        // Gọi lại hàm hiển thị thú cưng
        renderTableData(petArr);
        break;
      }
    }
  }
}

// 8. Hiển thị các thú cưng khoẻ mạnh
// Tạo một biến dùng để kiểm tra xem hiện tại đang hiển thị tất cả thú cưng hay là chỉ thú cưng khỏe mạnh
let healthyCheck = false;
// Tạo một biến healthyPetArr dưới dạng mảng lưu danh sách thú cưng là Healthy Pet
const healthyPetArr = [];
// Bắt sự kiện click vào Show All Pet/Show Healthy Pet
// Gán lại mảng healthyPetArr sử dụng hàm filter JS nếu healthyCheck = true.
btnShowHealthyPet.addEventListener("click", function () {
  let healthyPetArr = petArr.filter((pet) => {
    if (!pet.vaccinated || !pet.dewormed || !pet.sterilized) {
      return false;
    }
    return true;
  });

  // lọc trong mảng petArr
  // for (let i = 0; i < petArr.length; i++) {
  //     if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
  //         healthyPetArr.push(petArr[i]);
  //     }
  // }
  // sau for sẽ có mảng chứa các thú cưng khỏe mạnh
  // gọi hàm hiển thị
  // renderTableData(healthyPetArr);

  // Xử lý sự kiện để thay đổi button và biến healthyCheck.
  // Gọi hàm renderTableData với input là petArr
  // Nếu healthyCheck = false hoặc input là  healthyPetArr nếu healthyCheck = true.
  healthyCheck = healthyCheck === false ? true : false;

  if (healthyCheck) {
    btnShowHealthyPet.textContent = "Show All Pet";
    renderTableData(healthyPetArr);
  } else {
    btnShowHealthyPet.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  }
  return;
});

// //9. (Nâng cao): Tính toán chỉ số BMI
// btnCalculateBMI.addEventListener("click", function () {
//     for (let i = 0; i < petArr.length; i++) {
//         if (petArr[i].type === 'Dog') {
//             petArr[i].bmi = ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2);
//         } else {
//             petArr[i].bmi = ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
//         }
//     }
//     renderTableData(petArr);
// });
