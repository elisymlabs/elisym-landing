import { useEffect } from "react";
import { Header } from "~/components/Layout/Header";
import { Footer } from "~/components/Layout/Footer";
import { RevealSection } from "~/components/RevealSection";
import { posts, type Post } from "~/posts";

function PostCard({ post }: { post: Post }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block rounded-[36px] overflow-hidden grid grid-cols-1 md:grid-cols-2 hover:border-white/12 hover:shadow-[0_0_80px_-15px_rgba(255,255,255,0.08)]"
      style={{
        background: "#141416",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.8s ease, box-shadow 0.8s ease",
      }}
    >
      <div className="flex flex-col p-6 sm:p-10 gap-4 md:gap-6">
        <div className="flex items-center gap-3 text-[13px] sm:text-sm text-white/55">
          <div
            className="h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-medium text-white shrink-0"
            style={{ background: post.author.avatarBg, fontFamily: "'Inter', sans-serif" }}
          >
            {post.author.initial}
          </div>
          <span className="text-white/80 font-medium">{post.author.name}</span>
          <span className="hidden lg:inline text-white/40">— {post.author.role}</span>
          <span className="text-white/25">•</span>
          <span className="whitespace-nowrap">{post.dateLabel}</span>
        </div>

        <h2
          className="text-[24px] sm:text-[30px] text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </h2>

        <p
          className="text-[14px] sm:text-[15px] leading-[1.7] text-white/55 line-clamp-3"
        >
          {post.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
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

      <div className="order-first md:order-none relative min-h-[180px] md:min-h-[260px] m-5 sm:m-6 md:my-6 md:mr-6 md:ml-2 mb-0 md:mb-6 rounded-[24px] overflow-hidden bg-[#0d0d0f]">
        <img
          src={post.image}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03]"
          style={{
            transition: "scale 700ms cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "scale",
            backfaceVisibility: "hidden",
          }}
        />
      </div>
    </a>
  );
}

export function Blog() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#101012] flex flex-col">
      <div className="relative flex-1 flex flex-col">
        <Header minimal />
        <main className="flex-1">
          <section className="pt-[100px] sm:pt-[120px] pb-[100px] px-4 sm:px-6">
            <div className="mx-auto max-w-[1140px] flex flex-col gap-6 sm:gap-8">
              <a
                href="/"
                className="inline-flex items-center gap-2 self-start text-[13px] sm:text-sm text-white/45 hover:text-white/80 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </a>
              {posts.map((post) => (
                <RevealSection key={post.slug}>
                  <PostCard post={post} />
                </RevealSection>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
