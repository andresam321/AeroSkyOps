import './FuelGauge.css';

const FuelGauge = ({ tank }) => {
    const { fuel_capacity = 1, usable_fuel = 0, tank_name = "Unknown Tank", fuel_type = "Unknown" } = tank;
    
    // Calculate fuel percentage with a fallback of 0 if either value is missing
    const fuelPercentage = fuel_capacity ? (usable_fuel / fuel_capacity) * 100 : 0;

   
    
    const fuelColor = {
        "Jet-A": "rgba(0, 123, 255, 0.6)",  // Blue for Jet-A
        "Avgas": "rgba(0, 255, 123, 0.6)",  // Green for Avgas
        "94 Unleaded": "rgba(255, 0, 0, 0.6)"    // Red for Diesel
    }[fuel_type] || "rgba(100, 100, 100, 0.6)";  // Default color if type is unknown

    return (
        <div className="fuel-gauge-container">
            <h3>{tank_name}</h3>
            <h3>{fuel_type}</h3>
            <h3>{usable_fuel}</h3>
            <div className="fuel-gauge-image">
                <div 
                    className="fuel-gauge-fill"
                    style={{ height: `${fuelPercentage}%`, backgroundColor: fuelColor }}
                />
            </div>
            <p>{fuelPercentage.toFixed(2)}% Full</p>
        </div>
    );
};

export default FuelGauge;