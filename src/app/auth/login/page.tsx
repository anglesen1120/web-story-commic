"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-2/3 max-w-4xl space-y-8 pt-5">

        {/* Login Form */}
        <div className="bg-navy-800/50 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Đăng nhập</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-navy-700 border-navy-600 text-white placeholder:text-gray-400 focus:border-primary pl-10"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-navy-700 border-navy-600 text-white placeholder:text-gray-400 focus:border-primary pl-10"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/auth/forgot-password" className="text-primary hover:text-primary/90">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Đăng nhập
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-navy-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-navy-800/50 text-gray-400">Hoặc</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-navy-700 border-navy-600 text-white hover:bg-navy-600"
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              Đăng nhập với Google
            </Button>

            <div className="text-center text-sm text-gray-400">
              Bạn chưa có tài khoản?{' '}
              <Link href="/auth/register" className="text-white hover:text-primary">
                Đăng ký
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400">
          <p>vuitruyen</p>
          <p className="mt-2">© 2024 thế giới truyện tranh</p>
        </div>
      </div>
    </div>
  );
} 