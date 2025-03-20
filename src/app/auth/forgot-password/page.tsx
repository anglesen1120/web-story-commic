"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaEnvelope } from 'react-icons/fa';

export default function ForgotPasswordPage() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full sm:w-2/3 max-w-4xl space-y-8 pt-5">
        {/* Forgot Password Form */}
        <div className="bg-navy-800/50 p-4 sm:p-8 rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8">Quên mật khẩu</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-navy-700 border-navy-600 text-white placeholder:text-gray-400 focus:border-primary pl-9 sm:pl-10 text-sm sm:text-base"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base">
              Gửi yêu cầu
            </Button>

            <div className="text-center text-xs sm:text-sm text-gray-400">
              <Link href="/auth/login" className="text-white hover:text-primary">
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-xs sm:text-sm text-gray-400">
          <p>vuitruyen</p>
          <p className="mt-2">© 2024 thế giới truyện tranh</p>
        </div>
      </div>
    </div>
  );
} 