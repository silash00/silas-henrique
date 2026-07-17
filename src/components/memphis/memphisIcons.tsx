type IconProps = { className?: string };

export function CursorIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M18 12 L18 58 L34 46 L46 68 L56 62 L44 40 L62 40 Z"
        fill="var(--mp-icon-fill)"
        stroke="var(--mp-icon-line)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M22 18 L22 48 L34 40 L44 58 L50 54 L40 36 L54 36 Z"
        fill="var(--mp-icon-pink)"
      />
    </svg>
  );
}

export function BracesIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M34 12 C22 12 18 22 18 30 C18 38 14 40 10 40 C14 40 18 42 18 50 C18 58 22 68 34 68"
        stroke="var(--mp-icon-pink)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M62 12 C74 12 78 22 78 30 C78 38 82 40 86 40 C82 40 78 42 78 50 C78 58 74 68 62 68"
        stroke="var(--mp-icon-teal)"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrowserIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="4"
        y="4"
        width="92"
        height="64"
        rx="4"
        fill="var(--mp-icon-fill)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <rect
        x="4"
        y="4"
        width="92"
        height="16"
        fill="var(--mp-icon-yellow)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <circle cx="16" cy="12" r="3" fill="var(--mp-icon-line)" />
      <circle cx="26" cy="12" r="3" fill="var(--mp-icon-line)" />
      <circle cx="36" cy="12" r="3" fill="var(--mp-icon-line)" />
      <rect x="14" y="32" width="40" height="6" fill="var(--mp-icon-teal)" />
      <rect x="14" y="44" width="28" height="6" fill="var(--mp-icon-pink)" />
      <rect x="58" y="32" width="24" height="24" fill="var(--mp-icon-line)" />
    </svg>
  );
}

export function TerminalIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="4"
        y="4"
        width="92"
        height="64"
        rx="4"
        fill="var(--mp-icon-fill)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <rect
        x="10"
        y="18"
        width="80"
        height="44"
        rx="2"
        fill="var(--mp-icon-mark)"
      />
      <path
        d="M18 28 L30 36 L18 44"
        stroke="var(--mp-icon-teal)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="36"
        y1="44"
        x2="62"
        y2="44"
        stroke="var(--mp-icon-yellow)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M40 6 L46 30 L70 36 L46 42 L40 66 L34 42 L10 36 L34 30 Z"
        fill="var(--mp-icon-yellow)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle
        cx="64"
        cy="16"
        r="6"
        fill="var(--mp-icon-pink)"
        stroke="var(--mp-icon-line)"
        strokeWidth="3"
      />
    </svg>
  );
}

export function NodeIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="8"
        y="18"
        width="36"
        height="44"
        rx="4"
        fill="var(--mp-icon-teal)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <rect
        x="56"
        y="18"
        width="36"
        height="44"
        rx="4"
        fill="var(--mp-icon-pink)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <line
        x1="44"
        y1="40"
        x2="56"
        y2="40"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="26" cy="32" r="4" fill="var(--mp-icon-line)" />
      <circle cx="26" cy="48" r="4" fill="var(--mp-icon-line)" />
      <circle cx="74" cy="32" r="4" fill="var(--mp-icon-line)" />
      <circle cx="74" cy="48" r="4" fill="var(--mp-icon-line)" />
    </svg>
  );
}

/** IA — chip / neural mark */
export function AiIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="18"
        y="18"
        width="44"
        height="44"
        rx="8"
        fill="var(--mp-icon-pink)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <circle
        cx="40"
        cy="40"
        r="10"
        fill="var(--mp-icon-fill)"
        stroke="var(--mp-icon-line)"
        strokeWidth="3"
      />
      <circle cx="40" cy="40" r="4" fill="var(--mp-icon-line)" />
      <line
        x1="40"
        y1="8"
        x2="40"
        y2="18"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="62"
        x2="40"
        y2="72"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="40"
        x2="18"
        y2="40"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="62"
        y1="40"
        x2="72"
        y2="40"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="16"
        x2="24"
        y2="24"
        stroke="var(--mp-icon-teal)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="64"
        y1="16"
        x2="56"
        y2="24"
        stroke="var(--mp-icon-yellow)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="64"
        x2="24"
        y2="56"
        stroke="var(--mp-icon-yellow)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="64"
        y1="64"
        x2="56"
        y2="56"
        stroke="var(--mp-icon-teal)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** n8n — fluxo com nós */
