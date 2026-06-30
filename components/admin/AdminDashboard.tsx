'use client';

import {useEffect, useMemo, useState} from 'react';
import {
  Activity,
  Archive,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ClipboardCheck,
  Download,
  Eye,
  FileText,
  FolderOpen,
  Inbox,
  LayoutDashboard,
  LineChart,
  LogOut,
  Mail,
  Menu,
  Phone,
  PieChart,
  RefreshCw,
  Search,
  Settings,
  Sun,
  Trash2,
  Users,
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import type {
  QuickCheckDocument,
  QuickCheckRecord,
  QuickCheckStatus,
  QuickCheckSummaryItem,
} from '@/lib/quickCheckSupabase';
import {getAdminSupabaseBrowserClient} from '@/lib/supabaseBrowser';

type Toast = {
  type: 'success' | 'error';
  message: string;
} | null;

type MetricTone = 'blue' | 'green' | 'amber' | 'violet';

const statusOrder: QuickCheckStatus[] = ['pending', 'reviewing', 'completed'];

const statusMeta: Record<
  QuickCheckStatus,
  {
    label: string;
    icon: LucideIcon;
    badge: string;
    dot: string;
    accent: string;
    chart: string;
  }
> = {
  pending: {
    label: 'Neu',
    icon: Inbox,
    badge: 'bg-[#EAF4FC] text-[#1C6AA8] ring-[#D8EAF7]',
    dot: 'bg-[#1C6AA8]',
    accent: 'text-[#1C6AA8]',
    chart: '#1C6AA8',
  },
  reviewing: {
    label: 'In Prüfung',
    icon: Activity,
    badge: 'bg-[#FFF4E4] text-[#B7791F] ring-[#F8E2B9]',
    dot: 'bg-[#F59E0B]',
    accent: 'text-[#B7791F]',
    chart: '#F59E0B',
  },
  completed: {
    label: 'Erledigt',
    icon: CheckCircle2,
    badge: 'bg-[#ECFDF5] text-[#15803D] ring-[#C9F2DD]',
    dot: 'bg-[#22C55E]',
    accent: 'text-[#15803D]',
    chart: '#22C55E',
  },
};

const metricToneClassNames: Record<
  MetricTone,
  {
    iconWrap: string;
    icon: string;
    pulse: string;
    trend: string;
  }
> = {
  blue: {
    iconWrap: 'bg-[#EEF4FF] text-[#1C6AA8]',
    icon: 'text-[#1C6AA8]',
    pulse: 'from-[#1C6AA8]/18 to-transparent',
    trend: 'text-[#16A34A]',
  },
  green: {
    iconWrap: 'bg-[#ECFDF5] text-[#16A34A]',
    icon: 'text-[#16A34A]',
    pulse: 'from-[#22C55E]/16 to-transparent',
    trend: 'text-[#16A34A]',
  },
  amber: {
    iconWrap: 'bg-[#FFF7ED] text-[#F59E0B]',
    icon: 'text-[#F59E0B]',
    pulse: 'from-[#F59E0B]/16 to-transparent',
    trend: 'text-[#DC2626]',
  },
  violet: {
    iconWrap: 'bg-[#F4F0FF] text-[#7C3AED]',
    icon: 'text-[#7C3AED]',
    pulse: 'from-[#7C3AED]/14 to-transparent',
    trend: 'text-[#16A34A]',
  },
};

const navSections = [
  {
    title: 'Workspace',
    items: [
      {label: 'Übersicht', icon: LayoutDashboard, active: true},
      {label: 'Anfragen', icon: Inbox},
      {label: 'Dokumente', icon: FolderOpen},
      {label: 'Benutzer', icon: Users},
      {label: 'Pipeline', icon: LineChart},
      {label: 'Aufgaben', icon: ClipboardCheck},
      {label: 'Kalender', icon: CalendarDays},
    ],
  },
  {
    title: 'Analytics',
    items: [
      {label: 'Statistiken', icon: PieChart},
      {label: 'Reports', icon: FileText},
    ],
  },
  {
    title: 'System',
    items: [
      {label: 'Einstellungen', icon: Settings},
      {label: 'Archiv', icon: Archive},
    ],
  },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function getInitials(name?: string | null) {
  if (!name) {
    return 'HG';
  }

  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? 'H';
  const second = parts[1]?.[0] ?? parts[0]?.[1] ?? 'G';

  return `${first}${second}`.toUpperCase();
}

function csvEscape(value: string | number | null | undefined) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

function getSummaryValue(items: QuickCheckSummaryItem[] | null | undefined, label: string) {
  return (items ?? []).find((item) => item.label.toLowerCase() === label.toLowerCase())?.value ?? '-';
}

function getRequestTitle(request: QuickCheckRecord) {
  const propertyType = getSummaryValue(request.summary, 'Immobilienart');
  return propertyType && propertyType !== '-' ? propertyType : 'QuickCheck-Anfrage';
}

function getDocumentCount(documents: QuickCheckDocument[] | null | undefined) {
  const safeDocuments = documents ?? [];

  if (safeDocuments.length === 0) {
    return 'Keine Dokumente';
  }

  return `${safeDocuments.length} Dokument${safeDocuments.length === 1 ? '' : 'e'}`;
}

function StatusPill({status}: {status: QuickCheckStatus}) {
  const meta = statusMeta[status];
  const Icon = meta.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.62rem] font-semibold ring-1 ${meta.badge}`}
    >
      <Icon size={12} />
      {meta.label}
    </span>
  );
}

function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
  tone,
  trend,
}: {
  label: string;
  value: number;
  hint: string;
  icon: LucideIcon;
  tone: MetricTone;
  trend: string;
}) {
  const toneClasses = metricToneClassNames[tone];

  return (
    <article className="group relative overflow-hidden rounded-[15px] border border-[rgba(20,40,80,0.08)] bg-white/88 p-2.5 shadow-[0_7px_22px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.065)]">
      <div className={`pointer-events-none absolute -right-8 -top-10 h-[76px] w-[76px] rounded-full bg-gradient-to-br ${toneClasses.pulse}`} />
      <div className="relative flex items-start justify-between gap-2.5">
        <div>
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#748195]">{label}</p>
          <div className="mt-1 flex items-end gap-1.5">
            <span className="text-[1.45rem] font-semibold leading-none tracking-[-0.06em] text-[#07111F]">{value}</span>
            <span className={`mb-0.5 text-[0.7rem] font-bold ${toneClasses.trend}`}>{trend}</span>
          </div>
          <p className="mt-0.5 text-[0.68rem] text-[#6E7787]">{hint}</p>
        </div>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_7px_16px_rgba(15,23,42,0.05)] ${toneClasses.iconWrap}`}
        >
          <Icon size={16} strokeWidth={1.8} className={toneClasses.icon} />
        </div>
      </div>
    </article>
  );
}

