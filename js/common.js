// タイムスタンプ設定
//曜日配列
let week = ["日", "月", "火", "水", "木", "金", "土"];

//日時取得
let now = new Date(); //日付取得準備（必須）！！
let year = now.getFullYear(); //年
let month = ("0" + now.getMonth() + 1).slice(-2); //月+１を足す
let date = ("0" + now.getDate()).slice(-2); //日
let day = now.getDay(); //曜日（数値）
let h = ("0" + now.getHours()).slice(-2); //時
let m = ("0" + now.getMinutes()).slice(-2); //分
//日時表示文字列の作成
let dataTime =
  year + "-" + month + "-" + date + "(" + week[day] + ") " + h + ":" + m;
