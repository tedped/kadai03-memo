// 1.入力欄

// 本のタイトル候補を入力中に随時表示

let isComposing = false;

$("#title")
  .on("compositionstart", function () {
    isComposing = true;
  })
  .on("compositionend", function () {
    isComposing = false;
    $(this).trigger("viewList");
  })
  .on("keyup", function () {
    if (!isComposing) {
      $(this).trigger("viewList");
    }
  });

$(document).on("viewList", "#title", function () {
  const query = $(this).val();
  if (query.length < 2) {
    $("#suggest-list").empty();
    return;
  }
  $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes",
    // GooglebooksAPIのパラメータ
    // 表示結果に不都合があれば、適宜ここで調整する
    data: {
      q: query,
      maxResults: 7,
      dataType: "json",
      printtype: "books",
      orderBy: "relevance",
      maturityRating: "NOT_MATURE",
    },
  }).done(function (data) {
    $("#suggest-list").empty();
    if (data.items) {
      $.each(data.items, function (index, a) {
        if (a.volumeInfo && a.volumeInfo.title) {
          const b = a.volumeInfo.title;
          $("#suggest-list").append(`<li class="suggest-item">${b}</li>`);
        }
      });
    }
  });
});

$(document).on("click", ".suggest-item", function () {
  const selected = $(this).text();
  $("#title").val(selected);
  $("#suggest-list").empty();
});

// 入力クリックイベント
$("#save").on("click", function () {
  const key = $("#title").val();
  const value = $("#interest").val();

  localStorage.setItem(key, value);
  const html = `
    <li>
        <p>${key}</p>
        <p>${value}</p>
    </li>`;

  $("#result").append(html);
  $("#title").val("");
  $("#interest").val("");

  // 保存後、星が本棚ページに流れていく演出
  const star = $("<div class='star star-arise'>★</div>");
  $("main").append(star);

  const width = $("main").width();
  const height = $("main").height();

  const startX = Math.random() * width;
  const startY = Math.random() * height * 0.3;
  const downX = startX + (Math.random() * 200 - 100);
  const downY = startY + (Math.random() * 200 + 100);
  const endX = downX + Math.random() * 300;

  star.css({
    left: startX,
    top: startY,
    "--down-x": downX + "px",
    "--down-y": downY + "px",
    "--end-x": endX + "px",
  });
  star.addClass("move");
});

// Clearクリックイベント
$("#edit-before").on("click", function () {
  localStorage.removeItem(this);
  $("#result").empty();
});

// // 本棚ページ移動イベント
$(".link").on("click", function () {
  location.href = $(this).data("url");
});

// 2.出力欄

// ローカルストレージのデータを取得し、ページに反映
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  const html = `
  <li>
    <p>${key}</p>
    <p>${value}</p>
  </li>`;

  $("#result").prepend(html);
}
