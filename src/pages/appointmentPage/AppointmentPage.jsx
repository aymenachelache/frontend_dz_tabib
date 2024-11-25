import PropTypes from 'prop-types';
import { Header } from '../../components/header/Header';

export const AppointmentPage = ({ t }) => {
    const doctor = {
        _id: 1,
        name: "Achelache Aymen",
        title: "Professor and Consultant of Cardiology & Cardiovascular diseases",
        description: "MSc and MD of Cardiology & Cardiovascular diseases - Al Azhar University. Cardiac Catheter Consultant - Fellow of the European Heart Association.",
        rating: 4.5,
        reviews: 1821,
        specialization: "Cardiologist",
        subSpecializations: ["Adult Cardiology", "Pediatric Cardiology"],
        location: "Ferdjioua, Mila",
        fees: 400,
        waitingTime: "1 Hour and 23 Minutes",
        phone: "0660146380",
        availability: [
            { day: "Today", dis: ["5/15"] },
            { day: "Tomorrow", dis: ["0/15"] },
            { day: "Thu 11/21", dis: ["10/15"] },
        ],
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEry1FIDXr2v6ZEvWOn0PgOjsbsthO06JsA&s"
    }
    return (
        <>
            <Header t={t} />
            <div className="appointment-page">
                <div className="bg-gray-100 min-h-[calc(100vh-80px)]  flex justify-center items-center">
                    <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 grid grid-cols-2 gap-6">
                        {/* Left Section: Doctor Information */}
                        <div className="max-md:col-span-2 col-span-1 border-r pr-6">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-gray-200 rounded-full border-2 border-blue-400 overflow-hidden">
                                    <img src={doctor.img} alt="DoctorImg" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">{t("doctorCard.doctor")} {doctor.name}</h2>
                                    <p className="text-gray-500">
                                        {doctor.specialization}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-6 text-gray-700">
                                <strong>Tomorrow November 20</strong> - 7:00 PM,{" "}
                                <span className="text-blue-500 font-semibold">
                                    Appointment reservation
                                </span>
                            </p>
                        </div>

                        {/* Right Section: Booking Form */}
                        <div className="max-md:col-span-2 col-span-1">
                            <h2 className="text-xl font-bold text-blue-500 mb-4">{t("appointmentPage.form.title")}</h2>
                            <form className="space-y-4">
                                {/* Patient Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-600 mb-1 font-medium"
                                    >
                                        {t("appointmentPage.form.patientNameLabel")}
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder={t("appointmentPage.form.patientNamePlaceholder")}
                                        className="block w-full border-0  rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6 outline-none"
                                    />
                                </div>
                                {/* Mobile Number */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-gray-600 mb-1 font-medium"
                                    >
                                        {t("appointmentPage.form.mobileNumberLabel")}
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <select
                                            className="border border-gray-300 rounded-lg p-2 bg-white outline-none"
                                            defaultValue="ALG"
                                        >
                                            <option value="ALG">ALG</option>
                                            <option value="US">🇺🇸</option>
                                            <option value="FR">🇫🇷</option>
                                        </select>
                                        <input
                                            id="phone"
                                            type="text"
                                            placeholder={t("appointmentPage.form.mobileNumberPlaceholder")}
                                            className="block w-full border-0  rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6 outline-none"
                                        />
                                    </div>
                                </div>
                                {/* Email Address */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-gray-600 mb-1 font-medium"
                                    >
                                        {t("booking.email")} {t("appointmentPage.form.optionnel")}
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder={t("appointmentPage.form.emailPlaceholder")}
                                        className="block w-full border-0  rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6 outline-none"
                                    />
                                </div>
                            </form>

                            {/* Buttons */}
                            <div className="mt-6 flex gap-4">
                                <button className="!text-center flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600">
                                    {t("appointmentPage.buttons.book")}
                                </button>
                                <button className="!text-center flex-1 border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-100">
                                    {t("appointmentPage.buttons.cancel")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


AppointmentPage.propTypes = {
    t: PropTypes.func.isRequired,
};