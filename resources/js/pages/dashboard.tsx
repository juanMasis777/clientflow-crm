import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const stats = [
    {
        title: 'Total Clients',
        value: '248',
        change: '+12.5%',
        icon: '👥',
    },
    {
        title: 'Monthly Revenue',
        value: '$28,540',
        change: '+18.7%',
        icon: '💵',
    },
    {
        title: 'Pending Quotes',
        value: '18',
        change: '+5.3%',
        icon: '📄',
    },
    {
        title: 'Paid Invoices',
        value: '156',
        change: '+22.1%',
        icon: '✅',
    },
];

const clients = [
    {
        name: 'Acme Corp',
        email: 'contact@acmecorp.com',
        status: 'Active',
        activity: '2h ago',
    },
    {
        name: 'Bright Solutions',
        email: 'hello@brightsolutions.com',
        status: 'Active',
        activity: '5h ago',
    },
    {
        name: 'Vertex Industries',
        email: 'info@vertexindustries.com',
        status: 'Prospect',
        activity: '1d ago',
    },
    {
        name: 'Global Dynamics',
        email: 'contact@globaldynamics.com',
        status: 'Active',
        activity: '2d ago',
    },
];

const invoices = [
    {
        title: 'Quote #Q-1024',
        company: 'Acme Corp',
        amount: '$4,250',
        status: 'Pending',
    },
    {
        title: 'Invoice #INV-2048',
        company: 'Bright Solutions',
        amount: '$3,850',
        status: 'Paid',
    },
    {
        title: 'Quote #Q-1023',
        company: 'Vertex Industries',
        amount: '$7,600',
        status: 'Approved',
    },
    {
        title: 'Invoice #INV-2047',
        company: 'Global Dynamics',
        amount: '$2,150',
        status: 'Paid',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ClientFlow CRM Dashboard" />

            <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Welcome back, Juan 👋
                        </h1>
                        <p className="mt-1 text-slate-500">
                            Here is what is happening with your business today.
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
                        May 12 - Jun 12, 2026
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                                    {item.icon}
                                </div>

                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                                    {item.change}
                                </span>
                            </div>

                            <p className="mt-5 text-sm font-medium text-slate-500">
                                {item.title}
                            </p>
                            <h2 className="mt-1 text-3xl font-bold">
                                {item.value}
                            </h2>
                            <p className="mt-2 text-sm text-slate-400">
                                vs last month
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-3">
                    <div className="rounded-2xl border bg-white p-6 shadow-sm xl:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Revenue Growth
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Monthly revenue performance
                                </p>
                            </div>

                            <button className="rounded-xl border px-4 py-2 text-sm font-medium">
                                This Year
                            </button>
                        </div>

                        <div className="flex h-72 items-end gap-4 border-b border-l border-slate-200 px-4 pb-4">
                            {[35, 48, 55, 62, 75, 88, 81, 79, 86, 95, 110, 130].map(
                                (height, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-1 flex-col items-center gap-2"
                                    >
                                        <div
                                            className="w-full rounded-t-xl bg-blue-500/80"
                                            style={{ height: `${height}px` }}
                                        ></div>
                                        <span className="text-xs text-slate-400">
                                            {
                                                [
                                                    'Jan',
                                                    'Feb',
                                                    'Mar',
                                                    'Apr',
                                                    'May',
                                                    'Jun',
                                                    'Jul',
                                                    'Aug',
                                                    'Sep',
                                                    'Oct',
                                                    'Nov',
                                                    'Dec',
                                                ][index]
                                            }
                                        </span>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                Recent Quotes & Invoices
                            </h2>
                            <button className="text-sm font-semibold text-blue-600">
                                View all
                            </button>
                        </div>

                        <div className="space-y-4">
                            {invoices.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex items-center justify-between rounded-xl border p-4"
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {item.title}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {item.company}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-bold">
                                            {item.amount}
                                        </p>
                                        <span
                                            className={`text-xs font-semibold ${
                                                item.status === 'Paid'
                                                    ? 'text-emerald-600'
                                                    : item.status === 'Approved'
                                                      ? 'text-blue-600'
                                                      : 'text-amber-600'
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">Recent Clients</h2>
                            <p className="text-sm text-slate-500">
                                Latest clients added to your CRM
                            </p>
                        </div>

                        <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                            Add Client
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b text-sm text-slate-500">
                                    <th className="py-3">Client Name</th>
                                    <th className="py-3">Email</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3">Last Activity</th>
                                </tr>
                            </thead>

                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client.email} className="border-b">
                                        <td className="py-4 font-semibold">
                                            {client.name}
                                        </td>
                                        <td className="py-4 text-slate-500">
                                            {client.email}
                                        </td>
                                        <td className="py-4">
                                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                                                {client.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-slate-500">
                                            {client.activity}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}