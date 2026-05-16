const icons = {
  utensils: "M4 3v7M8 3v7M6 3v18M17 3c-2 2.2-3 4.8-3 8h4v10",
  shoppingBag: "M6 8h12l-1 13H7L6 8ZM9 8a3 3 0 0 1 6 0",
  search: "m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z",
  clock: "M12 8v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  flame: "M12 22c4.5-1.5 6.5-4.2 6.5-7.6 0-3.1-1.8-5.1-4.1-7.4-.5 2.2-1.7 3.5-3.4 4.5.4-3.4-.8-6-3.1-8C7.4 7 5.5 9.7 5.5 14.4 5.5 17.8 7.5 20.5 12 22Z",
  package: "M21 8.5 12 3 3 8.5m18 0v7L12 21l-9-5.5v-7m18 0-9 5.5-9-5.5M12 14v7",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  x: "M18 6 6 18M6 6l12 12",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3",
  mapPin: "M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z",
  mail: "M4 4h16v16H4V4Zm0 3 8 6 8-6",
  bike: "M5.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM18.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM9 17h5l-3-7h4l2 4M8 9h2",
  store: "M4 10h16l-1-6H5l-1 6Zm1 0v10h14V10M9 20v-6h6v6",
  card: "M3 5h18v14H3V5Zm0 5h18M7 15h4",
  bank: "M3 10 12 4l9 6M5 10v9M9 10v9M15 10v9M19 10v9M3 20h18",
  cash: "M4 7h16v10H4V7Zm8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  check: "m5 13 4 4L19 7",
  refresh: "M20 6v5h-5M4 18v-5h5M18 10a6 6 0 0 0-10-4L4 10m2 4a6 6 0 0 0 10 4l4-4",
  leaf: "M20 4c-7 0-12 4.5-12 11 0 3 2 5 5 5 6.5 0 11-5 11-16h-4ZM4 20c3-6 7-9 13-11",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm6-1h.01",
};

export default function Icon({ name, size = 20, className = "" }) {
  return (
    <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={icons[name]} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
