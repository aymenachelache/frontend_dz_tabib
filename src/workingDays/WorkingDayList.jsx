import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";

export const WorkingDaysList = ({ t }) => {
  const [workingDays, setWorkingDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch working days from the backend
  useEffect(() => {
    const fetchWorkingDays = async () => {
      const token = Cookies.get("authToken");
      if (!token) {
        setError("Token not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/working-days/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWorkingDays(response.data);
        console.log(response.data)
      } catch (err) {
        setError("Error fetching working days.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkingDays();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editwokringdays/${id}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <>
      <Header t={t} />
      <div className="container mx-auto p-8">
        <div className="my-3 flex flex-col justify-between items-center md:flex-row">
          <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">
            Working Days List
          </h1>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            <Link to={`/addworkingday`}><p className="cursor-pointer hover:text-black">Add Working Day</p></Link>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-primary text-white">
                <th className="border px-6 py-3 text-left">Day of the Week</th>
                <th className="border px-6 py-3 text-left">Daily Appointment Limit</th>
                <th className="border px-6 py-3 text-left">Start Time</th>
                <th className="border px-6 py-3 text-left">End Time</th>
                <th className="border px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workingDays.map((day, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-6 py-4 text-left">{day.day_of_week}</td>
                  <td className="border px-6 py-4 text-left">{day.daily_appointment_limit}</td>
                  <td className="border px-6 py-4 text-left">{day.hours[0].start_time}</td>
                  <td className="border px-6 py-4 text-left">{day.hours[0].end_time}</td>
                  <td className="border px-6 py-4 text-left">
                    <button
                      onClick={() => handleEdit(day.day_id)}
                      className="text-blue-500 hover:text-white px-4 py-2 rounded-lg border border-blue-500 hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer t={t} />
    </>
  );
};

WorkingDaysList.propTypes = {
  t: PropTypes.func.isRequired,
};
