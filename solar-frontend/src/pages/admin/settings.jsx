import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Palette, Shield, User } from "lucide-react";

const AdminSettings = () => {
  const [form, setForm] = useState({
    name: "Admin User",
    email: "admin@example.com",
    theme: "light",
    notifications: true,
    twoFactor: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = (key) => {
    setForm({ ...form, [key]: !form[key] });
  };

  const handleSave = () => {
    console.log("Settings saved:", form);
    alert("Settings updated successfully!");
  };

  return (
    <div className="p-4 md:p-8 font-[Inter]">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800">Admin Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-md border border-gray-200">
          <CardHeader className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg font-semibold">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter admin name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter admin email"
              />
            </div>

            <Button onClick={handleSave} className="mt-2 w-full">
              Save Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-gray-200">
          <CardHeader className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg font-semibold">Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Theme
              </label>
              <select
                name="theme"
                value={form.theme}
                onChange={handleChange}
                className="w-full border rounded-md p-2 bg-white focus:ring-2 focus:ring-teal-500"
              >
                <option value="light">🌞 Light</option>
                <option value="dark">🌚 Dark</option>
                <option value="system">🖥 System Default</option>
              </select>
            </div>

            <div className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Enable Notifications
                </p>
                <p className="text-xs text-gray-500">
                  Receive alerts and system updates
                </p>
              </div>
              <Switch
                checked={form.notifications}
                onCheckedChange={() => handleToggle("notifications")}
              />
            </div>

            <Button onClick={handleSave} className="mt-2 w-full">
              Apply Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-gray-200 md:col-span-2">
          <CardHeader className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            <CardTitle className="text-lg font-semibold">Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={form.twoFactor}
                onCheckedChange={() => handleToggle("twoFactor")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Reset Password
                </p>
                <p className="text-xs text-gray-500">
                  Change your admin account password
                </p>
              </div>
              <Button variant="outline">Reset</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Delete Account
                </p>
                <p className="text-xs text-gray-500">
                  Permanently remove your admin account
                </p>
              </div>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-gray-200 md:col-span-2">
          <CardHeader className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-yellow-500" />
            <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  System Alerts
                </p>
                <p className="text-xs text-gray-500">
                  Receive warnings about inactive solar units
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Weekly Reports
                </p>
                <p className="text-xs text-gray-500">
                  Get summary of total energy production weekly
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Maintenance Reminders
                </p>
                <p className="text-xs text-gray-500">
                  Be reminded when maintenance is due
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
