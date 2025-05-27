"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Login() {
    return (
        <div className="grid w-screen h-screen grid-cols-3">
            <div className="relative inset-0 flex-col hidden col-span-1 overflow-hidden lg:flex bg-muted border-r border-foreground/10">
                <div className="relative z-10 flex flex-col justify-between h-full p-10">
                    <div className="mt-auto text-start">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                Smart Vehicle Booking System
                            </p>
                        </blockquote>
                    </div>
                </div>
                <div className="absolute z-0 w-full h-full flex justify-center items-center">
                    <Image
                        src="/images/deheus-logo-slogan.png"
                        alt="De Heus Logo Slogan"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="w-full h-auto"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center lg:col-span-2 w-full h-full col-span-3">
                <div className="w-sm h-full flex flex-col justify-between">
                    <div className="h-40 flex justify-center items-center lg:invisible lg:size-0 w-full">
                        <Image
                            src="/images/deheus-logo-full.png"
                            alt="De Heus Logo Full"
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="w-auto h-full mt-30 lg:hidden"
                        />
                    </div>
                    <div className="p-2.5 space-y-8">
                        <h1 className="text-4xl font-bold text-start">
                            Welcome back!
                        </h1>
                        <form className="w-full space-y-6">
                            <div>
                                <Input
                                    type="username"
                                    placeholder="Enter your email/username"
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
                                className="w-full font-semibold rounded-md h-15 bg-foreground text-background dark:bg-foreground"
                            >
                                Login
                            </Button>
                            <div className="flex flex-row justify-center items-center gap-2 text-gray-500">
                                <div className="border-t w-full"></div>
                                <div className="w-fit text-nowrap whitespace-nowrap">
                                    Or login with
                                </div>
                                <div className="border-t w-full"></div>
                            </div>
                            <div>
                                <Button
                                    variant="outline"
                                    type="submit"
                                    className="w-full font-semibold rounded-md text-md h-15 border-foreground/10 dark:bg-foreground dark:text-background"
                                >
                                    <Image
                                        src="/images/microsoft-logo.png"
                                        alt="Microsoft Logo"
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        className="w-auto h-full"
                                    />
                                    &nbsp; Microsoft Account
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div>
                        <div className="flex items-center justify-center mb-4">
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
            </div>
        </div>
    )
}
