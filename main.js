const API_KEY=`a770d1855a244811978ee7f9c6834ef8`
let news=[]

const getLatestNews = async () => {
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json() //json->파일 형식(png,jpg 등처럼)
    news = data.articles;
    console.log("dddd",news);
};

getLatestNews();