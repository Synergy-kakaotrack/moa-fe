'use client';

import clsx from 'clsx';
import styles from './NavAiButton.module.css';

import {
  IconChatGPT,
  IconClaude,
  IconGemini,
  IconExternalLink,
} from '@/components/icons';

type Provider = 'chatgpt' | 'claude' | 'gemini';

const AGENT_META = {
  chatgpt: {
    label: 'ChatGPT',
    Icon: IconChatGPT,
    url: 'https://chat.openai.com',
  },
  claude: {
    label: 'Claude',
    Icon: IconClaude,
    url: 'https://claude.ai',
  },
  gemini: {
    label: 'Gemini',
    Icon: IconGemini,
    url: 'https://gemini.google.com',
  },
} satisfies Record<
  Provider,
  { label: string; Icon: React.FC<{ className?: string }>; url: string }
>;

interface NavAiButtonProps {
  provider: Provider;
  collapsed?: boolean;
}

export default function NavAiButton({
  provider,
  collapsed = false,
}: NavAiButtonProps) {
  const { label, Icon, url } = AGENT_META[provider];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(styles.button, collapsed && styles.collapsed)}
    >
      <span className={styles.left}>
        <Icon className={styles.icon} />
        {!collapsed && <span className={styles.label}>{label}</span>}
      </span>

      {!collapsed && (
        <IconExternalLink className={styles.linkIcon} />
      )}
    </a>
  );
}
