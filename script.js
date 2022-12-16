/*Khai báo biến*/
/*Biến caret ở phần convert file*/
let caret = document.querySelector(".caret");
/*Biến submenu ở phần convert file*/
let subMenu = document.querySelector(".convertFile__content__submenu");
/*Biến openSidebar ở phần header sidebar*/
let chooseFile = document.querySelector("#chooseFile");
/*Đây là biến phần chọn file: select file*/
let selectFile = document.querySelector(".convert__chooseFile");
/*Đây là biến của phần hiển thị thông tin file sau khi chọn*/
let convertFileItem = document.querySelector(".convertFile__Item");
/*Đây là biến của phần button hiển thị sau khi chọn file: GG Drive, Dropbox*/
let convertFileselectFileBtn = document.querySelector(".convertFile--btn");
/*Đây là biến bao bọc  của toàn bộ phần: chọn file, caret, submenu*/
let dropdown = document.querySelector(".convertFile__content__dropdown");
/*Đây là biến xoá 1 file sau khi đã chọn file*/
let deleteFileSelect = document.querySelector(".convertFile__select__delete");
let previewImg = document.querySelector("#previewImg");
let convertFile = document.querySelector(".convertFile__select__File__btn__change");
let convertFile_to = document.querySelector(".convertFile__select__File__to");
let fileStatus = document.querySelector(".convertFile__select__fileStatus p");
let convertFile_loading = document.querySelector(".convertFile__loading");
let processingFile = document.querySelector(".convertFile__progress__load");
let processingFile_percent = document.querySelector(".convertFile__progress__percent");
let signUp_btn = document.querySelector(".header__navbar-btn-item");
let modal = document.querySelector(".modal");
let header_toggle = document.querySelector(".header__navbar-toggle i");
let header_navbar = document.querySelector(".header_sidebar");




/*Đây là hàm hiển thị và ẩn submenu của phần chọn file*/
var carets = caret.addEventListener("click", () => {
    subMenu.classList.toggle("shownhide_submenu");
});

/*Đây là hàm chuyển hoạt động chọn file của thẻ input type = file sang biến selectFile*/
selectFile.addEventListener("click", () => chooseFile.click());

/*Đây là hàm hiển thị thông tin file và các nút bấm liên quan, đồng thời ẩn phần chọn file*/
function convertFile_selected() {
    convertFileItem.style.display = "block";
    convertFileselectFileBtn.style.display = "block";
    dropdown.style.display = "none";
}

/*Đây là hàm nhận file từ user và thay đổi thông tin của file đó  vào phần hiển thị file sau khi chọn*/
chooseFile.addEventListener("change", (e) => {
    let file = e.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    let fileName = document.getElementById("fileName");
    let fileSize = document.getElementById("fileSize");

    previewImg.src = URL.createObjectURL(file);
    let newImg = document.createElement("img");
    newImg.src = URL.createObjectURL(e.target.files[0]);

    fileName.innerHTML = file.name;
    let size = file.size / 1e6;
    fileSize.innerHTML = size.toFixed(2) + " MB";
    reader.readAsDataURL(file);
    convertFile_loading.style.display = "block";

    reader.addEventListener("progress", (e) => {
        if (e.loaded && e.total) {
            let percent = Math.round((e.loaded / e.total) * 100);
            processingFile.value = percent;
            processingFile_percent.innerHTML = percent + "%";
            if (percent < 100) {
                fileStatus.innerHTML = "Wait";
                fileStatus.style.borderColor = "yellow";
            } else if (percent === 100) {
                fileStatus.innerHTML = "Ready";
                fileStatus.style.borderColor = "lightgreen";
                convertFile_selected();
            }
        }
    });

    convertFile.addEventListener("click", () => {
        if (convertFile_to.value === "") {
            alert("Please select the format to convert!");
            convertFile_to.style.borderColor = "red";
        } else {
            window.jsPDF = window.jspdf.jsPDF;
            let imagePdf = new jsPDF();
            imagePdf.addImage(newImg, 10, 10);
            imagePdf.save("ImagetoPDF.pdf");
            deleteFile();
        }
    });

});

/*Đây là hàm xoá một file sau khi đã chọn và trở về trạng thái lúc chưa chọn file*/
function deleteFile() {
    convertFileItem.style.display = "none";
    convertFileselectFileBtn.style.display = "none";
    dropdown.style.display = "block";
    convertFile_loading.style.display = "none";
}

deleteFileSelect.addEventListener("click", deleteFile);

signUp_btn.addEventListener("click",()=>{
    modal.style.display = "flex";
    let modalClose = document.querySelector(".form_close");
    modalClose.addEventListener("click", ()=>{
        modal.style.display = "none";
    });
});

header_toggle.addEventListener("click", ()=>{
    if(header_toggle.classList.contains("fa-bars")){
        header_toggle.classList.replace("fa-bars", "fa-xmark");
    }else {
        header_toggle.classList.replace("fa-xmark", "fa-bars");
    }
    header_navbar.classList.toggle("shown_sidebar");
});