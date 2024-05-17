const API_KEY = `a770d1855a244811978ee7f9c6834ef8`
let newsList = [];
// let category = "general";
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));
let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getLatestNews = () => {
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  getNews();
};

const getNewsByCategory = (event) => {
  const category = event.target.textContent.toLowerCase(); //버튼의 값을 category 변수에 저장
  console.log("category", category);
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );
  getNews();
  // const response = await fetch(url);
  // const data = await response.json();
  // newsList = data.articles;
  // console.log(newsList);
  // render();
  // try {
  //   if (newsList == 0) {
  //     throw new Error("검색 결과 없음!");
  //   }
  // } catch (error) {
  //   let resultHTML = 
  //     `<div class="alert alert-danger" role="alert">
  //     ${error.message}
  //     </div>`;
  //   document.getElementById("news-board").innerHTML = resultHTML;
  // };
};

const getNews = async () => {
  try{
    url.searchParams.set("page",page); // => &page=page
    url.searchParams.set("pageSize",pageSize);
    const response = await fetch(url);
    console.log("response:", response.status);
    const data = await response.json();
    if(response.status === 200){
      if(data.totalResults === 0){
        throw new Error("검색 결과 없음!");
      } 
      newsList = data.articles;
      totalResults = data.totalResults
      console.log("ddd", data);
      console.log("news", newsList);
      render();
      paginationRender();
    } else{
      throw new Error(data.message);
    }
    
  }catch(error){
    errorRender(error.message);
    
    // if (newsList==0){
    //   let resultHTML = 
    //   `<div class="alert alert-danger" role="alert">
    //   ${error.message}
    //   </div>`;
    //   document.getElementById("news-board").innerHTML = resultHTML;
    // }
  }
  
}

const render = () => {
  // for (i = 0; i < newsList.length; i++) {
  //   console.log("news", i, newsList[i].title, newsList[i].description);
  // }
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">    
          <div class="col-lg-4">
              <img class="news-img-size" src=${news.urlToImage ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
        }>
          </div>
          <div class="col-lg-8">
              <h2>${news.title}</h2>
              <p>
                  ${news.description || "내용 없음"}
              </p> <br>
              <div>
                  ${news.source.name || "no source"} * ${moment(news.publishedAt).fromNow()}
              </div>
          </div>
      </div>`
    )
    .join("");
  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = 
    `<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`;
    document.getElementById("news-board").innerHTML = errorHTML;
}

// searchButton.addEventListener("click",searchNews);
searchButton.addEventListener("click", function () {
  searchInput.value = ""
});

const paginationRender=()=>{
  // totalResult
  // page
  // pageSize
  // groupSize
  // totalpages
  const totalPages = Math.ceil(totalResults/pageSize)
  // pageGroup
  const pageGroup = Math.ceil(page/groupSize);
  // lastPage
  let lastPage= pageGroup * groupSize;
  console.log(lastPage)
  // 마지막 페이지그룹이 그룹사이즈보다 작으면, lastPage=totalPage
  if(lastPage>totalPages){
    lastPage=totalPages;
  }
  console.log(lastPage)
  // firstPage
  const firstPage= lastPage - (groupSize-1)<=0? 1: lastPage - (groupSize-1);

  let paginationHTML = 
  `<li class="page-item${page==1? " disabled":""}" onclick="moveToPage(${1})"><a class="page-link" href="#">&lt&lt</a></li>
  <li class="page-item${page==1? " disabled":""}" onclick="moveToPage(${page-1})"><a class="page-link" href="#">Previous</a></li>`

  console.log(lastPage,firstPage);
  
  for(let i=firstPage;i<=lastPage;i++){
    paginationHTML+=`<li class="page-item ${
      i===page? "active":""
    }" onclick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`
  }
  paginationHTML+=
  `<li class="page-item${page==totalPages ? " disabled":""}" onclick="moveToPage(${page+1})"><a class="page-link" href="#">Next</a></li>
  <li class="page-item${page==totalPages? " disabled":""}" onclick="moveToPage(${totalPages})"><a class="page-link" href="#">&gt&gt</a></li>`

  document.querySelector(".pagination").innerHTML = paginationHTML

  // <nav aria-label="Page navigation example">
  //   <ul class="pagination">
  //     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  //     <li class="page-item"><a class="page-link" href="#">1</a></li>
  //     <li class="page-item"><a class="page-link" href="#">2</a></li>
  //     <li class="page-item"><a class="page-link" href="#">3</a></li>
  //     <li class="page-item"><a class="page-link" href="#">4</a></li>
  //     <li class="page-item"><a class="page-link" href="#">5</a></li>
  //     <li class="page-item"><a class="page-link" href="#">Next</a></li>
  //   </ul>
  // </nav>
}

const moveToPage=(pageNum)=>{
  console.log("movetopage",pageNum);
  page=pageNum;
  getNews();
}

  

getLatestNews();

  // const prevPage = (firstPage) => {
  //   if(page>firstPage){
  //     page-=1;
  //     getNews();
  //   }
  // }

  // const nextPage = (lastPage) => {
  //   if(page<lastPage){
  //     page+=1;
  //     getNews();
  //   }
  // }


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
