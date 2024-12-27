import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import axios from "axios";
import Cookies from "js-cookie";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import Select from "react-select";
import { useNavigate } from "react-router-dom";


export const EditProfile = ({ t }) => {
    const specializations = [{ id: 1, name: "Cardiologie" },
    { id: 2, name: "Dermatologie" },
    { id: 3, name: "Neurologie" },
    { id: 4, name: "Pédiatrie" },
    { id: 5, name: "Gynécologie" },
    { id: 6, name: "Oncologie" },];
    const languageOptions = [
        { value: "English", label: "English" },
        { value: "French", label: "French" },
        { value: "Arabic", label: "Arabic" },
        { value: "Spanish", label: "Spanish" },
        { value: "German", label: "German" },
    ];

    const [profile, setProfile] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        years_of_experience: 0,
        state: "",
        city: "",
        street: "",
        spoken_languages: "",
        zoom_link: "",
        daily_visit_limit: 0,
        phone_number: "",
        specialization_id: 0,
        latitude: 0,
        longitude: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [position, setPosition] = useState([36.752887, 3.042048]);
    const [languages, setLanguages] = useState([]);
    const navigate = useNavigate();


    const onLocationSelect = (lat, lng) => { setProfile((prevProfile) => ({ ...prevProfile, latitude: lat, longitude: lng, })); };
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng; setPosition([lat, lng]); onLocationSelect(lat, lng);
            },
        });
        return position === null ? null : <Marker position={position} />;
    };

    const handleLanguageChange = (selectedOptions) => {
        setLanguages(selectedOptions);
        const languageString = selectedOptions.map((option) => option.value).join(", ");
        setProfile((prevProfile) => ({ ...prevProfile, spoken_languages: languageString }));
        console.log(languages)
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const token = Cookies.get("authToken"); // Fetch token from cookies
            if (!token) {
                setError(t("profile.noTokenError"));
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("http://127.0.0.1:8000/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userProfile = response.data;

                if (userProfile.is_doctor) {
                    const doctorResponse = await axios.get("http://127.0.0.1:8000/doctor", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProfile({ ...userProfile, ...doctorResponse.data });
                    setPosition([doctorResponse.data.latitude, doctorResponse.data.longitude]);
                    const selectedLanguages = doctorResponse.data.spoken_languages
                        .split(", ")
                        .map((lang) => {
                            return languageOptions.find(option => option.value === lang);
                        })
                        .filter(Boolean); // Filter out undefined values
                    setLanguages(selectedLanguages);
                } else {
                    setProfile(userProfile);
                }
            } catch (err) {
                setError(t("profile.fetchError"));
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = Cookies.get("authToken"); // Fetch token from cookies

        try {
            console.log(profile)

            const res = await axios.put("http://127.0.0.1:8000/profile", profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            //   setSuccess(t("profile.updateSuccess"));
            navigate("/profile");
        } catch (err) {
            //   setError(t("profile.updateError"));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-10">
                <p>{t("loading")}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <>
            <Header t={t} />
            <div className="bg-gray-100 pt-14">
                <div className="container min-h-screen mx-auto p-10 bg-white rounded-lg">
                    <h1 className="text-3xl font-bold mb-6">{t("profile.edit_profile")}</h1>
                    {success && <p className="text-green-500">{success}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-gray-700">{t("username")}</span>
                                <input
                                    type="text"
                                    name="username"
                                    value={profile.username || ""}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                //   required
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">{t("first_name")}</span>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={profile.first_name || ""}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                //   required
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">{t("last_name")}</span>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={profile.last_name || ""}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                //   required
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">{t("email")}</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email || ""}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                //   required
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">{t("phone_number")}</span>
                                <input
                                    type="tel"
                                    name="phone_number"
                                    value={profile.phone_number || ""}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                //   required
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">{t("years_of_experience")}</span>
                                <input
                                    type="number"
                                    name="years_of_experience"
                                    value={profile.years_of_experience || ""}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                    min={0}
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">{t("state")}</span>
                                <input
                                    type="text"
                                    name="state"
                                    value={profile.state || ""}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                //   required
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">{t("city")}</span>
                                <input
                                    type="text"
                                    name="city"
                                    value={profile.city || ""}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                //   required
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">{t("street")}</span>
                                <input
                                    type="text"
                                    name="street"
                                    value={profile.street || ""}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                //   required
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">{t("spoken_languages")}</span>
                                <input
                                    type="text"
                                    name="spoken_languages"
                                    value={profile.spoken_languages || ""}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">{t("spoken_languages")}</span>
                                <Select
                                    isMulti
                                    options={languageOptions}
                                    value={languages}
                                    onChange={handleLanguageChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                    placeholder={t("select_languages")}
                                />
                            </label>


                            <label className="block">
                                <span className="text-gray-700">{t("zoom_link")}</span>
                                <input
                                    type="url"
                                    name="zoom_link"
                                    value={profile.zoom_link || ""}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">{t("daily_visit_limit")}</span>
                                <input
                                    type="number"
                                    name="daily_visit_limit"
                                    value={profile.daily_visit_limit || 0}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">{t("specialization_id")}</span>
                                <select name="specialization_id" value={profile.specialization_id} onChange={handleChange} className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none" required >
                                    {specializations.map((specialization) => (
                                        <option key={specialization.id} value={specialization.id}> {specialization.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="block">
                                <span className="text-gray-700">{t("latitude")}</span>
                                <input
                                    type="number"
                                    name="latitude"
                                    value={profile.latitude}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">{t("longitude")}</span>
                                <input
                                    type="number"
                                    name="longitude"
                                    value={profile.longitude}
                                    onChange={handleChange}
                                    className="block w-full border-0 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 outline-none"
                                />
                            </label>
                        </div>
                        <MapContainer
                            center={position}
                            zoom={13}
                            scrollWheelZoom={false}
                            className="w-full h-64 rounded-lg"
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <LocationMarker />
                        </MapContainer>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            {t("profile.update")}
                        </button>
                    </form>
                </div>
            </div>
            <Footer t={t} />
        </>
    );
};

EditProfile.propTypes = {
    t: PropTypes.func.isRequired,
};
