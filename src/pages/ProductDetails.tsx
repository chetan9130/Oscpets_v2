import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowLeft, Zap, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API = "http://127.0.0.1:3001";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() =>
        toast({
          title: "Product not found",
          variant: "destructive",
        })
      )
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.find((i: any) => i._id === product._id);

    if (exists) exists.qty += 1;
    else cart.push({ ...product, qty: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    toast({ title: "Added to cart 🛒" });
  };

  if (loading) return <p className="p-8">Loading...</p>;
  if (!product) return null;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </Button>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* IMAGE */}
        <div className="bg-muted rounded-xl overflow-hidden">
          {product.imageUrl ? (
            <img
              src={`${API}/${product.imageUrl}`}
              className="w-full h-96 object-cover"
            />
          ) : (
            <div className="h-96 flex items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <Badge>{product.category}</Badge>

          <p className="text-muted-foreground">{product.description}</p>

          <p className="text-2xl font-bold">₹{product.price}</p>

          <p className="text-sm text-muted-foreground">
            Stock: {product.stock}
          </p>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={addToCart}>
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart
            </Button>

            <Button onClick={() => navigate("/cart")}>
              <Zap className="w-4 h-4 mr-1" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
