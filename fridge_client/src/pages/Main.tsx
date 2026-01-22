import { useState, useEffect } from 'react'
import InventoryDisplay from "../components/Inventory"
import InventoryItem from "../components/InventoryItem"
import RecommendationBox from "../components/RecommendationBox"
import Recommendation from "../components/Recommendation"
import './Main.css'

const Main = () => {
    const [inventory, setInventory] = useState<Record<string, number>>({});
    const [recommendations, setRecommendations] = useState<Record<string, [number, string]>>({});

    useEffect(() => {
        fetch('http://localhost:8000/get_inventory')
            .then(response => response.json())
            .then(data => setInventory(data));

        fetch('http://localhost:8000/get_recommendations')
            .then(response => response.json())
            .then(data => setRecommendations(data));
    }, []);

    return (
        <>
      <div className="button-div">
         <button>Get Recommendations</button>
         <button>Checkout</button>
         <button>Restock</button>
      </div>
      <InventoryDisplay>
        {Object.entries(inventory).map(([name, quantity]) => (
          <InventoryItem key={name} name={name} quantity={quantity} img_path="src/assets/sample_img.png" />
        ))}
      </InventoryDisplay>
      <RecommendationBox>
        {Object.entries(recommendations).map(([name, [percentage, summary]]) => (
          <Recommendation key={name} name={name} img_path="src/assets/sample_img.png" percentage={percentage} summary={summary} />
        ))}
      </RecommendationBox>
    </>
    )
}

export default Main