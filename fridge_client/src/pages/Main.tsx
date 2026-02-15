import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import InventoryDisplay from "../components/Inventory"
import InventoryItem from "../components/InventoryItem"
import RecommendationBox from "../components/RecommendationBox"
import Recommendation from "../components/Recommendation"
import './Main.css'

interface RecommendationItem {
    name: string
    score: number
}

const Main = () => {
    const { user } = useAuth0()
    const [inventory, setInventory] = useState<Record<string, number>>({});
    const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/get_inventory')
            .then(response => response.json())
            .then(data => setInventory(data));
    }, []);

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

    return (
        <>
      <div className="button-div">
         <button onClick={fetchRecommendations} disabled={loading}>
            {loading ? 'Loading...' : 'Get Recommendations'}
         </button>
         <button>Checkout</button>
         <button>Restock</button>
      </div>
      <InventoryDisplay>
        {Object.entries(inventory).map(([name, quantity]) => (
          <InventoryItem key={name} name={name} quantity={quantity} img_path="src/assets/sample_img.png" />
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