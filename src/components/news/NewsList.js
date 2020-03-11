import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import NewsFollowList from './NewsFollowList';
import ApiManager from '../../modules/ApiManager';

const NewsList = (props) => {
    const [news, setNews] = useState([]);

    const getNews = () => {
        return ApiManager.getAll("articles").then(newsFromAPI => {
            setNews(newsFromAPI)
        });
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div>
            <section className="section-content">
                <div className="icon-container">
                    <span data-tooltip="BACK"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/')}></i></span>
                    <span data-tooltip="ADD"><i className="big plus square outline icon" id="plusIcon" onClick={() => props.history.push('/news/new')}></i></span>
                </div>
                <div className="container-cards userNewsArticles">
                    <h1 className="newsSectionHeader">YOUR NEWS</h1>
                    {news.sort(function (a, b) {
                        return new Date(b.timestamp) - new Date(a.timestamp)
                    }).map(newsItem =>
                        <NewsCard
                            key={newsItem.id}
                            news={newsItem}
                            getNews={getNews}
                            {...props}
                        />)}
                </div>
                <div className="container-cards followNewsArticles">
                    <h1 className="newsSectionHeader">NEWS FROM PEOPLE YOU FOLLOW</h1>
                    <NewsFollowList />
                </div>
            </section>

        </div>
    );
};
export default NewsList