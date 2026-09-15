import { useEffect, useState } from "react";

import {
  Settings as SettingsIcon,
  ShieldCheck,
  Bell,
  Lock,
  User,
  Save,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

// ============================================================
// DEFAULT SETTINGS
// ============================================================

const DEFAULT_SETTINGS = {
  emailNotifications: true,
  newUserNotifications: true,
  newJobNotifications: true,
  applicationNotifications: true,
  maintenanceMode: false,
};

// ============================================================
// LOAD SETTINGS
// ============================================================

const loadSettings = () => {
  try {
    const savedSettings = localStorage.getItem("adminSettings");

    if (!savedSettings) {
      return DEFAULT_SETTINGS;
    }

    const parsedSettings = JSON.parse(savedSettings);

    if (
      !parsedSettings ||
      typeof parsedSettings !== "object"
    ) {
      return DEFAULT_SETTINGS;
    }

    return {
      ...DEFAULT_SETTINGS,
      ...parsedSettings,
    };
  } catch (error) {
    console.error("ADMIN SETTINGS LOAD ERROR:", error);

    return DEFAULT_SETTINGS;
  }
};

// ============================================================
// LOAD ADMIN USER
// ============================================================

const loadAdminUser = () => {
  try {
    const savedUser = localStorage.getItem("adminUser");

    if (!savedUser) {
      return null;
    }

    const parsedUser = JSON.parse(savedUser);

    return parsedUser;
  } catch (error) {
    console.error("ADMIN USER LOAD ERROR:", error);

    return null;
  }
};

// ============================================================
// ADMIN SETTINGS
// ============================================================

function Settings() {
  const [adminUser, setAdminUser] = useState(loadAdminUser);

  const [settings, setSettings] = useState(loadSettings);

  const [saved, setSaved] = useState(false);

  // ==========================================================
  // LOAD DATA
  // ==========================================================

  useEffect(() => {
    setAdminUser(loadAdminUser());
    setSettings(loadSettings());
  }, []);

  // ==========================================================
  // HANDLE SETTING CHANGE
  // ==========================================================

  const handleChange = (event) => {
    const { name, checked } = event.target;

    setSettings((previous) => ({
      ...previous,
      [name]: checked,
    }));

    setSaved(false);
  };

  // ==========================================================
  // SAVE SETTINGS
  // ==========================================================

  const handleSave = () => {
    try {
      localStorage.setItem(
        "adminSettings",
        JSON.stringify(settings)
      );

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error("SAVE SETTINGS ERROR:", error);
    }
  };

  // ==========================================================
  // RESET SETTINGS
  // ==========================================================

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all settings to default?"
    );

    if (!confirmed) {
      return;
    }

    const resetSettings = {
      ...DEFAULT_SETTINGS,
    };

    setSettings(resetSettings);

    try {
      localStorage.setItem(
        "adminSettings",
        JSON.stringify(resetSettings)
      );
    } catch (error) {
      console.error("RESET SETTINGS ERROR:", error);
    }

    setSaved(false);
  };

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="w-full min-w-0">
      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <SettingsIcon size={20} />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Settings
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your CareerHub administration settings.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Save size={17} />

          Save Changes
        </button>
      </div>

      {/* ======================================================
          SUCCESS MESSAGE
          ====================================================== */}

      {saved && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <CheckCircle size={18} />

          <span>Settings saved successfully.</span>
        </div>
      )}

      {/* ======================================================
          MAIN GRID
          ====================================================== */}

      <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-3">
        {/* ====================================================
            ADMIN PROFILE
            ==================================================== */}

        <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 xl:col-span-1">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <User size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900">
                Admin Profile
              </h2>

              <p className="text-xs text-gray-500">
                Current administrator
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* NAME */}

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                Name
              </label>

              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800">
                {adminUser?.name || "Administrator"}
              </div>
            </div>

            {/* EMAIL */}

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                Email
              </label>

              <div className="break-all rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800">
                {adminUser?.email || "Admin"}
              </div>
            </div>

            {/* ROLE */}

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                Role
              </label>

              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                {adminUser?.role || "admin"}
              </span>
            </div>

            {/* STATUS */}

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                Account Status
              </label>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                Active
              </span>
            </div>
          </div>
        </div>

        {/* ====================================================
            SYSTEM SETTINGS
            ==================================================== */}

        <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 xl:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ShieldCheck size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900">
                System Settings
              </h2>

              <p className="text-xs text-gray-500">
                Configure CareerHub platform behaviour.
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {/* EMAIL NOTIFICATIONS */}

            <SettingRow
              icon={Bell}
              title="Email Notifications"
              description="Allow CareerHub to send administrative email notifications."
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />

            {/* NEW USER */}

            <SettingRow
              icon={User}
              title="New User Notifications"
              description="Notify administrators when a new user registers."
              name="newUserNotifications"
              checked={settings.newUserNotifications}
              onChange={handleChange}
            />

            {/* NEW JOB */}

            <SettingRow
              icon={SettingsIcon}
              title="New Job Notifications"
              description="Notify administrators when a new job is posted."
              name="newJobNotifications"
              checked={settings.newJobNotifications}
              onChange={handleChange}
            />

            {/* APPLICATION */}

            <SettingRow
              icon={Bell}
              title="Application Notifications"
              description="Notify administrators about important application updates."
              name="applicationNotifications"
              checked={settings.applicationNotifications}
              onChange={handleChange}
            />

            {/* MAINTENANCE */}

            <SettingRow
              icon={Lock}
              title="Maintenance Mode"
              description="Temporarily restrict normal platform access while maintenance is performed."
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              danger
            />
          </div>
        </div>
      </div>

      {/* ======================================================
          SECURITY CARD
          ====================================================== */}

      <div className="mt-6 min-w-0 rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <ShieldCheck size={19} />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-bold text-gray-900">
                Security
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Your admin session is protected by authentication.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <RefreshCw size={16} />

            Reset Settings
          </button>
        </div>
      </div>

      {/* ======================================================
          PLATFORM INFORMATION
          ====================================================== */}

      <div className="mt-6 min-w-0 rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <SettingsIcon size={19} />
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900">
              Platform Information
            </h2>

            <p className="text-xs text-gray-500">
              CareerHub administration information.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InfoCard
            title="Platform"
            value="CareerHub"
          />

          <InfoCard
            title="Portal"
            value="Admin Portal"
          />

          <InfoCard
            title="Status"
            value="Online"
            status
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SETTING ROW
// ============================================================

function SettingRow({
  icon: Icon,
  title,
  description,
  name,
  checked,
  onChange,
  danger = false,
}) {
  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            danger
              ? "bg-red-50 text-red-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <Icon size={17} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            {title}
          </p>

          <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </div>

      {/* TOGGLE */}

      <label className="relative inline-flex shrink-0 cursor-pointer items-center self-start sm:self-center">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />

        <div className="relative h-6 w-11 rounded-full bg-gray-200 transition peer-checked:bg-blue-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />
      </label>
    </div>
  );
}

// ============================================================
// INFO CARD
// ============================================================

function InfoCard({
  title,
  value,
  status = false,
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="text-xs font-medium text-gray-500">
        {title}
      </p>

      {status ? (
        <div className="mt-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />

          <span className="text-sm font-semibold text-green-600">
            {value}
          </span>
        </div>
      ) : (
        <p className="mt-2 text-sm font-semibold text-gray-900">
          {value}
        </p>
      )}
    </div>
  );
}

export default Settings;