export default function AdminDashboard({onLogout}: {onLogout?: () => void}) {
  const [requests, setRequests] = useState<QuickCheckRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<QuickCheckStatus | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);

  const getAuthHeaders = async () => {
    const supabase = getAdminSupabaseBrowserClient();
    if (!supabase) {
      throw new Error('Supabase ist für den Adminbereich nicht konfiguriert.');
    }

    const {data} = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (!token) {
      throw new Error('Nicht angemeldet.');
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const loadRequests = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/admin/quick-check', {
        headers,
        cache: 'no-store',
      });
      const payload = (await response.json().catch(() => null)) as {requests?: QuickCheckRecord[]; error?: string} | null;

      if (!response.ok) {
        throw new Error(payload?.error || 'Anfragen konnten nicht geladen werden.');
      }

      const incomingRequests = payload?.requests ?? [];
      setRequests(incomingRequests);
      setSelectedId((current) => current ?? incomingRequests[0]?.id ?? null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Anfragen konnten nicht geladen werden.';
      setLoadError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredRequests = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      const haystack = [
        request.name,
        request.email,
        request.phone,
        request.address,
        getRequestTitle(request),
        ...(request.summary ?? []).flatMap((item) => [item.label, item.value]),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return matchesStatus && (!needle || haystack.includes(needle));
    });
  }, [query, requests, statusFilter]);

  const stats = useMemo(() => {
    return requests.reduce(
      (acc, request) => {
        acc.total += 1;
        acc[request.status] += 1;
        return acc;
      },
      {total: 0, pending: 0, reviewing: 0, completed: 0} as Record<'total' | QuickCheckStatus, number>,
    );
  }, [requests]);

  const trend = useMemo(() => {
    const days = Array.from({length: 7}, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      return {
        key: date.toISOString().slice(0, 10),
        label: new Intl.DateTimeFormat('de-DE', {weekday: 'short'}).format(date).replace('.', ''),
        count: 0,
      };
    });

    const lookup = new Map(days.map((day) => [day.key, day]));

    requests.forEach((request) => {
      const key = request.created_at.slice(0, 10);
      const day = lookup.get(key);
      if (day) {
        day.count += 1;
      }
    });

    return days;
  }, [requests]);

  const statusBreakdown = useMemo(() => {
    return statusOrder.map((status) => ({
      status,
      label: statusMeta[status].label,
      value: stats[status],
      percentage: stats.total ? Math.round((stats[status] / stats.total) * 100) : 0,
    }));
  }, [stats]);

  const completionRate = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;
  const selectedRequest = requests.find((request) => request.id === selectedId) ?? filteredRequests[0] ?? null;

  const updateStatus = async (id: string, status: QuickCheckStatus) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/admin/quick-check', {
        method: 'PATCH',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, status}),
      });
      const payload = (await response.json().catch(() => null)) as {request?: QuickCheckRecord; error?: string} | null;

      if (!response.ok || !payload?.request) {
        throw new Error(payload?.error || 'Status konnte nicht aktualisiert werden.');
      }

      setRequests((current) => current.map((request) => (request.id === id ? payload.request! : request)));
      setToast({type: 'success', message: `Status auf "${statusMeta[status].label}" gesetzt.`});
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Status konnte nicht aktualisiert werden.';
      setToast({type: 'error', message});
    }
  };

  const deleteRequest = async (id: string) => {
    const confirmed = window.confirm('Diese Anfrage wirklich löschen?');
    if (!confirmed) {
      return;
    }

    try {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/admin/quick-check', {
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
      });
      const payload = (await response.json().catch(() => null)) as {error?: string} | null;

      if (!response.ok) {
        throw new Error(payload?.error || 'Anfrage konnte nicht gelöscht werden.');
      }

      setRequests((current) => current.filter((request) => request.id !== id));
      setSelectedId((current) => (current === id ? null : current));
      setToast({type: 'success', message: 'Anfrage gelöscht.'});
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Anfrage konnte nicht gelöscht werden.';
      setToast({type: 'error', message});
    }
  };

  const logout = async () => {
    const supabase = getAdminSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }

    onLogout?.();
    window.location.href = '/admin';
  };

  const exportCsv = () => {
    const rows = [
      ['Name', 'E-Mail', 'Telefon', 'Adresse', 'Status', 'Erstellt am', 'Dokumente'],
      ...filteredRequests.map((request) => [
        request.name,
        request.email,
        request.phone,
        request.address,
        statusMeta[request.status].label,
        formatDate(request.created_at),
        (request.documents ?? []).map((document) => document.name).join(', '),
      ]),
    ];
    const csv = rows.map((row) => row.map(csvEscape).join(';')).join('\n');
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hg-quickcheck-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const metricCards = [
    {
      label: 'Gesamt Anfragen',
      value: stats.total,
      hint: 'Alle QuickCheck-Eingänge',
      trend: '+ live',
      icon: Inbox,
      tone: 'blue' as MetricTone,
    },
    {
      label: 'Neu',
      value: stats.pending,
      hint: 'Noch nicht geprüft',
      trend: stats.pending > 0 ? '+ offen' : 'klar',
      icon: Activity,
      tone: 'green' as MetricTone,
    },
    {
      label: 'In Prüfung',
      value: stats.reviewing,
      hint: 'Aktive Bearbeitung',
      trend: stats.reviewing > 0 ? '+ aktiv' : 'ruhig',
      icon: Clock3,
      tone: 'amber' as MetricTone,
    },
    {
      label: 'Erledigt',
      value: stats.completed,
      hint: `${completionRate}% Abschlussquote`,
      trend: `${completionRate}%`,
      icon: CheckCircle2,
      tone: 'violet' as MetricTone,
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4F8FC] text-[#07111F]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_14%,rgba(28,106,168,0.13),transparent_30%),radial-gradient(circle_at_88%_8%,rgba(126,180,221,0.16),transparent_28%),linear-gradient(135deg,#F8FBFE_0%,#EEF6FC_48%,#F8FBFE_100%)]" />

      <div className="mx-auto grid w-full max-w-none gap-3 px-3 py-3 sm:px-4 lg:grid-cols-[164px_minmax(0,1fr)] 2xl:grid-cols-[172px_minmax(0,1fr)] 2xl:px-6">
        <DashboardSidebar />

        <div className="min-w-0">
          <DashboardHeader
            query={query}
            setQuery={setQuery}
            onRefresh={loadRequests}
            onExport={exportCsv}
            onLogout={logout}
            isLoading={isLoading}
          />

          <section className="grid gap-2.5 md:grid-cols-2 2xl:grid-cols-4">
            {metricCards.map((card) => (
              <MetricCard key={card.label} {...card} />
            ))}
          </section>

          <section className="mt-2.5 grid gap-2.5 xl:grid-cols-12">
            <div className="xl:col-span-8">
              <ActivityChart trend={trend} />
            </div>
            <div className="xl:col-span-4">
              <StatusDistribution stats={stats} statusBreakdown={statusBreakdown} completionRate={completionRate} />
            </div>
          </section>

          <section className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.35fr)_minmax(500px,640px)] 2xl:grid-cols-[minmax(0,1.65fr)_minmax(560px,690px)]">
            <section className="rounded-[18px] border border-[rgba(20,40,80,0.08)] bg-white/88 p-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
              <div className="flex flex-col gap-2.5 2xl:flex-row 2xl:items-center 2xl:justify-between">
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#1C6AA8]">Anfragen</p>
                  <h2 className="mt-0.5 text-lg font-semibold tracking-[-0.04em] text-[#07111F]">Letzte Eingänge</h2>
                </div>

                <div className="flex w-full overflow-x-auto rounded-full border border-[rgba(20,40,80,0.08)] bg-white/82 p-0.5 shadow-[0_8px_20px_rgba(15,23,42,0.04)] 2xl:w-auto">
                    {(['all', ...statusOrder] as const).map((status) => {
                      const isActive = statusFilter === status;
                      const label = status === 'all' ? 'Alle' : statusMeta[status].label;

                      return (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setStatusFilter(status)}
                          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.13em] transition-all ${
                            isActive
                              ? 'bg-[#1C6AA8] text-white shadow-[0_10px_24px_rgba(28,106,168,0.20)]'
                              : 'text-[#6E7787] hover:bg-[#EEF6FC] hover:text-[#1C6AA8]'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                </div>
              </div>

              <div className="mt-3">
                {isLoading ? (
                  <LoadingState />
                ) : loadError ? (
                  <ErrorState message={loadError} onRetry={loadRequests} />
                ) : filteredRequests.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="overflow-hidden rounded-[18px] border border-[rgba(20,40,80,0.08)] bg-[#F9FCFF]/80">
                    <div className="hidden grid-cols-[58px_minmax(170px,0.95fr)_minmax(230px,1.35fr)_72px_88px_30px] gap-2 border-b border-[rgba(20,40,80,0.08)] px-2.5 py-2 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#8A94A5] lg:grid">
                      <span>ID</span>
                      <span>Kontakt</span>
                      <span>E-Mail</span>
                      <span>Status</span>
                      <span>Erstellt</span>
                      <span />
                    </div>
                    <div className="divide-y divide-[rgba(20,40,80,0.08)]">
                      {filteredRequests.map((request, index) => (
                        <RequestRow
                          key={request.id}
                          request={request}
                          index={index}
                          selected={selectedRequest?.id === request.id}
                          onSelect={() => setSelectedId(request.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            <aside className="xl:sticky xl:top-2.5 xl:self-start">
              <section className="max-h-[calc(100vh-20px)] min-h-[250px] overflow-y-auto rounded-[18px] border border-[rgba(20,40,80,0.08)] bg-white/88 p-2.5 shadow-[0_12px_34px_rgba(15,23,42,0.052)] backdrop-blur-xl">
                {selectedRequest ? (
                  <RequestDetails
                    request={selectedRequest}
                    onStatusChange={(status) => updateStatus(selectedRequest.id, status)}
                    onDelete={() => deleteRequest(selectedRequest.id)}
                  />
                ) : (
                  <NoSelectionState />
                )}
              </section>
            </aside>
          </section>
        </div>
      </div>

      {toast ? (
        <div
          className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-3 text-sm font-semibold shadow-[0_20px_60px_rgba(15,23,42,0.22)] ring-1 ${
            toast.type === 'success'
              ? 'bg-[#ECFDF5] text-[#15803D] ring-[#C9F2DD]'
              : 'bg-[#FEF2F2] text-[#DC2626] ring-[#F7D0D0]'
          }`}
        >
          {toast.message}
        </div>
      ) : null}
    </main>
  );
}

function DashboardSidebar() {
  return (
    <aside className="sticky top-2.5 hidden h-[calc(100vh-20px)] flex-col rounded-[22px] border border-[rgba(20,40,80,0.08)] bg-white/90 p-2.5 shadow-[0_14px_44px_rgba(15,23,42,0.065)] backdrop-blur-xl lg:flex">
      <div className="mb-3 flex items-center gap-2 px-0.5">
        <div className="grid h-8 w-8 place-items-center rounded-[12px] bg-gradient-to-br from-[#1C6AA8] to-[#7EB4DD] text-xs font-black text-white shadow-[0_12px_24px_rgba(28,106,168,0.18)]">
          HG
        </div>
        <div>
          <p className="text-[0.82rem] font-semibold tracking-[-0.04em] text-[#07111F]">HG Grundbesitz</p>
          <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#7A8798]">Admin Suite</p>
        </div>
      </div>

      <nav className="space-y-2.5">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="mb-1 px-2 text-[0.56rem] font-bold uppercase tracking-[0.19em] text-[#8B97A9]">{section.title}</p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`group flex w-full items-center justify-between rounded-[13px] px-2 py-1.5 text-left text-[0.74rem] font-semibold transition-all ${
                      item.active
                        ? 'bg-gradient-to-r from-[#1C6AA8] to-[#2D83C4] text-white shadow-[0_12px_28px_rgba(28,106,168,0.20)]'
                        : 'text-[#415066] hover:bg-[#EEF6FC] hover:text-[#1C6AA8]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={15} />
                      {item.label}
                    </span>
                    {item.active ? <span className="rounded-full bg-white/18 px-1.5 py-0.5 text-[0.55rem]">Live</span> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function DashboardHeader({
  query,
  setQuery,
  onRefresh,
  onExport,
  onLogout,
  isLoading,
}: {
  query: string;
  setQuery: (value: string) => void;
  onRefresh: () => void;
  onExport: () => void;
  onLogout: () => void;
  isLoading: boolean;
}) {
  return (
    <header className="mb-2.5 rounded-[16px] border border-[rgba(20,40,80,0.08)] bg-white/88 px-2.5 py-1.5 shadow-[0_10px_28px_rgba(15,23,42,0.05)] backdrop-blur-xl">
      <div className="grid gap-2 xl:grid-cols-[120px_minmax(420px,1fr)_auto] xl:items-center">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-[14px] border border-[rgba(20,40,80,0.08)] bg-white text-[#1C6AA8] shadow-[0_8px_22px_rgba(15,23,42,0.05)] lg:hidden"
            aria-label="Menü öffnen"
          >
            <Menu size={17} />
          </button>
          <div>
            <h1 className="text-base font-semibold tracking-[-0.05em] text-[#07111F] sm:text-lg">Hallo, Admin</h1>
          </div>
        </div>

        <label className="flex h-9 items-center gap-2.5 rounded-[14px] border border-[rgba(20,40,80,0.08)] bg-[#F9FCFF] px-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <Search size={16} className="text-[#617089]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Suche nach Namen, E-Mails, Dokumenten..."
            className="min-w-0 flex-1 bg-transparent text-[0.82rem] text-[#07111F] outline-none placeholder:text-[#95A0AF]"
          />
          <kbd className="hidden rounded-lg border border-[rgba(20,40,80,0.08)] bg-white px-1.5 py-0.5 text-[0.65rem] font-bold text-[#7A8798] sm:inline">
            ⌘ K
          </kbd>
        </label>

        <div className="flex flex-wrap items-center justify-start gap-2 xl:justify-end">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[rgba(20,40,80,0.08)] bg-white px-3 text-xs font-bold text-[#415066] shadow-[0_8px_20px_rgba(15,23,42,0.045)] transition-all hover:-translate-y-0.5 hover:text-[#1C6AA8]"
          >
            <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
            Aktualisieren
          </button>
          <button
            type="button"
            onClick={onExport}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[rgba(20,40,80,0.08)] bg-white px-3 text-xs font-bold text-[#415066] shadow-[0_8px_20px_rgba(15,23,42,0.045)] transition-all hover:-translate-y-0.5 hover:text-[#1C6AA8]"
          >
            <Download size={15} />
            CSV
          </button>
          <div className="hidden h-8 w-px bg-[rgba(20,40,80,0.08)] md:block" />
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full border border-[rgba(20,40,80,0.08)] bg-white text-[#415066] shadow-[0_8px_20px_rgba(15,23,42,0.045)]"
            aria-label="Benachrichtigungen"
          >
            <Bell size={16} />
          </button>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full border border-[rgba(20,40,80,0.08)] bg-white text-[#415066] shadow-[0_8px_20px_rgba(15,23,42,0.045)]"
            aria-label="Darstellung"
          >
            <Sun size={16} />
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-gradient-to-b from-[#2D83C4] to-[#1C6AA8] px-3 text-xs font-black uppercase tracking-[0.13em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_10px_22px_rgba(28,106,168,0.18)] transition-all hover:-translate-y-0.5"
          >
            AD
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}

function ActivityChart({trend}: {trend: {key: string; label: string; count: number}[]}) {
  const width = 760;
  const height = 124;
  const paddingX = 34;
  const paddingY = 20;
  const maxValue = Math.max(1, ...trend.map((day) => day.count));
  const points = trend.map((day, index) => {
    const x = paddingX + (index * (width - paddingX * 2)) / Math.max(1, trend.length - 1);
    const y = height - paddingY - (day.count / maxValue) * (height - paddingY * 2);

    return {...day, x, y};
  });
  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? width - paddingX} ${height - paddingY} L ${
    points[0]?.x ?? paddingX
  } ${height - paddingY} Z`;

  return (
    <article className="rounded-[18px] border border-[rgba(20,40,80,0.08)] bg-white/88 p-2.5 shadow-[0_12px_34px_rgba(15,23,42,0.052)] backdrop-blur-xl">
      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1C6AA8]">Aktivität</p>
          <h2 className="mt-0.5 text-lg font-semibold tracking-[-0.04em]">Aktivitätsübersicht</h2>
        </div>
        <button
          type="button"
          className="inline-flex w-fit items-center gap-1.5 rounded-[14px] border border-[rgba(20,40,80,0.08)] bg-white px-3 py-2 text-xs font-bold text-[#415066] shadow-[0_8px_20px_rgba(15,23,42,0.045)]"
        >
          Diese Woche
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="relative overflow-hidden rounded-[18px] bg-[#F8FBFF] p-2.5">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[124px] w-full" role="img" aria-label="Anfragen pro Tag">
          <defs>
            <linearGradient id="activityArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1C6AA8" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#1C6AA8" stopOpacity="0" />
            </linearGradient>
            <filter id="activityGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {[0, 1, 2, 3].map((line) => {
            const y = paddingY + (line * (height - paddingY * 2)) / 3;
            return <line key={line} x1={paddingX} x2={width - paddingX} y1={y} y2={y} stroke="#DDEAF5" strokeDasharray="7 9" />;
          })}
          <path d={areaPath} fill="url(#activityArea)" />
          <path d={linePath} fill="none" stroke="#1C6AA8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" filter="url(#activityGlow)" />
          {points.map((point) => (
            <g key={point.key}>
              <circle cx={point.x} cy={point.y} r="5" fill="#1C6AA8" stroke="white" strokeWidth="3" />
              <text x={point.x} y={height - 6} textAnchor="middle" className="fill-[#748195] text-[12px] font-semibold">
                {point.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </article>
  );
}

function StatusDistribution({
  stats,
  statusBreakdown,
  completionRate,
}: {
  stats: Record<'total' | QuickCheckStatus, number>;
  statusBreakdown: {status: QuickCheckStatus; label: string; value: number; percentage: number}[];
  completionRate: number;
}) {
  let cursor = 0;
  const gradientSegments = statusBreakdown.map((item) => {
    const start = cursor;
    const end = cursor + (stats.total ? (item.value / stats.total) * 100 : 0);
    cursor = end;
    return `${statusMeta[item.status].chart} ${start}% ${end}%`;
  });
  const donutGradient = stats.total ? `conic-gradient(${gradientSegments.join(', ')}, #E7EEF6 ${cursor}% 100%)` : '#E7EEF6';

  return (
    <article className="h-full rounded-[18px] border border-[rgba(20,40,80,0.08)] bg-white/88 p-2.5 shadow-[0_12px_34px_rgba(15,23,42,0.052)] backdrop-blur-xl">
      <div className="mb-2.5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1C6AA8]">Pipeline</p>
          <h2 className="mt-0.5 text-lg font-semibold tracking-[-0.04em]">Status Verteilung</h2>
        </div>
        <span className="rounded-full bg-[#EAF4FC] px-2.5 py-1 text-[0.68rem] font-bold text-[#1C6AA8]">{completionRate}%</span>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-[88px_minmax(0,1fr)] xl:grid-cols-1 2xl:grid-cols-[88px_minmax(0,1fr)]">
        <div className="relative mx-auto h-[5.5rem] w-[5.5rem] rounded-full p-2" style={{background: donutGradient}}>
          <div className="grid h-full w-full place-items-center rounded-full bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            <div className="text-center">
              <div className="text-xl font-semibold tracking-[-0.06em]">{stats.total}</div>
              <div className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#8A94A5]">Gesamt</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {statusBreakdown.map((item) => (
            <div key={item.status} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${statusMeta[item.status].dot}`} />
                <span className="text-xs font-semibold text-[#415066]">{item.label}</span>
              </div>
              <span className="text-xs font-bold text-[#07111F]">
                {item.value} <span className="text-[#8A94A5]">({item.percentage}%)</span>
              </span>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 flex w-full items-center justify-between rounded-[14px] border border-[rgba(20,40,80,0.08)] bg-[#F9FCFF] px-3 py-2 text-xs font-bold text-[#415066] transition-all hover:bg-[#EAF4FC] hover:text-[#1C6AA8]"
          >
            Kompletten Report anzeigen
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

function RequestRow({
  request,
  index,
  selected,
  onSelect,
}: {
  request: QuickCheckRecord;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`grid w-full gap-2 px-2.5 py-2.5 text-left transition-all lg:grid-cols-[58px_minmax(170px,0.95fr)_minmax(230px,1.35fr)_72px_88px_30px] lg:items-center ${
        selected ? 'bg-[#EAF4FC]/75' : 'bg-white/70 hover:bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-[12px] bg-gradient-to-b from-[#2D83C4] to-[#1C6AA8] text-[0.68rem] font-black text-white shadow-[0_10px_22px_rgba(28,106,168,0.18)]">
          {getInitials(request.name)}
        </div>
        <span className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#8A94A5]">#{String(index + 1).padStart(3, '0')}</span>
      </div>

      <div className="min-w-0">
        <p className="truncate text-[0.82rem] font-bold text-[#07111F]">{request.name}</p>
        <p className="mt-0.5 truncate text-[0.68rem] text-[#6E7787]">{getRequestTitle(request)}</p>
      </div>

      <p className="min-w-0 truncate text-[0.72rem] font-medium text-[#415066]">{request.email}</p>
      <StatusPill status={request.status} />
      <p className="text-[0.68rem] font-semibold text-[#6E7787]">{formatShortDate(request.created_at)}</p>
      <span className="grid h-7 w-7 place-items-center rounded-full border border-[rgba(20,40,80,0.08)] bg-white text-[#1C6AA8] shadow-[0_8px_18px_rgba(15,23,42,0.045)]">
        <Eye size={14} />
      </span>
    </button>
  );
}

function LoadingState() {
  return (
    <div className="grid gap-2.5">
      {Array.from({length: 4}).map((_, index) => (
        <div key={index} className="h-16 animate-pulse rounded-[18px] bg-[#EEF6FC]" />
      ))}
    </div>
  );
}

function ErrorState({message, onRetry}: {message: string; onRetry: () => void}) {
  return (
    <div className="rounded-[26px] border border-red-100 bg-red-50 p-6 text-center">
      <p className="font-semibold text-red-700">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-full bg-white px-5 py-3 text-sm font-bold text-red-700 shadow-[0_12px_30px_rgba(185,28,28,0.10)]"
      >
        Erneut versuchen
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[18px] border border-[rgba(20,40,80,0.08)] bg-white p-6 text-center shadow-[0_14px_34px_rgba(15,23,42,0.04)]">
      <Inbox className="mx-auto mb-3 text-[#1C6AA8]" size={30} />
      <p className="text-base font-semibold">Noch keine passenden QuickCheck-Anfragen.</p>
      <p className="mt-2 text-sm text-[#6E7787]">Sobald ein Formular erfolgreich gesendet wird, erscheint es hier.</p>
    </div>
  );
}

function NoSelectionState() {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
      <div className="grid h-14 w-14 place-items-center rounded-[18px] bg-[#EAF4FC] text-[#1C6AA8]">
        <Eye size={22} />
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-[-0.04em]">Wähle links eine Anfrage aus.</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[#6E7787]">Dann siehst du Kontakt, Status, Zusammenfassung und Dokumente.</p>
    </div>
  );
}

function RequestDetails({
  request,
  onStatusChange,
  onDelete,
}: {
  request: QuickCheckRecord;
  onStatusChange: (status: QuickCheckStatus) => void;
  onDelete: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#1C6AA8]">Anfrage</p>
          <h2 className="mt-0.5 break-words text-lg font-semibold leading-tight tracking-[-0.05em] text-[#07111F]">{request.name}</h2>
          <p className="mt-1 text-xs font-medium text-[#6E7787]">{formatDate(request.created_at)}</p>
        </div>
        <StatusPill status={request.status} />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <a
          href={`mailto:${request.email}`}
          className="flex items-center gap-2.5 rounded-[16px] border border-[rgba(20,40,80,0.08)] bg-[#F9FCFF] p-2.5 text-[0.78rem] font-semibold text-[#07111F] transition-all hover:bg-[#EAF4FC] hover:text-[#1C6AA8]"
        >
          <Mail size={16} className="text-[#1C6AA8]" />
          <span className="min-w-0 truncate">{request.email}</span>
        </a>
        <a
          href={`tel:${request.phone}`}
          className="flex items-center gap-2.5 rounded-[16px] border border-[rgba(20,40,80,0.08)] bg-[#F9FCFF] p-2.5 text-[0.78rem] font-semibold text-[#07111F] transition-all hover:bg-[#EAF4FC] hover:text-[#1C6AA8]"
        >
          <Phone size={16} className="text-[#1C6AA8]" />
          <span className="min-w-0 truncate">{request.phone}</span>
        </a>
      </div>

      <div className="rounded-[18px] border border-[rgba(20,40,80,0.08)] bg-white p-1 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <div className="grid grid-cols-3 gap-1">
          {statusOrder.map((status) => {
            const isActive = request.status === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => onStatusChange(status)}
                className={`rounded-[14px] px-2 py-2 text-[0.68rem] font-black uppercase tracking-[0.13em] transition-all ${
                  isActive
                    ? 'bg-[#1C6AA8] text-white shadow-[0_14px_32px_rgba(28,106,168,0.24)]'
                    : 'text-[#736A63] hover:bg-[#EEF6FC] hover:text-[#1C6AA8]'
                }`}
              >
                {statusMeta[status].label}
              </button>
            );
          })}
        </div>
      </div>

      {request.address ? (
        <div className="rounded-[16px] border border-[rgba(20,40,80,0.08)] bg-[#F9FCFF] p-3">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#8A94A5]">Adresse</p>
          <p className="mt-1.5 text-base font-semibold text-[#07111F]">{request.address}</p>
        </div>
      ) : null}

      <div>
        <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#736A63]">Zusammenfassung</p>
        <div className="grid max-h-[36vh] gap-1.5 overflow-y-auto pr-1">
          {(request.summary ?? []).map((item) => (
            <div
              key={`${item.label}-${item.value}`}
              className="grid gap-1.5 rounded-[14px] border border-[rgba(20,40,80,0.08)] bg-[#F9FCFF] p-2.5 sm:grid-cols-[126px_minmax(0,1fr)]"
            >
              <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#9AA3B2]">{item.label}</span>
              <span className="text-sm font-semibold text-[#07111F]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#736A63]">Dokumente</p>
          <span className="rounded-full bg-[#EAF4FC] px-3 py-1 text-xs font-bold text-[#1C6AA8]">
            {getDocumentCount(request.documents)}
          </span>
        </div>
        {(request.documents ?? []).length > 0 ? (
          <div className="grid gap-1.5">
            {(request.documents ?? []).map((document) => (
              <DocumentLink key={document.path} document={document} />
            ))}
          </div>
        ) : (
          <div className="rounded-[14px] border border-dashed border-[rgba(20,40,80,0.14)] bg-[#F9FCFF] p-3 text-sm text-[#6E7787]">
            Keine Dokumente hochgeladen.
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onDelete}
        className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-600 transition-all hover:-translate-y-0.5 hover:bg-red-100"
      >
        <Trash2 size={16} />
        Anfrage löschen
      </button>
    </div>
  );
}

function DocumentLink({document}: {document: QuickCheckDocument}) {
  return (
    <a
      href={document.signedUrl}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-3 rounded-[14px] border border-[rgba(20,40,80,0.08)] bg-white px-3 py-2 text-xs font-semibold text-[#07111F] shadow-[0_10px_22px_rgba(15,23,42,0.035)] transition-all hover:-translate-y-0.5 hover:text-[#1C6AA8]"
    >
      <span className="flex min-w-0 items-center gap-3">
        <FileText size={18} className="shrink-0 text-[#1C6AA8]" />
        <span className="truncate">{document.name}</span>
      </span>
      <ArrowUpRight size={16} className="shrink-0" />
    </a>
  );
}
