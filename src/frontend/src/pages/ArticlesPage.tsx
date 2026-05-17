import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, articles } from "@/data/articles";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Clock, Search } from "lucide-react";
import { useMemo, useState } from "react";

const ARTICLES_PER_PAGE = 12;

const categoryColors: Record<string, string> = {
  "Penyakit Jantung": "bg-red-100 text-red-700",
  "Diabetes & Metabolik": "bg-orange-100 text-orange-700",
  "Penyakit Pernafasan": "bg-sky-100 text-sky-700",
  "Penyakit Infeksi": "bg-yellow-100 text-yellow-700",
  "Penyakit Saraf": "bg-purple-100 text-purple-700",
  "Penyakit Ginjal": "bg-blue-100 text-blue-700",
  "Penyakit Pencernaan": "bg-lime-100 text-lime-700",
  Kanker: "bg-rose-100 text-rose-700",
  "Tulang & Sendi": "bg-amber-100 text-amber-700",
  "Penyakit Kulit": "bg-pink-100 text-pink-700",
  "Mata & THT": "bg-indigo-100 text-indigo-700",
  "Kesehatan Ibu & Anak": "bg-teal-100 text-teal-700",
  "Kesehatan Mental": "bg-violet-100 text-violet-700",
  "Penyakit Tropis": "bg-green-100 text-green-700",
  "Penyakit Autoimun": "bg-fuchsia-100 text-fuchsia-700",
  "Kesehatan Umum": "bg-gray-100 text-gray-700",
};

export default function ArticlesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = articles;
    if (selectedCategory !== "Semua") {
      result = result.filter((a) => a.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.metaDescription.toLowerCase().includes(q),
      );
    }
    return result;
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="articles.page">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-green-200 text-sm font-medium mb-2 uppercase tracking-widest">
            HEALIO MEDIKA
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Informasi Kesehatan
          </h1>
          <p className="text-green-100 text-lg max-w-2xl">
            Artikel kesehatan terpercaya untuk menjaga Anda dan keluarga tetap
            sehat. Ditulis berdasarkan referensi medis internasional.
          </p>
          {/* Search */}
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              data-ocid="articles.search_input"
              placeholder="Cari artikel kesehatan..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-white text-foreground border-0 shadow-lg h-12 text-base"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category filter pills */}
        <div
          data-ocid="articles.category.tab"
          className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-green-700 text-white shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:border-green-500 hover:text-green-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-muted-foreground text-sm mb-6">
          Menampilkan{" "}
          <span className="font-semibold text-foreground">
            {filtered.length}
          </span>{" "}
          artikel
          {selectedCategory !== "Semua" && (
            <span>
              {" "}
              dalam kategori{" "}
              <span className="font-semibold text-green-700">
                {selectedCategory}
              </span>
            </span>
          )}
        </p>

        {/* Articles grid */}
        {paginated.length === 0 ? (
          <div data-ocid="articles.empty_state" className="text-center py-20">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Artikel tidak ditemukan
            </h3>
            <p className="text-muted-foreground">
              Coba kata kunci lain atau pilih kategori berbeda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((article, idx) => (
              <button
                key={article.id}
                type="button"
                data-ocid={`articles.item.${idx + 1}`}
                onClick={() =>
                  navigate({
                    to: "/articles/$slug",
                    params: { slug: article.slug },
                  })
                }
                className="text-left bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:border-green-300 transition-all duration-200 group w-full"
              >
                {/* Color accent bar based on category */}
                <div className="h-1.5 bg-green-600 group-hover:bg-green-500 transition-colors" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        categoryColors[article.category] ??
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      ~3 menit membaca
                    </span>
                  </div>
                  <h2 className="font-semibold text-green-800 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {article.metaDescription}
                  </p>
                  <div className="mt-4 text-sm font-medium text-green-700 group-hover:text-green-600">
                    Baca selengkapnya →
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-ocid="articles.pagination_prev"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Sebelumnya
            </Button>
            <span className="text-sm text-muted-foreground">
              Halaman{" "}
              <span className="font-semibold text-foreground">
                {currentPage}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-foreground">
                {totalPages}
              </span>
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-ocid="articles.pagination_next"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="gap-1"
            >
              Selanjutnya
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
