// 1.サムネイル欄

$(function () {
  const keys = Object.keys(localStorage);

  keys.forEach(function (key, index) {
    // setTimeout(function () {
    //   for (let i = 0; i <= 10; i++) {
    $.ajax({
      url: "https://www.googleapis.com/books/v1/volumes",
      // GooglebooksAPIのパラメータ
      // 表示結果に不都合があれば、適宜ここで調整する
      data: {
        q: key,
        maxResults: 1,
        // startIndex: 10,
        dataType: "json",
      },
    }).done(function (data) {
      console.dir(data);
      if (data.items && data.items.length > 0) {
        const thumbnail = data.items[0].volumeInfo.imageLinks?.thumbnail;
        if (thumbnail) {
          $(".book-icon").append(
            `<img src="${thumbnail}" alt="" class="icon" title="${key}" data-key="${key}">`
          );
        }
      }
    });
    //   }
    // }, index * 250);
  });
});

$("main").on("click", ".icon", function () {
  const key = $(this).data("key");
  const value = localStorage.getItem(key);
  const html = `
  <li>
    <p>本のタイトル： ${key}</p>
    <p>気になった理由： ${value}</p>
  </li>`;
  $("#result").empty(html);
  $("#result").append(html);
});

// 2.各種ボタン

// ローカルストレージのデータを取得し、ページに反映
// for (let i = 0; i < localStorage.length; i++) {
//   const key = localStorage.key(i);
//   const value = localStorage.getItem(key);
//   const html = `
//   <li>
//     <p>${key}</p>
//     <p>${value}</p>
//   </li>`;
//   $("#result").prepend(html);
// }

$("#delete").on("click", function () {
  if (window.confirm("削除しますか？")) {
    window.alert("削除しました", "");
    localStorage.removeItem(this);
    $("#result").empty();
  }
});

// ボタン

// // 登録画面ページ移動イベント
$(".link").on("click", function () {
  location.href = $(this).data("url");
});
