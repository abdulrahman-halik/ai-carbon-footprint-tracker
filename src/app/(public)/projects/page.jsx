"use client";

import React from 'react';
import { ProjectGallery } from '@/features/projects/ProjectGallery';

const projects = [
    {
        id: 1,
        name: "Amazon Reforestation Initiative",
        type: "Forestry",
        location: "Brazil",
        shortDescription: "Restoring degraded lands in the Amazon basin through native tree planting and community-led conservation efforts.",
        description: "This project focuses on restoring 500 hectares of degraded land in the Amazon via native species reforestation. By working with local communities, we ensure sustainable land management practices that protect biodiversity and sequester carbon.",
        impactGoal: "50,000",
        status: "Gold Standard",
        certifications: ["VCS", "CCB Gold"],
    },
    {
        id: 2,
        name: "Sahara Wind Farm",
        type: "Renewable Energy",
        location: "Morocco",
        shortDescription: "Generating clean electricity for 200,000 homes and displacing fossil fuel usage in the national grid.",
        description: "A large-scale wind energy project located in the windy regions of Morocco. It generates clean electricity that feeds into the national grid, reducing reliance on fossil fuels and avoiding significant CO2 emissions annually.",
        impactGoal: "120,000",
        status: "Verified",
        certifications: ["VCS"],
    },
    {
        id: 3,
        name: "Clean Water for Kenya",
        type: "Community",
        location: "Kenya",
        shortDescription: "Providing water filters to rural families, reducing the need to boil water using wood fuel.",
        description: "This project distributes ceramic water filters to rural households in Kenya. By eliminating the need to boil water for purification, families reduce their wood fuel consumption, saving forests and reducing indoor air pollution.",
        impactGoal: "15,000",
        status: "verified",
        certifications: ["Gold Standard"],
    },
    {
        id: 4,
        name: "Mangrove Restoration",
        type: "Blue Carbon",
        location: "Indonesia",
        shortDescription: "Rehabilitating coastal mangrove ecosystems to protect shorelines and store vast amounts of carbon.",
        description: "Mangroves are incredible carbon sinks. This project restores damaged coastal ecosystems in Indonesia, protecting local communities from storm surges while sequestering blue carbon at rates higher than terrestrial forests.",
        impactGoal: "30,000",
        status: "In Progress",
        certifications: ["Plan Vivo"],
    },
    {
        id: 5,
        name: "Biogas Digesters",
        type: "Energy Efficiency",
        location: "Vietnam",
        shortDescription: "converting farm waste into clean cooking gas for rural households.",
        description: "Small-scale biogas digesters are installed for farmers in Vietnam. These systems convert livestock waste into clean cooking gas, reducing methane emissions and stopping the burning of wood for cooking.",
        impactGoal: "8,000",
        status: "Verified",
        certifications: ["Gold Standard"],
    },
];

export default function ProjectsPage() {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Carbon Offset Projects</h1>
                <p className="text-xl text-gray-600">
                    Explore transparent, high-impact projects that are making a real difference in the fight against climate change.
                </p>
            </div>

            <ProjectGallery projects={projects} />
        </div>
    );
}
