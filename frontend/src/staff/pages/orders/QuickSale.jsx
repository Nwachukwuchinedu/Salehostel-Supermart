import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  Banknote,
  Trash2,
} from "lucide-react";
import staffService from "../../../shared/services/staffService";
import { formatCurrency } from "../../../shared/utils/formatters";
import Button from "../../../shared/ui/components/Button";
import Input from "../../../shared/ui/components/Input";
import Badge from "../../../shared/ui/components/Badge";
import Modal from "../../../shared/ui/components/Modal";

const QuickSale = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountPaid, setAmountPaid] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await staffService.getInventory({ status: "active" });
      setProducts(response.data?.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(
      cart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getChange = () => {
    const paid = parseFloat(amountPaid) || 0;
    const total = getTotalAmount();
    return Math.max(0, paid - total);
  };

  const handleProcessSale = async () => {
    try {
      setProcessing(true);

      const orderData = {
        type: "walk_in",
        customerName: customerName || "Walk-in Customer",
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: getTotalAmount(),
        paymentMethod,
        amountPaid: parseFloat(amountPaid),
        change: getChange(),
      };

      await staffService.createWalkInOrder(orderData);

      // Reset form
      setCart([]);
      setCustomerName("");
      setAmountPaid("");
      setShowPaymentModal(false);

      alert("Sale processed successfully!");
    } catch (error) {
      console.error("Error processing sale:", error);
      alert("Error processing sale. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quick Sale</h1>
          <p className="text-gray-600">Process walk-in sales quickly</p>
        </div>
        {cart.length > 0 && (
          <Button onClick={() => setShowPaymentModal(true)}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Checkout ({cart.length})
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Search & List */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-lg font-bold text-green-600 mt-1">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <Badge
                    variant={
                      product.stock > 10
                        ? "success"
                        : product.stock > 0
                        ? "warning"
                        : "error"
                    }
                  >
                    {product.stock} in stock
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => addToCart(product)}
                    disabled={product.stock <= 0}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 h-fit">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Cart ({cart.length} items)
          </h3>

          {cart.length > 0 ? (
            <>
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(item.price)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:text-red-700 ml-2"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(getTotalAmount())}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Cart is empty</p>
              <p className="text-sm">Add products to start a sale</p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Process Payment"
      >
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name (Optional)
            </label>
            <Input
              type="text"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={paymentMethod === "cash" ? "primary" : "outline"}
                onClick={() => setPaymentMethod("cash")}
                className="flex items-center justify-center gap-2"
              >
                <Banknote className="w-4 h-4" />
                Cash
              </Button>
              <Button
                variant={paymentMethod === "card" ? "primary" : "outline"}
                onClick={() => setPaymentMethod("card")}
                className="flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Card
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount Paid
            </label>
            <Input
              type="number"
              placeholder="0.00"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">
                {formatCurrency(getTotalAmount())}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-medium">
                {formatCurrency(parseFloat(amountPaid) || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
              <span>Change:</span>
              <span
                className={getChange() >= 0 ? "text-green-600" : "text-red-600"}
              >
                {formatCurrency(getChange())}
              </span>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowPaymentModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleProcessSale}
              disabled={processing || parseFloat(amountPaid) < getTotalAmount()}
            >
              {processing ? "Processing..." : "Complete Sale"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuickSale;
