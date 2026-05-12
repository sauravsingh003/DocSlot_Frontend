import React, { useEffect, useState } from "react";
import axios from "../config/api";

export default function HealthCheck() {
  const [status, setStatus] = useState("Checking...");
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    const checkHealth = async () => {
      setApiUrl(process.env.VITE_API_BASE_URL);
      
      try {
        console.log("Testing connection to:", process.env.VITE_API_BASE_URL);
        
        const response = await axios.get("/", {
          timeout: 5000,
        });
        setStatus("✅ Backend is ONLINE and responding");
      } catch (error) {
        if (error.code === "ECONNABORTED") {
          setStatus("❌ Backend TIMEOUT - Server not responding (check if running)");
        } else if (error.code === "ECONNREFUSED") {
          setStatus("❌ Backend CONNECTION REFUSED - Server not running on this port");
        } else if (error.message === "Network Error") {
          setStatus("❌ NETWORK ERROR - Backend unreachable");
        } else {
          setStatus(`❌ Error: ${error.message}`);
        }
        console.error("Health check error:", error.message);
      }
    };

    checkHealth();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Backend Health Check</h1>
      <p>API URL: <strong>{apiUrl}</strong></p>
      <p style={{ fontSize: "18px", marginTop: "20px" }}>Status: <strong>{status}</strong></p>
      
      <hr />
      
      <h3>🔍 Troubleshooting:</h3>
      <ul>
        <li>
          <strong>If you see "CONNECTION REFUSED":</strong>
          <br />Backend server is NOT running on localhost:8080
          <br />Start your backend server first
        </li>
        <li>
          <strong>If you see "TIMEOUT":</strong>
          <br />Backend server is running but not responding
          <br />Check backend logs for errors
        </li>
        <li>
          <strong>If you see "NETWORK ERROR":</strong>
          <br />Network connectivity issue
          <br />Check firewall settings
        </li>
      </ul>
      
      <p style={{ marginTop: "20px", color: "#666" }}>
        Open browser console (F12) to see detailed error logs
      </p>
    </div>
  );
}
