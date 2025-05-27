"use client";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@radix-ui/react-separator";
import {
	Bell,
	BookText,
	Calendar,
	ChevronLeft,
	ChevronRight,
	LucideIcon,
	User,
} from "lucide-react";
import React, { ReactElement, useState } from "react";

interface Attribute {
	icon: LucideIcon;
	keyName: String;
	value: ReactElement;
}

enum TripType {
	OneWay,
	RoundTrip,
	Reserved,
}

const Homepage = () => {
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [selectedTripType, setSelectedTripType] = useState<TripType>(
		TripType.OneWay,
	);

	return (
		<div className="relative min-h-dvh flex justify-center items-center">
			This is a map
			{isCreating && (
				<div className=" absolute top-0 right-0 bottom-0 left-0 z-10 min-h-dvh flex flex-col p-4 justify-start items-center bg-white">
					{/* Header */}
					<div className="flex w-full justify-between items-center">
						<Button
							className="p-0 shadow-none"
							onClick={() => {
								setIsCreating(false);
							}}
						>
							<ChevronLeft />
						</Button>
						Request a booking
						<span></span>
					</div>
					<div className="w-full flex justify-between p-2">
						<div className="font-bold">Passenger</div>
						<p>1 people</p>
					</div>
					<Separator className=" min-h-[1px] w-full bg-gray-200" />
					<div className="w-full flex justify-between p-2">
						<div className="font-bold">Trip Type</div>
						<p>One way</p>
					</div>
					<Separator className=" min-h-[1px] w-full bg-gray-200" />
					<div className="w-full flex justify-between p-2">
						<div className="text-gray-500">Trip purpose {"(optional)"} </div>
					</div>
					<Separator className=" min-h-[1px] w-full bg-gray-200" />
					<div className="w-full flex justify-between p-2">
						<div className="font-bold">Arrival deadline</div>
						<p className="flex gap-2 text-gray-500">
							Apr 21, 2025, 12:00 <Calendar />
						</p>
					</div>
					<Separator className=" min-h-[1px] w-full bg-gray-200" />
					<div className="w-full flex justify-between p-2">
						<div className="font-bold">Preffered departure</div>
						<p className="flex gap-2 text-gray-500">
							Apr 21, 2025, 12:00 <Calendar />
						</p>
					</div>
					<Separator className=" min-h-[1px] w-full bg-gray-200" />
					<div className="w-full flex justify-between p-2">
						<div className="font-bold">Pick up</div>
						<p className="flex gap-2 text-gray-500">
							Location, Address <ChevronRight className="text-black" />
						</p>
					</div>
					<Separator className=" min-h-[1px] w-full bg-gray-200" />
					<div className="w-full flex justify-between p-2">
						<div className="font-bold">Destination</div>
						<p className="flex gap-2 text-gray-500">
							Location, Address <ChevronRight className="text-black" />
						</p>
					</div>
					<Separator className=" min-h-[1px] w-full bg-gray-200" />
					<div className="w-full flex justify-between p-2">
						<div className="text-gray-500">
							Cargo requirement {"(optional)"}
						</div>
					</div>
					<Separator className=" min-h-[1px] w-full bg-gray-200" />
					<div className="w-full flex justify-between p-2">
						<div className="text-gray-500"> Note {"(optional)"} </div>
					</div>
					{/* <Separator className=" min-h-[1px] w-full bg-gray-200" /> */}
					<div className="flex flex-row justify-center items-center w-full gap-4 px-48">
						<Separator
							className=" min-h-[1px] max-h-[1px] w-full
              bg-gray-200"
						/>
						<p className="text-nowrap text-gray-500 text-sm">
							{selectedTripType.toString()}
						</p>
						<Separator
							className=" min-h-[1px] max-h-[1px] w-full
              bg-gray-200"
						/>
					</div>
				</div>
			)}
			<div className="absolute bottom-0 left-0 right-0 flex justify-around items-center h-20 bg-white shadow-sm">
				<BookText />
				<Bell />
				<User />
			</div>
			<Button
				className="absolute bottom-4 right-4 bg-primary"
				onClick={() => {
					setIsCreating(true);
				}}
			>
				+
			</Button>
			<Drawer>
				<DrawerTrigger className="absolute top-4 w-full">Open</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Are you absolutely sure?</DrawerTitle>
						<DrawerDescription>This action cannot be undone.</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<Button>Submit</Button>
						<DrawerClose>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default Homepage;
