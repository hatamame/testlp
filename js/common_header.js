const create_mynum = function () {
    const mynum = Math.floor(Math.random() * 10) + 1;
    let mylink = "";

    if (mynum % 2 === 1) {
        mylink = '250789';
    } else {
        mylink = '274169';
    }
    return mylink;
}

const CommonHeader = document.createElement("header");
CommonHeader.className = "header";
CommonHeader.innerHTML = '<div class = "container"><a href = "https://gamboo.jp/"><img src = "/images/tohyama/tohyama_index_2024/gamboo_logo.png" class = "gamboo_logo"></a></img><img src = "/images/tohyama/tohyama_index_2024/hamburger.png" class = "hamburger"  id = "ignite"></img></div>';

document.body.appendChild(CommonHeader);

const menu_list = document.createElement("section");
menu_list.className = "menu_off";

const mylink = create_mynum();

menu_list.innerHTML = `<div><p><a href = "https://gamboo.jp/" style = "color:white;">Gambooトップ</a></p><p><a href = "https://gamboo.jp/pages/?tid=tohyama_index_2024" style = "color:white;">研究所トップ</a></p><p><a href = "https://gamboo.jp/keirin/topics/?tid=tohyama-pc" style = "color:white;">競輪分析記事</a></p><p><a href = "https://gamboo.jp/column/view/list?mid=196801" style = "color:white;">Gambooブログ</a></p><p><a href = "https://gamboo.jp/pages/?tid=tohyama_bank_LP" style = "color:white;">競輪場データ集</a></p><p><a href = "https://gamboo.jp/web-yoso/keirin/profile/?mid=${mylink}" style = "color:white;">有料予想情報</a></p></div>`;


document.body.appendChild(menu_list);

const ignite = document.getElementById("ignite");
const menu = document.querySelectorAll(".menu_off, .menu_on")[0]

ignite.addEventListener("click", () => {
    if (menu.classList.contains("menu_off")) {
        menu.classList.toggle("menu_on")
        menu.classList.remove("menu_off")
    } else if (menu.classList.contains("menu_on")) {
        menu.classList.toggle("menu_off")
        menu.classList.remove("menu_on")
    }
}, false)
