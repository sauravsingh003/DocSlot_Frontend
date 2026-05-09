import React, { useEffect, useState } from "react";
import axios from "../config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";
import { useNavigate } from "react-router-dom";

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

 

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get(
          `/patient/getAppointmentsByPatientId/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
       
      }
    }
    fetchAppointments();
  }, []);

  // Function to download prescription
  const handleDownload = async (appointmentId) => {
    try {
      const response = await axios.get(
        `/patient/download/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
          responseType: "blob",
        }
      );

      // Create a download link for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Prescription_${appointmentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Prescription downloaded successfully!");
    } catch (error) {
      console.error("Error downloading prescription:", error);
      toast.error("Failed to download prescription.");
    }
  };

  // Function to handle payment
  const handlePayment = (appointmentId, amount) => {
    navigate(`/payment/${appointmentId}/${amount}`);
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="container mt-5">
        <ToastContainer />
        <h2 className="text-center mb-4 text-primary">Your Appointments</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Doctor Phone</th>
                <th>Appointment Date</th>
                <th>Disease Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt.appointmentDate + appt.doctorName}>
                    <td>{appt.doctorName}</td>
                    <td>{appt.doctorSpecialization}</td>
                    <td>{appt.doctorPhone}</td>
                    <td>{appt.appointmentDate}</td>
                    <td>{appt.diseaseDescription}</td>
                    <td>{appt.amount}</td>
                    <td>{appt.status}</td>
                    <td>
                      {appt.paymentStatus === "PAID" ? (
                        <span className="badge bg-success">PAID</span>
                      ) : (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handlePayment(appt.id, appt.amount)}
                          disabled={appt.status !== "ACCEPTED"} // Disable if not ACCEPTED
                        >
                          Pay Now
                        </button>
                      )}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleDownload(appt.id)}
                        disabled={
                          appt.status !== "ACCEPTED" ||
                          appt.paymentStatus !== "PAID"
                        } // Disable if not ACCEPTED or not PAID
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewAppointments;
