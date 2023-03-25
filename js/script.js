/*Khai báo biến*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const userInfo = "USER_INFO";

/*Biến cho phần header*/
const caret = $(".caret");  /*Biến caret ở phần convert file*/
const headerToggle = $(".header__navbar-toggle i");  /**Biến đóng mở navbar trên mobile */
const headerNavbar = $(".header__navbar-list");  //Biến của phần navbar trên mobile
const navbarContentItem = $$(".header__navbar-item a"); //Biến của các thành phần trên navbar
const headerBtn = $(".header__navbar-btn");  /**Biến tổng của hai nút mở form đăng ký/đăng nhập */
const formBtn = $$(".header__navbar-btn-item");  /**Biến mở form đăng ký/đăng nhập */
const registerBtn = $(".register_btn");  /**Biến của nút đăng ký sau khi mở form đăng ký */
const logInBtn = $(".logIn_btn");  /**Biến của nút đăng nhập sau khi mở form */
const headerDropdown = $(".header__navbar_dropdown-btn button");  /**Biến mở button dropdown sau khi đăng nhập  */
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
const convertFileLoading = $(".convertFile__loading");  //Biến cho phần tiến độ load file lên

/**Biến cho phần modal */
const modal = $(".modal_form");  //Biến modal cho phần form đăng ký/đăng nhập
const formInput = $$(".form");  //Biến của form đăng ký/đăng nhập
const btnDownload = $(".btn-download");  //Biến của nút download trên modal

/**Biến cho trang Gift page */
const convertFilePage = $(".convertFile_page");  //Biến trang convertFile page

/**Biến của trang my file */
const myFileBtn = $(".myFile");
const myFilePage = $(".myFile_page");


/**Biến của phần contact */
const contactName = $("#contact_name");
const contactEmail = $("#contact_email");
const contactMessage = $("#contact_message");
const contactSendBtn = $(".contact__form__btn");



