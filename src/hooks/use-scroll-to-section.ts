// hooks/useScrollToSection.ts
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function useScrollToSection() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Handle hash in URL
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    // Handle sessionStorage
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    const targetPath = sessionStorage.getItem('scrollTargetPath');
    
    if (scrollTarget && targetPath && pathname === targetPath) {
      sessionStorage.removeItem('scrollTarget');
      sessionStorage.removeItem('scrollTargetPath');
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [pathname]);

  const setScrollTarget = (sectionId: string, path: string = "/") => {
    if (pathname !== path) {
      sessionStorage.setItem('scrollTarget', sectionId);
      sessionStorage.setItem('scrollTargetPath', path);
      router.push(path);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { setScrollTarget };
}