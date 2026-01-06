import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const API = "http://127.0.0.1:3001";

interface Order {
  _id: string;
  customer: {
    userId: string;
    name: string;
    phone: string;
    address: string;
  };
  items: {
    name: string;
    price: number;
    qty: number;
  }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const UserOrders = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    axios
      .get(`${API}/orders/user/${user._id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Order fetch error:", err))
      .finally(() => setLoading(false));
  }, [user?._id]);

  if (!user?._id) {
    return <p className="p-8">Please login to view orders</p>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">📦 My Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((o) => (
          <Card key={o._id} className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">
                Order #{o._id.slice(-6)}
              </span>
              <Badge className={statusColors[o.status] || ""}>
                {o.status}
              </Badge>
            </div>

            <p><b>Name:</b> {o.customer.name}</p>
            <p><b>Phone:</b> {o.customer.phone}</p>
            <p><b>Address:</b> {o.customer.address}</p>

            <div className="border-t pt-2 space-y-1">
              {o.items.map((i, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{i.name} × {i.qty}</span>
                  <span>₹{i.price * i.qty}</span>
                </div>
              ))}
            </div>

            <div className="text-right font-bold">
              Total: ₹{o.totalAmount}
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default UserOrders;
