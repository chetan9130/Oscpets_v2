import { useState } from "react";
import axios from "axios";
import { IndianRupee, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:3001";

const Checkout = () => {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    if (!name || !phone || !address) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post('${API}/orders/checkout', {
        cart,
        customer: {
          name,
          phone,
          address,
        },
      });

      localStorage.removeItem("cart");
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center text-lg">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Checkout</h1>

      {/* Cart Summary */}
      <Card className="p-4 space-y-2">
        {cart.map((item: any, i: number) => (
          <div key={i} className="flex justify-between">
            <span>{item.name} × {item.qty}</span>
            <span className="font-semibold">₹{item.price * item.qty}</span>
          </div>
        ))}

        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4" /> {totalAmount}
          </span>
        </div>
      </Card>

      {/* Customer Info */}
      <Card className="p-4 space-y-3">
        <Input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
        <Input placeholder="Delivery Address" value={address} onChange={e => setAddress(e.target.value)} />
      </Card>

      {/* Place Order */}
      <Button
        className="w-full h-12 text-lg"
        onClick={placeOrder}
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin" /> : "Place Order"}
      </Button>
    </div>
  );
};

export default Checkout;
