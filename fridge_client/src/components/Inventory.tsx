import React from "react"
import './Inventory.css'

const InventoryDisplay = (props: { children: React.ReactNode }) => {
    return (
        <div className="inventory">
            <h2>Fridge Inventory</h2>
            <div className="items">
                {props.children}
            </div>
        </div>
    )
}

export default InventoryDisplay;