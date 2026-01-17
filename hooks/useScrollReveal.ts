import { useEffect, useRef } from 'react';

const useScrollReveal = () => {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.1 });

    revealRefs.current.forEach(el => el && observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const addToReveal = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return { addToReveal };
};

export default useScrollReveal;