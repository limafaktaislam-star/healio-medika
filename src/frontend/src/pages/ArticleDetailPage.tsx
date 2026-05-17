import { Badge } from "@/components/ui/badge";
import { articles } from "@/data/articles";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Clock, ExternalLink } from "lucide-react";

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

function renderContent(content: string) {
  const paragraphs = content.split("\n\n");
  return paragraphs.map((para, i) => {
    if (para.startsWith("### ")) {
      return (
        <h3
          key={`h3-${i}-${para.length}`}
          className="text-lg font-semibold text-foreground mt-6 mb-2"
        >
          {para.replace("### ", "")}
        </h3>
      );
    }
    if (para.startsWith("## ")) {
      return (
        <h2
          key={`h2-${i}-${para.length}`}
          className="text-xl font-bold text-green-800 mt-8 mb-3 border-b border-green-100 pb-2"
        >
          {para.replace("## ", "")}
        </h2>
      );
    }
    return (
      <p
        key={`p-${i}-${para.length}`}
        className="text-foreground leading-relaxed mb-4"
      >
        {para}
      </p>
    );
  });
}

export default function ArticleDetailPage() {
  const params = useParams({ from: "/articles/$slug" as const });
  const { slug } = params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Artikel tidak ditemukan
          </h1>
          <p className="text-muted-foreground mb-6">
            Artikel yang kamu cari tidak tersedia atau telah dihapus.
          </p>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-600 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Informasi Kesehatan
          </Link>
        </div>
      </div>
    );
  }

  const related = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background" data-ocid="article-detail.page">
      {/* Breadcrumb */}
      <div className="bg-muted/40 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-green-700 transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <Link
              to="/articles"
              className="hover:text-green-700 transition-colors"
            >
              Informasi Kesehatan
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium line-clamp-1 max-w-xs">
              {article.title.split(":")[0]}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link
          to="/articles"
          data-ocid="article-detail.back_link"
          className="inline-flex items-center gap-2 text-green-700 hover:text-green-600 font-medium text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Informasi Kesehatan
        </Link>

        {/* Article header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                categoryColors[article.category] ?? "bg-gray-100 text-gray-700"
              }`}
            >
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              ~3 menit membaca
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <BookOpen className="w-3 h-3" />
              Artikel #{article.id}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {article.metaDescription}
          </p>
        </div>

        {/* Image placeholder */}
        <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-8 mb-8 flex flex-col items-center justify-center min-h-[200px]">
          <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center mb-4">
            <span className="text-2xl">🏥</span>
          </div>
          <p className="text-sm text-green-700 italic text-center max-w-md">
            {article.imagePrompt}
          </p>
          <div className="mt-3 text-xs text-green-600 font-semibold tracking-wider uppercase">
            HEALIO MEDIKA
          </div>
        </div>

        {/* Article content */}
        <div className="prose-like">{renderContent(article.content)}</div>

        {/* References */}
        <div className="mt-10 p-6 bg-muted/30 rounded-xl border border-border">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-green-700" />
            Sumber Referensi Terpercaya
          </h3>
          <ul className="space-y-2">
            {article.references.map((ref, i) => (
              <li
                key={`ref-${i}-${ref.length}`}
                className="text-sm text-muted-foreground flex items-start gap-2"
              >
                <span className="text-green-600 font-bold mt-0.5">
                  {i + 1}.
                </span>
                <span>{ref}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Artikel Terkait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((rel, idx) => (
                <Link
                  key={rel.id}
                  to="/articles/$slug"
                  params={{ slug: rel.slug }}
                  data-ocid={`article-detail.related.item.${idx + 1}`}
                  className="block bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-green-300 transition-all duration-200 group"
                >
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      categoryColors[rel.category] ??
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {rel.category}
                  </span>
                  <h3 className="font-semibold text-green-800 group-hover:text-green-600 transition-colors mt-2 line-clamp-2 text-sm leading-snug">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {rel.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
