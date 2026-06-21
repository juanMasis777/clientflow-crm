import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Service = {
    id: number;
    name: string;
    description: string | null;
    price: string | number;
    status: string;
};

type ServicesPageProps = {
    services: Service[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Services',
        href: '/services',
    },
];

export default function ServicesIndex({ services }: ServicesPageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        status: 'Active',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post('/services', {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (service: Service) => {
        const confirmed = confirm(`Delete ${service.name}?`);

        if (confirmed) {
            router.delete(`/services/${service.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services" />

            <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Services
                        </h1>
                        <p className="mt-1 text-slate-500">
                            Manage the services your business offers.
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
                        <h2 className="text-xl font-bold">Add New Service</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Create a new service for your CRM.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Service Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                    placeholder="Website Design"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className="mt-2 min-h-24 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                    placeholder="Describe the service..."
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData('price', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                    placeholder="500"
                                />
                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.price}
                                    </p>
                                )}
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
                                    <option value="Paused">Paused</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                            >
                                {processing ? 'Saving...' : 'Save Service'}
                            </button>
                        </form>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm xl:col-span-2">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Service List
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Total services: {services.length}
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="border-b text-sm text-slate-500">
                                        <th className="py-3">Name</th>
                                        <th className="py-3">Description</th>
                                        <th className="py-3">Price</th>
                                        <th className="py-3">Status</th>
                                        <th className="py-3 text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {services.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="py-8 text-center text-slate-500"
                                            >
                                                No services yet. Add your first
                                                service.
                                            </td>
                                        </tr>
                                    )}

                                    {services.map((service) => (
                                        <tr
                                            key={service.id}
                                            className="border-b"
                                        >
                                            <td className="py-4 font-semibold">
                                                {service.name}
                                            </td>

                                            <td className="max-w-xs py-4 text-slate-500">
                                                {service.description || '-'}
                                            </td>

                                            <td className="py-4 font-semibold">
                                                $
                                                {Number(
                                                    service.price,
                                                ).toLocaleString()}
                                            </td>

                                            <td className="py-4">
                                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                                                    {service.status}
                                                </span>
                                            </td>

                                            <td className="py-4 text-right">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(service)
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
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}