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
const btnCalculateBMI = document.getElementById("calculate-btn");

// Tạo biến global petArr là mảng lưu danh sách thú cưng
const petArr = [];

const tableBodyEl = document.getElementById("tbody");

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
    bmi: "?",
    date: new Date(),
  };

  //3. Validate dữ liệu hợp lệ
  // Giá trị ID không được trùng với các thú cưng còn lại. Nếu không hợp lệ, hãy đưa ra thông báo "ID must unique!". Thêm thú cưng vào danh sách trên hệ thống
  function validatedForm() {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === data.id) {
        window.alert("ID must unique!");
        check = false;
        break;
      }
    }

    // Xác thực các dữ liệu Input đầu vào
    // Sử dụng hàm alert() để đưa ra thông báo cho người dùng
    let check = true;
    if (!data.id) {
      alert("Please Input For ID");
      check = false;
    }
    if (!data.name) {
      alert("Please Input For Pet Name");
      check = false;
    }
    if (!data.age) {
      alert("Please Input For Age");
      check = false;
    }
    if (!data.weight) {
      alert("Please Input For Weight");
      check = false;
    }
    if (!data.length) {
      alert("Please Input For Length");
      check = false;
    }

    if (data.age < 1 || data.age > 15) {
      alert("Age must be between 1 and 15!");
      check = false;
    }
    if (data.weight < 1 || data.weight > 15) {
      alert("Weight must be between 1 and 15!");
      check = false;
    }
    if (data.length < 1 || data.length > 100) {
      alert("Length must be between 1 and 100!");
      check = false;
    }
    if (data.type === "Select Type") {
      alert("Please select Type!");
      check = false;
    }
    if (data.breed === "Select Breed") {
      alert("Please select Breed!");
      check = false;
    }
    return check;
  }

  // console.log(validatedForm());
  //4. Thêm thú cưng vào dánh sách
  // Nếu không gặp lỗi gì thì sẽ thêm thú cưng vào mảng petArr
  const validated = validatedForm(data);
  if (validated) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  }
});
//5. Hiển thị danh sách thú cưng
// Xoá nội dung hiện có của bảng.
// Duyệt qua các phần tử trong petArr

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = genRow(pet);
    tableBodyEl.appendChild(row);
  });
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
      <td><i class = "bi bi-square-fill" style = "color: ${row.color}"></i></td>
      <td><i class=" ${
        row.vaccinated ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        row.dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        row.sterilized ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
      }"></i></td>
      <td id="bmi-calc">${row.bmi}</td>
      <td>${row.date.getDate()} / ${
    row.date.getMonth() + 1
  } / ${row.date.getFullYear()}</td>
      <td><button type="button" class="btn btn-danger btn-delete" id="btn-delete" data-id="${
        row.id
      }">Delete</button></td>
      `;
}
//6. Xoá các dữ liệu vừa nhập trên Form Input
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = "";
  dewormedInput.checked = "";
  sterilizedInput.checked = "";
}

//7. Xoá một thú cưng khỏi mảng
tableBodyEl.addEventListener("click", function (e) {
  // phần tử trực tiếp gây ra sự kiện
  if (e.target.id != "btn-delete") return;
  const petId = e.target.getAttribute("data-id");
  if (!petId) return;
  const isConfirm = confirm("Are you sure?");
  if (!isConfirm) return;
  // console.log(`Delete pet with id = ${petId}`);
  // remove
  for (var i = 0; i < petArr.length; i++) {
    if (petArr[i].id === petId) {
      petArr.splice(i, 1);
    }
  }

  renderTableData(petArr);
});

//8. Hiển thị các thú cưng khoẻ mạnh
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

//9. (Nâng cao): Tính toán chỉ số BMI
btnCalculateBMI.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === "Dog") {
      petArr[i].bmi = (
        (petArr[i].weight * 703) /
        petArr[i].length ** 2
      ).toFixed(2);
    } else {
      petArr[i].bmi = (
        (petArr[i].weight * 886) /
        petArr[i].length ** 2
      ).toFixed(2);
    }
  }
  renderTableData(petArr);
});
