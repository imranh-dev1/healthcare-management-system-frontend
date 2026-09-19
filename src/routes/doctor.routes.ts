const routePrefix = "/doctor";

export const DOCTOR_ROUTES = [
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
        title: "Appointments",
        items: [
            {
                title: "Appointments",
                url: `${routePrefix}/appointments`,
            },
            {
                title: "Today's Schedule",
                url: `${routePrefix}/schedule`,
            },
        ],
    },
    {
        title: "Patients",
        items: [
            {
                title: "Patients",
                url: `${routePrefix}/patients`,
            },
        ],
    },
    {
        title: "Medical Records",
        items: [
            {
                title: "Prescriptions",
                url: `${routePrefix}/prescriptions`,
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