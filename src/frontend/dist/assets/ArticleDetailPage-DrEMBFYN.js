import { b as useParams, j as jsxRuntimeExports, d as Link } from "./index-BxBE-1lv.js";
import { a as articles } from "./articles-f9k4eJm2.js";
import { A as ArrowLeft } from "./arrow-left-D2NqBB97.js";
import { C as Clock } from "./clock-BZtvRGtZ.js";
import { B as BookOpen } from "./book-open-DYprvAsb.js";
import { E as ExternalLink } from "./external-link-2oZCbr-W.js";
import "./createLucideIcon-C_thIQe7.js";
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
function renderContent(content) {
  const paragraphs = content.split("\n\n");
  return paragraphs.map((para, i) => {
    if (para.startsWith("### ")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "text-lg font-semibold text-foreground mt-6 mb-2",
          children: para.replace("### ", "")
        },
        `h3-${i}-${para.length}`
      );
    }
    if (para.startsWith("## ")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          className: "text-xl font-bold text-green-800 mt-8 mb-3 border-b border-green-100 pb-2",
          children: para.replace("## ", "")
        },
        `h2-${i}-${para.length}`
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-foreground leading-relaxed mb-4",
        children: para
      },
      `p-${i}-${para.length}`
    );
  });
}
function ArticleDetailPage() {
  const params = useParams({ from: "/articles/$slug" });
  const { slug } = params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "📄" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground mb-2", children: "Artikel tidak ditemukan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Artikel yang kamu cari tidak tersedia atau telah dihapus." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/articles",
          className: "inline-flex items-center gap-2 text-green-700 hover:text-green-600 font-medium",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Kembali ke Informasi Kesehatan"
          ]
        }
      )
    ] }) });
  }
  const related = articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "article-detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-green-700 transition-colors", children: "Beranda" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/articles",
          className: "hover:text-green-700 transition-colors",
          children: "Informasi Kesehatan"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium line-clamp-1 max-w-xs", children: article.title.split(":")[0] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/articles",
          "data-ocid": "article-detail.back_link",
          className: "inline-flex items-center gap-2 text-green-700 hover:text-green-600 font-medium text-sm mb-6 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Kembali ke Informasi Kesehatan"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs font-medium px-3 py-1 rounded-full ${categoryColors[article.category] ?? "bg-gray-100 text-gray-700"}`,
              children: article.category
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            "~3 menit membaca"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
            "Artikel #",
            article.id
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4", children: article.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed", children: article.metaDescription })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-8 mb-8 flex flex-col items-center justify-center min-h-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-green-200 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🏥" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-green-700 italic text-center max-w-md", children: article.imagePrompt }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xs text-green-600 font-semibold tracking-wider uppercase", children: "HEALIO MEDIKA" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose-like", children: renderContent(article.content) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 p-6 bg-muted/30 rounded-xl border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4 text-green-700" }),
          "Sumber Referensi Terpercaya"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: article.references.map((ref, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "text-sm text-muted-foreground flex items-start gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-600 font-bold mt-0.5", children: [
                i + 1,
                "."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ref })
            ]
          },
          `ref-${i}-${ref.length}`
        )) })
      ] }),
      related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground mb-6", children: "Artikel Terkait" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: related.map((rel, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/articles/$slug",
            params: { slug: rel.slug },
            "data-ocid": `article-detail.related.item.${idx + 1}`,
            className: "block bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-green-300 transition-all duration-200 group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[rel.category] ?? "bg-gray-100 text-gray-700"}`,
                  children: rel.category
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-green-800 group-hover:text-green-600 transition-colors mt-2 line-clamp-2 text-sm leading-snug", children: rel.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 line-clamp-2", children: rel.metaDescription })
            ]
          },
          rel.id
        )) })
      ] })
    ] })
  ] });
}
export {
  ArticleDetailPage as default
};
