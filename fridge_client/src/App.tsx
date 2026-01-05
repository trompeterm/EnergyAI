import Navbar from './components/navbar'
import InventoryDisplay from './components/Inventory'
import InventoryItem from './components/InventoryItem'
import './App.css'

function App() {
  return (
    <>
      <Navbar></Navbar>
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
    </>
  )
}

export default App
