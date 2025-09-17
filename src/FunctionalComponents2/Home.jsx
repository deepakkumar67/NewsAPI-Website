import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import NewsItem from './NewsItem'
import { useLocation } from 'react-router-dom'

export default function Home() {
  let [articles, setArticles] = useState([])
  let [totalResults, setTotalResults] = useState(0)
  let [page, setPage] = useState(1)

  let search = useLocation().search
  let query = new URLSearchParams(search)

  let [q, setQ] = useState('All')
  let [language, setLanguage] = useState('hi')

  async function getAPIData(q, language) {
    setPage(1)
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&language=${language}&pageSize=24&page=1&sortBy=publishedAt&apiKey=b86704a36ad844a08c4b4f941651a811`
    )
    response = await response.json()
    if (response.status === 'ok') {
      setArticles(response.articles.filter((x) => x.title !== '[Removed]'))
      setTotalResults(response.totalResults)
    } else {
      setArticles([])
      setTotalResults(0)
    }
  }

  let fetchData = async () => {
    setPage(page + 1)
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&language=${language}&pageSize=24&page=${page}&sortBy=publishedAt&apiKey=b86704a36ad844a08c4b4f941651a811`
    )
    response = await response.json()
    if (response.status === 'ok') {
      setArticles(
        articles.concat(response.articles.filter((x) => x.title !== '[Removed]'))
      )
    }
  }

  useEffect(() => {
    let q = query.get('q') ?? 'All'
    let langParam = query.get('language') ?? 'hi'
    setQ(q)
    setLanguage(langParam)
    getAPIData(q, langParam)
  }, [search])

  return (
    <div className="container-flud">
      <h5 className="background text-light text-center p-2 mt-2 text-capitalize">
        {q} Articles
      </h5>
      <InfiniteScroll
        dataLength={articles?.length}
        next={fetchData}
        hasMore={articles?.length < totalResults}
        loader={
          <div className="my-5 text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        <div className="row">
          {articles?.map((item, index) => {
            return (
              <NewsItem
                key={index}
                source={item.source.name ?? 'N/A'}
                title={item.title}
                description={item.description}
                url={item.url}
                pic={item.urlToImage ?? '/images/noimage.png'}
                date={item.publishedAt}
              />
            )
          })}
        </div>  
      </InfiniteScroll>
    </div>
  )
}
