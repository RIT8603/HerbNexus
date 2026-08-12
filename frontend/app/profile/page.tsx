"use client";

import { useAuth } from "@/lib/auth-context";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <UserCircle className="h-10 w-10 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">{user?.full_name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500">Role</p>
                    <p className="font-medium">{user?.role}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500">Account Status</p>
                    <p className="font-medium">
                      {user?.is_active ? (
                        <span className="text-emerald-600">Active</span>
                      ) : (
                        <span className="text-red-600">Inactive</span>
                      )}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500">Member Since</p>
                    <p className="font-medium">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
