// ========================================
// SWEET FRIENDS
// メインJavaScript
// ========================================


// ----------------------------------------
// Service Worker登録
// ----------------------------------------

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .then(() => {
                console.log("Service Worker 登録成功");
            })
            .catch((error) => {
                console.log(
                    "Service Worker 登録失敗:",
                    error
                );
            });

    });

}


// ----------------------------------------
// SPAのページ切り替え
// ----------------------------------------

function showPage(pageName) {

    // すべてのページを非表示
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });


    // 選択されたページを表示
    const targetPage = document.getElementById(pageName);

    if (targetPage) {
        targetPage.classList.add("active");
    }


    // ナビゲーションの選択状態
    const navButtons =
        document.querySelectorAll(".nav-button");

    navButtons.forEach(button => {

        button.classList.remove("active");

        if (button.dataset.page === pageName) {
            button.classList.add("active");
        }

    });


    // ページ上部へ
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ----------------------------------------
// スイーツを作る
// ----------------------------------------

function makeSweet(name, emoji) {

    const modal =
        document.getElementById("sweetModal");

    const character =
        document.getElementById("cookingCharacter");

    const cookingText =
        document.getElementById("cookingText");

    const result =
        document.getElementById("sweetResult");

    const resultTitle =
        document.getElementById("resultTitle");

    const resultMessage =
        document.getElementById("resultMessage");


    // 最初は調理中
    character.textContent = "🐰";

    cookingText.textContent =
        `${name}を作っています...`;

    result.textContent = "✨";

    resultTitle.textContent = "Let's Cook!";

    resultMessage.textContent =
        "おいしいスイーツを作っています。";


    modal.classList.add("show");


    // 1.5秒後に完成
    setTimeout(() => {

        character.textContent = "🐰";

        cookingText.textContent =
            "できあがったよ！";

        result.textContent = emoji;

        resultTitle.textContent =
            `${name} 完成！`;

        resultMessage.textContent =
            `かわいいスイーツができたよ！`;

    }, 1500);

}


// ----------------------------------------
// モーダルを閉じる
// ----------------------------------------

function closeModal() {

    const modal =
        document.getElementById("sweetModal");

    modal.classList.remove("show");

}


// モーダル外をクリックして閉じる
document
    .getElementById("sweetModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeModal();
        }

    });


// ----------------------------------------
// お店を登録
// ----------------------------------------

function addShop() {

    const nameInput =
        document.getElementById("shopName");

    const memoInput =
        document.getElementById("shopMemo");


    const name =
        nameInput.value.trim();

    const memo =
        memoInput.value.trim();


    if (name === "") {

        alert("お店の名前を入力してね！");

        return;

    }


    const shops =
        JSON.parse(
            localStorage.getItem("sweetShops")
        ) || [];


    shops.push({
        name: name,
        memo: memo
    });


    localStorage.setItem(
        "sweetShops",
        JSON.stringify(shops)
    );


    nameInput.value = "";
    memoInput.value = "";


    displayShops();

    alert("お気に入りのお店を登録したよ！");

}


// ----------------------------------------
// お店一覧を表示
// ----------------------------------------

function displayShops() {

    const shopList =
        document.getElementById("shopList");


    const shops =
        JSON.parse(
            localStorage.getItem("sweetShops")
        ) || [];


    shopList.innerHTML = "";


    if (shops.length === 0) {

        shopList.innerHTML = `
            <div class="empty-message">
                ⭐<br><br>
                まだお店が登録されていないよ。<br>
                好きなお店を登録してみよう！
            </div>
        `;

        return;
    }


    shops.forEach((shop, index) => {

        const card =
            document.createElement("div");

        card.className = "shop-card";


        card.innerHTML = `
            <div class="shop-info">

                <div class="shop-icon">
                    🍰
                </div>

                <div>
                    <div class="shop-name">
                        ${escapeHTML(shop.name)}
                    </div>

                    <div class="shop-memo">
                        ${escapeHTML(
                            shop.memo || "メモなし"
                        )}
                    </div>
                </div>

            </div>

            <button
                class="delete-button"
                onclick="deleteShop(${index})"
            >
                ×
            </button>
        `;


        shopList.appendChild(card);

    });

}


// ----------------------------------------
// お店を削除
// ----------------------------------------

function deleteShop(index) {

    const shops =
        JSON.parse(
            localStorage.getItem("sweetShops")
        ) || [];


    shops.splice(index, 1);


    localStorage.setItem(
        "sweetShops",
        JSON.stringify(shops)
    );


    displayShops();

}


// ----------------------------------------
// HTMLとして解釈されないようにする
// ----------------------------------------

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ----------------------------------------
// アプリ起動時
// ----------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    () => {

        displayShops();

        showPage("home");

    }
);