const app = {
    render: function () {
        /*Hàm toggle submenu của phần chọn file*/
        caret.addEventListener("click", () => {
            let subMenu = $(".convertFile__content__submenu");
            subMenu.classList.toggle("shownhide_submenu");
        });

        //Hàm toggle navbar trên mobile
        headerToggle.addEventListener("click", () => {
            if (headerToggle.classList.contains("fa-bars")) {
                headerToggle.classList.replace("fa-bars", "fa-xmark");
            } else {
                headerToggle.classList.replace("fa-xmark", "fa-bars");
            }
            headerNavbar.classList.toggle("shown_sidebar");
        });

        navbarContentItem.forEach((item) => {
            item.addEventListener("click", () => {
                $(".header__navbar-item__link.isActive").classList.remove("isActive");
                item.classList.add("isActive");
            });
        });

        //Hàm quay lại trang convertFile từ Gift page
        navbarContentItem.forEach((item) => {
            item.addEventListener("click", () => {
                convertFilePage.classList.remove("d-none");
                headerNavbar.classList.remove("shown_sidebar");
                headerToggle.classList.replace("fa-xmark", "fa-bars");
            });
        });

        //Hàm mở my file page
        myFileBtn.addEventListener("click", () => {
            myFilePage.classList.remove("d-none");
            convertFilePage.classList.add("d-none");
            headerNavbar.classList.remove("shown_sidebar");
            headerToggle.classList.replace("fa-xmark", "fa-bars");
        });

    },

    handleEvent: function () {
        //Hàm mở form đăng ký và đăng nhập trên phần header
        formBtn.forEach((item, index) => {
            item.addEventListener("click", () => {
                modal.style.display = "flex";
                formInput[index].style.display = "block";
                let modalClose = document.querySelectorAll(".form_close");
                modalClose[index].addEventListener("click", () => {
                    modal.style.display = "none";
                    formInput[index].style.display = "none";
                });
            });
        });

        //Hàm đăng ký account
        registerBtn.addEventListener("click", () => {
            if (typeof (localStorage) !== undefined) {
                let fullName = $(".fullname");
                let username = $(".form_input_reg .username");
                let password = $(".form_input_reg .password");
                let repeat_password = $(".repeat_password");
                let email = $(".form_input_reg .email");
                let checkBox = $(".checkBox");
                let infoUser = {
                    fullName: fullName.value,
                    username: username.value,
                    email: email.value,
                    password: password.value
                };

                if (fullName.value.trim() === "" ||
                    username.value.trim() === "" ||
                    password.value.trim() === "" ||
                    repeat_password.value.trim() === "" ||
                    email.value.trim() === "" ||
                    checkBox.checked === false) {
                    notification({
                        title: "Error",
                        message: "Please check the information again."
                    });
                } else {
                    let userInfo = localStorage.getItem("userInfo");
                    if(userInfo === null){
                        listUser = [];
                    } else {
                        listUser = JSON.parse(userInfo);
                    }
                    if (password.value.trim() === repeat_password.value.trim()) {
                        listUser.push(infoUser);
                        localStorage.setItem("userInfo", JSON.stringify(listUser));
                        notification({
                            title: "Success",
                            message: "Register Successfully"
                        });
                        fullName.value = "";
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
                }

            } else {
                notification({
                    title: "Error",
                    message: "Your browser does not support Local Storage."
                });
            }
        });

        //Hàm đăng nhập vào tài khoản
        logInBtn.addEventListener("click", (e) => {
            let username = $(".form_input_logIn .username");
            let password = $(".form_input_logIn .password");

            let infoUser = JSON.parse(localStorage.getItem("userInfo"));
            if (typeof (localStorage) !== undefined) {
                if (localStorage.getItem("userInfo") !== null) {
                    for(let itemUser = 0; itemUser < infoUser.length; itemUser ++){
                        if (username.value.trim() === infoUser[itemUser].username || infoUser[itemUser].email && password.value.trim() === infoUser[itemUser].password) {
                            notification({
                                title: "Success",
                                message: "Login Sucessfully"
                            });
                            username.value = "";
                            password.value = "";
                            sessionStorage.setItem("isLogined", "true");
                            checkLogin();
                            break;
                        } else {
                            notification({
                                title: "Error",
                                message: "Please check the information again."
                            });
                        }
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

        function checkLogin() {
            let isLogin = sessionStorage.getItem("isLogined");
            if(isLogin) {
                modal.style.display = "none";
                headerBtn.style.display = "none";
                headerDropdown.style.display = "block";
                headerNavbar.classList.remove("shown_sidebar");
                headerToggle.classList.replace("fa-xmark", "fa-bars");
                selectFile.removeAttribute("data-bs-toggle");
                selectFile.removeAttribute("data-bs-target");
                changeFile();            
            } else {
                notification({
                    title: "Error",
                    message: "Please register or login to take the action"
                });
            }
        }

        //Hàm chọn file
        function addFile() {
            return chooseFile.click();
        }

        //Hàm thực hiện chuyển đổi file và hiển thị một số thông tin của file
        function changeFile() {
            //addEvenListenern click cho hàm addFile
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
                let fileName = $("#fileName");
                let fileSize = $("#fileSize");

                function getFileExtension(filename) {
                    return filename.split(".").pop();
                }

                function isValidExtension(extension) {
                    return ["jpg", "png", "jpeg"].includes(extension);
                }

                function performFunction() {
                    let reader = new FileReader();
                    previewImg.src = URL.createObjectURL(file);

                    fileName.innerHTML = file.name;
                    let size = file.size / 1e6;
                    let fixSize = size.toFixed(2) + " MB";;
                    fileSize.innerHTML = fixSize;
                    reader.readAsDataURL(file);
                    convertFileLoading.style.display = "block";

                    //Hàm hiển thị tiến trình tải file
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

                    //Hàm chuyển đổi file
                    convertFile.addEventListener("click", () => {
                        let pdfArrayStorage = localStorage.getItem("PDFARRAY");
                        if (convertFile_to.value === "") {
                            convertFile_to.style.borderColor = "red";
                            alertInfo({
                                id: "#convertFile_alert-status",
                                type: "warning",
                                message: "Please choose type File."
                            });
                        } else {
                            convertFile_to.style.borderColor = "gray";
                            const dataURL = reader.result;

                            const docDefinition = {
                                content: [
                                    {
                                        image: dataURL,
                                
                                    }
                                ]
                            }
                            const pdfDoc = pdfMake.createPdf(docDefinition);

                            reader.readAsDataURL(file);
                            if(pdfArrayStorage == null) {
                                pdfDocArray = [];
                            } else {
                                pdfDocArray = JSON.parse(pdfArrayStorage);
                            }
                            pdfDocArray.push(pdfDoc);
                            localStorage.setItem("PDFARRAY", JSON.stringify(pdfDocArray));
                            btnDownload.classList.remove("d-none");
                            alertInfo({
                                id: "#convertFile_alert-status",
                                type: "success",
                                message: "Convert File to PDF Success!"
                            });
                            notification({
                                title: "Download",
                                message: "Download"
                            });
                            btnDownload.addEventListener("click", () => {
                                pdfDoc.download();
                                deleteFile();
                            });
                        }
                    });
                }

                const nameOfFile = getFileExtension(file.name);

                if(isValidExtension(nameOfFile)) {
                    performFunction();
                } else {
                    alertInfo({
                        id: "#convertFile_alert-status",
                        type: "danger",
                        message: "We are only support JPG, JPEG, PNG"
                    });
                }
            });


            /*Đây là hàm xoá một file sau khi đã chọn và trở về trạng thái lúc chưa chọn file*/
            function deleteFile() {
                convertFileItem.style.display = "none";
                convertFileselectFileBtn.style.display = "none";
                dropdown.style.display = "block";
                convertFileLoading.style.display = "none";
                alertInfo({
                    id: "#convertFile_alert-status",
                    type: "success",
                    message: "Delete Sucsess"
                });
            }

            //addEventListener click cho hàm deleteFile
            deleteFileSelect.addEventListener("click", deleteFile);
        }

        //Hàm đăng xuất khỏi tài khoản
        logOut.addEventListener("click", () => {
            headerBtn.style.display = "flex";
            headerDropdown.style.display = "none";
            selectFile.setAttribute("data-bs-toggle", "modal");
            selectFile.setAttribute("data-bs-target", "#popUp");
            changeFile();
            selectFile.removeEventListener("click", addFile);
            sessionStorage.setItem("isLogined", "false");
        });

        //Hàm hiển thị modal thông báo
        function notification({ title = "", message }) {
            let titles = $(".modal .modal-title");
            let messages = $(".modal .modal-body");

            titles.innerHTML = title;
            messages.innerHTML = message;
        }

        //Hàm hiển thị alert
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
                    <div style="font-size: 14px; margin-left: 8px; line-height: 25px;">
                        ${message}
                    </div>
                </div>`
            }
        }


        function sendMail(e) {
            e.preventDefault();
            let params = {
                name: contactName.value,
                email: contactEmail.value,
                message: contactMessage.value
            }
            emailjs.send("service_xnnj8b6", "template_a5xp6po", params)
            .then((res) => { 
                notification({
                    title: "Successfully",
                    message: "Your message has been sent successfully"
                });
            }, (error)=>{
                notification({
                    title: "Error",
                    message: "An error occurred while sending your message"
                });
            })

            contactName.value = "";
            contactEmail.value = "";
            contactMessage.value = "";
        }

        contactSendBtn.addEventListener("click", sendMail);


        console.log("Wellcome to my website, Have a nice day!");
    },
    start: function () {
        this.handleEvent();
        this.render();
    }
}

app.start();
