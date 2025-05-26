"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { ModeToggle } from "@/components/theme-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from "@/hooks/useIsMobile"
// import { redirect } from "next/navigation"

export default function Layout() {
    const isMobile = useIsMobile()
    // const role = "user" // This should be dynamically determined based on user state

    if (isMobile) {
        // if (role === "user" || role === "driver") {
        //     redirect("/")
        // } else {
        //     return <MobileLogin />
        // }
        return <MobileLogin />
    } else {
        // if (role === "admin") {
        //     redirect("/")
        // } else {
        //     return <DesktopLogin />
        // }
        return <DesktopLogin />
    }
}

function DesktopLogin() {
    return (
        <div className="relative flex items-center justify-center w-screen h-screen bg-background">
            <div className="absolute z-10 top-4 right-4">
                <ModeToggle />
            </div>
            <div className="w-full max-w-md p-8 space-y-4">
                <Image
                    src="/deheus-logo.png"
                    alt="De Heus Logo"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                />
                <h1 className="text-4xl font-bold text-center">
                    Coordinator Login
                </h1>
                <Button
                    variant="outline"
                    type="submit"
                    className="w-full mt-5 font-semibold rounded-md text-md h-15 border-foreground/10 dark:bg-foreground dark:text-background"
                >
                    <Image
                        src="/microsoft-logo.png"
                        alt="Microsoft Logo"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="w-auto h-full"
                    />
                    &nbsp; Login with Microsoft Account
                </Button>
            </div>
        </div>
    )
}

function MobileLogin() {
    const [tab, setTab] = useState("roleask")

    const onTabChange = (value: string) => {
        setTab(value)
    }

    return (
        <Tabs
            value={tab}
            onValueChange={onTabChange}
            className="relative w-screen h-screen"
        >
            <div className="absolute z-10 top-4 right-4">
                <ModeToggle />
            </div>
            <TabsList className="hidden">
                <TabsTrigger value="roleask">roleask</TabsTrigger>
                <TabsTrigger value="requesterlogin">requesterlogin</TabsTrigger>
                <TabsTrigger value="driverlogin">driverlogin</TabsTrigger>
            </TabsList>
            <TabsContent value="roleask">
                <RoleAsk setTab={setTab} />
            </TabsContent>
            <TabsContent value="requesterlogin">
                <RequesterLogin setTab={setTab} />
            </TabsContent>
            <TabsContent value="driverlogin">
                <DriverLogin setTab={setTab} />
            </TabsContent>
        </Tabs>
    )
}

function RoleAsk({ setTab }: { setTab: (value: string) => void }) {
    return (
        <div className="flex flex-col justify-around w-screen h-screen">
            <div className="flex items-center justify-center h-full">
                <Image
                    src="/deheus-logo.png"
                    alt="De Heus Logo"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                />
            </div>
            <div className="w-full max-w-md p-8 space-y-4">
                <Button
                    variant="outline"
                    className="w-full font-semibold h-15 bg-foreground text-background"
                    onClick={() => setTab("requesterlogin")}
                >
                    Requester
                </Button>
                <Button
                    variant="outline"
                    className="w-full font-semibold border h-15 border-foreground/10"
                    onClick={() => setTab("driverlogin")}
                >
                    Driver
                </Button>
                <div className="flex items-center justify-center">
                    <Link href="/support" className="text-blue-500 underline">
                        Need support?
                    </Link>
                </div>
            </div>
        </div>
    )
}

function RequesterLogin({ setTab }: { setTab: (value: string) => void }) {
    return (
        <div className="flex flex-col justify-between w-screen h-screen p-3.5">
            <div>
                <Button
                    variant="outline"
                    className="h-10 border border-foreground/10"
                    onClick={() => setTab("roleask")}
                >
                    <ChevronLeft className="scale-180" />
                </Button>
            </div>

            <div className="p-2.5 space-y-8">
                <h1 className="text-4xl font-bold text-start">Welcome back!</h1>

                <Button
                    variant="outline"
                    type="submit"
                    className="w-full mt-5 font-semibold rounded-md text-md h-15 border-foreground/10 dark:bg-foreground dark:text-background"
                >
                    <Image
                        src="/microsoft-logo.png"
                        alt="Microsoft Logo"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="w-auto h-full"
                    />
                    &nbsp; Login with Microsoft Account
                </Button>
            </div>

            <div>
                <div className="flex items-center justify-center mt-4">
                    Need help?&nbsp;
                    <Link
                        href="/support"
                        className="text-blue-500 underline text-background"
                    >
                        Contact support.
                    </Link>
                </div>
            </div>
        </div>
    )
}

function DriverLogin({ setTab }: { setTab: (value: string) => void }) {
    return (
        <div className="flex flex-col justify-between w-screen h-screen p-3.5">
            <div>
                <Button
                    variant="outline"
                    className="h-10 border border-foreground/10"
                    onClick={() => setTab("roleask")}
                >
                    <ChevronLeft className="scale-180" />
                </Button>
            </div>

            <div className="p-2.5 space-y-8">
                <h1 className="text-4xl font-bold text-start">Welcome back!</h1>
                <form className="w-full space-y-6">
                    <div>
                        <Input
                            type="username"
                            placeholder="Enter your username"
                            className="shadow-sm border-foreground/10 light:bg-foreground text-foreground h-15 dark:bg-background dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            className="shadow-sm border-foreground/10 light:bg-foreground text-foreground h-15 dark:bg-background dark:text-gray-200"
                        />
                    </div>
                    <div className="w-full text-end">
                        <Link
                            href="/support"
                            className="text-gray-500 dark:text-gray-400"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <Button
                        variant="outline"
                        type="submit"
                        className="w-full mt-5 font-semibold rounded-md h-15 bg-foreground text-background dark:bg-foreground"
                    >
                        Login
                    </Button>
                </form>
            </div>

            <div>
                <div className="flex items-center justify-center mt-4">
                    Need help?&nbsp;
                    <Link
                        href="/support"
                        className="text-blue-500 underline text-background"
                    >
                        Contact support.
                    </Link>
                </div>
            </div>
        </div>
    )
}
