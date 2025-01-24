
import PropTypes from 'prop-types';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import doctorImg from "./../../assets/doctor.jpg"
import Cookies from "js-cookie";

export const DoctorProfile = ({ t }) => {
    const [profile, setProfile] = useState({});
    const [position, setPosition] = useState([36.752887, 3.042048]);
    const onLocationSelect = (lat, lng) => { setProfile((prevProfile) => ({ ...prevProfile, latitude: lat, longitude: lng, })); };
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng; setPosition([lat, lng]); onLocationSelect(lat, lng);
            },
        });
        return position === null ? null : <Marker position={position} />;
    };

    const doctor = {
        _id: 1,
        name: "Achelache Aymen",
        title: "Professor and Consultant of Cardiology & Cardiovascular diseases",
        description: "MSc and MD of Cardiology & Cardiovascular diseases - Al Azhar University. Cardiac Catheter Consultant - Fellow of the European Heart Association.",
        specialization: "Cardiologist",
        reviews: 1821,
        subSpecializations: ["Adult Cardiology", "Pediatric Cardiology"],
        experienceYears: 15, // Années d'expérience
        languagesSpoken: ["French", "Arabic", "English"], // Langues parlées
        waitingTime: "1 Hour and 23 Minutes",
        location: {
            address: "Ferdjioua, Mila",
            latitude: 36.3643, // Exemple de coordonnées GPS
            longitude: 6.1553
        },
        phone: "0660146380",
        fees: 400, // Prix de la consultation en DZD
        acceptedInsurances: ["CNAS", "CASNOS", "Private"], // Mutuelles/assurances acceptées
        workingHours: [
            { day: "Monday", hours: "08:00-16:00" },
            { day: "Tuesday", hours: "08:00-16:00" },
            { day: "Wednesday", hours: "08:00-16:00" },
            { day: "Thursday", hours: "08:00-16:00" },
            { day: "Friday", hours: "08:00-12:00" },
        ], // Horaires de travail
        availability: [
            {
                day: "Today",
                hours: "08:00-16:00", // Horaires d'ouverture
                availableSlots: 3,    // Nombre de créneaux disponibles
                maxSlots: 15          // Nombre maximum de créneaux dans la journée
            },
            {
                day: "Tomorrow",
                hours: "08:00-16:00",
                availableSlots: 10,
                maxSlots: 15
            }
        ],
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEry1FIDXr2v6ZEvWOn0PgOjsbsthO06JsA&s", // URL de la photo
        rating: {
            average: 4.5, // Moyenne des notes
            reviews: 1821 // Nombre d'avis
        },
        comments: [
            {
                patientName: "John Doe",
                comment: "Excellent doctor, very professional!",
                rating: 5,
                date: "2024-11-20"
            },
            {
                patientName: "Jane Smith",
                comment: "Great experience, highly recommended.",
                rating: 4,
                date: "2024-11-19"
            }
        ] // Avis des patients
    };
    const [workingDays, setWorkingDays] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        const token = Cookies.get("authToken");

        const fetchData = async () => {
            const doctorResponse = await axios.get(`http://127.0.0.1:8000/doctors/${id}`);
            setProfile(doctorResponse.data);
            console.log(doctorResponse.data)
            const lat = doctorResponse.data?.latitude || 36.752887;
            const lng = doctorResponse.data?.longitude || 3.042048;

            setPosition([lat, lng]);
            console.log(doctorResponse)



            const response = await axios.get(`http://127.0.0.1:8000/working-days/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setWorkingDays(response.data);
            console.log(workingDays)

        }
        fetchData();

    }, []);

    return (
        <div className="doctor-profile h-auto">
            <Header t={t} />
            <div className="bg-gray-100 min-h-screen p-6">
                <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
                    {/* Doctor Info */}
                    <section className="p-6 flex items-center gap-6 border-b">
                        <div className="w-28 h-28 object-cover bg-gray-200 rounded-full border-2 border-blue-400 overflow-hidden">
                            <img src={!profile.photo ? doctorImg : profile.photo} alt="DoctorImg" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold">
                                {t("doctorCard.doctor")} {profile.first_name} {profile.last_name}
                            </h1>
                            <p className="text-gray-500">
                                {profile.email}
                            </p>
                            {/* Ratings */}
                            <div className="flex items-center mt-2">
                                <div className="flex text-yellow-400">
                                    {"★".repeat(Math.floor(profile.rating))}
                                    {"☆".repeat(5 - Math.floor(profile.rating))}
                                </div>
                                <span className="text-gray-600 text-sm ml-2">
                                    {profile.rating} ({profile.reviews} reviews)
                                </span>
                            </div>

                            <div className="flex my-2">
                                <div className="flex text-yellow-400">
                                    {"★".repeat(Math.floor(profile.rating))}
                                    {"☆".repeat(5 - Math.floor(profile.rating))}
                                </div>

                            </div>

                        </div>
                    </section>

                    {/* About and Booking */}
                    <div className="grid grid-cols-3 gap-6 p-6">
                        {/* Left Section */}
                        <div className="col-span-2 max-md:col-span-3">
                            {/* About the Doctor */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold mb-2">{t("aboutDoctor.title")}</h2>
                                <p className="text-gray-700">
                                    {doctor.description}
                                </p>
                                <p className="my-1">
                                    <strong>{t("spoken_languages")}:</strong> {profile.spoken_languages}
                                </p>
                                <p className="my-1">
                                    <strong>{t("years_of_experience")}:</strong> {profile.years_of_experience}
                                </p>
                                <p className="my-1">
                                    <strong>{t("zoom_link")}:</strong>{" "}
                                    <a
                                        href={profile.zoom_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        {profile.zoom_link}
                                    </a>
                                </p>
                                <p className="my-1">
                                    <strong>{t("Prix_Consultion")}:</strong> {profile.daily_visit_limit}
                                </p>
                                <p className="my-1">
                                    <strong>{t("Location")}:</strong>
                                </p>
                                <div className='my-5'>
                                    <MapContainer
                                        center={position}
                                        zoom={13}
                                        scrollWheelZoom={false}
                                        className="w-full h-64 rounded-lg"
                                        key={position}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        <LocationMarker />
                                    </MapContainer>

                                </div>


                            </div>

                            {/* Reviews Section */}
                            <div>
                                <h2 className="text-xl font-bold mb-4">{t("aboutDoctor.reviews")}</h2>
                                <div className="space-y-4">
                                    {doctor.comments.map((el, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-100 p-4 rounded-lg shadow-sm"
                                        >
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold">{el.patientName}</p>
                                                <span className="text-blue-500 text-xl font-bold">
                                                    {el.rating}
                                                </span>
                                            </div>
                                            <p className="text-gray-500">
                                                {el.comment}
                                            </p>
                                        </div>
                                    ))}
                                    <button className="text-blue-500 mt-2">View More</button>

                                </div>
                            </div>
                        </div>

                        {/* Booking Section */}
                        <div className="col-span-1 max-md:col-span-3 bg-blue-50 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">Booking Information</h2>
                            <div className="mb-4">
                                <p className="text-sm mt-1">
                                    <span className="font-medium">{t("doctorCard.specializedIn")}</span>{" "}
                                    {profile.specialization_name}
                                </p>
                                {/* Location */}
                                <p className="text-sm text-gray-600 mt-2">
                                    {t("doctorCard.location")} {profile.street}
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    {t("doctorCard.location")} {profile.city}, {profile.state}, Algeria
                                </p>
                                <p className="text-sm text-gray-600">{t("doctorCard.phone")} {profile.phone_number}</p>
                            </div>
                            {/* Appointment Times */}
                            <div className="space-y-4">
                                <div className="mt-1 !text-center">
                                    {workingDays.map((el, idx) => (
                                        <>
                                        <div key={idx} className='grid grid-cols-4 rounded-t-md overflow-hidden cursor-pointer'>
                                            <div
                                                className="bg-blue-200 hover:bg-blue-300 text-sm px-4 py-3"
                                            >
                                                {el.day_of_week}
                                            </div>
                                            <div
                                                className="bg-blue-200 !text-center hover:bg-blue-300 text-sm px-4 py-3"
                                            >
                                                {el.daily_appointment_limit}
                                            </div>
                                            <div
                                                className="col-span-2 !text-center bg-blue-200 hover:bg-blue-300 text-sm px-4 py-3"
                                            >
                                                {el?.hours[0].start_time} - {el?.hours[0].end_time}
                                            </div>
                                        </div>
                                           <div className="w-full !text-center">
                                           <Link to="/appointment">
                                                <button
                                                    className="w-full !text-center text-sm px-4 py-3 rounded-b-md mb-2 bg-red-500 text-white font-semibold hover:bg-red-600"
                                                >
                                                    {t("booking.book")}
                                                </button>
                                            </Link>
                                           </div>

                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer t={t} />
        </div>
    )
}


DoctorProfile.propTypes = {
    t: PropTypes.func.isRequired,
}