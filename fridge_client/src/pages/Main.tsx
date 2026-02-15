import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import InventoryDisplay from "../components/Inventory"
import InventoryItem from "../components/InventoryItem"
import RecommendationBox from "../components/RecommendationBox"
import Recommendation from "../components/Recommendation"
import { useInventory } from "../hooks/useInventory"
import './Main.css'

interface RecommendationItem {
    name: string
    score: number
}

const Main = () => {
    const { user } = useAuth0()
    const { inventory, addItem, removeItem } = useInventory()
    const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
    const [loading, setLoading] = useState(false);

    const [checkoutOpen, setCheckoutOpen] = useState(false)
    const [restockOpen, setRestockOpen] = useState(false)
    const [restockDrinkName, setRestockDrinkName] = useState('')

    const fetchRecommendations = async () => {
        if (!user?.email) return
        setLoading(true)
        try {
            const response = await fetch(
                `http://localhost:8000/get_recommendations?username=${encodeURIComponent(user.email)}`
            )
            if (!response.ok) throw new Error('Failed to fetch recommendations')
            const data = await response.json()
            setRecommendations(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleCheckoutItem = async (drinkName: string) => {
        await removeItem(drinkName)
    }

    const handleRestock = async () => {
        const name = restockDrinkName.trim()
        if (!name) return
        await addItem(name)
        setRestockDrinkName('')
        setRestockOpen(false)
    }

    return (
        <>
      <div className="button-div">
         <button onClick={fetchRecommendations} disabled={loading}>
            {loading ? 'Loading...' : 'Get Recommendations'}
         </button>
         <button onClick={() => setCheckoutOpen(!checkoutOpen)}>
            {checkoutOpen ? 'Close Checkout' : 'Checkout'}
         </button>
         <button onClick={() => setRestockOpen(!restockOpen)}>
            {restockOpen ? 'Close Restock' : 'Restock'}
         </button>
      </div>

      {checkoutOpen && (
        <div className="overlay">
          <div className="overlay-panel">
            <h2>Checkout</h2>
            <p className="overlay-hint">Click an item to remove one from inventory</p>
            <div className="overlay-items">
              {inventory.filter(item => item.quantity > 0).map((item) => (
                <div
                  key={item.drink_name}
                  className="overlay-item clickable"
                  onClick={() => handleCheckoutItem(item.drink_name)}
                >
                  <img src="src/assets/sample_img.png" alt={item.drink_name} width="100%" />
                  <p>{item.drink_name}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>
            <button className="overlay-close" onClick={() => setCheckoutOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {restockOpen && (
        <div className="overlay">
          <div className="overlay-panel restock-panel">
            <h2>Restock</h2>
            <p className="overlay-hint">Enter the drink name to add to the fridge</p>
            <div className="restock-form">
              <input
                type="text"
                placeholder="Drink name..."
                value={restockDrinkName}
                onChange={(e) => setRestockDrinkName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRestock()}
              />
              <button className="restock-submit" onClick={handleRestock} disabled={!restockDrinkName.trim()}>
                Add to Fridge
              </button>
            </div>
            <button className="overlay-close" onClick={() => { setRestockOpen(false); setRestockDrinkName('') }}>Close</button>
          </div>
        </div>
      )}

      <InventoryDisplay>
        {inventory.filter(item => item.quantity > 0).map((item) => (
          <InventoryItem key={item.drink_name} name={item.drink_name} quantity={item.quantity} img_path="src/assets/sample_img.png" />
        ))}
      </InventoryDisplay>
      <RecommendationBox>
        {recommendations.map((rec) => (
          <Recommendation key={rec.name} name={rec.name} img_path="src/assets/sample_img.png" percentage={rec.score} summary="" />
        ))}
      </RecommendationBox>
    </>
    )
}

export default Main
