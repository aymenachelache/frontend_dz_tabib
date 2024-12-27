import PropTypes from 'prop-types';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { DoctorCard } from './DoctorCard';
import { Link } from 'react-router-dom';




export const Doctors = ({ t }) => {
  // const [doctors, setDoctors] = useState([]);
  const doctors = [
    {
      _id: 1,
      name: "Achelache Aymen",
      title: "Professor and Consultant of Cardiology & Cardiovascular diseases",
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
    },
    {
      _id: 1,
      name: "Achelache Aymen",
      title: "Professor and Consultant of Cardiology & Cardiovascular diseases",
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
    },
    {
      _id: 2,
      name: "Achelache Aymen",
      title: "Professor and Consultant of Cardiology & Cardiovascular diseases",
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
        { day: "Thu 11/21", dis: ["5/15"] },
      ],
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEry1FIDXr2v6ZEvWOn0PgOjsbsthO06JsA&s"
    },
    {
      _id: 3,
      name: "Muhammad Almessry",
      title: "Ortho-Spine Surgery Consultant",
      rating: 4.8,
      reviews: 1400,
      specialization: "Ortho-Spine Surgeon",
      subSpecializations: ["Spine Surgery", "Orthopedics"],
      location: "Nasr City: Abbas El-Akkad Street",
      fees: 500,
      waitingTime: "45 Minutes",
      phone: "0777393396",
      availability: [
        { day: "Today", dis: ["8/15"] },
        { day: "Tomorrow", dis: ["5/15"] },
        { day: "Thu 11/21", dis: ["4/15"] },
      ],
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEry1FIDXr2v6ZEvWOn0PgOjsbsthO06JsA&s"
    },
  ];


  return (
    <>
      <Header t={t} />
      <div className='bg-gray-100 pt-14'>

        <div className="container min-h-screen mx-auto p-14 bg-white rounded-lg">
          <h1 className="text-2xl font-bold mb-4">All Specialities</h1>
          {doctors.map((doctor, idx) => (
            <Link to={`/doctor/${doctor._id}`} key={idx}>
              <DoctorCard doctor={doctor} t={t} />
            </Link>
          ))}
        </div>
        <nav aria-label="Page pagination navigation example" className='!text-center'>
          <ul className="inline-flex -space-x-px text-sm my-10 mx-auto">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              >
                {t("pagination.previous")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              >
                {t("pagination.next")}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <Footer t={t} />
    </>
  )
}



Doctors.propTypes = {
  t: PropTypes.func.isRequired,
};