"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

type Request = {
	id: string;
	passengers: String;
	driver: String;
	timeStamp: String;
	status: "Approved" | "Pending" | "Outsourced" | "Cancelled";
	actions: ReactNode;
};

const columns: ColumnDef<Request>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "passengers",
		header: "Passengers",
	},
	{
		accessorKey: "driver",
		header: "Driver",
	},
	{
		accessorKey: "timeStamp",
		header: "Time Stamp",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "actions",
		header: () => <div className="text-right">Actions</div>,
		cell: ({ row }) => {
			return <div className="text-right">actions</div>;
		},
	},
];

export { columns };
export type { Request };
