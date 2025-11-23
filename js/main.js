// 1.入力クリックイベント
$("#save").on("click", function () {
  const key = $("#title").val();
  const value = $("#text").val();

  localStorage.setItem(key, value);
  const html = `
    <li>
        <p>${key}</p>
        <p>${value}</p>
    </li>`;

  $("#list").append(html);

  $("#title").val("");
  $("#text").val("");
});

// 2.Clearクリックイベント
$("#clear").on("click", function () {
  localStorage.clear();
  $("#list").empty();
});

// 3.ローカルストレージのデータを取得し、ページに反映
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  const html = `
  <li>
    <p>${key}</p>
    <p>${value}</p>
  </li>`;

  $("#list").prepend(html);
}
