/*Khai báo biến*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const userInfo = "USER_INFO";

/*Biến cho phần header*/
const caret = $(".caret");  /*Biến caret ở phần convert file*/
const header_toggle = $(".header__navbar-toggle i");  /**Biến đóng mở navbar trên mobile */
const header_navbar = $(".header_sidebar");  //Biến của phần navbar trên mobile
const header_btn = $(".header__navbar-btn");  /**Biến tổng của hai nút mở form đăng ký/đăng nhập */
const form_btn = $$(".header__navbar-btn-item");  /**Biến mở form đăng ký/đăng nhập */
const reg_btn = $(".register_btn");  /**Biến của nút đăng ký sau khi mở form đăng ký */
const logIn_btn = $(".logIn_btn");  /**Biến của nút đăng nhập sau khi mở form */
const header_dropdown = $(".header__navbar_dropdown-btn button");  /**Biến mở button dropdown sau khi đăng nhập  */
const logOut = $(".logOut"); //Biến của nút log out trên dropdown phần header 

/**Biến phần convert file */
const chooseFile = $("#chooseFile");  //Biến lấy thẻ input chọn file (type=file)
const selectFile = $(".convert__chooseFile");  //Biến lấy nút chọn file
const convertFileItem = $(".convertFile__Item");  //Biến cho phần thông tin file được chọn
const previewImg = $("#previewImg");  //Biến của phần hiển thị ảnh thu nhỏ của file đã chọn
const dropdown = $(".convertFile__content__dropdown");  //Biến cho nút dropdown trên nút chọn file
const convertFileselectFileBtn = $(".convertFile--btn");  // Biến tổng cho nút dropbox, gg drive và nút change file sang pdf
const deleteFileSelect = $(".convertFile__select__delete");  //Biến của nút xoá file sau khi chọn
const convertFile = $(".convertFile__select__File__btn__change");  //Biến của nút change file sang pdf
const convertFile_to = $(".convertFile__select__File__to"); //Biến của thẻ select chọn kiểu, loại file
const convertFile_loading = $(".convertFile__loading");  //Biến cho phần tiến độ load file lên

/**Biến cho phần modal */
const modal = $(".modal_form");  //Biến modal cho phần form đăng ký/đăng nhập
const form_input = $$(".form");


