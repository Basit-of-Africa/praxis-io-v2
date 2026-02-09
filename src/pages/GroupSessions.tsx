import React, { useState } from "react";
import { useClientEngagementContext } from "@/context/ClientEngagementContext";
import { useProviderContext } from "@/context/ProviderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Calendar, Video, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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

const GroupSessions = () => {
  const { groupSessions, addGroupSession, joinGroupSession } = useClientEngagementContext();
  const { providers } = useProviderContext();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    providerId: "",
    maxParticipants: 10,
    date: "",
    duration: 60,
    price: 0,
    sessionType: "in-person" as "in-person" | "telehealth",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGroupSession({
      ...formData,
      date: new Date(formData.date),
      status: "scheduled",
    });
    setFormData({
      name: "",
      description: "",
      providerId: "",
      maxParticipants: 10,
      date: "",
      duration: 60,
      price: 0,
      sessionType: "in-person",
    });
    setOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Group Sessions</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Group Session</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Session Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="providerId">Provider</Label>
                  <Select
                    value={formData.providerId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, providerId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxParticipants: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date & Time</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseFloat(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sessionType">Session Type</Label>
                  <Select
                    value={formData.sessionType}
                    onValueChange={(value: "in-person" | "telehealth") =>
                      setFormData({ ...formData, sessionType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-Person</SelectItem>
                      <SelectItem value="telehealth">Telehealth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Create Session
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupSessions.map((session) => {
          const provider = providers.find((p) => p.id === session.providerId);
          const spotsLeft = session.maxParticipants - session.currentParticipants.length;

          return (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{session.name}</CardTitle>
                  <Badge
                    variant={
                      session.status === "scheduled"
                        ? "default"
                        : session.status === "completed"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {session.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {session.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(session.date, "PPP 'at' p")}
                  </div>

                  <div className="flex items-center text-sm">
                    {session.sessionType === "telehealth" ? (
                      <Video className="h-4 w-4 mr-2" />
                    ) : (
                      <MapPin className="h-4 w-4 mr-2" />
                    )}
                    {session.sessionType === "telehealth"
                      ? "Online Session"
                      : "In-Person"}
                  </div>

                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    {session.currentParticipants.length} / {session.maxParticipants}{" "}
                    participants
                  </div>

                  {provider && (
                    <p className="text-sm">
                      <span className="font-medium">Instructor:</span> {provider.fullName}
                    </p>
                  )}

                  <p className="text-lg font-bold">${session.price.toFixed(2)}</p>
                </div>

                <Button
                  className="w-full"
                  disabled={spotsLeft === 0 || session.status !== "scheduled"}
                >
                  {spotsLeft === 0 ? "Full" : `Join Session (${spotsLeft} spots left)`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GroupSessions;
