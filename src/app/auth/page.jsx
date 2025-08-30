'use client';
import React, { useState } from 'react';
import { Card, Button, Label, TextInput } from 'flowbite-react';

function AuthPage({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState('model');

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          {isSignUp ? '註冊帳號' : '登入帳號'}
        </h2>

        {isSignUp && (
          <div className="mb-6">
            <Label className="mb-2">我是</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                color={userType === 'model' ? 'pink' : 'light'}
                onClick={() => setUserType('model')}
              >
                模特兒
              </Button>
              <Button
                color={userType === 'photographer' ? 'pink' : 'light'}
                onClick={() => setUserType('photographer')}
              >
                攝影師
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-2">電子郵件</Label>
            <TextInput id="email" type="email" placeholder="your@email.com" />
          </div>
          <div>
            <Label htmlFor="password" className="mb-2">密碼</Label>
            <TextInput id="password" type="password" placeholder="••••••••" />
          </div>
          {isSignUp && (
            <div>
              <Label htmlFor="confirmPassword" className="mb-2">確認密碼</Label>
              <TextInput id="confirmPassword" type="password" placeholder="••••••••" />
            </div>
          )}
        </div>

        <Button
          onClick={onLogin}
          className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white"
        >
          {isSignUp ? '註冊' : '登入'}
        </Button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-pink-600 hover:text-pink-700 text-sm"
          >
            {isSignUp ? '已有帳號？登入' : '沒有帳號？註冊'}
          </button>
        </div>
      </Card>
    </div>
  );
}

export default AuthPage;