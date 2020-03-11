import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import "./News.css";

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const NewsEditForm = (props) => {
    const [news, setNews] = useState({ title: "", synopsis: "", userId: "", url: "", timestamp: "" });
    const [isLoading, setIsLoading] = useState(false);


    const handleFieldChange = evt => {
        const stateToChange = { ...news };
        stateToChange[evt.target.id] = evt.target.value;
        setNews(stateToChange);
    };

    const updateExistingNews = evt => {
        evt.preventDefault()
        setIsLoading(true);

        let dateTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

        const editedNews = {
            id: props.match.params.newsId,
            title: news.title,
            synopsis: news.synopsis,
            userId: activeUser.id,
            url: news.url,
            timestamp: dateTime
        };

        ApiManager.update("articles", editedNews)
            .then(() => props.history.push("/news"))
    }

    useEffect(() => {
        ApiManager.get("articles", props.match.params.newsId)
            .then(news => {
                setNews(news);
                setIsLoading(false);
            });
    }, [props.match.params.newsId]);

    return (
        <>
            <div className="icon-container">
            <span data-tooltip="BACK"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/news')}></i></span>
            </div>
            <form>
                <fieldset className="newsEditForm">
                    <div className="formgrid">
                        <div>
                            <label htmlFor="title">News Article Title: </label>
                            <p>
                                <textarea
                                    type="text"
                                    rows="2"
                                    cols="40"
                                    required
                                    className="form-control"
                                    onChange={handleFieldChange}
                                    id="title"
                                    value={news.title}
                                />
                            </p>
                        </div>
                        <div>
                            <label htmlFor="synopsis">Synopsis: </label>
                            <p>
                                <textarea
                                    type="text"
                                    rows="6"
                                    cols="50"
                                    required
                                    className="form-control"
                                    onChange={handleFieldChange}
                                    id="synopsis"
                                    value={news.synopsis}
                                />
                            </p>
                        </div>
                        <div>
                            <label htmlFor="url">URL: </label>
                            <p>
                                <textarea
                                    type="text"
                                    rows="1"
                                    cols="60"
                                    required
                                    className="form-control"
                                    onChange={handleFieldChange}
                                    id="url"
                                    value={news.url}
                                />
                            </p>
                        </div>
                    </div>
                    <div className="alignRight">
                        <button
                            type="button" disabled={isLoading}
                            onClick={updateExistingNews}
                            id="newsEditFormBtn"
                            className="ui blue basic button"
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    );
}

export default NewsEditForm