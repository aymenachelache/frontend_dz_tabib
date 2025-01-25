import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [ville, setVille] = useState("");
  const [typeAssurance, setTypeAssurance] = useState("");
  const [disponibilite, setDisponibilite] = useState("");

  // List of 58 Algerian cities (you can expand this list)
  const villesAlgerie = [
    "Alger", "Oran", "Constantine", "Annaba", "Blida", "Batna", "Sétif", "Chlef", "Tizi Ouzou", 
    "Béjaïa", "Skikda", "Sidi Bel Abbès", "Tlemcen", "Ghardaïa", "Mostaganem", "Biskra", 
    "Tébessa", "El Oued", "Tiaret", "Ouargla", "Djelfa", "M'sila", "Jijel", "Relizane", 
    "Saïda", "Guelma", "Laghouat", "Médéa", "Tamanrasset", "Béchar", "Adrar", "Tindouf", 
    "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tissemsilt", "Khenchela", "Souk Ahras", 
    "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Ouled Djellal", 
    "Bouira", "Illizi", "Tamanrasset", "Timimoun", "Beni Abbès", "In Salah", "In Guezzam", 
    "Touggourt", "Djanet", "El M'Ghair", "El Meniaa", "Ouled Djellal"
  ];

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value) &&
            (specialite === "" || user.specialite === specialite) && // Filter by spécialité
            (ville === "" || user.ville === ville) && // Filter by ville
            (typeAssurance === "" || user.typeAssurance === typeAssurance) && // Filter by type d'assurance
            (disponibilite === "" || user.disponibilite === disponibilite) // Filter by disponibilité
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Search Bar */}
      <div className="w-full h-10 rounded-lg shadow-md bg-white flex items-center px-4">
        <FaSearch className="text-blue-500" />
        <input
          className="bg-transparent border-none h-full text-xl w-full ml-2 focus:outline-none"
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      {/* Spécialité Dropdown */}
      <div className="w-72">
        <select
          value={specialite}
          onChange={(e) => setSpecialite(e.target.value)}
          className="w-full h-10 rounded-lg shadow-md bg-white px-4 focus:outline-none text-gray-700 text-lg"
        >
          <option value="">Spécialité</option>
          <option value="Cardiologie">Cardiologie</option>
          <option value="Dermatologie">Dermatologie</option>
          <option value="Pédiatrie">Pédiatrie</option>
          <option value="Orthopédie">Orthopédie</option>
          {/* Add more spécialités as needed */}
        </select>
      </div>

      {/* Ville Dropdown */}
      <div className="w-72">
        <select
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          className="w-full h-10 rounded-lg shadow-md bg-white px-4 focus:outline-none text-gray-700 text-lg"
        >
          <option value="">Ville</option>
          {villesAlgerie.map((ville, index) => (
            <option key={index} value={ville}>
              {ville}
            </option>
          ))}
        </select>
      </div>

      {/* Type d'assurance Dropdown */}
      <div className="w-72">
        <select
          value={typeAssurance}
          onChange={(e) => setTypeAssurance(e.target.value)}
          className="w-full h-10 rounded-lg shadow-md bg-white px-4 focus:outline-none text-gray-700 text-lg"
        >
          <option value="">Type d'assurance</option>
          <option value="CNAS">CNAS</option>
          <option value="CASNOS">CASNOS</option>
          <option value="Privée">Privée</option>
          {/* Add more types as needed */}
        </select>
      </div>

      {/* Disponibilité Dropdown */}
      <div className="w-72">
        <select
          value={disponibilite}
          onChange={(e) => setDisponibilite(e.target.value)}
          className="w-full h-10 rounded-lg shadow-md bg-white px-4 focus:outline-none text-gray-700 text-lg"
        >
          <option value="">Disponibilité</option>
          <option value="Disponible">Disponible</option>
          <option value="Non disponible">Non disponible</option>
        </select>
      </div>
    </div>
  );
};