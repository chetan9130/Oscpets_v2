import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Package, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:3001";

interface Product {
  _id: string;
  vendorId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  qty?: number;
}

const PetStore = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  /* ================= CART STORAGE ================= */

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    axios
      .get(`${API}/products`)
      .then((res) => setProducts(res.data))
      .catch(() =>
        toast({
          title: "Failed to load products",
          variant: "destructive",
        })
      );
  }, []);

  /* ================= ADD TO CART ================= */

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast({ title: "Out of stock", variant: "destructive" });
      return;
    }

    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }

    toast({ title: "Added to cart 🛒" });
  };

  /* ================= BUY NOW ================= */

  const buyNow = (product: Product) => {
    if (product.stock <= 0) {
      toast({ title: "Out of stock", variant: "destructive" });
      return;
    }

    localStorage.setItem("cart", JSON.stringify([{ ...product, qty: 1 }]));
    navigate("/cart");
  };

  /* ================= UI ================= */

  return (
    <div className="p-8 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">🐾 Pet Store</h1>

        <Button variant="outline" onClick={() => navigate("/cart")}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart ({cart.reduce((sum, i) => sum + (i.qty || 1), 0)})
        </Button>
      </div>

      {/* PRODUCTS */}
      {products.length === 0 ? (
        <div className="text-center text-muted-foreground mt-12">
          <Package className="w-16 h-16 mx-auto mb-4" />
          No products available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card
              key={product._id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              {/* IMAGE */}
              <div className="h-40 bg-muted flex items-center justify-center">
                {product.imageUrl ? (
                  <img
                    src={`${API}/${product.imageUrl}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="w-10 h-10 text-muted-foreground" />
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold line-clamp-1">
                  {product.name}
                </h3>

                <Badge>{product.category}</Badge>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="font-bold">₹{product.price}</span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add
                  </Button>

                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      buyNow(product);
                    }}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Buy
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Stock: {product.stock}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetStore;
