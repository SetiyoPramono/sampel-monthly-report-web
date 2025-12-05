import { createContext, useContext, useState, ReactNode } from "react";

type Language = "id" | "en";

interface Translations {
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    scrollHint: string;
    stats: {
      totalTask: string;
      websiteSetup: string;
      backupDone: string;
      issuesFixed: string;
    };
  };
  achievements: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  problems: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    successRate: string;
    successMessage: string;
    items: {
      problem: string;
      solution: string;
    }[];
  };
  innovations: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  conclusion: {
    badge: string;
    title: string;
    titleHighlight: string;
    totalTasks: string;
    categories: string[];
    performance: {
      focus: string;
      improvement: string;
      rating: string;
    };
    statusMessage: string;
    status: string;
  };
  navigation: {
    prev: string;
    next: string;
    slide: string;
  };
  footer: string;
}

const translations: Record<Language, Translations> = {
  id: {
    hero: {
      badge: "Laporan Bulan November 2025",
      title1: "Progress Report",
      title2: "Tim Web Development",
      subtitle: "Pencapaian, Problem & Solving, dan Inovasi dalam satu bulan penuh aksi! 🚀",
      scrollHint: "Klik Next untuk lanjut",
      stats: {
        totalTask: "Total Task",
        websiteSetup: "Website Setup",
        backupDone: "Backup Selesai",
        issuesFixed: "Masalah Teratasi",
      },
    },
    achievements: {
      badge: "🏆 Pencapaian",
      title: "Achievement",
      titleHighlight: "Unlocked!",
      subtitle: "Setiap task yang diselesaikan adalah level-up untuk tim! 🎮",
      items: [
        { title: "Setup & Perbaikan Website", description: "Website berhasil di-setup dan diperbaiki dengan performa optimal" },
        { title: "Backup Website", description: "Website ter-backup dengan aman untuk keamanan data" },
        { title: "Optimasi Cloudflare", description: "Keamanan login dan firewall ditingkatkan" },
        { title: "Setup Email Domain", description: "Email workspace profesional untuk tim" },
        { title: "Perpanjang Domain/Hosting", description: "Domain dan VPS diperpanjang tepat waktu" },
        { title: "Pembuatan Halaman", description: "404, single page, dan archive page" },
        { title: "Plugin Setup", description: "Donasi & Starsender berhasil dikonfigurasi" },
      ],
    },
    problems: {
      badge: "🔧 Problem & Solving",
      title: "Bug",
      titleHighlight: "Squashed!",
      subtitle: "Setiap masalah adalah kesempatan untuk belajar dan berkembang 💪",
      successRate: "Tingkat Sukses",
      successMessage: "Semua masalah berhasil diselesaikan dengan baik! 🎉",
      items: [
        { problem: "Error Elementor", solution: "Diperbaiki & sekarang bisa edit dengan lancar" },
        { problem: "SSL Expired", solution: "Sertifikat SSL diperbarui dan aktif kembali" },
        { problem: "Error Starsender", solution: "Troubleshooting selesai, sistem berjalan normal" },
        { problem: "Login Error Multi-Website", solution: "Akses diperbaiki di semua website terkait" },
        { problem: "DNS/Pointing Error", solution: "Setup ulang DNS dan pointing berhasil" },
      ],
    },
    innovations: {
      badge: "💡 Masukan & Inovasi",
      title: "Ideas for",
      titleHighlight: "Future",
      subtitle: "Ide-ide cemerlang untuk meningkatkan kinerja tim ke depannya! ✨",
      items: [
        { title: "Automasi Backup", description: "Backup otomatis dan monitoring domain untuk efisiensi" },
        { title: "Dashboard Internal", description: "Tracking progress pekerjaan secara real-time" },
        { title: "Standar Template", description: "Standardisasi tema & template WordPress" },
        { title: "SOP Keamanan", description: "Prosedur keamanan Cloudflare & login" },
        { title: "Dokumentasi Teknis", description: "Dokumentasi lengkap untuk setiap website" },
      ],
    },
    conclusion: {
      badge: "🎯 Kesimpulan",
      title: "Mission",
      titleHighlight: "Complete!",
      totalTasks: "Total task berhasil diselesaikan bulan ini!",
      categories: ["Setup", "Fix Error", "Backup", "Optimasi", "Security"],
      performance: {
        focus: "Fokus",
        improvement: "Peningkatan",
        rating: "Rating",
      },
      statusMessage: "Kinerja bulanan meningkat & lebih stabil dari sebelumnya",
      status: "Status: Performa Excellent",
    },
    navigation: {
      prev: "Sebelumnya",
      next: "Selanjutnya",
      slide: "Slide",
    },
    footer: "© 2025 Laporan Bulanan • MasTyo Web Development",
  },
  en: {
    hero: {
      badge: "Monthly Report November 2025",
      title1: "Progress Report",
      title2: "Web Development Team",
      subtitle: "Achievements, Problem Solving, and Innovation in one action-packed month! 🚀",
      scrollHint: "Click Next to continue",
      stats: {
        totalTask: "Total Tasks",
        websiteSetup: "Website Setup",
        backupDone: "Backup Done",
        issuesFixed: "Issues Fixed",
      },
    },
    achievements: {
      badge: "🏆 Achievements",
      title: "Achievement",
      titleHighlight: "Unlocked!",
      subtitle: "Every completed task is a level-up for the team! 🎮",
      items: [
        { title: "Website Setup & Repair", description: "Websites successfully set up and repaired with optimal performance" },
        { title: "Website Backup", description: "Websites safely backed up for data security" },
        { title: "Cloudflare Optimization", description: "Login security and firewall enhanced" },
        { title: "Domain Email Setup", description: "Professional email workspace for the team" },
        { title: "Domain/Hosting Renewal", description: "Domain and VPS renewed on time" },
        { title: "Page Creation", description: "404, single page, and archive pages" },
        { title: "Plugin Setup", description: "Donation & Starsender successfully configured" },
      ],
    },
    problems: {
      badge: "🔧 Problem & Solving",
      title: "Bug",
      titleHighlight: "Squashed!",
      subtitle: "Every problem is an opportunity to learn and grow 💪",
      successRate: "Success Rate",
      successMessage: "All problems successfully resolved! 🎉",
      items: [
        { problem: "Elementor Error", solution: "Fixed & now can edit smoothly" },
        { problem: "SSL Expired", solution: "SSL certificate renewed and active again" },
        { problem: "Starsender Error", solution: "Troubleshooting complete, system running normally" },
        { problem: "Multi-Website Login Error", solution: "Access fixed on all related websites" },
        { problem: "DNS/Pointing Error", solution: "DNS reconfigured and pointing successful" },
      ],
    },
    innovations: {
      badge: "💡 Suggestions & Innovation",
      title: "Ideas for",
      titleHighlight: "Future",
      subtitle: "Brilliant ideas to improve team performance going forward! ✨",
      items: [
        { title: "Backup Automation", description: "Automatic backup and domain monitoring for efficiency" },
        { title: "Internal Dashboard", description: "Real-time work progress tracking" },
        { title: "Template Standards", description: "WordPress theme & template standardization" },
        { title: "Security SOP", description: "Cloudflare & login security procedures" },
        { title: "Technical Documentation", description: "Complete documentation for each website" },
      ],
    },
    conclusion: {
      badge: "🎯 Conclusion",
      title: "Mission",
      titleHighlight: "Complete!",
      totalTasks: "Total tasks completed this month!",
      categories: ["Setup", "Fix Error", "Backup", "Optimization", "Security"],
      performance: {
        focus: "Focus",
        improvement: "Improvement",
        rating: "Rating",
      },
      statusMessage: "Monthly performance improved & more stable than before",
      status: "Status: Excellent Performance",
    },
    navigation: {
      prev: "Previous",
      next: "Next",
      slide: "Slide",
    },
    footer: "© 2025 Monthly Report • MasTyo Web Development",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("id");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
