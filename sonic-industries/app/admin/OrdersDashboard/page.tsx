"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import {
  X,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ShoppingCart,
  Search,
  Edit,
  Trash2,
  User,
  CreditCard,
  Package,
  MapPin,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  Truck,
} from "lucide-react";
import { OrderModelBackend, OrdersDashboardProps } from "@/types";

const OrderDetailModal = ({
  order,
  onClose,
  onUpdateStatus,
  onDelete,
}: OrdersDashboardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(order.status);
  const [editedPaymentStatus, setEditedPaymentStatus] = useState(
    order.payment_status
  );

  const handleUpdate = async () => {
    try {
      await onUpdateStatus(order._id, editedStatus, editedPaymentStatus);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this order? This action cannot be undone."
      )
    ) {
      await onDelete(order._id);
      onClose();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
            <p className="text-gray-600">Order #{order.orderNumber}</p>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Order Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Status
                </label>
                {isEditing ? (
                  <select
                    value={editedStatus}
                    onChange={(e) =>
                      setEditedStatus(
                        e.target.value as OrderModelBackend["status"]
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                {isEditing ? (
                  <select
                    value={editedPaymentStatus}
                    onChange={(e) =>
                      setEditedPaymentStatus(
                        e.target.value as OrderModelBackend["payment_status"]
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                ) : (
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(
                      order.payment_status
                    )}`}
                  >
                    {order.payment_status}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <span className="text-sm text-gray-600 capitalize">
                  {order.payment_method}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-5 h-5" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <p className="text-sm text-gray-900">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <p className="text-sm text-gray-900 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {order.customer.phone}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="text-sm text-gray-900 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {order.customer.email}
                </p>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Product Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <p className="text-sm text-gray-900">
                  {order.order_items.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <p className="text-sm text-gray-900">
                  {order.order_items.quantity}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Unit Price
                </label>
                <p className="text-sm text-gray-900">
                  ₹{order.order_items.price}
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Pricing Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Subtotal:</span>
                <span className="text-sm text-gray-900">
                  ₹{order.total_price}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Shipping Fee:</span>
                <span className="text-sm text-gray-900">
                  ₹{order.shipping_fee}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Discount:</span>
                <span className="text-sm text-red-600">-₹{order.discount}</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">₹{order.final_price}</span>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shipping Address */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Address
              </h3>
              <div className="text-sm text-gray-900 space-y-1">
                <p>
                  {order.shipping_address.firstName}{" "}
                  {order.shipping_address.lastName}
                </p>
                <p>{order.shipping_address.address}</p>
                <p>
                  {order.shipping_address.city}, {order.shipping_address.state}{" "}
                  {order.shipping_address.postalCode}
                </p>
                <p>{order.shipping_address.country}</p>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Billing Address
              </h3>
              <div className="text-sm text-gray-900 space-y-1">
                <p>
                  {order.billing_address.firstName}{" "}
                  {order.billing_address.lastName}
                </p>
                <p>{order.billing_address.address}</p>
                <p>
                  {order.billing_address.city}, {order.billing_address.state}{" "}
                  {order.billing_address.postalCode}
                </p>
                <p>{order.billing_address.country}</p>
              </div>
            </div>
          </div>

          {/* Order Dates */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Order Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Created At
                </label>
                <p className="text-sm text-gray-900">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Updated
                </label>
                <p className="text-sm text-gray-900">
                  {new Date(order.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrdersDashboard = () => {
  const [orders, setOrders] = useState<OrderModelBackend[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderModelBackend | null>(
    null
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(response.data.items || []);
    } catch {
      setError(
        "Failed to load orders. Make sure you have a GET /api/orders endpoint."
      );
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: string,
    paymentStatus: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${orderId}`,
        { status, payment_status: paymentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(
        orders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: status as OrderModelBackend["status"],
                payment_status:
                  paymentStatus as OrderModelBackend["payment_status"],
              }
            : order
        )
      );

      if (selectedOrder?._id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          status: status as OrderModelBackend["status"],
          payment_status: paymentStatus as OrderModelBackend["payment_status"],
        });
      }

      setSuccess("Order updated successfully!");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to update order");
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(orders.filter((order) => order._id !== orderId));
      setSuccess("Order deleted successfully!");

      if (selectedOrder?._id === orderId) {
        setSelectedOrder(null);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to delete order");
    }
  };

  // Filter and search logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.customer.lastName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_items.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesPaymentStatus =
      !paymentStatusFilter || order.payment_status === paymentStatusFilter;

    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Orders Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage customer orders and transactions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadAllOrders}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">{error}</span>
            <button
              onClick={clearMessages}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800">{success}</span>
            <button
              onClick={clearMessages}
              className="ml-auto text-green-600 hover:text-green-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex-1 min-w-64 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Payment Status</option>
              <option value="pending">Payment Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <span className="text-sm text-gray-600">
              {filteredOrders.length} of {orders.length} orders
            </span>
          </div>

          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
                <p className="text-gray-600">Loading orders...</p>
              </div>
            ) : paginatedOrders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No orders found</p>
              </div>
            ) : (
              paginatedOrders.map((order) => (
                <div
                  key={order._id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-medium text-gray-900">
                          #{order.orderNumber}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                            order.payment_status
                          )}`}
                        >
                          {order.payment_status}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-1">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {order.customer.firstName} {order.customer.lastName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {order.customer.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-3 h-3" />
                          {order.payment_method.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>
                          {order.order_items.name} (x
                          {order.order_items.quantity})
                        </span>
                        <span className="font-medium">
                          ₹{order.final_price}
                        </span>
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View/Edit Order"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteOrder(order._id);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Showing {(currentPage - 1) * ordersPerPage + 1} to{" "}
                {Math.min(currentPage * ordersPerPage, filteredOrders.length)}{" "}
                of {filteredOrders.length} results
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-gray-600">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={updateOrderStatus}
          onDelete={deleteOrder}
        />
      )}
    </div>
  );
};

export default OrdersDashboard;
