import Link from "next/link";
import {
    ArrowUpRight,
    ThumbsUp,
    HeartPulse,
    Mail,
    MapPin,
    Phone,
    LucideMoveUpRight,
    Link2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
    platform: [
        { label: "Find Doctors", href: "/doctors" },
        { label: "Appointments", href: "/appointments" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "About Us", href: "/about" },
    ],
    support: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12 lg:px-6 lg:py-16">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-2.5"
                            aria-label="MediCare home"
                        >
                            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                                <HeartPulse className="size-5" strokeWidth={2.5} />
                            </div>

                            <div>
                                <span className="text-lg font-bold tracking-tight">
                                    MediCare
                                </span>
                                <span className="ml-1 text-xs font-medium text-muted-foreground">
                                    Health
                                </span>
                            </div>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
                            Making quality healthcare more accessible. Find trusted doctors,
                            book appointments, and manage your healthcare in one place.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex items-center gap-2">
                            <SocialLink
                                href="#"
                                label="Facebook"
                                icon={<ThumbsUp className="size-4" />}
                            />

                            <SocialLink
                                href="#"
                                label="Instagram"
                                icon={<LucideMoveUpRight className="size-4" />}
                            />

                            <SocialLink
                                href="#"
                                label="LinkedIn"
                                icon={<Link2 className="size-4" />}
                            />
                        </div>
                    </div>

                    {/* Platform */}
                    <FooterColumn title="Platform" links={footerLinks.platform} />

                    {/* Support */}
                    <FooterColumn title="Support" links={footerLinks.support} />

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold">Get in touch</h3>

                        <div className="mt-4 space-y-4">
                            <ContactItem
                                icon={<Mail className="size-4" />}
                                label="Email"
                                value="support@medicare.com"
                                href="mailto:support@medicare.com"
                            />

                            <ContactItem
                                icon={<Phone className="size-4" />}
                                label="Phone"
                                value="+880 1234-567890"
                                href="tel:+8801234567890"
                            />

                            <ContactItem
                                icon={<MapPin className="size-4" />}
                                label="Location"
                                value="Rajshahi, Bangladesh"
                            />
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 rounded-2xl border bg-background p-6 shadow-sm md:flex md:items-center md:justify-between md:p-8">
                    <div>
                        <h3 className="text-lg font-semibold">
                            Take control of your healthcare
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Find a doctor and book your appointment today.
                        </p>
                    </div>

                    <Button asChild className="mt-4 md:mt-0">
                        <Link href="/doctors">
                            Find a Doctor
                            <ArrowUpRight className="ml-1 size-4" />
                        </Link>
                    </Button>
                </div>
            </div>

            <Separator />

            {/* Bottom Footer */}
            <div className="container mx-auto flex flex-col gap-3 px-4 py-6 lg:px-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-center text-xs text-muted-foreground sm:text-left">
                    © {new Date().getFullYear()} MediCare Health. All rights reserved.
                </p>

                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <Link
                        href="/privacy"
                        className="transition-colors hover:text-foreground"
                    >
                        Privacy
                    </Link>

                    <Link
                        href="/terms"
                        className="transition-colors hover:text-foreground"
                    >
                        Terms
                    </Link>

                    <Link
                        href="/contact"
                        className="transition-colors hover:text-foreground"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}

/* -------------------------------------------------------------------------- */
/* Footer Column                                                              */
/* -------------------------------------------------------------------------- */

interface FooterColumnProps {
    title: string;
    links: {
        label: string;
        href: string;
    }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
    return (
        <div>
            <h3 className="text-sm font-semibold">{title}</h3>

            <ul className="mt-4 space-y-3">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Contact Item                                                               */
/* -------------------------------------------------------------------------- */

interface ContactItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
    const content = (
        <>
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="truncate text-sm font-medium">{value}</p>
            </div>
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                className="flex items-start gap-3 transition-colors hover:text-primary"
            >
                {content}
            </a>
        );
    }

    return <div className="flex items-start gap-3">{content}</div>;
}

/* -------------------------------------------------------------------------- */
/* Social Link                                                                */
/* -------------------------------------------------------------------------- */

interface SocialLinkProps {
    href: string;
    label: string;
    icon: React.ReactNode;
}

function SocialLink({ href, label, icon }: SocialLinkProps) {
    return (
        <a
            href={href}
            aria-label={label}
            className="flex size-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
            {icon}
        </a>
    );
} 