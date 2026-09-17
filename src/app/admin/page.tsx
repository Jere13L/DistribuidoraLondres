'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Package,
  Layers,
  Settings,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  LogOut,
  Check,
  X,
  Upload,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  ShieldCheck,
  AlertTriangle,
  Inbox,
} from 'lucide-react';
import { Product, Category, SiteSettings, Inquiry } from '@/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'inquiries' | 'settings'>('products');

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'pending' | 'contacted'>('all');
  const [deletingInquiryId, setDeletingInquiryId] = useState<string | null>(null);

  // Modals
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Product Form State
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategorySlug, setFormCategorySlug] = useState('');
  const [formBrandName, setFormBrandName] = useState('');
  const [formPresentation, setFormPresentation] = useState('');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formImages, setFormImages] = useState<string[]>(['']);
  const [formInStock, setFormInStock] = useState(true);
  const [formIsNew, setFormIsNew] = useState(false);
  const [formSpecs, setFormSpecs] = useState<{ key: string; value: string }[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Category Form & Modal State
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
  const [catFormTitle, setCatFormTitle] = useState('');
  const [catFormSlug, setCatFormSlug] = useState('');
  const [catFormDescription, setCatFormDescription] = useState('');
  const [catFormImage, setCatFormImage] = useState('');
  const [uploadingCatImage, setUploadingCatImage] = useState(false);
  const [saveCatLoading, setSaveCatLoading] = useState(false);

  // 1. Verificar Autenticación
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        if (!data.authenticated) {
          router.push('/admin/login');
        } else {
          setAuthChecked(true);
          loadAllData();
        }
      } catch {
        router.push('/admin/login');
      }
    }
    checkAuth();
  }, [router]);

  // 2. Cargar Datos
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [pRes, cRes, sRes, iRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
        fetch('/api/admin/settings'),
        fetch('/api/admin/inquiries'),
      ]);

      const [pData, cData, sData, iData] = await Promise.all([
        pRes.json(),
        cRes.json(),
        sRes.json(),
        iRes.ok ? iRes.json() : [],
      ]);

      setProducts(pData);
      setCategories(cData);
      setSettings(sData);
      setInquiries(iData);
    } catch (err) {
      console.error('Error cargando datos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleInquiryStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'contacted' : 'pending';
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries);
        notify(newStatus === 'contacted' ? 'Consulta marcada como contactada' : 'Consulta marcada como pendiente');
      }
    } catch {
      notify('Error al actualizar estado', 'error');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries);
        setDeletingInquiryId(null);
        notify('Consulta eliminada del registro');
      }
    } catch {
      notify('Error al eliminar consulta', 'error');
    }
  };

  const notify = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  // 3. Logout
  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  // 4. Abrir Modal para Crear o Editar Producto
  const handleOpenProductModal = (prod?: Product) => {
    if (prod) {
      setEditingProduct(prod);
      setFormName(prod.name);
      setFormSku(prod.sku);
      setFormCategorySlug(prod.category?.slug || categories[0]?.slug || '');
      setFormBrandName(prod.brand?.name || '');
      setFormPresentation(prod.presentation || 'Unidad');
      setFormShortDesc(prod.shortDescription || '');
      setFormDesc(prod.description || '');
      setFormImages(prod.images && prod.images.length > 0 ? prod.images : ['']);
      setFormInStock(prod.inStock);
      setFormIsNew(prod.isNew || false);
      setFormSpecs(prod.specifications && prod.specifications.length > 0 ? prod.specifications.map((s) => ({ ...s })) : []);
    } else {
      setEditingProduct(null);
      setFormName('');
      setFormSku(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
      setFormCategorySlug(categories[0]?.slug || '');
      setFormBrandName('Wahl');
      setFormPresentation('Caja x 1 unidad');
      setFormShortDesc('');
      setFormDesc('');
      setFormImages(['']);
      setFormInStock(true);
      setFormIsNew(false);
      setFormSpecs([]);
    }
    setProductModalOpen(true);
  };

  const handleAddSpec = () => {
    setFormSpecs((prev) => [...prev, { key: '', value: '' }]);
  };

  const handleQuickAddSpec = (presetKey: string) => {
    setFormSpecs((prev) => {
      if (prev.some((s) => s.key.toLowerCase() === presetKey.toLowerCase())) {
        return prev;
      }
      return [...prev, { key: presetKey, value: '' }];
    });
  };

  const handleUpdateSpec = (index: number, field: 'key' | 'value', val: string) => {
    setFormSpecs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  const handleRemoveSpec = (index: number) => {
    setFormSpecs((prev) => prev.filter((_, i) => i !== index));
  };


  // 5. Subida de Imagen
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setFormImages([data.url, ...formImages.filter((img) => img.trim() !== '')]);
        notify('Imagen subida correctamente');
      } else {
        notify('Error al subir imagen', 'error');
      }
    } catch {
      notify('Error al conectar con servidor de subida', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // 6. Guardar Producto (POST o PUT)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    const selectedCategoryObj = categories.find((c) => c.slug === formCategorySlug) || {
      _id: `cat-${formCategorySlug}`,
      title: formCategorySlug,
      slug: formCategorySlug,
    };

    const payload = {
      _id: editingProduct?._id,
      name: formName,
      sku: formSku,
      category: selectedCategoryObj,
      brand: { _id: `brand-${formBrandName.toLowerCase()}`, name: formBrandName },
      presentation: formPresentation,
      shortDescription: formShortDesc,
      description: formDesc,
      images: formImages.filter((img) => img.trim() !== ''),
      inStock: formInStock,
      isNew: formIsNew,
      specifications: formSpecs.filter((s) => s.key.trim() !== '' && s.value.trim() !== ''),
    };

    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        notify(editingProduct ? 'Producto actualizado' : 'Producto creado con éxito');
        setProductModalOpen(false);
        loadAllData();
      } else {
        notify('Error al guardar el producto', 'error');
      }
    } catch {
      notify('Error de red al guardar', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  // 7. Toggle rápido de Stock en la tabla
  const handleToggleStock = async (prod: Product) => {
    try {
      const updated = { ...prod, inStock: !prod.inStock };
      await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      setProducts(products.map((p) => (p._id === prod._id ? updated : p)));
      notify(`Stock de "${prod.name}" ${updated.inStock ? 'activado' : 'desactivado'}`);
    } catch {
      notify('Error al cambiar stock', 'error');
    }
  };

  // 8. Eliminar Producto
  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
        notify('Producto eliminado correctamente');
      } else {
        notify('No se pudo eliminar', 'error');
      }
    } catch {
      notify('Error de conexión', 'error');
    } finally {
      setDeletingProductId(null);
    }
  };

  // 8.1 Abrir Modal de Categoría
  const handleOpenCategoryModal = (cat?: Category) => {
    if (cat) {
      setEditingCategory(cat);
      setCatFormTitle(cat.title);
      setCatFormSlug(cat.slug);
      setCatFormDescription(cat.description || '');
      setCatFormImage(cat.image || '');
    } else {
      setEditingCategory(null);
      setCatFormTitle('');
      setCatFormSlug('');
      setCatFormDescription('');
      setCatFormImage('');
    }
    setCategoryModalOpen(true);
  };

  // 8.2 Subir Imagen de Categoría
  const handleCatFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCatImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setCatFormImage(data.url);
        notify('Imagen de categoría subida');
      } else {
        notify('Error al subir imagen', 'error');
      }
    } catch {
      notify('Error de red', 'error');
    } finally {
      setUploadingCatImage(false);
    }
  };

  // 8.3 Guardar Categoría (POST o PUT)
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveCatLoading(true);

    const slug =
      catFormSlug.trim() ||
      catFormTitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

    const payload = {
      _id: editingCategory?._id,
      title: catFormTitle,
      slug,
      description: catFormDescription,
      image: catFormImage,
    };

    try {
      const method = editingCategory ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/categories', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        notify(editingCategory ? 'Categoría actualizada' : 'Categoría creada con éxito');
        setCategoryModalOpen(false);
        loadAllData();
      } else {
        notify('Error al guardar categoría', 'error');
      }
    } catch {
      notify('Error de red', 'error');
    } finally {
      setSaveCatLoading(false);
    }
  };

  // 8.4 Eliminar Categoría
  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories(categories.filter((c) => c._id !== id));
        notify('Categoría eliminada');
      } else {
        notify('Error al eliminar categoría', 'error');
      }
    } catch {
      notify('Error de red', 'error');
    } finally {
      setDeletingCategoryId(null);
    }
  };

  // 9. Guardar Configuración Comercial
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaveLoading(true);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        notify('Configuración guardada correctamente');
      } else {
        notify('Error al guardar configuración', 'error');
      }
    } catch {
      notify('Error al conectar con el servidor', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs font-semibold text-slate-500">
        Verificando sesión...
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.name?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || p.category?.slug === filterCat;
    return matchSearch && matchCat;
  });

  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = products.length - inStockCount;
  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'pending').length;

  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryFilter !== 'all' && inq.status !== inquiryFilter) return false;
    if (inquirySearch.trim()) {
      const q = inquirySearch.toLowerCase();
      const matchBusiness = inq.businessName?.toLowerCase().includes(q);
      const matchPerson = inq.contactPerson?.toLowerCase().includes(q);
      const matchPhone = inq.phone?.toLowerCase().includes(q);
      const matchCity = inq.city?.toLowerCase().includes(q);
      const matchMessage = inq.message?.toLowerCase().includes(q);
      return matchBusiness || matchPerson || matchPhone || matchCity || matchMessage;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-red-700 bg-white shrink-0">
              <Image src="/images/logo.jpg" alt="Londress" fill sizes="32px" className="object-cover" />
            </div>
            <div>
              <span className="font-serif text-sm sm:text-base font-bold text-slate-900 block leading-tight">
                DISTRIBUIDORA <span className="text-red-700">LONDRESS</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">
                Panel de Administración
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:text-black transition-colors"
            >
              <span>Ver Web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Toast Notification */}
        {feedbackMsg && (
          <div
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2 ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-700'
                : 'bg-red-900 text-white border-red-700'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
              Total Artículos
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 block">
              {products.length}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 block">
              Con Stock Listo
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-emerald-700 mt-1 block">
              {inStockCount}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
              Rubros Activos
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 block">
              {categories.length}
            </span>
          </div>

          <div
            onClick={() => setActiveTab('inquiries')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs cursor-pointer hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                Consultas Web
              </span>
              {pendingInquiriesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                  {pendingInquiriesCount} pendientes
                </span>
              )}
            </div>
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 block">
              {inquiries.length}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 ${
              activeTab === 'products'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-black hover:bg-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Productos ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 ${
              activeTab === 'categories'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-black hover:bg-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Rubros & Categorías ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 ${
              activeTab === 'inquiries'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-black hover:bg-white'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Consultas</span>
            {pendingInquiriesCount > 0 ? (
              <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                {pendingInquiriesCount}
              </span>
            ) : (
              <span className="text-[11px] opacity-70">({inquiries.length})</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-black hover:bg-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configuración Comercial</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTOS */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Action & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="flex flex-1 items-center gap-3 w-full">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nombre, SKU o marca..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Category Dropdown */}
                <select
                  value={filterCat}
                  onChange={(e) => setFilterCat(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-slate-900 shrink-0"
                >
                  <option value="all">Todas las categorías</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => handleOpenProductModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Producto</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Foto & Artículo</th>
                      <th className="py-3.5 px-4">SKU</th>
                      <th className="py-3.5 px-4">Categoría</th>
                      <th className="py-3.5 px-4">Presentación</th>
                      <th className="py-3.5 px-4 text-center">Stock</th>
                      <th className="py-3.5 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredProducts.map((p) => (
                      <tr key={p._id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                              {p.images?.[0] ? (
                                <Image
                                  src={p.images[0]}
                                  alt={p.name}
                                  fill
                                  sizes="44px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[9px] text-slate-300">
                                  Sin foto
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-slate-900 block truncate max-w-xs sm:max-w-md">
                                {p.name}
                              </span>
                              {p.brand && (
                                <span className="text-[10px] text-slate-400 block font-normal">
                                  {p.brand.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-700 font-semibold">
                          {p.sku}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                            {p.category?.title}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500">{p.presentation}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggleStock(p)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                              p.inStock
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                p.inStock ? 'bg-emerald-600' : 'bg-slate-400'
                              }`}
                            />
                            <span>{p.inStock ? 'En Stock' : 'Sin Stock'}</span>
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <a
                              href={`/catalogo/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                              title="Ver ficha técnica en vivo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => handleOpenProductModal(p)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                              title="Editar producto"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeletingProductId(p._id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                              title="Eliminar producto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CATEGORÍAS */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Rubros y Categorías de Distribución
                </h3>
                <p className="text-xs text-slate-500">
                  Organizá los rubros del catálogo y las portadas visuales del Bento Grid.
                </p>
              </div>
              <button
                onClick={() => handleOpenCategoryModal()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs shrink-0"
              >
                <Plus className="w-4 h-4" />
                Nuevo Rubro / Categoría
              </button>
            </div>

            {categories.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl">
                <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-700">No hay rubros cargados aún</h4>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  Creá el primer rubro para categorizar los productos y alimentar el Bento Grid.
                </p>
                <button
                  onClick={() => handleOpenCategoryModal()}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Crear Primer Rubro
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((cat) => {
                  const linkedCount = products.filter(
                    (p) => p.category?._id === cat._id || p.category?.slug === cat.slug
                  ).length;

                  return (
                    <div
                      key={cat._id}
                      className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-md transition-all duration-200"
                    >
                      {/* Portada del Rubro */}
                      <div className="relative w-full h-36 bg-slate-100 border-b border-slate-100 overflow-hidden">
                        {cat.image ? (
                          <Image
                            src={cat.image}
                            alt={cat.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
                            <Layers className="w-8 h-8 mb-1" />
                            <span className="text-[10px] font-medium">Sin imagen</span>
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <span className="text-[10px] font-mono font-bold text-slate-700 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-slate-200/80 shadow-xs">
                            {cat.slug}
                          </span>
                        </div>
                      </div>

                      {/* Contenido */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                            {cat.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {cat.description || 'Sin descripción detallada.'}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-600">
                            {linkedCount} {linkedCount === 1 ? 'artículo vinculado' : 'artículos vinculados'}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenCategoryModal(cat)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                              title="Editar rubro"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeletingCategoryId(cat._id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                              title="Eliminar rubro"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONSULTAS & MENSAJES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  placeholder="Buscar por establecimiento, responsable, teléfono o mensaje..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900 font-medium"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                <button
                  onClick={() => setInquiryFilter('all')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                    inquiryFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Todas ({inquiries.length})
                </button>
                <button
                  onClick={() => setInquiryFilter('pending')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                    inquiryFilter === 'pending'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Pendientes ({pendingInquiriesCount})
                </button>
                <button
                  onClick={() => setInquiryFilter('contacted')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                    inquiryFilter === 'contacted'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Contactadas ({inquiries.filter((i) => i.status === 'contacted').length})
                </button>
              </div>
            </div>

            {/* Inquiries List */}
            {filteredInquiries.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Inbox className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">No hay consultas registradas</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {inquirySearch || inquiryFilter !== 'all'
                    ? 'No se encontraron consultas con los filtros seleccionados.'
                    : 'Cuando un cliente envíe una consulta desde el formulario web, quedará guardada aquí con todos sus datos de contacto.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredInquiries.map((inq) => {
                  const cleanNumber = inq.phone.replace(/\D/g, '');
                  const waReplyUrl = `https://wa.me/${cleanNumber.startsWith('54') ? cleanNumber : '549' + cleanNumber}?text=${encodeURIComponent(`Hola ${inq.contactPerson}! Nos comunicamos desde Distribuidora Londress con respecto a tu consulta por ${inq.businessName}...`)}`;
                  const dateFormatted = new Date(inq.createdAt).toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={inq._id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all space-y-3"
                    >
                      {/* Top Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              inq.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {inq.status === 'pending' ? 'Pendiente' : 'Contactado'}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {dateFormatted}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleInquiryStatus(inq._id, inq.status)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                              inq.status === 'pending'
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            {inq.status === 'pending' ? 'Marcar como Contactado' : 'Volver a Pendiente'}
                          </button>
                          <button
                            onClick={() => setDeletingInquiryId(inq._id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                            title="Eliminar consulta"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Main Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                            Establecimiento / Rubro
                          </span>
                          <h4 className="text-base font-bold text-slate-900">
                            {inq.businessName}
                          </h4>
                          <span className="inline-block text-[11px] font-semibold text-slate-600 uppercase bg-slate-100 px-2 py-0.5 rounded-md">
                            {inq.businessType}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                            Persona de Contacto & Ubicación
                          </span>
                          <p className="text-xs font-bold text-slate-800">
                            {inq.contactPerson}
                          </p>
                          <p className="text-xs text-slate-500">
                            📍 {inq.city}
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                            Teléfono & WhatsApp
                          </span>
                          <p className="text-xs font-mono font-bold text-slate-900">
                            {inq.phone}
                          </p>
                          <a
                            href={waReplyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Responder por WhatsApp</span>
                          </a>
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="pt-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                          Mensaje o Pedido Solicitado:
                        </span>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-normal">
                          {inq.message}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CONFIGURACIÓN COMERCIAL */}
        {activeTab === 'settings' && settings && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 max-w-3xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Datos de la Empresa & Atención
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Esta información se actualiza automáticamente en el encabezado, pie de página, WhatsApp y sección de contacto.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Comercial (para cotizaciones)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Formato internacional con código de país (ej: 5491123456789)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                    <span>Teléfono de Línea</span>
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-600" />
                    <span>Email de Ventas</span>
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    <span>Horario de Atención</span>
                  </label>
                  <input
                    type="text"
                    value={settings.schedule}
                    onChange={(e) => setSettings({ ...settings, schedule: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-600" />
                  <span>Dirección del Depósito / Showroom</span>
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                disabled={saveLoading}
                className="py-3 px-6 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
              >
                <span>{saveLoading ? 'Guardando...' : 'Guardar Cambios'}</span>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* MODAL CREAR / EDITAR PRODUCTO */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-serif font-bold text-slate-900">
                {editingProduct ? 'Editar Artículo' : 'Nuevo Artículo'}
              </h3>
              <div className="flex items-center gap-2">
                {editingProduct && (
                  <a
                    href={`/catalogo/${editingProduct.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors"
                    title="Ver página en vivo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ver página</span>
                  </a>
                )}
                <button
                  onClick={() => setProductModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nombre del Producto *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej: Máquina Wahl Magic Clip Cordless"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Código SKU *</label>
                  <input
                    type="text"
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    placeholder="Ej: WHL-8148"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rubro / Categoría *</label>
                  <select
                    value={formCategorySlug}
                    onChange={(e) => setFormCategorySlug(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-slate-900 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Marca</label>
                  <input
                    type="text"
                    value={formBrandName}
                    onChange={(e) => setFormBrandName(e.target.value)}
                    placeholder="Wahl, BabylissPRO..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Presentación del Artículo</label>
                  <input
                    type="text"
                    value={formPresentation}
                    onChange={(e) => setFormPresentation(e.target.value)}
                    placeholder="Caja x 12 u. / Unidad"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              {/* Image Input & File Upload */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Foto del Producto (URL o Subir)</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formImages[0] || ''}
                    onChange={(e) => setFormImages([e.target.value])}
                    placeholder="https://images.unsplash.com/... o sube una foto"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Subiendo...' : 'Subir archivo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                {formImages[0] && (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                      <Image src={formImages[0]} alt="Vista previa" fill sizes="48px" className="object-cover" />
                    </div>
                    <span className="text-[10px] text-slate-400 truncate max-w-xs">Vista previa de imagen cargada</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descripción Breve (Para tarjetas de catálogo)</label>
                <textarea
                  rows={2}
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  placeholder="Resumen del producto para las tarjetas del catálogo..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Descripción Técnica Detallada (Página individual del producto)
                </label>
                <textarea
                  rows={4}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Explica detalladamente la tecnología, motor, ergonomía, recomendaciones y características que se leerán en la página del producto..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                />
              </div>

              {/* Editor de Especificaciones Técnicas */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block font-bold text-slate-800 text-xs">
                      Ficha Técnica & Especificaciones Técnicas
                    </label>
                    <p className="text-[11px] text-slate-500 font-normal">
                      Estos datos se muestran en la tabla técnica de la página de cada producto.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar fila</span>
                  </button>
                </div>

                {/* Chips de sugerencias rápidas */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-[10px] text-slate-400 font-semibold">Atributos comunes:</span>
                  {['Motor', 'Cuchilla', 'Batería', 'Autonomía', 'Tiempo de Carga', 'Peso', 'Voltaje', 'Accesorios', 'Garantía'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleQuickAddSpec(preset)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium transition-colors"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>

                {/* Lista interactiva de especificaciones */}
                {formSpecs.length === 0 ? (
                  <div className="p-3 text-center border border-dashed border-slate-200 rounded-xl text-slate-400 text-[11px]">
                    No hay especificaciones cargadas. Usa &quot;Agregar fila&quot; o los atributos comunes para añadir características técnicas.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {formSpecs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Atributo (ej: Motor)"
                          value={spec.key}
                          onChange={(e) => handleUpdateSpec(index, 'key', e.target.value)}
                          className="w-1/3 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900 bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Valor (ej: Rotativo 7.200 RPM)"
                          value={spec.value}
                          onChange={(e) => handleUpdateSpec(index, 'value', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-900 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSpec(index)}
                          className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                          title="Eliminar especificación"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>


              {/* Switches */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formInStock}
                    onChange={(e) => setFormInStock(e.target.checked)}
                    className="rounded text-slate-900 focus:ring-0 w-4 h-4"
                  />
                  <span className="font-bold text-slate-800">Stock Disponible Inmediato</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsNew}
                    onChange={(e) => setFormIsNew(e.target.checked)}
                    className="rounded text-red-700 focus:ring-0 w-4 h-4"
                  />
                  <span className="font-bold text-slate-800">Marcar como &quot;Novedad&quot;</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {saveLoading ? 'Guardando...' : editingProduct ? 'Actualizar' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMAR ELIMINACIÓN DE PRODUCTO */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-sm w-full p-6 shadow-xl text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">¿Eliminar este producto?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Esta acción removerá el producto del catálogo permanentemente.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteProduct(deletingProductId)}
                className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-xs font-bold text-white uppercase tracking-wider"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CREAR / EDITAR CATEGORÍA O RUBRO */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full p-6 shadow-2xl my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingCategory ? 'Editar Rubro / Categoría' : 'Nuevo Rubro / Categoría'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingCategory
                      ? `Modificando rubro "${editingCategory.title}"`
                      : 'Agregá un nuevo rubro para organizar los productos'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCategoryModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nombre del Rubro *
                </label>
                <input
                  type="text"
                  required
                  value={catFormTitle}
                  onChange={(e) => {
                    const title = e.target.value;
                    setCatFormTitle(title);
                    if (!editingCategory) {
                      const autoSlug = title
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/[^\w\s-]/g, '')
                        .trim()
                        .replace(/\s+/g, '-');
                      setCatFormSlug(autoSlug);
                    }
                  }}
                  placeholder="Ej: Máquinas de Corte & Trimmers"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Identificador URL / Slug (clave única) *
                </label>
                <input
                  type="text"
                  required
                  value={catFormSlug}
                  onChange={(e) => setCatFormSlug(e.target.value)}
                  placeholder="Ej: maquinas-corte-trimmers"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-slate-900 focus:outline-none focus:border-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Identificador en minúsculas y sin espacios, utilizado en filtros y enlaces.
                </span>
              </div>

              {/* Imagen de Portada del Rubro */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-700">
                  Imagen de Portada (Bento Grid y Catálogo)
                </label>
                
                {catFormImage ? (
                  <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group">
                    <Image
                      src={catFormImage}
                      alt="Portada de categoría"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCatFormImage('')}
                        className="px-3 py-1.5 rounded-lg bg-red-700 text-white text-xs font-bold hover:bg-red-800 transition-colors"
                      >
                        Quitar Imagen
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center space-y-2 bg-slate-50/50">
                    <div className="flex items-center justify-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingCatImage ? 'Subiendo...' : 'Subir archivo desde tu PC'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCatFileUpload}
                          disabled={uploadingCatImage}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-[11px] text-slate-400">o podés ingresar una URL directa abajo</p>
                  </div>
                )}

                <input
                  type="text"
                  value={catFormImage}
                  onChange={(e) => setCatFormImage(e.target.value)}
                  placeholder="https://... o ruta /uploads/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono text-[11px] focus:outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Descripción Comercial del Rubro
                </label>
                <textarea
                  rows={3}
                  value={catFormDescription}
                  onChange={(e) => setCatFormDescription(e.target.value)}
                  placeholder="Ej: Clippers inalámbricas de alta potencia, terminadoras, navajas y cuchillas de repuesto para barberías."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900 resize-none text-slate-900"
                />
              </div>

              {/* Botones de acción */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saveCatLoading || uploadingCatImage}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {saveCatLoading ? 'Guardando...' : editingCategory ? 'Guardar Cambios' : 'Crear Rubro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMAR ELIMINACIÓN DE CATEGORÍA */}
      {deletingCategoryId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-sm w-full p-6 shadow-xl text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">¿Eliminar este rubro?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Esta acción removerá el rubro del catálogo. Los artículos vinculados se conservarán intactos sin categoría asignada.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setDeletingCategoryId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteCategory(deletingCategoryId)}
                className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-xs font-bold text-white uppercase tracking-wider"
              >
                Sí, Eliminar Rubro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMAR ELIMINACIÓN DE CONSULTA */}
      {deletingInquiryId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-sm w-full p-6 shadow-xl text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">¿Eliminar esta consulta?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Esta acción removerá el registro de contacto del panel de administración.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setDeletingInquiryId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteInquiry(deletingInquiryId)}
                className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-xs font-bold text-white uppercase tracking-wider"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

