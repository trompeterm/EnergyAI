import { useState, useEffect } from 'react'
import InventoryDisplay from "../components/Inventory"
import InventoryItem from "../components/InventoryItem"
import RecommendationBox from "../components/RecommendationBox"
import Recommendation from "../components/Recommendation"
import './Main.css'

const Main = () => {
    const [inventory, setInventory] = useState<Record<string, number>>({});

    useEffect(() => {
        fetch('http://localhost:8000/get_inventory')
            .then(response => response.json())
            .then(data => setInventory(data));
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
        <Recommendation name="Drink 1" img_path="src/assets/sample_img.png" percentage={85} summary="You will like this drink a lot" />
        <Recommendation name="Drink 2" img_path="src/assets/sample_img.png" percentage={70} summary="This snack is moderately energy efficient." />
        <Recommendation name="Drink 3" img_path="src/assets/sample_img.png" percentage={90} summary="This drink is highly energy efficient, and you really like the flavor." />
      </RecommendationBox>
    </>
    )
}

export default Main