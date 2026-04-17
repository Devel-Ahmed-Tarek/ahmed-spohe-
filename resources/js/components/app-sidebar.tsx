import { Link } from '@inertiajs/react';
import { Briefcase, ImageIcon, Images, Inbox, Languages, LayoutGrid, Settings2, Tag } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Site configuration',
        href: '/dashboard/site-configuration',
        icon: Settings2,
    },
    {
        title: 'Site Content',
        href: '/dashboard/site-content',
        icon: Languages,
    },
    {
        title: 'Hero Slides',
        href: '/dashboard/hero-slides',
        icon: Images,
    },
    {
        title: 'Brands',
        href: '/dashboard/brands',
        icon: Tag,
    },
    {
        title: 'Our Services',
        href: '/dashboard/site-services',
        icon: Briefcase,
    },
    {
        title: 'Gallery',
        href: '/dashboard/gallery',
        icon: ImageIcon,
    },
    {
        title: 'Contact requests',
        href: '/dashboard/contact-requests',
        icon: Inbox,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
