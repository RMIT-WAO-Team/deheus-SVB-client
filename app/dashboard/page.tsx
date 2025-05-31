import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Table,
	TableCaption,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	TableFooter,
} from "@/components/ui/table";
import { Bell, Car, Pin, Share } from "lucide-react";
import { FC, PropsWithChildren } from "react";
import { Activity, columns } from "./_recent-activity/column";
import {
	Request,
	columns as requestColumns,
} from "./_recent-activity/requests-columns";
import DataTable from "./_recent-activity/data-table";

const Dashboard = () => {
	return (
		<div className="w-full flex flex-col p-4 gap-4">
			{/* Info header */}
			<div className="flex items-center justify-end gap-8">
				<Bell />
				<div className="flex justify-center items-center gap-4">
					<Avatar className="size-12">
						<AvatarImage src="" alt="@NgoThiC" />
						<AvatarFallback>NTC</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<p className="text-subtitle-1">Ngo Thi C</p>
						<p className="text-body-2">@hr_123456</p>
						<p className="text-body-2">HR Admin</p>
					</div>
				</div>
			</div>
			{/* Statistics */}
			<div className="flex flex-col p-4 gap-4 bg-card rounded-lg">
				<div className="flex gap-4 justify-between">
					<DashboardCard title="16 Completed">
						<p className="text-subtitle-2 text-muted-foreground">
							In the last 7 days
						</p>
					</DashboardCard>
					<DashboardCard title="27 Updated">
						<p className="text-subtitle-2 text-muted-foreground">
							In the last 7 days
						</p>
					</DashboardCard>
					<DashboardCard title="3 New Urgent Requests">
						<p className="text-subtitle-2 text-muted-foreground">
							In the last day
						</p>
					</DashboardCard>
					<DashboardCard title="2 Requests Due Soon">
						<p className="text-subtitle-2 text-muted-foreground">
							In the next 3 days
						</p>
					</DashboardCard>
				</div>
				<DashboardCard title="4 Vehicles Outsourced">
					<p className="text-subtitle-2 text-muted-foreground">
						In the last 7 days
					</p>
				</DashboardCard>
				<div className="flex gap-4 justify-between">
					<DashboardCard title="Vehicle Category">
						<p className="text-subtitle-2 text-muted-foreground"></p>
					</DashboardCard>
					<DashboardCard title="Upcoming Schedules">
						<div className="flex flex-col gap-3">
							<NotificationItem priority={NotificationPriorities.URGENT} />
							<NotificationItem priority={NotificationPriorities.NORMAL} />
							<NotificationItem priority={NotificationPriorities.NORMAL} />
						</div>
					</DashboardCard>
				</div>
				<div className="flex gap-4 justify-between">
					<DashboardCard title="Trip Statistics">
						<p className="text-subtitle-2 text-muted-foreground"></p>
					</DashboardCard>
					<DashboardCard title="Recent Activities">
						<DataTable columns={columns} data={recentActivities} />
						{/* <Table className="w-full"> */}
						{/* 	<TableHeader> */}
						{/* 		<TableRow> */}
						{/* 			<TableHead className="w-[200px]">Driver</TableHead> */}
						{/* 			<TableHead className="w-[200px]">Usage</TableHead> */}
						{/* 			<TableHead>Date</TableHead> */}
						{/* 		</TableRow> */}
						{/* 	</TableHeader> */}
						{/* 	<TableBody> */}
						{/* 		{recentActivities.map((activity, idx) => ( */}
						{/* 			<TableRow key={idx}> */}
						{/* 				<TableCell className="font-medium"> */}
						{/* 					{activity.driver} */}
						{/* 				</TableCell> */}
						{/* 				<TableCell>{activity.use}</TableCell> */}
						{/* 				<TableCell>{activity.date.toDateString()}</TableCell> */}
						{/* 			</TableRow> */}
						{/* 		))} */}
						{/* 	</TableBody> */}
						{/* </Table> */}
					</DashboardCard>
				</div>
				<DashboardCard title="Recent Requests">
					<DataTable columns={requestColumns} data={requests} />
				</DashboardCard>
				<DashboardCard title="Suggested Combinations">
					<p className="text-subtitle-2 text-muted-foreground"></p>
				</DashboardCard>
			</div>
		</div>
	);
};

interface DashboardCardProps extends PropsWithChildren {
	title: string;
}

const DashboardCard: FC<DashboardCardProps> = ({ title, children }) => {
	return (
		<div className="flex flex-col w-full gap-6 p-6 bg-background rounded-md">
			<p className="text-headline-2 capitalize">{title}</p>
			{children}
		</div>
	);
};

enum NotificationPriorities {
	NORMAL,
	URGENT,
}

interface NotificationItemProps {
	priority: NotificationPriorities;
}

const NotificationItem: FC<NotificationItemProps> = ({ priority }) => {
	return (
		<div className="flex items-center gap-3 py-2 pr-3 w-full">
			{/* TODO: For some reasons this cant be dynamic to full height */}
			{priority == NotificationPriorities.NORMAL ? (
				<div className="h-16 w-1.5 bg-info rounded-tr-md rounded-br-md" />
			) : (
				<div className="h-16 w-1.5 bg-destructive rounded-tr-md rounded-br-md" />
			)}
			<Car size={48} />
			<div className="flex flex-col gap-2 w-full">
				<div className="flex justify-between">
					<div className="flex items-center gap-2">
						<div>
							<span className="text-headline-3">Header</span>
						</div>
						<Share size={16} />
					</div>
					<div className="flex items-center gap-2">
						<p className="text-body-2">12h ago</p>
						<Pin size={16} />
					</div>
				</div>
				<p className="text-body-2 text-muted-foreground">
					Trip is requested to be departed by 10AM tomorrow.
				</p>
			</div>
		</div>
	);
};

const requests: Request[] = [
	{
		id: "123",
		passengers: "Nguyen Thi Phi Ly",
		driver: "Nguyen Van A",

		timeStamp: "9:45 - 10:06",
		status: "Approved",
		actions: <></>,
	},
];

const recentActivities: Activity[] = [
	{
		id: "123",
		driver: "Nguyen Van A",
		use: "Maintanance",
		date: new Date(2025, 2, 8),
	},
	{
		id: "abc",
		driver: "Hoang Thi B",
		use: "Transportation",
		date: new Date(2025, 2, 7),
	},
	{
		id: "456",
		driver: "Nguyen Van A",
		use: "Transportation",
		date: new Date(2025, 2, 2),
	},
	{
		id: "def",
		driver: "Ngo Cam T",
		use: "Transportation",
		date: new Date(2025, 1, 28),
	},
];

export default Dashboard;
