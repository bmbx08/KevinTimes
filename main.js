const API_KEY = `a770d1855a244811978ee7f9c6834ef8`;
let category = "general";
let newsList = [];

let sportsButton = document.getElementById("sports-button");
let scienceButton = document.getElementById("science-button");
let businessButton = document.getElementById("business-button");
let entertainmentButton = document.getElementById("entertainment-button");
let technologyButton = document.getElementById("technology-button");

sportsButton.addEventListener("click", function () {
  category = "sports";
  getLatestNews();
});
scienceButton.addEventListener("click", function () {
  category = "science";
  getLatestNews();
});
businessButton.addEventListener("click", function () {
  category = "business";
  getLatestNews();
});
entertainmentButton.addEventListener("click", function () {
  category = "entertainment";
  getLatestNews();
});
technologyButton.addEventListener("click", function () {
  category = "technology";
  getLatestNews();
});

const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json(); //json->파일 형식(png,jpg 등처럼)
  newsList = data.articles;
  console.log(newsList);
  render();
};

const render = () => {
  for (i = 0; i < newsList.length; i++) {
    console.log("news", i, newsList[i].title, newsList[i].description);
  }

  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">    
            <div class="col-lg-4">
                <img class="news-img-size" src=${
                  news.urlToImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                }>
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>
                    ${news.description||"내용 없음"}
                </p> <br>
                <div>
                    ${news.source.name||"no source"} * ${moment(news.publishedAt).fromNow()}
                </div>
            </div>
        </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

// function render() {
//     console.log("asdf")
// for(i=0;i<newsList.length;i++){
//     console.log("newsList",i,newsList[i].title,newsList[i].content);
// }
//     let resultHTML = '';
//     for (i=0;i<news.length;i++){
//         resultHTML +=
//         `<div class="row news">
//             <div class="col-lg-4">
//                 <img class="news-img-size" src=${news[i].urlToImage}>
//             </div>
//             <div class="col-lg-8">
//                 <h2>${news[i].title}</h2>
//                 <p>
//                     ${news[i].content}
//                 </p> <br>
//                 <div>
//                     ${news[i].publishedAt}
//                 </div>
//             </div>
//         </div>`
// //     }
// //     document.getElementById("news-board").innerHTML = resultHTML;
// }

getLatestNews();

//title, author
