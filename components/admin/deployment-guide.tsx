"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Key, Users, Shield, ExternalLink, Copy, CheckCircle, AlertCircle, Rocket } from "lucide-react"
import { useState } from "react"

export default function DeploymentGuide() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const deploymentUrl = typeof window !== "undefined" ? window.location.origin : "your-domain.vercel.app"
  const adminUrl = `${deploymentUrl}/admin-login`

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Rocket className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard Deployment</h1>
          <p className="text-gray-600">Share admin access with other administrators</p>
        </div>
      </div>

      {/* Deployment Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Deployment Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Admin Dashboard is Live!</p>
                <p className="text-sm text-green-600">Ready for other administrators to access</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Admin Access Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-blue-600" />
            <span>Admin Access Credentials</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <label className="text-sm font-medium text-blue-800">Admin Login URL</label>
              <div className="flex items-center space-x-2 mt-2">
                <code className="flex-1 p-2 bg-white border rounded text-sm font-mono">{adminUrl}</code>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(adminUrl, "url")}>
                  {copied === "url" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <label className="text-sm font-medium text-purple-800">Secret Password</label>
              <div className="flex items-center space-x-2 mt-2">
                <code className="flex-1 p-2 bg-white border rounded text-sm font-mono">ttxx.1234</code>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard("ttxx.1234", "password")}>
                  {copied === "password" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">How to Share Access:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>Share the admin login URL with trusted administrators</li>
              <li>
                Provide them with the secret password: <code className="bg-gray-200 px-1 rounded">ttxx.1234</code>
              </li>
              <li>They can use any email address they prefer for login</li>
              <li>No additional setup or verification required</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-600" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={() => window.open(adminUrl, "_blank")} className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4" />
              <span>Open Admin Login</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => copyToClipboard(`Admin Dashboard: ${adminUrl}\nPassword: ttxx.1234`, "full")}
            >
              {copied === "full" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="ml-2">Copy Full Access Info</span>
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  "mailto:?subject=Admin Dashboard Access&body=" +
                    encodeURIComponent(
                      `You now have access to the admin dashboard:\n\nURL: ${adminUrl}\nPassword: ttxx.1234\n\nUse any email address you prefer for login.`,
                    ),
                  "_blank",
                )
              }
            >
              <span>Email Access Info</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-amber-600" />
            <span>Security Guidelines</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800 mb-2">Important Security Notes:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-amber-700">
                  <li>Only share the password with trusted administrators</li>
                  <li>The password provides full admin access to the website</li>
                  <li>Each admin should use their own email for identification</li>
                  <li>Consider changing the password periodically for security</li>
                  <li>Monitor admin activity through the user management section</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Available Admin Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Content Management", desc: "Services, News, Events" },
              { name: "Document Management", desc: "Upload and organize files" },
              { name: "Gallery Management", desc: "Image uploads and organization" },
              { name: "User Messages", desc: "Contact form submissions" },
              { name: "Site Settings", desc: "Hero content, office info" },
              { name: "User Management", desc: "Admin access control" },
            ].map((feature, index) => (
              <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-800">{feature.name}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
