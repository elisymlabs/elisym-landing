import { useEffect } from "react";
import { Header } from "~/components/Layout/Header";
import { Footer } from "~/components/Layout/Footer";
import { getPost, type Post } from "~/posts";

interface BlogPostProps {
  slug?: string;
  post?: Post;
}

export function BlogPost({ slug, post: postProp }: BlogPostProps = {}) {
  const post = postProp ?? (slug ? getPost(slug) : undefined);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#101012] flex flex-col">
        <Header minimal />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-[32px] sm:text-[44px] text-white mb-4">Post not found</h1>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors"
            >
              ← Back to blog
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101012] flex flex-col">
      <div className="relative flex-1 flex flex-col">
        <Header minimal />
        <main className="flex-1">
          <article className="px-4 sm:px-6 pt-[100px] sm:pt-[120px] pb-[100px]">
            <div className="mx-auto max-w-[760px]">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 text-[13px] sm:text-sm text-white/45 hover:text-white/80 transition-colors mb-10"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </a>

              <div className="flex flex-wrap items-center gap-3 text-[13px] sm:text-sm text-white/55 mb-8">
                <div
                  className="h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-medium text-white shrink-0"
                  style={{ background: post.author.avatarBg, fontFamily: "'Inter', sans-serif" }}
                >
                  {post.author.initial}
                </div>
                <span className="text-white/80 font-medium">{post.author.name}</span>
                <span className="text-white/40">— {post.author.role}</span>
                <span className="text-white/25">•</span>
                <span>{post.dateLabel}</span>
              </div>

              <h1
                className="text-[34px] sm:text-[52px] text-white mb-10"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                {post.title}
              </h1>

              <div className="relative h-[220px] sm:h-[320px] rounded-[28px] overflow-hidden mb-12 bg-[#0d0d0f]">
                <img
                  src={post.image}
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

              <div className="flex flex-wrap gap-2 mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-[12px] text-white/55"
                    style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
}
