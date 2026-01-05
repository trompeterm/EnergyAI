import './InventoryItem.css';

const InventoryItem = (props: { name: string; quantity: number; img_path: string }) => {
    return (
        <div className="inventory-item">
            <img src={props.img_path} alt={props.name} width="100%" />
            <p>{props.name}</p>
            <p>Quantity: {props.quantity}</p>
        </div>
    );
}

export default InventoryItem;