import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:3001";

interface CartItem {
  _id: string;
  vendorId: string;
  name: string;
  price: number;
  qty: number;
}

interface Address {
  _id: string;
  label: string;
  address: string;
}

const Cart = () => {
  const { toast } = useToast();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const navigate = useNavigate();

  // Load cart & addresses
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));

    if (user?._id) {
      axios
        .get(`${API}/users/${user._id}/addresses`)
        .then((res) => setAddresses(res.data))
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQty = (id: string, change: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i._id === id ? { ...i, qty: Math.max(1, i.qty + change) } : i
      )
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  const addAddress = async () => {
    if (!newAddress) return;

    try {
      const res = await axios.post(`${API}/users/${user._id}/addresses`, {
        label: "Home",
        address: newAddress,
      });

      setAddresses(res.data);
      setNewAddress("");
      toast({ title: "Address added" });
    } catch (err: any) {
      toast({
        title: err.response?.data?.error || "Address error",
        variant: "destructive",
      });
    }
  };

  // ✅ FIXED CHECKOUT
const checkout = async () => {
  if (!selectedAddress) {
    toast({ title: "Select an address", variant: "destructive" });
    return;
  }

  if (!user?._id) {
    toast({ title: "User not logged in", variant: "destructive" });
    return;
  }

  try {
    await axios.post(`${API}/orders/checkout`, {
      userId: user._id,
      customer: {
        name: `${user.firstName} ${user.lastName}`,
        phone: user.phone,
        address: selectedAddress,
      },
      cart: cart.map(i => ({
        productId: i._id,
        vendorId: i.vendorId,
        name: i.name,
        price: i.price,
        qty: i.qty,
      })),
    });

    localStorage.removeItem("cart");
    setCart([]);
    toast({ title: "Order placed successfully 🎉" });
    navigate("/myorders");

  } catch (err: any) {
    console.error(err);
    toast({
      title: err.response?.data?.error || "Checkout failed",
      variant: "destructive",
    });
  }
};


  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">🛒 Cart</h1>

      {cart.map((item) => (
        <Card key={item._id} className="p-4 flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>₹{item.price}</p>
          </div>

          <div className="flex gap-2 items-center">
            <Button size="icon" onClick={() => updateQty(item._id, -1)}>
              <Minus size={14} />
            </Button>
            {item.qty}
            <Button size="icon" onClick={() => updateQty(item._id, 1)}>
              <Plus size={14} />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => removeItem(item._id)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </Card>
      ))}

      {/* Address Section */}
      <Card className="p-4 space-y-3">
        <h3 className="font-semibold">Select Address</h3>

        {addresses.map((a) => (
          <label key={a._id} className="flex gap-2 items-center">
            <input
              type="radio"
              name="address"
              onChange={() => setSelectedAddress(a.address)}
            />
            {a.address}
          </label>
        ))}

        {addresses.length < 3 && (
          <>
            <textarea
              className="input"
              placeholder="Add new address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
            <Button onClick={addAddress}>Add Address</Button>
          </>
        )}
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: ₹{total}</h2>
        <Button onClick={checkout}>Place Order</Button>
      </div>
    </div>
  );
};

export default Cart;
