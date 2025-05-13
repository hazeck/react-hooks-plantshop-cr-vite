import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then(setPlants)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Add new plant to state
  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  // Toggle sold out
  const handleToggleSoldOut = (id) => {
    const updated = plants.map((plant) =>
      plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
    );
    setPlants(updated);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search search={search} setSearch={setSearch} />
      <PlantList plants={filteredPlants} onToggleSoldOut={handleToggleSoldOut} />
    </main>
  );
}

export default PlantPage;
