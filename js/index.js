// 入力欄

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
  if (query.length < 1) {
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
  let key = $("#title").val();
  let value = $("#interest").val();

  // fulfilledKey = $(this).data(key);
  // fulfilledValue = $(this).data(value);

  localStorage.setItem(key, value);
  const html = `
    <li>
        <p>${key}</p>
        <p>${value}</p>
    </li>`;

  $("#result").val(html);

  $("#title").val("");
  $("#interest").val("");

  // 保存後、星が本棚ページに流れていく演出
  // if (fulfilledKey && fulfilledValue) {
  const star = $("<div class='star-color star-arise'>★</div>");
  $("main").append(star);

  const width = $("main").width();
  const height = $("main").height();

  const startX = Math.random() * width;
  const startY = Math.random() * height * 0.3;
  const downX = startX + (Math.random() * 10 - 100);
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
  // }
  // return;
});

//  本棚ページ移動イベント
$(".link").on("click", function () {
  location.href = $(this).data("url");
});

// ヒント
$(".hint").on("mouseover", function () {
  $(this).append(`
    <div class="speech-bubble">
      🧞‍♀️からのヒントだよ！
      <br />
      気になる本の図書番号を知っているなら、本のなまえ欄で<br />「isbn:」の後に番号を入れてみると、<br />検索がはかどるよ！これイチオシだから！</div>`);
});
$(".hint").on("mouseout", function () {
  $(this).find(".speech-bubble").fadeOut();
});
