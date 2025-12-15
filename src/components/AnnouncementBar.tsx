export function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-[60] bg-gradient-to-r from-blue-100 via-sky-100 to-indigo-100 dark:from-blue-900/30 dark:via-sky-900/30 dark:to-indigo-900/30 shadow-sm">
      <div className="container flex items-center justify-center h-9 px-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-blue-600 text-white rounded-full">
            New
          </span>
          <span className="text-sm font-medium text-blue-900 dark:text-blue-200">
            AI Feature Added
          </span>
        </div>
      </div>
    </div>
  );
}