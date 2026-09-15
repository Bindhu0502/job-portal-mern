import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCircle,
  Trash2,
  Search,
  RefreshCw,
  X,
  AlertCircle,
  UserPlus,
  Briefcase,
  FileText,
} from "lucide-react";

const getDefaultNotifications = () => [
  {
    id: "notification-1",
    type: "user",
    title: "New user registered",
    message: "A new candidate has registered on CareerHub.",
    date: new Date().toISOString(),
    read: false,
  },
  {
    id: "notification-2",
    type: "job",
    title: "New job posted",
    message: "A new job has been posted and is waiting for review.",
    date: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: "notification-3",
    type: "application",
    title: "New application received",
    message: "A candidate has submitted a new job application.",
    date: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: "notification-4",
    type: "system",
    title: "System is online",
    message: "CareerHub administration system is running normally.",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];

const loadNotifications = () => {
  try {
    const saved = localStorage.getItem("adminNotifications");

    if (!saved) {
      return getDefaultNotifications();
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return getDefaultNotifications();
    }

    return parsed;
  } catch (error) {
    console.error("NOTIFICATION LOAD ERROR:", error);
    return getDefaultNotifications();
  }
};

function Notifications() {
  const [notifications, setNotifications] = useState(loadNotifications);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(
        "adminNotifications",
        JSON.stringify(notifications)
      );
    } catch (error) {
      console.error("NOTIFICATION SAVE ERROR:", error);
    }
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return notifications.filter((notification) => {
      const title = String(notification?.title || "").toLowerCase();
      const message = String(notification?.message || "").toLowerCase();

      const matchesSearch =
        !searchText ||
        title.includes(searchText) ||
        message.includes(searchText);

      let matchesFilter = true;

      if (filter === "Unread") {
        matchesFilter = notification.read === false;
      }

      if (filter === "Read") {
        matchesFilter = notification.read === true;
      }

      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, filter]);

  const total = notifications.length;

  const unread = notifications.filter(
    (notification) => notification.read === false
  ).length;

  const read = notifications.filter(
    (notification) => notification.read === true
  ).length;

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );

    setSelectedNotification((previous) =>
      previous?.id === id
        ? { ...previous, read: true }
        : previous
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );

    setSelectedNotification((previous) =>
      previous ? { ...previous, read: true } : null
    );
  };

  const deleteNotification = (id) => {
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id)
    );

    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };

  const clearAll = () => {
    if (notifications.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete all notifications?"
    );

    if (!confirmed) {
      return;
    }

    setNotifications([]);
    setSelectedNotification(null);
  };

  const resetNotifications = () => {
    setNotifications(getDefaultNotifications());
    setSearch("");
    setFilter("All");
    setSelectedNotification(null);
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "—";
    }

    return parsed.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case "user":
        return UserPlus;

      case "job":
        return Briefcase;

      case "application":
        return FileText;

      case "system":
        return CheckCircle;

      default:
        return Bell;
    }
  };

  const openNotification = (notification) => {
    setSelectedNotification({
      ...notification,
    });

    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <div className="w-full">
      {/* HEADER */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Bell size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Notifications
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View and manage your admin notifications.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unread === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check size={16} />
            Mark all read
          </button>

          <button
            type="button"
            onClick={clearAll}
            disabled={total === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={16} />
            Clear all
          </button>
        </div>
      </div>

      {/* STAT CARDS */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total"
          value={total}
          icon={Bell}
        />

        <StatCard
          title="Unread"
          value={unread}
          icon={AlertCircle}
        />

        <StatCard
          title="Read"
          value={read}
          icon={CheckCircle}
        />
      </div>

      {/* SEARCH AND FILTER */}

      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search notifications..."
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500"
          >
            <option value="All">All Notifications</option>
            <option value="Unread">Unread</option>
            <option value="Read">Read</option>
          </select>

          <button
            type="button"
            onClick={resetNotifications}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* NOTIFICATION LIST */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {filteredNotifications.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
              <Bell size={22} />
            </div>

            <p className="mt-3 text-sm font-semibold text-gray-900">
              No notifications
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {search || filter !== "All"
                ? "No notifications match your search or filter."
                : "You're all caught up."}
            </p>

            {(search || filter !== "All") && (
              <button
                type="button"
                onClick={resetNotifications}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw size={14} />
                Reset filters
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => {
              const Icon = getIcon(notification.type);

              return (
                <div
                  key={notification.id}
                  className={`flex gap-4 p-4 transition hover:bg-gray-50 sm:p-5 ${
                    notification.read
                      ? "bg-white"
                      : "bg-blue-50/40"
                  }`}
                >
                  {/* ICON */}

                  <div className="relative shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 sm:h-11 sm:w-11">
                      <Icon size={18} />
                    </div>

                    {!notification.read && (
                      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-blue-600 ring-2 ring-white" />
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <p className="text-sm font-semibold text-gray-900">
                        {notification.title}
                      </p>

                      <span className="shrink-0 text-xs text-gray-400">
                        {formatDate(notification.date)}
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-5 text-gray-600">
                      {notification.message}
                    </p>

                    {/* ACTIONS */}

                    <div className="mt-3 flex flex-wrap gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          openNotification(notification)
                        }
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                      >
                        View
                      </button>

                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-green-600 hover:bg-green-50"
                        >
                          Mark as read
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          deleteNotification(notification.id)
                        }
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL */}

      {selectedNotification && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedNotification(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Bell size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Notification
                  </h2>

                  <p className="text-xs text-gray-500">
                    Notification details
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedNotification(null)
                }
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="space-y-5 p-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {selectedNotification.title}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  {formatDate(selectedNotification.date)}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm leading-6 text-gray-700">
                  {selectedNotification.message}
                </p>
              </div>

              <span
                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                  selectedNotification.read
                    ? "bg-green-50 text-green-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {selectedNotification.read
                  ? "Read"
                  : "Unread"}
              </span>
            </div>

            {/* MODAL FOOTER */}

            <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-4">
              {!selectedNotification.read && (
                <button
                  type="button"
                  onClick={() =>
                    markAsRead(
                      selectedNotification.id
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Check size={16} />
                  Mark as read
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  setSelectedNotification(null)
                }
                className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ============================================================
// STAT CARD
// ============================================================

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}


export default Notifications;