export function FlowIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 110 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M28 36 H48 M62 36 H82"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M48 36 C54 36 56 22 62 22"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx="18"
        cy="36"
        r="14"
        fill="var(--mp-icon-yellow)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <circle
        cx="55"
        cy="22"
        r="10"
        fill="var(--mp-icon-teal)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <circle
        cx="55"
        cy="50"
        r="10"
        fill="var(--mp-icon-pink)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <circle
        cx="92"
        cy="36"
        r="14"
        fill="var(--mp-icon-fill)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <path
        d="M48 36 C54 36 56 50 62 50"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M86 36 L92 30 L98 36 L92 42 Z" fill="var(--mp-icon-line)" />
    </svg>
  );
}

/** Dashboards — barras */
export function ChartIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 90 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="6"
        y="6"
        width="78"
        height="68"
        rx="4"
        fill="var(--mp-icon-fill)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <rect
        x="18"
        y="42"
        width="14"
        height="22"
        fill="var(--mp-icon-pink)"
        stroke="var(--mp-icon-line)"
        strokeWidth="3"
      />
      <rect
        x="38"
        y="28"
        width="14"
        height="36"
        fill="var(--mp-icon-teal)"
        stroke="var(--mp-icon-line)"
        strokeWidth="3"
      />
      <rect
        x="58"
        y="18"
        width="14"
        height="46"
        fill="var(--mp-icon-yellow)"
        stroke="var(--mp-icon-line)"
        strokeWidth="3"
      />
    </svg>
  );
}

/** PWAs — device */
export function PhoneIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 56 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="6"
        y="4"
        width="44"
        height="82"
        rx="8"
        fill="var(--mp-icon-fill)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <rect x="14" y="16" width="28" height="48" fill="var(--mp-icon-teal)" />
      <rect
        x="20"
        y="74"
        width="16"
        height="4"
        rx="2"
        fill="var(--mp-icon-line)"
      />
      <circle
        cx="40"
        cy="24"
        r="5"
        fill="var(--mp-icon-yellow)"
        stroke="var(--mp-icon-line)"
        strokeWidth="2.5"
      />
      <path
        d="M38 22 L40 24 L44 20"
        stroke="var(--mp-icon-line)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** RAG — docs / retrieval */
export function DocsIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 90 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="22"
        y="8"
        width="52"
        height="64"
        rx="3"
        fill="var(--mp-icon-yellow)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <rect
        x="12"
        y="14"
        width="52"
        height="64"
        rx="3"
        fill="var(--mp-icon-fill)"
        stroke="var(--mp-icon-line)"
        strokeWidth="4"
      />
      <line
        x1="22"
        y1="30"
        x2="52"
        y2="30"
        stroke="var(--mp-icon-line)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="42"
        x2="48"
        y2="42"
        stroke="var(--mp-icon-teal)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="54"
        x2="44"
        y2="54"
        stroke="var(--mp-icon-pink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="68"
        cy="58"
        r="14"
        fill="var(--mp-icon-pink)"
        stroke="var(--mp-icon-line)"
        strokeWidth="3"
      />
      <circle
        cx="68"
        cy="58"
        r="6"
        fill="none"
        stroke="var(--mp-icon-line)"
        strokeWidth="3"
      />
      <line
        x1="72"
        y1="64"
        x2="78"
        y2="72"
        stroke="var(--mp-icon-line)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
