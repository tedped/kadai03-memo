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
            `<div class="icon star-color"><img src="${thumbnail}" alt="" class="thumbnail" title="${key}" data-key="${key}"></div>`
          );
        }
      }
    });
    //   }
    // }, index * 250);
  });
});

// サムネイルをクリックしたら、「検索結果」欄に「本のタイトル」「興味を持った理由」を表示
$("main").on("click", ".thumbnail", function () {
  selectedThumbnail = $(this);
  selectedKey = $(this).data("key");
  let key = $(this).data("key");
  let value = localStorage.getItem(selectedKey);
  const html = `
  <li>
    <p> 本のタイトル： ${key}</p>
    <p> 気になった理由： ${value}</p>
  </li>`;
  $("#result").empty();
  $("#result").append(html);
});

// 「感想」ボタン
// 「感想」欄に入力した内容を、タイムスタンプを付加して保存
//
$("#impression").on("click", function () {
  let key = selectedKey;
  let value = localStorage.getItem(selectedKey);
  const feeling = $("#feeling").val();

  let newValue = `${value}<br>${dataTime}<br>　感想： ${feeling}`;
  localStorage.setItem(key, newValue);

  const html = `
  <li>
    <p>本のタイトル： ${key}</p>
    <p>気になった理由： ${newValue}</p>
  </li>`;

  $("#result").empty();
  $("#result").append(html);
});

// 「削除」ボタン
$("#delete").on("click", function () {
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