const app = {
    render: function () {
        /*Đây là hàm hiển thị và ẩn submenu của phần chọn file*/
        caret.addEventListener("click", () => {
            let subMenu = $(".convertFile__content__submenu");
            subMenu.classList.toggle("shownhide_submenu");
        });

        header_toggle.addEventListener("click", () => {
            if (header_toggle.classList.contains("fa-bars")) {
                header_toggle.classList.replace("fa-bars", "fa-xmark");
            } else {
                header_toggle.classList.replace("fa-xmark", "fa-bars");
            }
            header_navbar.classList.toggle("shown_sidebar");
        });

    },

    handleEvent: function () {
        form_btn.forEach((item, index) => {
            item.addEventListener("click", () => {
                let form_input = $$(".form");
                modal.style.display = "flex";
                form_input[index].style.display = "block";
                let modalClose = document.querySelectorAll(".form_close");
                modalClose[index].addEventListener("click", () => {
                    modal.style.display = "none";
                    form_input[index].style.display = "none";
                });
            });
        });


        reg_btn.addEventListener("click", () => {
            if (typeof (localStorage) !== undefined) {
                let username = $(".form_input_reg .username");
                let password = $(".form_input_reg .password");
                let repeat_password = $(".repeat_password");
                let email = $(".form_input_reg .email");
                let infoUser = {
                    username: username.value,
                    password: password.value
                };

                if (username.value.trim() === "" || password.value.trim() === "" || repeat_password.value.trim() === "" || email.value.trim() === "") {
                    notification({
                        title: "Error",
                        message: "Please check the information again."
                    });
                } else {
                    if (localStorage.getItem("userInfo") === null) {
                        if (password.value.trim() === repeat_password.value.trim()) {
                            localStorage.setItem("userInfo", JSON.stringify(infoUser));
                            notification({
                                title: "Success",
                                message: "Register Successfully"
                            });
                            username.value = "";
                            password.value = "";
                            email.value = "";
                            repeat_password.value = "";
                        } else {
                            notification({
                                title: "Error",
                                message: "Please check the information again."
                            });
                        }

                    } else {
                        notification({
                            title: "warning",
                            message: "You already have an account."
                        });
                    }
                }

            } else {
                notification({
                    title: "Error",
                    message: "Your browser does not support Local Storage."
                });
            }
        });

        logIn_btn.addEventListener("click", (e) => {
            let username = $(".form_input_logIn .username");
            let password = $(".form_input_logIn .password");

            let infoUser = JSON.parse(localStorage.getItem("userInfo"));
            if (typeof (localStorage) !== undefined) {
                if (localStorage.getItem("userInfo") !== null) {
                    if (username.value.trim() === infoUser.username && password.value.trim() === infoUser.password) {
                        notification({
                            title: "Success",
                            message: "Login Sucessfully"
                        });
                        modal.style.display = "none";
                        username.value = "";
                        password.value = "";
                        header_btn.style.display = "none";
                        header_dropdown.style.display = "block";
                        header_navbar.classList.remove("shown_sidebar");
                        header_toggle.classList.replace("fa-xmark", "fa-bars");
                        selectFile.removeAttribute("data-bs-toggle");
                        selectFile.removeAttribute("data-bs-target");
                        changeFile();
                    } else {
                        notification({
                            title: "Error",
                            message: "Please check the information again."
                        });
                    }
                } else {
                    notification({
                        title: "Error",
                        message: "Your account could not be found."
                    });
                }
            } else {
                notification({
                    title: "Error",
                    message: "Your browser does not support Local Storage."
                });
            }

        });

        function addFile() {
            return chooseFile.click();
        }

        function changeFile() {
            if (selectFile.hasAttribute("data-bs-toggle") === true) {
                notification({
                    title: "Error",
                    message: "Please Login or Regiser to take the action."
                });
            } else {
                selectFile.addEventListener("click", addFile);
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
                        let processingFile = $(".convertFile__progress__load");
                        let processingFile_percent = $(".convertFile__progress__percent");
                        let fileStatus = $(".convertFile__select__fileStatus p");
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
                            convertFile_to.style.borderColor = "red";
                            alertInfo({
                                id: "#convertFile_alert-status",
                                type: "warning",
                                message: "Please choose type File."
                            });
                        } else {
                            convertFile_to.style.borderColor = "gray";
                            window.jsPDF = window.jspdf.jsPDF;
                            let imagePdf = new jsPDF();
                            imagePdf.addImage(newImg, 10, 10);
                            imagePdf.save("ImagetoPDF.pdf");
                            deleteFile();
                            setTimeout(alertInfo({
                                id: "#convertFile_alert-status",
                                type: "success",
                                message: "Successfull!"
                            }), 5000);
                        }
                    });
                });


                /*Đây là hàm xoá một file sau khi đã chọn và trở về trạng thái lúc chưa chọn file*/
                function deleteFile() {
                    convertFileItem.style.display = "none";
                    convertFileselectFileBtn.style.display = "none";
                    dropdown.style.display = "block";
                    convertFile_loading.style.display = "none";
                    alertInfo({
                        id: "#convertFile_alert-status",
                        type: "",
                        message: ""
                    });
                }

                deleteFileSelect.addEventListener("click", deleteFile);
            }
        }

        logOut.addEventListener("click", () => {
            header_btn.style.display = "flex";
            header_dropdown.style.display = "none";
            selectFile.setAttribute("data-bs-toggle", "modal");
            selectFile.setAttribute("data-bs-target", "#popUp");
            changeFile();
            selectFile.removeEventListener("click", addFile);
        });

        function notification({ title = "", message = "" }) {
            let titles = $(".modal .modal-title");
            let messages = $(".modal .modal-body");

            titles.innerHTML = title;
            messages.innerHTML = message;
        }

        function alertInfo({ id = "", type = "", message = "" }) {
            const alert = $(id);
            const icons = {
                primary: "#info-fill",
                success: "#check-circle-fill",
                warning: "#exclamation-triangle-fill",
                danger: "#exclamation-triangle-fill"
            }
            const icon = icons[type];

            if (alert) {
                alert.innerHTML =
                    `<div class="alert alert-${type} d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="${icon}"/></svg>
                    <div>
                        ${message}
                    </div>
                </div>`
            }
        }

    },

    start: function () {
        this.handleEvent();
        this.render();
    }
}

app.start();
