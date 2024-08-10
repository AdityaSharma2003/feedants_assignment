import React, { useEffect, useState } from 'react';
import ReviewHighlighter from './ReviewHighlighter';


const ReviewList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/reviews.json')
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching reviews:', error));
    }, []);

    return (
        <div>
            {reviews.map((review) => (
                <div key={review.review_id}>
                    <ReviewHighlighter review={review} />
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
