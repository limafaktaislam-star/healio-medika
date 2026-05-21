import { a as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-CogN6nIg.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { I as Input } from "./input-l1Uj-_jw.js";
import { a as articles, C as CATEGORIES } from "./articles-DpK1Fb1a.js";
import { S as Search } from "./search-C03IfKeY.js";
import { C as Clock } from "./clock-DaYSqKoP.js";
import { C as ChevronLeft } from "./chevron-left-CLMvFXXX.js";
import { C as ChevronRight } from "./chevron-right-RA5MdHLM.js";
import "./createLucideIcon-BbcVMltS.js";
const ARTICLES_PER_PAGE = 12;
const categoryColors = {
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
  "Kesehatan Umum": "bg-gray-100 text-gray-700"
};
function ArticlesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState("Semua");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const filtered = reactExports.useMemo(() => {
    let result = articles;
    if (selectedCategory !== "Semua") {
      result = result.filter((a) => a.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) => a.title.toLowerCase().includes(q) || a.metaDescription.toLowerCase().includes(q)
      );
    }
    return result;
  }, [searchQuery, selectedCategory]);
  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };
  const handleSearch = (q) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "articles.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-br from-green-700 to-green-900 text-white py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-200 text-sm font-medium mb-2 uppercase tracking-widest", children: "HEALIO MEDIKA" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Informasi Kesehatan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-100 text-lg max-w-2xl", children: "Artikel kesehatan terpercaya untuk menjaga Anda dan keluarga tetap sehat. Ditulis berdasarkan referensi medis internasional." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-6 max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "articles.search_input",
            placeholder: "Cari artikel kesehatan...",
            value: searchQuery,
            onChange: (e) => handleSearch(e.target.value),
            className: "pl-10 bg-white text-foreground border-0 shadow-lg h-12 text-base"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "articles.category.tab",
          className: "flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none",
          children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleCategoryChange(cat),
              className: `flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === cat ? "bg-green-700 text-white shadow-md" : "bg-card border border-border text-muted-foreground hover:border-green-500 hover:text-green-700"}`,
              children: cat
            },
            cat
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-6", children: [
        "Menampilkan",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length }),
        " ",
        "artikel",
        selectedCategory !== "Semua" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          " ",
          "dalam kategori",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-green-700", children: selectedCategory })
        ] })
      ] }),
      paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "articles.empty_state", className: "text-center py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "📰" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: "Artikel tidak ditemukan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Coba kata kunci lain atau pilih kategori berbeda" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: paginated.map((article, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `articles.item.${idx + 1}`,
          onClick: () => navigate({
            to: "/articles/$slug",
            params: { slug: article.slug }
          }),
          className: "text-left bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:border-green-300 transition-all duration-200 group w-full",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-green-600 group-hover:bg-green-500 transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-medium px-2 py-1 rounded-full ${categoryColors[article.category] ?? "bg-muted text-muted-foreground"}`,
                    children: article.category
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  "~3 menit membaca"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-green-800 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors leading-snug", children: article.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 leading-relaxed", children: article.metaDescription }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-sm font-medium text-green-700 group-hover:text-green-600", children: "Baca selengkapnya →" })
            ] })
          ]
        },
        article.id
      )) }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            "data-ocid": "articles.pagination_prev",
            onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
            disabled: currentPage === 1,
            className: "gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
              "Sebelumnya"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "Halaman",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: currentPage }),
          " ",
          "dari",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: totalPages })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            "data-ocid": "articles.pagination_next",
            onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
            disabled: currentPage === totalPages,
            className: "gap-1",
            children: [
              "Selanjutnya",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  ArticlesPage as default
};
