import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePharmacyDrugs } from "@/hooks/useQueries";
import { MapPin, Navigation, Phone, Pill, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
interface Pharmacy {
  id: number;
  name: string;
  address: string;
  phone: string;
  openHour: number;
  closeHour: number;
  lat: number;
  lng: number;
}

// ── Haversine distance helper ─────────────────────────────────────────────────
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Static pharmacy data ──────────────────────────────────────────────────────
const PHARMACIES: Pharmacy[] = [
  {
    id: 1,
    name: "Apotek Healio Medika – Cabang Utama",
    address: "Jl. Sudirman No. 12, Menteng, Jakarta Pusat",
    phone: "+6221-555-0101",
    openHour: 7,
    closeHour: 22,
    lat: -6.2088,
    lng: 106.8456,
  },
  {
    id: 2,
    name: "Apotek Healio Medika – Cabang Kebon Jeruk",
    address: "Jl. Raya Kebon Jeruk No. 45, Jakarta Barat",
    phone: "+6221-555-0202",
    openHour: 8,
    closeHour: 21,
    lat: -6.1947,
    lng: 106.7756,
  },
  {
    id: 3,
    name: "Apotek Mitra Sehat Surabaya",
    address: "Jl. Pemuda No. 78, Genteng, Surabaya",
    phone: "+6231-555-0303",
    openHour: 7,
    closeHour: 22,
    lat: -7.2575,
    lng: 112.7521,
  },
  {
    id: 4,
    name: "Apotek Farma Plus – Bandung",
    address: "Jl. Asia Afrika No. 31, Sumur Bandung, Bandung",
    phone: "+6222-555-0404",
    openHour: 8,
    closeHour: 20,
    lat: -6.9175,
    lng: 107.6191,
  },
  {
    id: 5,
    name: "Apotek Kimia Farma – Yogyakarta",
    address: "Jl. Malioboro No. 60, Gedongtengen, Yogyakarta",
    phone: "+62274-555-0505",
    openHour: 7,
    closeHour: 23,
    lat: -7.7956,
    lng: 110.3695,
  },
  {
    id: 6,
    name: "Apotek Sehat Medika – Medan",
    address: "Jl. Gatot Subroto No. 22, Medan Barat, Medan",
    phone: "+6261-555-0606",
    openHour: 8,
    closeHour: 21,
    lat: 3.5952,
    lng: 98.6722,
  },
  {
    id: 7,
    name: "Apotek Guardian – Makassar",
    address: "Jl. Sam Ratulangi No. 90, Makassar Tengah, Makassar",
    phone: "+62411-555-0707",
    openHour: 9,
    closeHour: 21,
    lat: -5.1477,
    lng: 119.4328,
  },
  {
    id: 8,
    name: "Apotek K-24 – Semarang",
    address: "Jl. Pandanaran No. 55, Semarang Tengah, Semarang",
    phone: "+6224-555-0808",
    openHour: 0,
    closeHour: 24,
    lat: -6.9667,
    lng: 110.4167,
  },
  {
    id: 9,
    name: "Apotek Farmaplus – Bekasi",
    address: "Jl. Ahmad Yani No. 17, Bekasi Timur, Bekasi",
    phone: "+6221-555-0909",
    openHour: 7,
    closeHour: 22,
    lat: -6.2349,
    lng: 107.0004,
  },
  {
    id: 10,
    name: "Apotek Anugrah Sehat – Depok",
    address: "Jl. Margonda Raya No. 120, Beji, Depok",
    phone: "+6221-555-1010",
    openHour: 8,
    closeHour: 21,
    lat: -6.3797,
    lng: 106.8227,
  },
];

const RADIUS_OPTIONS = [1, 3, 5, 20] as const;
type RadiusOption = (typeof RADIUS_OPTIONS)[number];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ApotekPage() {
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [geoStatus, setGeoStatus] = useState<
    "idle" | "loading" | "granted" | "denied"
  >("idle");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRadius, setSelectedRadius] = useState<RadiusOption>(20);
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<number | null>(
    null,
  );
  const { data: drugs = [], isLoading: drugsLoading } = usePharmacyDrugs(
    selectedPharmacyId !== null ? BigInt(selectedPharmacyId) : null,
  );

  // Auto-trigger geolocation on mount
  useEffect(() => {
    requestLocation();
  }, []);

  function requestLocation() {
    if (!navigator.geolocation) {
      setGeoStatus("denied");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
        setGeoStatus("granted");
      },
      () => {
        setGeoStatus("denied");
      },
      { timeout: 10000, enableHighAccuracy: true },
    );
  }

  const currentHour = new Date().getHours();

  const pharmaciesWithData = useMemo(() => {
    return PHARMACIES.map((p) => {
      const isOpen =
        p.closeHour === 24
          ? true
          : currentHour >= p.openHour && currentHour < p.closeHour;
      const distance =
        userLat !== null && userLng !== null
          ? calculateDistance(userLat, userLng, p.lat, p.lng)
          : null;
      return { ...p, isOpen, distance };
    });
  }, [userLat, userLng, currentHour]);

  const filteredPharmacies = useMemo(() => {
    let list = [...pharmaciesWithData];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q),
      );
    }

    // Filter by radius if location is known
    if (userLat !== null && userLng !== null) {
      list = list.filter(
        (p) => p.distance !== null && p.distance <= selectedRadius,
      );
    }

    // Sort by distance if available, else keep original order
    if (userLat !== null) {
      list.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
    }

    return list;
  }, [pharmaciesWithData, searchQuery, selectedRadius, userLat, userLng]);

  function handleDirections(pharmacy: (typeof pharmaciesWithData)[0]) {
    const origin =
      userLat !== null && userLng !== null ? `${userLat},${userLng}` : "";
    const dest = `${pharmacy.lat},${pharmacy.lng}`;
    const url = origin
      ? `https://www.google.com/maps/dir/?api=1&destination=${dest}&origin=${origin}`
      : `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
    window.open(url, "_blank");
  }

  const mapCenter =
    userLat !== null && userLng !== null
      ? `${userLat},${userLng}`
      : "-6.2088,106.8456"; // default to Jakarta

  return (
    <Layout>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary-foreground/20 rounded-full">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Apotek Terdekat
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Temukan apotek mitra Healio Medika di sekitar Anda
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-5">
        {/* Geolocation status banner */}
        {geoStatus === "loading" && (
          <div
            data-ocid="apotek.loading_state"
            className="flex items-center gap-2 p-3 bg-muted rounded-lg text-muted-foreground text-sm"
          >
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Mendeteksi lokasi Anda...
          </div>
        )}
        {geoStatus === "denied" && (
          <div
            data-ocid="apotek.error_state"
            className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
          >
            <p className="text-destructive text-sm">
              Aktifkan lokasi untuk melihat apotek terdekat
            </p>
            <button
              type="button"
              onClick={() => setGeoStatus("idle")}
              className="text-destructive/60 hover:text-destructive"
              aria-label="Tutup pesan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Search & filter bar */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="apotek.search_input"
                className="pl-9"
                placeholder="Cari Apotek atau Kota..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              type="button"
              data-ocid="apotek.location_button"
              variant="outline"
              className="gap-2 shrink-0 border-primary text-primary hover:bg-primary/10"
              onClick={requestLocation}
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">
                Gunakan Lokasi Saya Saat Ini
              </span>
              <span className="sm:hidden">Lokasi Saya</span>
            </Button>
          </div>

          {/* Radius filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Radius:</span>
            {RADIUS_OPTIONS.map((r) => (
              <button
                key={r}
                type="button"
                data-ocid={`apotek.radius_${r}km`}
                onClick={() => setSelectedRadius(r)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                  selectedRadius === r
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {r} km
              </button>
            ))}
            {userLat === null && (
              <span className="text-xs text-muted-foreground">
                (Aktifkan lokasi untuk filter radius)
              </span>
            )}
          </div>
        </div>

        {/* Main content: list + map */}
        <div className="flex gap-5">
          {/* Left: pharmacy cards list */}
          <div className="flex-1 min-w-0 space-y-4">
            {filteredPharmacies.length === 0 ? (
              <div
                data-ocid="apotek.empty_state"
                className="text-center py-16 text-muted-foreground"
              >
                <Pill className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Tidak ada apotek ditemukan</p>
                <p className="text-sm mt-1">
                  Coba perluas radius atau ubah kata pencarian
                </p>
              </div>
            ) : (
              filteredPharmacies.map((pharmacy, idx) => (
                <div
                  key={pharmacy.id}
                  data-ocid={`apotek.item.${idx + 1}`}
                  className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Card header: name + distance */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-foreground leading-tight">
                      {pharmacy.name}
                    </h3>
                    {pharmacy.distance !== null ? (
                      <span className="text-primary font-bold text-sm whitespace-nowrap">
                        {pharmacy.distance < 1
                          ? `${Math.round(pharmacy.distance * 1000)} m`
                          : `${pharmacy.distance.toFixed(1)} km`}{" "}
                        dari lokasi Anda
                      </span>
                    ) : null}
                  </div>

                  {/* Status badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      className={`text-xs font-semibold ${
                        pharmacy.isOpen
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }`}
                      variant="outline"
                    >
                      {pharmacy.isOpen ? "● Buka" : "● Tutup"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {pharmacy.closeHour === 24
                        ? "Buka 24 jam"
                        : `${String(pharmacy.openHour).padStart(2, "0")}.00 – ${String(pharmacy.closeHour).padStart(2, "0")}.00`}
                    </span>
                  </div>

                  {/* Address */}
                  <p className="text-sm text-muted-foreground mb-2 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
                    <span className="truncate">{pharmacy.address}</span>
                  </p>

                  {/* Phone */}
                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 shrink-0 text-primary" />
                    <a
                      href={`https://wa.me/${pharmacy.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-primary hover:underline transition-colors"
                      data-ocid={`apotek.whatsapp_link.${idx + 1}`}
                    >
                      {pharmacy.phone} (WhatsApp)
                    </a>
                  </p>

                  {/* Action buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      data-ocid={`apotek.stok_button.${idx + 1}`}
                      className="text-xs"
                      onClick={() => setSelectedPharmacyId(pharmacy.id)}
                    >
                      Lihat Stok Obat
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      data-ocid={`apotek.directions_button.${idx + 1}`}
                      className="gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => handleDirections(pharmacy)}
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Arahkan ke Lokasi
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: static map (desktop only) */}
          <aside className="hidden md:block w-[40%] shrink-0">
            <div className="sticky top-20 rounded-xl overflow-hidden border border-border shadow-sm">
              <iframe
                title="Peta Apotek Terdekat"
                width="100%"
                height="480"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${mapCenter}&z=13&output=embed`}
              />
              <div className="p-3 bg-card border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Peta menunjukkan area sekitar lokasi Anda
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
      {selectedPharmacyId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-foreground">
                Stok Obat Apotek
              </h3>
              <button
                type="button"
                onClick={() => setSelectedPharmacyId(null)}
                className="text-muted-foreground hover:text-foreground text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              {drugsLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Memuat data obat...
                </div>
              ) : (
                  drugs as {
                    drugName: string;
                    category: string;
                    priceIdr: number | bigint;
                    available: boolean;
                    quantity: number | bigint;
                  }[]
                ).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Data stok obat belum tersedia
                </div>
              ) : (
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-3 font-semibold text-foreground border-b">
                        Nama Obat
                      </th>
                      <th className="text-left p-3 font-semibold text-foreground border-b">
                        Kategori
                      </th>
                      <th className="text-left p-3 font-semibold text-foreground border-b">
                        Harga
                      </th>
                      <th className="text-left p-3 font-semibold text-foreground border-b">
                        Status
                      </th>
                      <th className="text-left p-3 font-semibold text-foreground border-b">
                        Jumlah
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(
                      drugs as {
                        drugName: string;
                        category: string;
                        priceIdr: number | bigint;
                        available: boolean;
                        quantity: number | bigint;
                      }[]
                    ).map((drug) => (
                      <tr
                        key={drug.drugName}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="p-3 font-medium text-foreground">
                          {drug.drugName}
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {drug.category}
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(Number(drug.priceIdr))}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${drug.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                          >
                            {drug.available ? "Tersedia" : "Habis"}
                          </span>
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {Number(drug.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
