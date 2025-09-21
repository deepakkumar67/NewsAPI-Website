import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import { useLocation } from 'react-router-dom';

export default function Home() {
  let [articles, setArticles] = useState([]);
  let [totalResults, setTotalResults] = useState(0);
  let [page, setPage] = useState(1);

  let location = useLocation();
  let query = new URLSearchParams(location.search);

  let [q, setQ] = useState('All');
  let [language, setLanguage] = useState('hi');

  // YOUR API KEY HERE
  let API_KEY = "b86704a36ad844a08c4b4f941651a811";

  // Fetch initial data
  let getAPIData = async (qParam, langParam) => {
    setPage(1);
    try {
      let response = await fetch(
        `https://newsapi.org/v2/everything?q=${qParam}&language=${langParam}&pageSize=24&page=1&sortBy=publishedAt&apiKey=${API_KEY}`
      );
      response = await response.json();
      if (response.status === 'ok') {
        setArticles(response.articles.filter((x) => x.title !== '[Removed]'));
        setTotalResults(response.totalResults);
      } else {
        setArticles([]);
        setTotalResults(0);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setArticles([]);
      setTotalResults(0);
    }
  };

  // Fetch more data for InfiniteScroll
  let fetchData = async () => {
    let nextPage = page + 1;
    setPage(nextPage);
    try {
      let response = await fetch(
        `https://newsapi.org/v2/everything?q=${q}&language=${language}&pageSize=24&page=${nextPage}&sortBy=publishedAt&apiKey=${API_KEY}`
      );
      response = await response.json();
      if (response.status === 'ok') {
        setArticles((prev) =>
          prev.concat(response.articles.filter((x) => x.title !== '[Removed]'))
        );
      }
    } catch (err) {
      console.error('Error fetching more data:', err);
    }
  };

  // Update search and language
  useEffect(() => {
    let qParam = query.get('q') ?? 'All';
    let langParam = query.get('language') ?? 'hi';
    setQ(qParam);
    setLanguage(langParam);
    getAPIData(qParam, langParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div className="container-fluid">
      <h5 className="background text-light text-center p-2 mt-2 text-capitalize">
        {q} Articles
      </h5>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchData}
        hasMore={articles.length < totalResults}
        loader={
          <div className="my-5 text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        <div className="row">
          {articles.map((item, index) => (
            <NewsItem
              key={index}
              source={item.source.name ?? 'N/A'}
              title={item.title}
              description={item.description}
              url={item.url}
              pic={item.urlToImage ?? '/images/noimage.png'}
              date={item.publishedAt}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
