const routePrefix = "/admin";

export const ADMIN_ROUTES = [
    {
        title: "Overview",
        items: [
            {
                title: "Dashboard",
                url: `${routePrefix}`,
            },
            {
                title: "Analytics",
                url: `${routePrefix}/analytics`,
            },
        ],
    },
    {
        title: "Management",
        items: [
            {
                title: "Doctors",
                url: `${routePrefix}/doctors`,
            },
            {
                title: "Patients",
                url: `${routePrefix}/patients`,
            },
            {
                title: "Appointments",
                url: `${routePrefix}/appointments`,
            },
        ],
    },
    {
        title: "Doctor Applications",
        items: [
            {
                title: "Pending Approval",
                url: `${routePrefix}/approve-doctor`,
            },
        ],
    },
    {
        title: "Account",
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
