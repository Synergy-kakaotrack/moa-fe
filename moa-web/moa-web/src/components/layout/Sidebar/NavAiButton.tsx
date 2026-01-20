// components/sidebar/NavAiButton.tsx
'use client';

type Provider = 'chatgpt' | 'claude' | 'gemini';

const META: Record<
  Provider,
  { label: string; icon: string; url: string }
> = {
  chatgpt: {
    label: 'ChatGPT',
    icon: '🤖',
    url: 'https://chat.openai.com',
  },
  claude: {
    label: 'Claude',
    icon: '🧠',
    url: 'https://claude.ai',
  },
  gemini: {
    label: 'Gemini',
    icon: '✨',
    url: 'https://gemini.google.com',
  },
};

export default function NavAiButton({
  provider,
  collapsed,
}: {
  provider: Provider;
  collapsed: boolean;
}) {
  const { label, icon, url } = META[provider];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100"
      title={collapsed ? label : undefined}
      aria-label={label}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </a>
  );
}
