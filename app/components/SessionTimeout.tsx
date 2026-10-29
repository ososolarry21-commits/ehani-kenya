'use client'
import { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function SessionTimeout() {
  useEffect(() => {
    let logoutTimer: any;
    let warningTimer: any;

    const TIMEOUT_MS = 90 * 60 * 1000; // 90 minutes
    const WARNING_MS = 5 * 60 * 1000;  // Warn 5 minutes before

    const resetTimers = () => {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);

      warningTimer = setTimeout(() => {
        alert("⚠️ Security Alert: Your session will expire in 5 minutes due to inactivity. Please click OK to stay logged in.");
      }, TIMEOUT_MS - WARNING_MS);

      logoutTimer = setTimeout(async () => {
        await supabase.auth.signOut();
        window.location.href = '/';
      }, TIMEOUT_MS);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(evt => window.addEventListener(evt, resetTimers));
    resetTimers();

    return () => {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);
      events.forEach(evt => window.removeEventListener(evt, resetTimers));
    };
  }, []);

  return null; // This component renders nothing, it just runs the security logic in the background
}
