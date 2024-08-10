import React from 'react';

const Tooltip = ({ content, children }) => {
    return (
        <span className="tooltip-container">
            {children}
            <span className="tooltip-text">{content}</span>
        </span>
    );
};

const sentimentColors = {
    Positive: '#D9F2DD',
    Negative: '#F2DBD9',
    Mixed: '#e8bd6d3d',
    Neutral: '#eaf09b6b',
};

const ReviewHighlighter = ({ review }) => {
    const highlightText = (text, highlightIndices, topic) => {
        let lastIndex = 0;
        const highlightedText = [];

        highlightIndices.forEach(([start, end, sentiment], index) => {
            const color = sentimentColors[sentiment];

            if (lastIndex < start) {
                highlightedText.push(<span key={`normal-${index}`}>{text.slice(lastIndex, start)}</span>);
            }

            highlightedText.push(
                <Tooltip key={`highlight-${index}`} content={topic}>
                    <span className="highlighted-text" style={{ backgroundColor: color }}>
                        {text.slice(start, end)}
                    </span>
                </Tooltip>
            );

            lastIndex = end;
        });

        if (lastIndex < text.length) {
            highlightedText.push(<span key="last">{text.slice(lastIndex)}</span>);
        }

        return highlightedText;
    };

    const renderStars = (score) => {
        const fullStars = Math.floor(score);
        const halfStar = score % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="full-star">★</span>);
        }
        if (halfStar) {
            stars.push(<span key="half" className="half-star">☆</span>);
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push(<span key={i + fullStars} className="empty-star">☆</span>);
        }

        return stars;
    };


    return (
        <div className="review-container">
            <div className="user-info">
                <div>
                    <img src={review.source.image} alt="Avatar" width="40" height="40" className="user-avatar" />
                    <span className="username">{review.reviewer_name}</span> wrote a review at <a href={review.review_url} target="_blank"> {review.source.name}</a>
                </div>
                <div>
                    <span className="rating-stars">
                        {renderStars(review.rating_review_score)}
                    </span>
                    <span className="date">{review.date}</span>
                </div>
            </div>
            {review.analytics.map((analytic, index) => (
                <p key={index}>
                    {highlightText(review.content, analytic.highlight_indices, analytic.topic)}
                </p>
            ))}
        </div>
    );
};

export default ReviewHighlighter;
