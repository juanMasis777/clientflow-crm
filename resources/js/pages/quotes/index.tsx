import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Client = {
    id: number;
    name: string;
};

type Service = {
    id: number;
    name: string;
    price: string | number;
};

type Quote = {
    id: number;
    quote_number: string;
    title: string;
    amount: string | number;
    status: string;
    valid_until: string | null;
    notes: string | null;
    client: Client | null;
    service: Service | null;
};

type QuotesPageProps = {
    quotes: Quote[];
    clients: Client[];
    services: Service[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quotes',
        href: '/quotes',
    },
];

export default function QuotesIndex({
    quotes,
    clients,
    services,
}: QuotesPageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        client_id: '',
        service_id: '',
        title: '',
        amount: '',
        status: 'Pending',
        valid_until: '',
        notes: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post('/quotes', {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (quote: Quote) => {
        const confirmed = confirm(`Delete quote ${quote.quote_number}?`);

        if (confirmed) {
            router.delete(`/quotes/${quote.id}`);
        }
    };

    const handleServiceChange = (serviceId: string) => {
        setData('service_id', serviceId);

        const selectedService = services.find(
            (service) => service.id === Number(serviceId),
        );

        if (selectedService) {
            setData('amount', String(selectedService.price));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quotes" />

            <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Quotes
                        </h1>
                        <p className="mt-1 text-slate-500">
                            Create and manage client quotes for your services.
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
                        <h2 className="text-xl font-bold">Create New Quote</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Select a client, service and price.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Client
                                </label>
                                <select
                                    value={data.client_id}
                                    onChange={(e) =>
                                        setData('client_id', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                >
                                    <option value="">Select client</option>
                                    {clients.map((client) => (
                                        <option
                                            key={client.id}
                                            value={client.id}
                                        >
                                            {client.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.client_id && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.client_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Service
                                </label>
                                <select
                                    value={data.service_id}
                                    onChange={(e) =>
                                        handleServiceChange(e.target.value)
                                    }
                                    className="mt-2 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                >
                                    <option value="">Select service</option>
                                    {services.map((service) => (
                                        <option
                                            key={service.id}
                                            value={service.id}
                                        >
                                            {service.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.service_id && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.service_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Quote Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                    placeholder="Landing Page Project"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.amount}
                                    onChange={(e) =>
                                        setData('amount', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                    placeholder="500"
                                />
                                {errors.amount && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.amount}
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
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Paid">Paid</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Valid Until
                                </label>
                                <input
                                    type="date"
                                    value={data.valid_until}
                                    onChange={(e) =>
                                        setData('valid_until', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                                />
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
                                    placeholder="Quote notes..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                            >
                                {processing ? 'Saving...' : 'Save Quote'}
                            </button>
                        </form>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm xl:col-span-2">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Quote List
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Total quotes: {quotes.length}
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b bg-slate-50 text-sm text-slate-500">
                                        <th className="px-4 py-3">Quote #</th>
                                        <th className="px-4 py-3">Title</th>
                                        <th className="px-4 py-3">Client</th>
                                        <th className="px-4 py-3">Service</th>
                                        <th className="px-4 py-3">Amount</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">
                                            Valid Until
                                        </th>
                                        <th className="px-4 py-3 text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {quotes.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="px-4 py-8 text-center text-slate-500"
                                            >
                                                No quotes yet. Create your first
                                                quote.
                                            </td>
                                        </tr>
                                    )}

                                    {quotes.map((quote) => (
                                        <tr
                                            key={quote.id}
                                            className="border-b hover:bg-slate-50"
                                        >
                                            <td className="whitespace-nowrap px-4 py-4 font-semibold">
                                                {quote.quote_number}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4 text-slate-700">
                                                {quote.title}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                                                {quote.client?.name || '-'}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                                                {quote.service?.name || '-'}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4 font-semibold">
                                                $
                                                {Number(
                                                    quote.amount,
                                                ).toLocaleString()}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                                                        quote.status === 'Paid'
                                                            ? 'bg-emerald-50 text-emerald-600'
                                                            : quote.status ===
                                                                'Approved'
                                                              ? 'bg-blue-50 text-blue-600'
                                                              : quote.status ===
                                                                  'Rejected'
                                                                ? 'bg-red-50 text-red-600'
                                                                : 'bg-amber-50 text-amber-600'
                                                    }`}
                                                >
                                                    {quote.status}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                                                {quote.valid_until || '-'}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4 text-right">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(quote)
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