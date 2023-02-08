// کلماتی که کامپیوتر انتخاب میتونه بکنه به صورت رندم بینشون
const secretPhrases = ["never", "you", "that", "bullet", "break"];

// متغییر رندوم که در حالت اولیه خالیه
let randomItem = "";

//یک ارایه تعریف میکنیم تا حروفی که کلیک کردی در ان جمع شوند
// بعد تازه توی لتر هندلر راجب اینکه تکراری نبود بیاد تو ارایه مینویسیم
let clicked = [];
let result = "";
let mistakes = 0;

// انتخاب رندوم از کلمات مشخص شده و نوشته شده در ارایه سکرتفریض
function selectRandomItem() {
  randomItem = secretPhrases[Math.floor(Math.random() * secretPhrases.length)];
  console.log(randomItem);

  // این اد لیسنر برای اینکه وقتی کلمات کلیک میشوند معلوم بشه کلیک شدند
  document.getElementById("letters").addEventListener("click", buttonHandler);

  // کیبورد
  window.addEventListener("keydown", keyHandler);
}

// فانکشن برای خط تیره های کلمات اگر سه حرف بود سه تا بیار اگر ۱۰ تا حرف بود ۱۰ تا بیار
function setUnderScores() {
  //  متغییر  تعریف میکنه ک بیاد کلمه منتخب رندوم ایتم رو به حرف تبدیل کنه یعنی کلمه رو نص نصف کتنه
  let splitedWord = randomItem.split("");

  // حالا مپ میزنیم . اگر حرفی کاربر زده جز حروف رندوایتم بود خود حرف بده اگر نبود یه خط تیره بده
  let mappedWord = splitedWord.map((letter) =>
    clicked.indexOf(letter) >= 0 ? letter : " _ "
  );
  result = mappedWord.join("");
  document.getElementById("clue").innerHTML = `<p>${result}</p>`;
}

function checkIfWon() {
  if (randomItem === result) {
    document.getElementById("gameover").querySelector("p").style.display =
      "block";

    document.getElementById("image").querySelector("img").src =
      "assets/winner.png";
  }
}

function checkIflost() {
  if (mistakes === 6) {
    document.getElementById("gameover").querySelector("p").style.display =
      "block";
    document.getElementById(
      "clue"
    ).innerHTML = `<p>Random word is: ${randomItem}</p>`;
  }
}

function updateHangmanPicture() {
  const image = document.getElementById("image").querySelector("img");
  image.src = `assets/hangman${mistakes}.png`;
}

// مقایسه میکند حرفی که کاربر وارد کرده جز حرف های موجود در ارایه رندوم ایتم هست یا نه . اگر نبود به رندوم ایتم اضافه شود و مشخص شود قبلا استفاده شده .
function letterHandler(letter) {
  // ابتدا حروف که کاربر از طریق موس کلیک کرده یا از طریق کیبورد زده رو مساوی = و تبدیل به حروف کوچک میکنم. چون جاوااسکریپت به بزرگی و کوچکی حروف حساس
  letter = letter.toLowerCase();

  // ایجا خطیه که بودن نبود حرف چک میشه
  // اگر هیندکس حرف در ارایه وجود نداشته باشه یعنی ایندکس اون حرف منفی یک و وقتی منفی یک بود از طریق پوش اون حرف به ارایه کلیکشده ها اضافه میشه. اما اگر ایندکسش خیر از منفی یک باشه یعنی اون حرف داخل ارایه کلیک شده ها هستش پس مساوی نال میزاریم که هیچ کاری باهاش نکنه
  clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;

  // اینجا موقعیه که حرف کلیک شده باید رنگش تغییر کنه ک مشخص بشه کلیک شده
  //  دلیل اینکه دوباره به حرف بزرگ تبدیل میکنیم اینکه کاربر ی حرف میزنه و باید رنگش تغییر کنه ممکنه بزرگ باشه یا کوچیک اما ای دی حرف بزرگ پس هرچی بود بزرگش میکنیم که کلاس بدیم بهش که رنگش فرق کنه
  document.getElementById(letter.toUpperCase()).classList = "used";

  // بررسی میکنه اگر در رندوم ایتم اون حرف بود چه اتفاقی بافته اگرم نبود چه اتفاقی بیافته
  if (randomItem.indexOf(letter) >= 0) {
    // اجرا کن فانکشن اندراسکود
    setUnderScores();
    checkIfWon();
  } else if (randomItem.indexOf(letter) === -1) {
    mistakes++;
    checkIflost();
    updateHangmanPicture();
  }
}

// فانکشن کلیدها است و مشخص میکنه وقتی کلید ها کلیک شدن چه اتفاقی بیافتد.
// مربوط به کلک شدن از موس
function buttonHandler(event) {
  //ایدی دقیق هر حرف مشخص شده رو میده بعد از طریق اون داکیومت لتر اپر کیس کلاس یوزد میدیم
  letterHandler(event.target.id);
}

function keyHandler(event) {
  letterHandler(event.key);
}

// فانکشنهایی که همون اول باید اجرا بشن
selectRandomItem();
setUnderScores();
