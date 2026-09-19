const routePrefix = "/patient";

export const PATIENT_ROUTES = [
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
                title: "My Appointments",
                url: `${routePrefix}/appointments`,
            },
            {
                title: "Book Appointment",
                url: `${routePrefix}/appointments/book`,
            },
        ],
    },
    {
        title: "Doctors",
        items: [
            {
                title: "Find Doctors",
                url: `${routePrefix}/doctors`,
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
            {
                title: "Medical History",
                url: `${routePrefix}/medical-history`,
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