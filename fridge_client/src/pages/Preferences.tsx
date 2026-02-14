import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './Preferences.css'

interface Preferences {
    flavors: string[]
    brand: string[]
    calories: string
    caffeine: string
    sugar: string
}

const Preferences = () => {
    const { user } = useAuth0()
    const [preferences, setPreferences] = useState<Preferences>({
        flavors: [],
        brand: [],
        calories: '',
        caffeine: '',
        sugar: ''
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    const flavorOptions = ['Citrus', 'Berry', 'Tropical', 'Punch', 'Cola', 'Fruit']
    const brandOptions = ['Red Bull', 'Monster', 'Rockstar', 'Celsius', 'Bang', 'Reign']

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'flavors' | 'brand') => {
        const { value, checked } = e.target
        setPreferences(prev => ({
            ...prev,
            [field]: checked 
                ? [...prev[field], value]
                : prev[field].filter(item => item !== value)
        }))
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPreferences(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMsg('')

        try {
            const response = await fetch('http://localhost:8000/set_preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: user?.email ?? '',
                    flavor: preferences.flavors.join(', '),
                    brand: preferences.brand.join(', '),
                    sugar: preferences.sugar,
                    caffeine: preferences.caffeine,
                    calorie: preferences.calories
                })
            })

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`)
            }

            setStatus('success')
        } catch (err) {
            setStatus('error')
            setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
        }
    }

    return (
        <div className="preferences-container">
            <h1>Energy Drink Preferences</h1>
            <form onSubmit={handleSubmit} className="preferences-form">
                <div className="form-group">
                    <label>Preferred Flavors</label>
                    <div className="checkbox-group">
                        {flavorOptions.map(flavor => (
                            <div key={flavor} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    id={`flavor-${flavor}`}
                                    value={flavor}
                                    checked={preferences.flavors.includes(flavor)}
                                    onChange={(e) => handleCheckboxChange(e, 'flavors')}
                                />
                                <label htmlFor={`flavor-${flavor}`}>{flavor}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Preferred Brand</label>
                    <div className="checkbox-group">
                        {brandOptions.map(brand => (
                            <div key={brand} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    id={`brand-${brand}`}
                                    value={brand}
                                    checked={preferences.brand.includes(brand)}
                                    onChange={(e) => handleCheckboxChange(e, 'brand')}
                                />
                                <label htmlFor={`brand-${brand}`}>{brand}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="calories">Preferred Calories</label>
                    <input
                        type="text"
                        id="calories"
                        name="calories"
                        placeholder="e.g. 100"
                        value={preferences.calories}
                        onChange={handleTextChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="caffeine">Preferred Caffeine (mg)</label>
                    <input
                        type="text"
                        id="caffeine"
                        name="caffeine"
                        placeholder="e.g. 60"
                        value={preferences.caffeine}
                        onChange={handleTextChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sugar">Preferred Sugar (g)</label>
                    <input
                        type="text"
                        id="sugar"
                        name="sugar"
                        placeholder="e.g. 0"
                        value={preferences.sugar}
                        onChange={handleTextChange}
                    />
                </div>

                <button type="submit" className="submit-button" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Saving...' : 'Submit'}
                </button>
                {status === 'success' && <p className="status-msg success">Preferences saved!</p>}
                {status === 'error' && <p className="status-msg error">{errorMsg}</p>}
            </form>
        </div>
    )
}

export default Preferences