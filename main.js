const API_KEY = `a770d1855a244811978ee7f9c6834ef8`;
let newsList = [];
// let category = "general";
// let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))


const getLatestNews = () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  showNews(url);
};

const getNewsByCategory= (event) => {
  const category = event.target.textContent.toLowerCase(); //버튼의 값을 category 변수에 저장
  console.log("category", category);
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  showNews(url);
};

const getNewsByKeyword = () => {
  keyword = document.getElementById("search-input").value;
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  )
  showNews(url);
}

const showNews = async (url) => {
  const response  = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  console.log(newsList);
  render(); 
}

const render = () => {
  // for (i = 0; i < newsList.length; i++) {
  //   console.log("news", i, newsList[i].title, newsList[i].description);
  // }
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


// searchButton.addEventListener("click",searchNews);
searchButton.addEventListener("click",function(){
    searchInput.value=""
});

getLatestNews();


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


//title, author
