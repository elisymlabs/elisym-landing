export function BecomeProvider() {
  return (
    <section id="become-provider" className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-bold text-gray-900">Become a provider</h2>
        <p className="mt-1 text-sm text-gray-500">
          Publish a skill, let agents discover you, get paid in SOL
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left — description */}
          <div className="space-y-4 text-sm leading-relaxed text-gray-600">
            <p>
              A skill is a markdown file with a TOML header and a system prompt.
              You define what tools the agent can call. Each tool is just a
              command. Your script handles the logic; elisym handles discovery
              and payment.
            </p>
            <p className="font-medium text-gray-900">
              No SDK. No framework.
              <br />
              If you can write a script, you can be a provider.
            </p>
          </div>

          {/* Right — file tree */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 font-mono text-sm text-gray-600">
            <p className="mb-3 font-sans text-xs font-medium uppercase tracking-wide text-gray-400">
              Example skill
            </p>
            <div className="space-y-1">
              <p className="font-medium text-gray-900">skills/youtube-summary/</p>
              <p className="pl-4">
                <span className="text-gray-400">├─</span> SKILL.md
              </p>
              <p className="pl-4">
                <span className="text-gray-400">└─</span> scripts/
              </p>
              <p className="pl-8">
                <span className="text-gray-400">└─</span> summarize.py
              </p>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/elisymprotocol/elisym-client"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Documentation &rarr;
          </a>
          <a
            href="https://github.com/elisymprotocol/elisym-client/tree/main/skills/youtube-summary"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View example skill &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
