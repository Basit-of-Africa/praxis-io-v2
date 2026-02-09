import React, { useState } from "react";
import { usePracticeContext } from "@/context/PracticeContext";
import { useClientContext } from "@/context/ClientContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

const Charting = () => {
  const { chartNotes, addChartNote } = usePracticeContext();
  const { clients } = useClientContext();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientId: "",
    type: "soap" as "soap" | "progress" | "assessment" | "plan",
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addChartNote({
      clientId: formData.clientId,
      providerId: "prov1",
      date: new Date(),
      type: formData.type,
      content: {
        subjective: formData.subjective,
        objective: formData.objective,
        assessment: formData.assessment,
        plan: formData.plan,
      },
    });
    setFormData({
      clientId: "",
      type: "soap",
      subjective: "",
      objective: "",
      assessment: "",
      plan: "",
    });
    setOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clinical Charting</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Chart Note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Chart Note</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientId">Client</Label>
                  <Select
                    value={formData.clientId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, clientId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Note Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: typeof formData.type) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soap">SOAP Note</SelectItem>
                      <SelectItem value="progress">Progress Note</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="plan">Treatment Plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs defaultValue="subjective" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="subjective">Subjective</TabsTrigger>
                  <TabsTrigger value="objective">Objective</TabsTrigger>
                  <TabsTrigger value="assessment">Assessment</TabsTrigger>
                  <TabsTrigger value="plan">Plan</TabsTrigger>
                </TabsList>

                <TabsContent value="subjective">
                  <Label htmlFor="subjective">Subjective</Label>
                  <Textarea
                    id="subjective"
                    value={formData.subjective}
                    onChange={(e) =>
                      setFormData({ ...formData, subjective: e.target.value })
                    }
                    rows={6}
                    placeholder="Patient's description of symptoms, concerns, history..."
                  />
                </TabsContent>

                <TabsContent value="objective">
                  <Label htmlFor="objective">Objective</Label>
                  <Textarea
                    id="objective"
                    value={formData.objective}
                    onChange={(e) =>
                      setFormData({ ...formData, objective: e.target.value })
                    }
                    rows={6}
                    placeholder="Vital signs, physical examination findings, test results..."
                  />
                </TabsContent>

                <TabsContent value="assessment">
                  <Label htmlFor="assessment">Assessment</Label>
                  <Textarea
                    id="assessment"
                    value={formData.assessment}
                    onChange={(e) =>
                      setFormData({ ...formData, assessment: e.target.value })
                    }
                    rows={6}
                    placeholder="Clinical diagnosis, differential diagnoses, clinical impression..."
                  />
                </TabsContent>

                <TabsContent value="plan">
                  <Label htmlFor="plan">Plan</Label>
                  <Textarea
                    id="plan"
                    value={formData.plan}
                    onChange={(e) =>
                      setFormData({ ...formData, plan: e.target.value })
                    }
                    rows={6}
                    placeholder="Treatment plan, medications, follow-up instructions..."
                  />
                </TabsContent>
              </Tabs>

              <Button type="submit" className="w-full">
                Save Chart Note
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chart Notes History</CardTitle>
        </CardHeader>
        <CardContent>
          {chartNotes.length === 0 ? (
            <p className="text-muted-foreground">No chart notes created yet.</p>
          ) : (
            <div className="space-y-4">
              {chartNotes.map((note) => {
                const client = clients.find((c) => c.id === note.clientId);
                return (
                  <div
                    key={note.id}
                    className="flex items-start justify-between border rounded-lg p-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4" />
                        <p className="font-medium">
                          {client?.fullName} - {note.type.toUpperCase()}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {format(note.date, "PPP 'at' p")}
                      </p>
                      {note.content.subjective && (
                        <div className="mb-2">
                          <p className="text-xs font-semibold">Subjective:</p>
                          <p className="text-sm">{note.content.subjective}</p>
                        </div>
                      )}
                      {note.content.assessment && (
                        <div>
                          <p className="text-xs font-semibold">Assessment:</p>
                          <p className="text-sm">{note.content.assessment}</p>
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      View Full
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Charting;
