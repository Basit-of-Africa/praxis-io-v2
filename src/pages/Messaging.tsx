import React, { useState } from "react";
import { useClientEngagementContext } from "@/context/ClientEngagementContext";
import { useClientContext } from "@/context/ClientContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Lock, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

const Messaging = () => {
  const { messages, sendMessage } = useClientEngagementContext();
  const { clients } = useClientContext();
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const selectedClient = clients.find((c) => c.id === selectedClientId);
  const clientMessages = messages.filter(
    (m) =>
      (m.senderId === selectedClientId || m.receiverId === selectedClientId)
  );

  const handleSendMessage = () => {
    if (!selectedClientId || !newMessage.trim()) return;

    sendMessage({
      senderId: "provider1",
      receiverId: selectedClientId,
      content: newMessage,
      encrypted: true,
    });
    setNewMessage("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center mb-6">
        <MessageSquare className="mr-2 h-6 w-6" />
        <h1 className="text-3xl font-bold">Secure Messaging</h1>
        <Badge className="ml-3" variant="outline">
          <Lock className="h-3 w-3 mr-1" />
          HIPAA Compliant
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {clients.map((client) => {
                  const unreadCount = messages.filter(
                    (m) => m.senderId === client.id && !m.read
                  ).length;

                  return (
                    <div
                      key={client.id}
                      onClick={() => setSelectedClientId(client.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedClientId === client.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{client.fullName}</p>
                        {unreadCount > 0 && (
                          <Badge variant="destructive">{unreadCount}</Badge>
                        )}
                      </div>
                      <p className="text-sm opacity-80">{client.email}</p>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedClient ? `Chat with ${selectedClient.fullName}` : "Select a client"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedClient ? (
              <div className="flex items-center justify-center h-[600px] text-muted-foreground">
                <p>Select a client to start messaging</p>
              </div>
            ) : (
              <div className="flex flex-col h-[600px]">
                <ScrollArea className="flex-1 mb-4 p-4 border rounded-lg">
                  <div className="space-y-4">
                    {clientMessages.length === 0 ? (
                      <p className="text-muted-foreground text-center">
                        No messages yet. Start the conversation!
                      </p>
                    ) : (
                      clientMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.senderId === "provider1"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.senderId === "provider1"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {format(message.timestamp, "p")}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>

                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messaging;
