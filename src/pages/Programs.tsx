import React from "react";
import { useClientEngagementContext } from "@/context/ClientEngagementContext";
import { useProviderContext } from "@/context/ProviderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Clock } from "lucide-react";

const Programs = () => {
  const { programs, enrollInProgram } = useClientEngagementContext();
  const { providers } = useProviderContext();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Programs & Courses</h1>
        <Button>Create Program</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {programs.map((program) => {
          const provider = providers.find((p) => p.id === program.providerId);

          return (
            <Card key={program.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{program.name}</CardTitle>
                    <Badge className="mt-2" variant="outline">
                      {program.modules.length} Modules
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{program.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    {program.duration} days
                  </div>

                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    {program.enrolledClients.length} enrolled
                  </div>

                  {provider && (
                    <p className="text-sm">
                      <span className="font-medium">Instructor:</span>{" "}
                      {provider.fullName}
                    </p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-semibold mb-2">Modules:</p>
                  <ul className="space-y-1">
                    {program.modules.slice(0, 3).map((module) => (
                      <li key={module.id} className="text-sm flex items-start">
                        <BookOpen className="h-4 w-4 mr-2 mt-0.5" />
                        {module.title}
                      </li>
                    ))}
                    {program.modules.length > 3 && (
                      <li className="text-sm text-muted-foreground">
                        + {program.modules.length - 3} more modules
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-2xl font-bold">
                    ${program.price.toFixed(2)}
                  </p>
                  <Button>Enroll Now</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {programs.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No programs available yet.</p>
            <Button className="mt-4">Create Your First Program</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Programs;
