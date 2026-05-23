'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center px-6 overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, rgba(0,255,102,0.06) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-md"
      >
        <motion.div
          className="text-[140px] sm:text-[180px] font-bold leading-none tracking-tighter mb-2 select-none"
          style={{
            background: 'linear-gradient(180deg, #00ff66 0%, transparent 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 40px rgba(0,255,102,0.3)',
          }}
          animate={{
            textShadow: [
              '0 0 40px rgba(0,255,102,0.3)',
              '0 0 60px rgba(0,255,102,0.5)',
              '0 0 40px rgba(0,255,102,0.3)',
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          404
        </motion.div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">profile not found</h1>
        <p className="text-[14px] mb-6" style={{ color: 'rgba(240,240,245,0.6)' }}>
          this knife isn&apos;t in the rack. it may have been moved, deleted, or never existed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all"
          style={{
            background: 'rgba(0,255,102,0.16)',
            color: '#00ff66',
            border: '1px solid rgba(0,255,102,0.35)',
            boxShadow: '0 0 18px rgba(0,255,102,0.2)',
          }}
        >
          <ArrowLeft size={14} /> back to home
        </Link>
      </motion.div>
    </main>
  );
}
