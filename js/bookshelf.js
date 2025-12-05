// サムネイル欄
// localstorageに保存された本のタイトルデータをGooglebooksで参照し、サムネイルデータを取得
// 取得したサムネイルデータを表示
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
        startIndex: 0,
        dataType: "json",
      },
    }).done(function (data) {
      console.dir(data);
      if (data.items && data.items.length > 0) {
        const thumbnail = data.items[0].volumeInfo.imageLinks?.thumbnail;
        if (thumbnail) {
          $(".book-icon").append(
            `<div class="icon star-color"><img src="${thumbnail}" alt="" class="thumbnail" data-key="${key}"></div>`
          );
        }
      }
    });
    //   }
    // }, index * 250);
  });
});

// サムネイルをクリックしたら、「検索結果」欄に「本のタイトル」「興味を持った理由」を表示
$(".book-icon").on("click", ".thumbnail", function () {
  let selectedThumbnail = $(this);
  let selectedKey = $(this).data("key");

  $("#impression").data("key", selectedKey);
  $("#delete").data("key", selectedKey);

  let obj = localStorage.getItem(selectedKey);
  let value = JSON.parse(obj);

  const html = `
  <li>
    <p>${value.iDate}</p>
    <p>- 本のタイトル：${value.t}</p>
    <p>- 気になった理由：${value.i}</p>
    <p>${value.f}</p>
  </li>`;
  $("#result").empty().append(html);
});

// console.log(Object.keys(localStorage));

// 「感想」ボタン
// 「感想」欄に入力した内容を、タイムスタンプを付加して保存
//
$("#impression").on("click", function () {
  let selectedKey = $(this).data("key");
  let obj = localStorage.getItem(selectedKey);
  let value = JSON.parse(obj);
  let feeling = $("#feeling").val();

  value.f += `${dataTime}<br>- 感想：${feeling}<br>`;

  let json = JSON.stringify(value);
  localStorage.setItem(selectedKey, json);

  const html = `
  <li>
    <p>${value.iDate}</p>
    <p>- 本のタイトル：${value.t}</p>
    <p>- 気になった理由：${value.i}</p>
    <p>${value.f}</p>
  </li>`;

  $("#result").empty().append(html);
});

// 「削除」ボタン
$("#delete").on("click", function () {
  let selectedThumbnail = $(this);
  let selectedKey = $(this).data("key");
  console.log(selectedKey);

  if (!selectedKey || !selectedThumbnail) {
    alert("本が選択されていません");
    return;
  }
  if (window.confirm("削除しますか？")) {
    window.alert("削除しました");
    localStorage.removeItem(selectedKey);
    $("#result").empty();
    selectedThumbnail.remove();
    selectedKey = null;
    selectedThumbnail = null;
  }
});

// 「登録画面へ移動」ボタン
$(".link").on("click", function () {
  location.href = $(this).data("url");
});
