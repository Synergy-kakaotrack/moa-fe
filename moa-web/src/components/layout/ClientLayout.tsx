'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarProvider } from '@/contexts/SidebarContext';
import Sidebar from './Sidebar/Sidebar';

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const mainRef = useRef<HTMLElement | null>(null);
  const touchState = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    tracking: false,
    ignore: false,
  });
  const wheelState = useRef({
    accumX: 0,
    accumY: 0,
    lastTime: 0,
    cooldownUntil: 0,
  });

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return undefined;

    const isInteractiveElement = (target: Element | null) =>
      Boolean(
        target?.closest(
          'input, textarea, select, button, a, [contenteditable="true"]',
        ),
      );

    const isScrollableX = (element: HTMLElement) => {
      const style = window.getComputedStyle(element);
      const overflowX = style.overflowX;
      return (
        (overflowX === 'auto' || overflowX === 'scroll') &&
        element.scrollWidth > element.clientWidth
      );
    };

    const shouldIgnoreSwipe = (target: Element | null) => {
      if (!target) return false;
      if (target.closest('[data-swipe-navigation="ignore"]')) return true;
      if (isInteractiveElement(target)) return true;

      let current: HTMLElement | null = target as HTMLElement;
      while (current && current !== mainElement) {
        if (isScrollableX(current)) return true;
        current = current.parentElement;
      }

      return current ? isScrollableX(current) : false;
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const target = event.target as Element | null;
      if (target && !mainElement.contains(target)) return;

      const touch = event.touches[0];
      touchState.current.startX = touch.clientX;
      touchState.current.startY = touch.clientY;
      touchState.current.startTime = Date.now();
      touchState.current.tracking = true;
      touchState.current.ignore = shouldIgnoreSwipe(target);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (!touchState.current.tracking) return;
      touchState.current.tracking = false;
      if (touchState.current.ignore) return;
      if (event.changedTouches.length !== 1) return;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchState.current.startX;
      const deltaY = touch.clientY - touchState.current.startY;
      const elapsed = Date.now() - touchState.current.startTime;

      const minDistance = 80;
      const maxVertical = 60;
      const maxDuration = 700;

      if (elapsed > maxDuration) return;
      if (Math.abs(deltaX) < minDistance) return;
      if (Math.abs(deltaY) > maxVertical) return;
      if (Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;

      if (deltaX > 0) {
        if (typeof router.forward === 'function') {
          router.forward();
        } else {
          window.history.forward();
        }
      } else {
        router.back();
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.timeStamp < wheelState.current.cooldownUntil) return;
      const target = event.target as Element | null;
      if (!target || !mainElement.contains(target)) return;
      if (shouldIgnoreSwipe(target)) return;

      if (event.deltaMode !== 0) return;
      const deltaX = event.deltaX;
      const deltaY = event.deltaY;

      if (Math.abs(deltaX) <= Math.abs(deltaY)) {
        wheelState.current.accumX = 0;
        wheelState.current.accumY = 0;
        return;
      }

      const now = Date.now();
      if (now - wheelState.current.lastTime > 200) {
        wheelState.current.accumX = 0;
        wheelState.current.accumY = 0;
      }

      wheelState.current.accumX += deltaX;
      wheelState.current.accumY += deltaY;
      wheelState.current.lastTime = now;

      const threshold = 110;
      if (Math.abs(wheelState.current.accumX) < threshold) return;

      const swipeDirection = wheelState.current.accumX;
      wheelState.current.accumX = 0;
      wheelState.current.accumY = 0;
      wheelState.current.cooldownUntil = event.timeStamp + 800;

      if (swipeDirection > 0) {
        if (typeof router.forward === 'function') {
          router.forward();
        } else {
          window.history.forward();
        }
      } else {
        router.back();
      }
    };

    mainElement.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });
    mainElement.addEventListener('touchend', handleTouchEnd, {
      passive: true,
    });
    mainElement.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      mainElement.removeEventListener('touchstart', handleTouchStart);
      mainElement.removeEventListener('touchend', handleTouchEnd);
      mainElement.removeEventListener('wheel', handleWheel);
    };
  }, [router]);

  return (
    <SidebarProvider>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <main ref={mainRef} style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
