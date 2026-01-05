import React from 'react';
import './RecommendationBox.css'

const RecommendationBox = (props: {children: React.ReactNode}) => {
    return (
        <div className="recommendation-box">
            <h2>Recommendations</h2>
            <div className="items">
                {props.children}
            </div>
        </div>
    )
}

export default RecommendationBox;