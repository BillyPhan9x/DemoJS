'use strict';


const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");



// Bắt sự kiện click vào  nút Export 
btnExport.addEventListener("click", function () {
    const isExport = confirm("Bạn xác nhận chắc chắn rằng sẽ Export ?");
    if (isExport) {
        saveStaticDataToFile();
    }
});

function saveStaticDataToFile() {
    // Tạo dữ liệu để lưu xuống file
    const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
        type: "application/json",
    });

    // lưu file
    saveAs(blob, "petData.json");
    // Dùng thư viện FileSaver.js (đặt trong thư mục FileSaver_libary) theo link hướng dẫn 
}



// Bắt sự kiện click vào nút Import
btnImport.addEventListener("click", function () {
    // Kiểm tra xem người dùng có chọn tập tin chưa
    if (!fileInput.value) {
        alert("Vui lòng chọn file muốn import !")
    } else {
        // Xác nhận import
        const isImport = confirm("Bạn xác nhận chắc chắn rằng sẽ Import ?");
        if (isImport) {
            const file = fileInput.files[0];

            const reader = new FileReader();

            // Sự kiệ load dữ liệu từ file lên
            reader.addEventListener("load", function () {
                // kiểm tra cấu trúc của file có hợp lệ với định đạng yêu cầu không
                const isValidateFile = checkFile(JSON.parse(reader.result));
                if (isValidateFile) {
                    // Lưu dữ liệu xuống localStorage
                    saveToStorage("petArr", JSON.parse(reader.result));
                    // Thông báo import thành công
                    alert("Import thành công !");
                }
            }, false);
            // đọc file 
            if (file) {
                reader.readAsText(file);
            }
            // reset file input
            fileInput.value = "";
        }
    }
})