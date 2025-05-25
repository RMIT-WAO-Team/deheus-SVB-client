"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { ModeToggle } from "@/components/theme-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginTabs() {
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
                    src="/deheus-login-logo.png"
                    alt="De Heus Login Logo"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto rounded"
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
                    className="w-full font-semibold border h-15"
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
        <div className="flex flex-col justify-between w-screen h-screen p-6 bg-foreground">
            <div>
                <Button
                    variant="outline"
                    className="h-10 border bg-foreground text-background border-background/10"
                    onClick={() => setTab("roleask")}
                >
                    <ChevronLeft className="scale-180" />
                </Button>
            </div>

            <div></div>

            <div></div>
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
                <h1 className="text-4xl font-bold text-center text-start">
                    Welcome back!
                </h1>
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
                    <button
                        type="submit"
                        className="w-full mt-5 font-semibold rounded-md h-15 bg-foreground text-background dark:bg-foreground"
                    >
                        Login
                    </button>
                </form>
            </div>

            <div>
                <div className="flex items-center justify-center mt-4">
                    <Link
                        href="/support"
                        className="text-blue-500 underline text-background"
                    >
                        Need support?
                    </Link>
                </div>
            </div>
        </div>
    )
}
