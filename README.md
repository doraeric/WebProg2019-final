# 不可思議減恆河沙加阿僧祇 1e64
這是個搜尋引擎，不可思議=1e64，恆河沙=1e52，阿僧祇=1e56。簡單來說，就是很多資料。

This is a search engine, it can find the data you need.

[Deployed Link](http://homepage.ntu.edu.tw/~b04501002/1e64/)
> Its backend is python + node running on the workstation with many data, so I can't keep it online forever.

## Getting Started
Clone this repository

### Backend
1. You can download the data in releases page on github, put them into backend/input\_data.
2. The python search engine
```
cd backend
python3 search_server.py
```
3. The node api server
```
cd backend/api_server
npm install
npm start

# Or yarn version:
cd backend/api_server
yarn
yarn start
```

### Frontend
```
cd frontend
npm install
npm start
```

Default port:
- python search server: 8001
- node api server: 8000
- react frontend: 3000

## 系統說明與特色
這是個搜尋引擎，主要的功能就是把爬下來的資料透過關鍵字找出最相關的文章。

在主頁面就是輸入關鍵字，還有一個頁面是可以看自己搜尋過的紀錄。

### 後端設計與資料
資料必須事先用爬蟲下載下來，爬下來的資料不會因使用者的操作而改變，因此以 json 及 csv 的格式儲存，較方便程式處理。詳細的資料格式可以看 backend 中的 readme。在本專案中，我們只有下載新聞，某個時間點前的新聞，所以無法展示最近最新的新聞給大家看。

搜尋主要是由 python 來執行，使用的技術是 tf-idf (term frequency–inverse document frequency)，tf 就是詞出現在某篇文章中的頻率，idf 是總文章數 N 除以有出現這個詞的文章數 df。

tf-idf 有許多變形版，這裡採用的是 log，tf\_=1+log(tf), idf = log(N/df)。

權重 weight=tf\*idf，因為會有很多詞，所以 weight 是個向量，最後文件對搜尋字串的分數就是 weight 的內積，分數越高就是越相關，會排在較前面的搜尋結果。

python 運算完獲得的結果會透過 socket 傳回 node api server，api server 再把結果傳回前端。

### 前端
前端主要以React製作,分成search,history兩個頁面,兩個部分有用到bootstrap、fontawesome框架，
search和history都會跟後端(deploy的網站)使用axios套件request搜尋結果和歷史紀錄資料

#### search
顯示搜尋結果部分有用promise來確保整個畫面render完之後才顯示搜尋時間、搜尋結果
search的時候會擷取使用者userAgent並且用hash完之後的數字當成userid

#### history
用使用者userAgent來向後端request資料。

## 使用的框架/模組/套件
### 後端
- python
  - jieba: 切中文詞
  - pandas: 讀取 csv
  - numpy: 進行數學運算
  - 其他如 json, socket, threading 皆為 python 內建
- api server
  - express: 前端獲取資料的界面
  - socket: 對 python 請求資料

### 前端
- bootstrap
- fontawesome
- axios

## Demo
[![Demo Video](https://lh6.googleusercontent.com/YdHiyj8j-JKib1NR3oIdvmStaBbq4tjuwN5Ll0mMIWX-vMX5EZK3Z2W7GxMlAok6ASpNVqFH6PECcP4euRg=w1920-h1080-pd-k)](https://drive.google.com/file/d/1ia5JSq4Vbw_FkkJJhD2VJVP4Q5of2Xlr/view)

## 專題製作心得
### doraeric

這次專題的發想是結合另一門課，網路資料探勘，所產生的。網路探勘是輸出文章id，計算準確度有多少。但只是這樣彷彿是個結束後就再也不會開啟的專案，似乎有點可惜，於是試著將它做成可以實際應用的形式，最終就生出了這個簡單的搜尋引擎了！這次在寫的時候必須讓不同的程式互相溝通，也要設計前後端溝通的api，覺得挺有趣的。前端得感謝另外兩位組員生出漂亮的網頁，就像真的搜尋引擎一樣！

## 每位組員之貢獻
### doraeric
後端，backend 資料夾中的東西，包含搜尋計算、python server, node api server。
