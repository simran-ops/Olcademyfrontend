import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ORDER_API_END_POINT } from '../api/constant';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  ShoppingBag,
  Eye,
  Download,
  MapPin,
  Sparkles,
} from 'lucide-react';
import Header from './common/Header';
import Footer from './common/Footer';

const Orders = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,
    hasNext: false,
    hasPrev: false,
  });

  const fetchOrders = async (page = 1, limit = 10) => {
    if (!user?.email) return;
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${ORDER_API_END_POINT}/email/${user.email}`, {
        params: { page, limit },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
        setPagination(response.data.pagination);
      } else {
        setError(response.data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email && !authLoading) {
      fetchOrders(pagination.currentPage);
    }
  }, [user, authLoading]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchOrders(newPage);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getStatusInfo = (status) => {
    if (!status) return {
      color: 'bg-gray-500',
      textColor: 'text-gray-700',
      bgColor: 'bg-gray-50 border-gray-100',
      icon: Package,
      badge: 'Pending',
    };
    switch (status.toLowerCase()) {
      case 'delivered':
        return {
          color: 'bg-emerald-500',
          textColor: 'text-emerald-700',
          bgColor: 'bg-emerald-50 border-emerald-100',
          icon: CheckCircle,
          badge: 'Delivered',
        };
      case 'cancelled':
      case 'refunded':
        return {
          color: 'bg-red-500',
          textColor: 'text-red-700',
          bgColor: 'bg-red-50 border-red-100',
          icon: XCircle,
          badge: 'Cancelled',
        };
      case 'shipped':
        return {
          color: 'bg-[#431A06]',
          textColor: 'text-[#431A06]',
          bgColor: 'bg-[#F8F6F3] border-[#431A06]/20',
          icon: Truck,
          badge: 'Shipped',
        };
      case 'processing':
        return {
          color: 'bg-amber-500',
          textColor: 'text-amber-700',
          bgColor: 'bg-amber-50 border-amber-100',
          icon: Clock,
          badge: 'Processing',
        };
      default:
        return {
          color: 'bg-[#431A06]',
          textColor: 'text-[#431A06]',
          bgColor: 'bg-[#F8F6F3] border-[#431A06]/20',
          icon: Package,
          badge: 'Pending',
        };
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleDownloadInvoice = async (orderNumber) => {
    try {
      const res = await fetch(`${ORDER_API_END_POINT}/${orderNumber}/invoice`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!res.ok) throw new Error('Failed to download invoice');
      const disposition = res.headers.get('Content-Disposition');
      const filename =
        disposition?.match(/filename="?([^"]+)"?/)?.[1] || `invoice-${orderNumber}.pdf`;
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      alert('Error downloading invoice');
    }
  };

  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F8F6F3] dark:bg-[#0d0603] flex flex-col font-sans text-[#431A06] dark:text-gray-200">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 p-12"
          >
            <div className="relative">
              <div className="w-12 h-12 border-2 border-[#431A06]/10 dark:border-white/10 rounded-full"></div>
              <div className="w-12 h-12 border-2 border-[#431A06] dark:border-[#f6d110] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <div className="text-xl font-bold text-[#431A06] dark:text-[#f6d110]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Loading your orders...
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8F6F3] dark:bg-[#0d0603] flex flex-col font-sans text-[#431A06] dark:text-gray-200 font-medium">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-16 bg-white dark:bg-[#1a1410] border border-[#431A06]/10 dark:border-[#f6d110]/10 rounded-2xl shadow-xl max-w-lg relative overflow-hidden"
          >
            <div className="text-7xl mb-10">🕯️</div>
            <h2 className="text-4xl font-bold text-[#431A06] dark:text-[#f6d110] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Authentication Required
            </h2>
            <p className="text-lg text-[#7E513A] dark:text-gray-400 mb-10 leading-relaxed font-medium">
              Join our exclusive circle to track your luxury fragrance collection and manage your artisan orders.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-3 bg-[#431A06] dark:bg-[#f6d110] dark:text-[#431A06] text-white font-bold px-10 py-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-widest text-xs"
            >
              <ShoppingBag className="w-5 h-5" /> Access Your Account
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F3] dark:bg-[#0d0603] flex flex-col font-sans text-[#431A06] dark:text-gray-200">
      <Header />
      <div className="flex-1">
        <motion.section
          variants={fadeInVariant}
          initial="hidden"
          animate="show"
          className="py-12 px-6 border-b border-[#431A06]/10 bg-[#F8F6F3] dark:bg-[#0d0603]"
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#431A06] dark:text-[#f6d110] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                My Orders
              </h1>
              <p className="text-lg text-[#7E513A] dark:text-gray-400 leading-relaxed max-w-xl mx-auto font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Manage your premium fragrance purchases and track your journey through scent.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <div className="max-w-7xl mx-auto px-6 pb-12">
          {/* Stats Section */}
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            // className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              // className="group sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-[#F5E9DC] to-[#E7DDC6] dark:from-[#3d1a0a] dark:to-[#2c0f06] border border-[#79300f]/20 dark:border-[#f6d110]/30 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            {[
              {
                label: 'Total Orders',
                value: pagination.totalOrders,
                icon: Package,
                color: 'bg-[#431A06]',
                accent: 'border-[#431A06]/10'
              },
              {
                label: 'Delivered',
                value: orders.filter((o) => o.status === 'delivered').length,
                icon: CheckCircle,
                color: 'bg-emerald-600',
                accent: 'border-emerald-100'
              },
              {
                label: 'In Progress',
                value: orders.filter((o) => ['processing', 'shipped'].includes(o.status)).length,
                icon: Truck,
                color: 'bg-amber-600',
                accent: 'border-amber-100'
              }
            ].map((stat, i) => (
              <div
                key={i}
                className={`bg-white/60 backdrop-blur-sm dark:bg-[#1a1410] border ${stat.accent} rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(67,26,6,0.05)] hover:shadow-lg transition-all duration-500 flex items-center gap-6 group scale-95 hover:scale-100`}
              >
                <div className={`p-3.5 ${stat.color} rounded-xl shadow-sm`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#431A06] dark:text-[#f6d110]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#7E513A] dark:text-gray-400 font-bold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Orders List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {orders.length > 0 ? (
                orders.map((order, index) => {
                  const statusInfo = getStatusInfo(order.status);
                  const StatusIcon = statusInfo.icon;
                  return (
                    <motion.div
                      key={order.orderNumber}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white dark:bg-[#1a1410] border border-[#431A06]/10 dark:border-[#f6d110]/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
                    >
                      <div className="p-4 border-b border-gray-50 dark:border-gray-800/50">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`p-1.5 rounded-lg ${statusInfo.bgColor} ${statusInfo.textColor}`}
                            >
                              <StatusIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-[#431A06] dark:text-[#f6d110]" style={{ fontFamily: 'Playfair Display, serif' }}>
                                #{order.orderNumber}
                              </h3>
                              <p className="text-gray-400 dark:text-gray-500 text-[10px] font-semibold uppercase tracking-wider">
                                {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${statusInfo.bgColor} ${statusInfo.textColor}`}
                          >
                            {statusInfo.badge}
                          </div>
                        </div>

                        <div className="flex justify-between items-end">
                          <p className="text-xl font-bold text-[#431A06] dark:text-[#f6d110]">
                            ${order.pricing.total.toFixed(2)}
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">
                            {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-3 mb-4">
                          {order.items.slice(0, 2).map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 group/item text-xs"
                            >
                              <div className="w-10 h-10 bg-[#F8F6F3] dark:bg-[#2c1d12] rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800/50 p-1 flex items-center justify-center shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-[#431A06] dark:text-gray-200 truncate leading-tight">
                                  {item.name}
                                </p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                                  Qty: {item.quantity} • ${item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div className="flex items-center gap-2 pt-1 font-bold">
                              <div className="w-10 flex justify-center shrink-0">
                                <span className="text-[9px] text-gray-400 bg-gray-50 dark:bg-[#2c1d12] dark:text-gray-500 w-7 h-7 rounded-full flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-700">
                                  +{order.items.length - 2}
                                </span>
                              </div>
                              <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                                More items
                              </span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleViewDetails(order)}
                          className="w-full bg-[#431A06] dark:bg-[#f6d110] dark:text-[#431A06] text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Details
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-full py-16 px-6 text-center bg-white/50 dark:bg-black/20 rounded-3xl border border-dashed border-[#431A06]/20 dark:border-white/10"
                >
                  <div className="w-16 h-16 bg-white dark:bg-[#1a1410] rounded-full shadow-lg flex items-center justify-center mx-auto mb-5">
                    <ShoppingBag className="w-8 h-8 text-[#431A06]/20 dark:text-white/20" />
                  </div>
                  <h3 className="text-xl font-bold text-[#431A06] dark:text-[#f6d110] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    No active orders found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6 font-medium text-[11px]">
                    You haven't placed any orders with us yet. Explore our exquisite collection and find your signature scent.
                  </p>
                  <Link
                    to="/all-fragrances"
                    className="inline-flex items-center gap-2 bg-[#431A06] dark:bg-[#f6d110] dark:text-[#431A06] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-widest text-[9px]"
                  >
                    Start Shopping
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Pagination */}
          {!loading && !error && orders.length > 0 && pagination.totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 p-5 bg-gradient-to-br from-[#F5E9DC] to-[#E7DDC6] dark:from-[#3d1a0a] dark:to-[#2c0f06] border border-[#79300f]/20 dark:border-[#f6d110]/30 rounded-lg shadow"
            >
              <div className="text-[#5a2408] dark:text-[#d4af37] text-xs">
                Showing {(pagination.currentPage - 1) * 10 + 1} to{' '}
                {Math.min(pagination.currentPage * 10, pagination.totalOrders)} of{' '}
                {pagination.totalOrders} orders
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-br from-[#F5E9DC] to-[#E7DDC6] dark:from-[#3d1a0a] dark:to-[#2c0f06] border border-[#79300f]/20 dark:border-[#d4af110]/30 text-[#79300f] dark:text-[#d4af110] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow transition-all duration-200 text-xs font-medium"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-lg font-bold transition-all duration-200 text-xs ${pageNum === pagination.currentPage ? 'bg-gradient-to-r from-[#79300f] to-[#5a2408] text-white shadow dark:from-[#f6d110] dark:to-[#d4af37]' : 'bg-gradient-to-br from-[#F5E9DC] to-[#E7DDC6] dark:from-[#3d1a0a] dark:to-[#2c0f06] border border-[#79300f]/20 dark:border-[#d4af110]/30 text-[#79300f] dark:text-[#d4af110] hover:shadow'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-br from-[#F5E9DC] to-[#E7DDC6] dark:from-[#3d1a0a] dark:to-[#2c0f06] border border-[#79300f]/20 dark:border-[#d4af110]/30 text-[#79300f] dark:text-[#d4af110] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow transition-all duration-200 text-xs font-medium"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Order Details Modal */}
          <AnimatePresence>
            {showOrderDetails && selectedOrder && (() => {
              const statusInfo = getStatusInfo(selectedOrder.status);
              const StatusIcon = statusInfo.icon;
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
                  onClick={() => setShowOrderDetails(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#F8F6F3] dark:bg-[#0d0603] border border-[#431A06]/10 dark:border-[#f6d110]/10 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto relative rounded-2xl"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-xl font-bold text-[#431A06] dark:text-[#f6d110] mb-0.5" style={{ fontFamily: 'Playfair Display, serif' }}>
                            Order Details
                          </h2>
                          <p className="text-[#7E513A] dark:text-gray-500 font-bold uppercase tracking-widest text-[9px]">
                            Reference: #{selectedOrder.orderNumber}
                          </p>
                        </div>
                        <button
                          onClick={() => setShowOrderDetails(false)}
                          className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all text-[#431A06] dark:text-gray-400"
                        >
                          <span className="text-xl leading-none">&times;</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <h3 className="text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-1.5">
                            Date Placed
                          </h3>
                          <p className="text-[#431A06] dark:text-gray-300 font-bold text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            {new Date(selectedOrder.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric', month: 'short', day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-1.5">
                            Status
                          </h3>
                          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                            <StatusIcon size={10} />
                            {statusInfo.badge}
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-3">
                          Items Purchased
                        </h3>
                        <div className="space-y-3">
                          {selectedOrder.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-3 bg-white dark:bg-[#1a1410] border border-gray-50 dark:border-gray-800/50 rounded-xl"
                            >
                              <div className="w-12 h-12 bg-[#F8F6F3] dark:bg-[#2c1d12] rounded-lg p-1.5 flex items-center justify-center border border-gray-50 dark:border-gray-800/50">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-[#431A06] dark:text-gray-200 mb-0.5 text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
                                  {item.name}
                                </h4>
                                <p className="text-[10px] text-[#7E513A] dark:text-gray-500 font-semibold">
                                  ${item.price.toFixed(2)} × {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-[#431A06] dark:text-[#f6d110] text-sm">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#431A06] text-white p-6 rounded-2xl mb-6 shadow-lg">
                        <h3 className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em] mb-4">
                          Payment Summary
                        </h3>
                        <div className="space-y-3 text-xs font-medium">
                          <div className="flex justify-between items-center text-white/80">
                            <span>Subtotal</span>
                            <span>${selectedOrder.pricing.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-white/80">
                            <span>Shipping</span>
                            <span>${selectedOrder.pricing.shipping.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-white/80">
                            <span>Tax</span>
                            <span>${selectedOrder.pricing.tax.toFixed(2)}</span>
                          </div>
                          {selectedOrder.pricing.discount > 0 && (
                            <div className="flex justify-between items-center text-emerald-400">
                              <span>Discount</span>
                              <span>-${selectedOrder.pricing.discount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="border-t border-white/10 pt-3 mt-1.5">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold">Total</span>
                              <span className="text-xl font-bold text-[#f6d110]">
                                ${selectedOrder.pricing.total.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          className="flex-1 bg-white dark:bg-gray-800 border border-[#431A06]/10 dark:border-gray-700 text-[#431A06] dark:text-[#f6d110] font-bold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
                          onClick={() => handleDownloadInvoice(selectedOrder.orderNumber)}
                        >
                          <Download className="w-3.5 h-3.5" />
                          Invoice
                        </button>
                        <button
                          className="flex-1 bg-[#431A06] dark:bg-[#f6d110] dark:text-[#431A06] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
                          onClick={() => setShowOrderDetails(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
