# Backend Introduction
## 資料庫
NC_1.csv

News_Index|News_URL
-|-
news_000001| http://www.chinatimes.com/newspapers/20150108001507-260107
news_000002| http://tw.sports.appledaily.com/daily/20110623/33479530/
...|...

inverted_file.json

```
{
    "民憂": {
        "idf": 14285.714285714286,
        "docs": [{"news_002847": 1}, {"news_006696": 1}, ... ]
    },
    "依戀": { ... },
    ...
}
```

url2content.json

```
{
    "http://www.chinatimes.com/newspapers/20150108001507-260107": "新北市第二選區議員候選人...",
    ...
}
```

url2title.json

```
{
    "http://www.chinatimes.com/realtimenews/20161224001234-260405": "立院26日審同婚法案 挺反雙方都喊包圍 - 生活 - 中央社",
    ...
}
```

# 說明
搜尋時是使用 query 的字串，如 "通姦在刑法上應該除罪化"，並返回相關新聞，由相關性高排到低

# API
- `http://api.example.com/<token>/gethistory`: return a list of search history
- `http://api.example.com/<token>/search?keyword=xxx`: return a json containing relevant search results
```
{
    "news": [{
        "url": "http://theUrl",
        "title": "the title",
        "content": "the content"
    },
    { ... },
    ... ]
}
```
