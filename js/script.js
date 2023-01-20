/*Khai báo biến*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const userInfo = "USER_INFO";

/*Biến cho phần header*/
const caret = $(".caret");  /*Biến caret ở phần convert file*/
const headerToggle = $(".header__navbar-toggle i");  /**Biến đóng mở navbar trên mobile */
const headerNavbar = $(".header__navbar-list");  //Biến của phần navbar trên mobile
const navbarContentItem = $$(".header__navbar-item a");
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
const openGiftPage = $("#openGiftPage");  //Biến mở trang Gift page
const giftPage = $(".lucky_page");  //Biến trang Gift page
const convertFilePage = $(".convertFile_page");  //Biến trang convertFile page
const openGiftBox = $(".lucky_btn");  //Biến mở gift box
const rule = $(".rule");
const playNum = $(".playNum");  //Biến hiển thị số lượt mở gift box
const giftTableBody = $(".table_gift tbody");  //Biến hiển thị phần body của bảng Reward Table


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

        //Hàm quay lại trang convertFile từ Gift page
        navbarContentItem.forEach((item) => {
            item.addEventListener("click", () => {
                convertFilePage.classList.remove("d-none");
                giftPage.classList.add("d-none");
                headerNavbar.classList.remove("shown_sidebar");
                headerToggle.classList.replace("fa-xmark", "fa-bars");
            });
        });

        //Hàm mở trang Gift page
        openGiftPage.addEventListener("click", () => {
            convertFilePage.classList.add("d-none");
            myFilePage.classList.add("d-none");
            giftPage.classList.remove("d-none");
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

        //Hàm đăng nhập vào tài khoản
        logInBtn.addEventListener("click", (e) => {
            let username = $(".form_input_logIn .username");
            let password = $(".form_input_logIn .password");

            let infoUser = JSON.parse(localStorage.getItem("userInfo"));
            if (typeof (localStorage) !== undefined) {
                if (localStorage.getItem("userInfo") !== null) {
                    if (username.value.trim() === infoUser.username || infoUser.email && password.value.trim() === infoUser.password) {
                        notification({
                            title: "Success",
                            message: "Login Sucessfully"
                        });
                        modal.style.display = "none";
                        username.value = "";
                        password.value = "";
                        headerBtn.style.display = "none";
                        headerDropdown.style.display = "block";
                        headerNavbar.classList.remove("shown_sidebar");
                        headerToggle.classList.replace("fa-xmark", "fa-bars");
                        selectFile.removeAttribute("data-bs-toggle");
                        selectFile.removeAttribute("data-bs-target");
                        changeFile();
                        openBox();
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

        //Hàm chọn file
        function addFile() {
            return chooseFile.click();
        }

        //Hàm thực hiện chuyển đổi file và hiển thị một số thông tin của file
        function changeFile() {
            if (selectFile.hasAttribute("data-bs-toggle") === true) {
                notification({
                    title: "Error",
                    message: "Please Login to take the action."
                });
            } else {
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
                    let reader = new FileReader();
                    let fileName = $("#fileName");
                    let fileSize = $("#fileSize");

                    previewImg.src = URL.createObjectURL(file);
                    let newImg = document.createElement("img");
                    newImg.src = URL.createObjectURL(e.target.files[0]);

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
                            btnDownload.classList.remove("d-none");
                            notification({
                                title: "Successfully",
                                message: "Wowld you like to download this file?"
                            });
                            btnDownload.addEventListener("click", () => {
                                imagePdf.save("ImageToPdf.pdf");
                                deleteFile();
                            });
                        }
                    });
                });


                /*Đây là hàm xoá một file sau khi đã chọn và trở về trạng thái lúc chưa chọn file*/
                function deleteFile() {
                    convertFileItem.style.display = "none";
                    convertFileselectFileBtn.style.display = "none";
                    dropdown.style.display = "block";
                    convertFileLoading.style.display = "none";
                    alertInfo({
                        id: "#convertFile_alert-status",
                        type: "",
                        message: ""
                    });
                }

                //addEventListener click cho hàm deleteFile
                deleteFileSelect.addEventListener("click", deleteFile);
            }
        }

        //Hàm đăng xuất khỏi tài khoản
        logOut.addEventListener("click", () => {
            headerBtn.style.display = "flex";
            headerDropdown.style.display = "none";
            selectFile.setAttribute("data-bs-toggle", "modal");
            selectFile.setAttribute("data-bs-target", "#popUp");
            changeFile();
            selectFile.removeEventListener("click", addFile);
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
                    <div>
                        ${message}
                    </div>
                </div>`
            }
        }

        // Hàm hiển thị rule trên giftpage
        function showRuleOnGiftPage() {
            let rules =
                `<ul>
                <li>The following rules:</li></br>
                <li>1. Each person will have one turn to open the gift box.</li></br>
                <li>2. When you click open gift, the system will randomly spin and display the reward.</li></br>
                <li>
                3. Rewards include:</br> 
                    - 10,000 VND (40%)</br> 
                    - 20,000 VND (30%)</br> 
                    - 50,000 VND (20%)</br> 
                    - 100,000 VND (10%)
                </li></br>
                <li>4. Any questions please contact the support section to be handled.</li></br>
                <li><i>Note</i> : This is just a fun game, rewards should only be seen as motivation</li>
            </ul>`
            notification({
                title: "Message",
                message: rules
            });
        }

        //Gọi hàm hiển thị rule trên giftpage
        rule.addEventListener("click", showRuleOnGiftPage);

        //Hàm get số mili giây còn lại
        function timer() {
            let nowdate = new Date().getTime();
            let enddate = new Date("jan 22, 2023 10:00:00").getTime();
            let remain = enddate - nowdate;

            return remain;
        }

        //Hàm tính thời gain còn lại
        function timeRemainning() {
            let remain = timer();

            let days = Math.floor(remain / (1000 * 60 * 60 * 24));
            let hours = Math.floor((remain % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            let minutes = Math.floor((remain % (1000 * 60 * 60) / (1000 * 60)));
            let seconds = Math.floor((remain % (1000 * 60) / (1000)));

            days = days < 10 ? "0" + days : days;
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
        }

        //Gọi hàm hiển thị Reward Table
        showDataGift();

        //Hàm mở gift box
        function openBox() {
            let play = 1;
            let temp;
            let remain = timer();
            playNum.innerHTML = play;
            openGiftBox.addEventListener("click", () => {
                if (remain <= 0) {
                    if (play > 0) {
                        let randomNum = Math.floor(Math.random() * 100);
                        let infoUser = JSON.parse(localStorage.getItem("userInfo"));
                        let getStorage = localStorage.getItem("gifts");
                        let tr = document.createElement('tr');
                        let time = new Date();
                        let hours = time.getHours();
                        let minutes = time.getMinutes();
                        let seconds = time.getSeconds();
                        if (randomNum <= 40) {
                            notification({
                                title: "Message",
                                message: "You receive a lucky money bag of 10.000 VND"
                            });
                            temp = "10.000";
                        } else if (randomNum > 40 && randomNum <= 70) {
                            notification({
                                title: "Message",
                                message: "You receive a lucky money bag of 20.000 VND"
                            });
                            temp = "20.000";
                        } else if (randomNum > 70 && randomNum < 90) {
                            notification({
                                title: "Message",
                                message: "You receive a lucky money bag of 50.000 VND"
                            });
                            temp = "50.000";
                        } else if (randomNum >= 90) {
                            notification({
                                title: "Message",
                                message: "You receive a lucky money bag of 100.000 VND"
                            });
                            temp = "100.000";
                        }

                        hours = hours < 10 ? "0" + hours : hours;
                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        seconds = seconds < 10 ? "0" + seconds : seconds;

                        let times = hours + ":" + minutes + ":" + seconds;

                        if (getStorage === null) {
                            arrayGift = [];
                        } else {
                            arrayGift = JSON.parse(getStorage);
                        }


                        let objGift = {
                            fullName: infoUser.fullName,
                            gift: temp,
                            times: times
                        }
                        arrayGift.push(objGift);
                        localStorage.setItem("gifts", JSON.stringify(arrayGift));
                        play--;
                        playNum.innerHTML = play;
                    } else {
                        notification({
                            title: "Error",
                            message: "Your turn is over!"
                        });
                    }
                } else {
                    let x = timeRemainning();
                    notification({
                        title: "Message",
                        message: "Open after: " + x
                    });;
                }
            });
        }

        //Hàm hiển thị Reward Table
        function showDataGift() {
            let getStorage = localStorage.getItem("gifts");
            if (getStorage === null) {
                arrayGift = [];
            } else {
                arrayGift = JSON.parse(getStorage);
            }
            arrayGift.forEach((itemGift) => {
                let tr = document.createElement("tr");
                tr.innerHTML =
                    `
                <td>${itemGift.fullName}</td>
                <td>${itemGift.gift}</td>
                <td>${itemGift.times}</td>
                `;
                giftTableBody.appendChild(tr);
            });
        }

        //Fetch thông tin từ file gift.txt
        fetch("gift.txt")
            .then((res) => res.text())
            .then((data) => {
                let arrayGift = data.split(";");
                arrayGift.forEach((infoItem) => {
                    let tr = document.createElement("tr");
                    let arrayItemGift = infoItem.split(", ");
                    arrayItemGift.forEach((itemGift) => {
                        let td = document.createElement("td");
                        td.innerHTML = itemGift;
                        tr.appendChild(td);
                    });
                    giftTableBody.appendChild(tr);
                });
            });


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
