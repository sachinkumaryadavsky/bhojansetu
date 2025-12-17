import { useEffect, useState } from "react";
import api from "../api/axios";
import { getMyFoods , getReservationRequests } from "../api/auth.ts";
interface Food {
  id: number;
  title: string;
  quantity: number;
  status: string;
  expiry_time: string;
}

interface ReservationRequest {
  id: number;
  ngo_id: number;
  status: string;
  creatred_at: string;
}

const RestaurantDashboard = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedFoodId, setSelectedFoodId] = useState<number | null>(null);
  const [requests, setRequests] = useState<ReservationRequest[]>([]);
  const [loading, setLoading] = useState(false);

  // 1️ Fetch foods posted by restaurant
  useEffect(() => {
    fetchMyFoods();
  }, []);

  const fetchMyFoods = async () => {
    try {
      const res = await getMyFoods();
      setFoods(res.data.data);
    } catch (error) {
      console.error("Error fetching foods", error);
    }
  };

  // 2️ Fetch reservation requests for a food
  const fetchRequests = async (foodId: number) => {
    try {
      setLoading(true);
      setSelectedFoodId(foodId);
      const res = await getReservationRequests(foodId);
      setRequests(res.data.data || []);
    } catch (error) {
      console.error("Error fetching requests", error);
    } finally {
      setLoading(false);
    }
  };

  // 3 .Approve / Deny reservation
  const updateReservationStatus = async (
    reservationId: number,
    status: "APPROVED" | "DENIED"
  ) => {
    try {
      await api.patch(`/reservation/${reservationId}/status`, { status });

      // refresh requests after action
      if (selectedFoodId) {
        fetchRequests(selectedFoodId);
      }
    } catch (error) {
      console.error("Error updating reservation", error);
    }
  };

  return (
    <div>
      <h2>Restaurant Dashboard</h2>

      {/* 🔹 My Foods */}
      <h3>My Posted Foods</h3>

      {foods.length === 0 && <p>No food posted yet.</p>}

      {foods.map((food) => (
        <div
          key={food.id}
          style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
        >
          <h4>{food.title}</h4>
          <p>Quantity: {food.quantity}</p>
          <p>Status: {food.status}</p>
          <p>
            Expiry: {new Date(food.expiry_time).toLocaleString()}
          </p>

          <button onClick={() => fetchRequests(food.id)}>
            View Requests
          </button>
        </div>
      ))}

      {/* 🔹 Reservation Requests */}
      {selectedFoodId && (
        <>
          <h3>Reservation Requests</h3>

          {loading && <p>Loading requests...</p>}

          {!loading && requests.length === 0 && (
            <p>No pending reservation requests.</p>
          )}

          {requests.map((req) => (
            <div
              key={req.id}
              style={{
                border: "1px solid #999",
                padding: "8px",
                marginBottom: "8px",
              }}
            >
              <p>NGO: {req.ngo_id}</p>
              <p>
                Requested At:{" "}
                {new Date(req.creatred_at).toLocaleString()}
              </p>

              <button
                onClick={() =>
                  updateReservationStatus(req.id, "APPROVED")
                }
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateReservationStatus(req.id, "DENIED")
                }
                style={{ marginLeft: "10px" }}
              >
                Deny
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RestaurantDashboard;
