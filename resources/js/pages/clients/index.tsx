import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Client = {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
    status: string;
    notes: string | null;
};

type ClientsPageProps = {
    clients: Client[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: '/clients',
    },
];

export default function ClientsIndex({ clients }: ClientsPageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        status: 'Active',
        notes: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post('/clients', {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (client: Client) => {
        const confirmed = confirm(`Delete ${client.name}?`);

        if (confirmed) {
            router.delete(`/clients/${client.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />

            <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Clients
                        </h1>
                        <p className="mt-1 text-slate-500">
                            Manage your CRM clients and business contacts.
                        </p>
                    </div>

                    <a
                        href="/dashboard"
                        className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
                    >
                        Back to Dashboard
                    </a>
                </div>

                <div className="grid gap-6 xl:grid-cols-3">
                    <div className="rounded-2xl border bg-white p-6 shadow-sm xl:col-span-1">
                        <h2 className="text-xl font-bold">Add New Client</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Create a new client record.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Client Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                    placeholder="Acme Corp"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                    placeholder="client@email.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                    placeholder="305-555-1234"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    value={data.company}
                                    onChange={(e) =>
                                        setData('company', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                    placeholder="Company name"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData('status', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Prospect">Prospect</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Notes
                                </label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData('notes', e.target.value)
                                    }
                                    className="mt-2 min-h-24 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                    placeholder="Client notes..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                            >
                                {processing ? 'Saving...' : 'Save Client'}
                            </button>
                        </form>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm xl:col-span-2">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Client List
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Total clients: {clients.length}
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[950px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b bg-slate-50 text-sm text-slate-500">
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Phone</th>
                                        <th className="px-4 py-3">Company</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {clients.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-4 py-8 text-center text-slate-500"
                                            >
                                                No clients yet. Add your first
                                                client.
                                            </td>
                                        </tr>
                                    )}

                                    {clients.map((client) => (
                                        <tr
                                            key={client.id}
                                            className="border-b hover:bg-slate-50"
                                        >
                                            <td className="whitespace-nowrap px-4 py-4 font-semibold">
                                                {client.name}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                                                {client.email || '-'}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                                                {client.phone || '-'}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                                                {client.company || '-'}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                                                    {client.status}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4 text-right">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(client)
                                                    }
                                                    className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-4 text-xs text-slate-400">
                            Tip: if the table is wider than the card, scroll
                            horizontally to see all columns.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}