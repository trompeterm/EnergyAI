import './Recommendation.css';

const Recommendation = (props: {"name": string, "img_path": string, "percentage": number, "summary": string}) => {
    return (
        <div className="recommendation-card">
            <img src={props.img_path} alt={props.name} />
            <div className='drink-content'>
                <div className='drink-title'>{props.name}</div>
                <div className='drink-description'>{props.summary}</div>
            </div>
            <div className='drink-percentage'>{props.percentage}%</div>
        </div>
    )
}

export default Recommendation;