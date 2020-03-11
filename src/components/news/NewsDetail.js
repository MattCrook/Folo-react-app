import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import "./News.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const firstLetterCase = (str) => {
    let capsTitle = "";
    for (let i = 0; i < str.split(" ").length; i++) {
        capsTitle += str.split(" ")[i].charAt(0).toUpperCase() + str.split(" ")[i].slice(1) + " ";
    }
    return capsTitle;
}

const NewsDetail = props => {
    const [news, setNews] = useState({ title: "", synopsis: "", userId: "", url: "", timestamp: "" });
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = () => {
        setIsLoading(true);
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => ApiManager.delete("articles", props.newsId).then(() =>
                        props.history.push("/news")
                    )
                },
                {
                    label: 'No',
                    onClick: () => ""
                }
            ]
        });
    };

    useEffect(() => {
        ApiManager.get("articles", props.newsId).then(news => {
            setNews({
                title: news.title,
                synopsis: news.synopsis,
                url: news.url,
                userId: news.userId,
                id: news.id,
                timestamp: news.timestamp
            });
            setIsLoading(false);
        });
    }, [props.newsId]);

    if (news.title !== undefined && news.synopsis !== undefined && news.url !== undefined) {
        return (
            <div className="newsCard">
                <div className="icon-container">
                    <span data-tooltip="BACK"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/news')}></i></span>
                    <span data-tooltip="ADD"><i className="big plus square outline icon" id="plusIcon" onClick={() => props.history.push('/news/new')}></i></span>
                </div>
                <div className="newsCardContent">
                    <h3>
                        <span style={{ color: "darkslategrey" }}>{firstLetterCase(news.title)}</span>
                    </h3>
                    <p>{news.timestamp}</p>
                    <p>{news.synopsis}</p>
                    <p><a href={news.url} target="_new">{news.url}</a></p>
                    <div align="right">
                        <span data-tooltip="EDIT"><i className="big edit icon" id="newsDetailsEditIcon" onClick={() => props.history.push(`/news/${news.id}/edit`)}></i></span>
                        <span data-tooltip="DELETE"><i id="newsDetailsTrashIcon" className="big trash alternate icon" disabled={isLoading} onClick={() => handleDelete()}></i></span>
                    </div>
                </div>
            </div >
        );
    } else {
        return (
            <div className="newsCard">
                <div className="newsCardContent">
                    <center><h3>NEWS ARTICLE NOT FOUND</h3></center>
                </div>
            </div>
        )
    }
};

export default NewsDetail;