import { useState, useEffect, useCallback } from 'react'

const API_BASE = 'http://localhost:8000'

export interface InventoryItemData {
    drink_name: string
    quantity: number
}

export function useInventory() {
    const [inventory, setInventory] = useState<InventoryItemData[]>([])

    const fetchInventory = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE}/get_inventory`)
            const data = await response.json()
            setInventory(data)
        } catch (err) {
            console.error('Failed to fetch inventory:', err)
        }
    }, [])

    const addItem = useCallback(async (drinkName: string) => {
        try {
            const response = await fetch(
                `${API_BASE}/add_item?drink_name=${encodeURIComponent(drinkName)}`,
                { method: 'POST' }
            )
            if (!response.ok) throw new Error('Failed to add item')
            await fetchInventory()
        } catch (err) {
            console.error('Failed to add item:', err)
        }
    }, [fetchInventory])

    const removeItem = useCallback(async (drinkName: string) => {
        try {
            const response = await fetch(
                `${API_BASE}/remove_item?drink_name=${encodeURIComponent(drinkName)}`,
                { method: 'POST' }
            )
            if (!response.ok) throw new Error('Failed to remove item')
            await fetchInventory()
        } catch (err) {
            console.error('Failed to remove item:', err)
        }
    }, [fetchInventory])

    useEffect(() => {
        fetchInventory()
    }, [fetchInventory])

    return { inventory, fetchInventory, addItem, removeItem }
}
