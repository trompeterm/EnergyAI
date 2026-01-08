import InventoryDisplay from "../components/Inventory"
import InventoryItem from "../components/InventoryItem"
import RecommendationBox from "../components/RecommendationBox"
import Recommendation from "../components/Recommendation"
import './Main.css'

const Main = () => {
    return (
        <>
      <div className="button-div">
         <button>Get Recommendations</button>
         <button>Checkout</button>
         <button>Restock</button>
      </div>
      <InventoryDisplay>
        <InventoryItem name="Drink" quantity={1} img_path="src/assets/sample_img.png" />
        <InventoryItem name="Drink" quantity={2} img_path="src/assets/sample_img.png" />
        <InventoryItem name="Drink" quantity={3} img_path="src/assets/sample_img.png" />
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