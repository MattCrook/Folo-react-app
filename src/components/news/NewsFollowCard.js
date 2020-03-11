import React from "react";
import "./News.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

const firstLetterCase = (str) => {
    let capsTitle = "";
    for (let i = 0; i < str.split(" ").length; i++) {
        capsTitle += str.split(" ")[i].charAt(0).toUpperCase() + str.split(" ")[i].slice(1) + " ";
    }
    return capsTitle;
}

const NewsFollowCard = (props) => {

    return (
        <div className="newsCard">
            <div className="newsCardContent">
                <h3><span className="newsCardArticleTitle">
                    {firstLetterCase(props.news.title)}
                </span></h3>
                <p>Created by: {props.news.user.username}</p>
                <p>Synopsis: {props.news.synopsis}</p>
                <p>URL: <a href={props.news.url}>{props.news.url}</a></p>
            </div>
        </div>
    );
}

export default NewsFollowCard;