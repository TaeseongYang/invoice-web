import { Sidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/admin-header'
import { LogoutButton } from '@/components/auth/logout-button'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader logoutButton={<LogoutButton />} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
