import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ArrowUpRight } from 'lucide-react';

export function ProjectGallery({ projects }) {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <Card key={project.id} className="group hover:shadow-lg transition-all duration-300">
                        <div className="h-48 bg-gray-100 rounded-t-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500" />
                            <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900 hover:bg-white shadow">
                                {project.type}
                            </Badge>
                        </div>

                        <CardHeader>
                            <CardTitle className="flex justify-between items-start gap-4">
                                <span className="text-xl">{project.name}</span>
                            </CardTitle>
                            <p className="text-sm text-gray-500">{project.location}</p>
                        </CardHeader>

                        <CardContent>
                            <p className="text-gray-600 line-clamp-3 text-sm">
                                {project.shortDescription}
                            </p>
                        </CardContent>

                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                                onClick={() => setSelectedProject(project)}
                            >
                                View Details
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <ProjectDetailModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
}
