const routePrefix = "/super-admin";

export const SUPER_ADMIN_ROUTES = [
    {
        title: "Overview",
        items: [
            {
                title: "Dashboard",
                url: `${routePrefix}/dashboard`,
            },
            {
                title: "Analytics",
                url: `${routePrefix}/analytics`,
            },
        ],
    },
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                url: `${routePrefix}/admins`,
            },
            {
                title: "Doctors",
                url: `${routePrefix}/doctors`,
            },
            {
                title: "Patients",
                url: `${routePrefix}/patients`,
            },
        ],
    },
    {
        title: "Appointments",
        items: [
            {
                title: "All Appointments",
                url: `${routePrefix}/appointments`,
            },
        ],
    },
    {
        title: "Doctor Applications",
        items: [
            {
                title: "Pending Applications",
                url: `${routePrefix}/doctor-applications`,
            },
        ],
    },
    {
        title: "System",
        items: [
            {
                title: "Profile",
                url: `${routePrefix}/profile`,
            },
            {
                title: "Settings",
                url: `${routePrefix}/settings`,
            },
        ],
    },
]; 