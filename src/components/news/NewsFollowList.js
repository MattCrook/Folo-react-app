import React, { useState, useEffect } from 'react';
import NewsFollowCard from './NewsFollowCard';
import ApiManager from '../../modules/ApiManager';

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const NewsFollowList = (props) => {
    const [followNews, setFollowNews] = useState([]);

    const getFollows = () => {
        let followedNews = [];
        return ApiManager.getAllWithUserId("followings", activeUser.id).then(follows => {
            for (let i = 0; i < follows.length; i++) {
                ApiManager.getAllWithUserIdExpand("articles", follows[i].followedId, "user").then(fNews => {
                    followedNews.push(fNews.flat());
                    setFollowNews(followedNews.flat());
                })
            }
        });
    };

    useEffect(() => {
        getFollows();
    }, []);

    return (
        <div>
            <section className="section-content">
                <div className="container-cards">
                    {followNews.sort(function (a, b) {
                        return new Date(b.timestamp) - new Date(a.timestamp)
                    }).map(newsItem =>
                        <NewsFollowCard
                            key={newsItem.id}
                            news={newsItem}
                            getFollows={getFollows}
                            {...props}
                        />)}
                </div>
            </section>

        </div>
    );
};
export default NewsFollowList