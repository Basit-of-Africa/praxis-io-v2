import React, { useState } from "react";
import { usePracticeContext } from "@/context/PracticeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Palette, Zap, Plug, Save } from "lucide-react";

const PracticeSettings = () => {
  const { brandingSettings, integrations, automations, updateBranding, updateIntegration } =
    usePracticeContext();

  const [branding, setBranding] = useState(brandingSettings);

  const handleSaveBranding = () => {
    updateBranding(branding);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Practice Settings</h1>

      <Tabs defaultValue="branding" className="space-y-4">
        <TabsList>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="protocols">Protocols</TabsTrigger>
        </TabsList>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                <CardTitle>Branding Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={branding.businessName}
                  onChange={(e) =>
                    setBranding({ ...branding, businessName: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={branding.primaryColor}
                      onChange={(e) =>
                        setBranding({ ...branding, primaryColor: e.target.value })
                      }
                      className="w-20"
                    />
                    <Input
                      value={branding.primaryColor}
                      onChange={(e) =>
                        setBranding({ ...branding, primaryColor: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={branding.secondaryColor}
                      onChange={(e) =>
                        setBranding({ ...branding, secondaryColor: e.target.value })
                      }
                      className="w-20"
                    />
                    <Input
                      value={branding.secondaryColor}
                      onChange={(e) =>
                        setBranding({ ...branding, secondaryColor: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="customDomain">Custom Domain</Label>
                <Input
                  id="customDomain"
                  placeholder="yourdomain.com"
                  value={branding.customDomain || ""}
                  onChange={(e) =>
                    setBranding({ ...branding, customDomain: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="bookingPageMessage">Booking Page Message</Label>
                <Textarea
                  id="bookingPageMessage"
                  value={branding.bookingPageMessage || ""}
                  onChange={(e) =>
                    setBranding({
                      ...branding,
                      bookingPageMessage: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="emailFooter">Email Footer</Label>
                <Textarea
                  id="emailFooter"
                  placeholder="Contact information, disclaimer, etc."
                  value={branding.emailFooter || ""}
                  onChange={(e) =>
                    setBranding({ ...branding, emailFooter: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <Button onClick={handleSaveBranding}>
                <Save className="mr-2 h-4 w-4" />
                Save Branding
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Plug className="h-5 w-5 mr-2" />
                <CardTitle>Integrations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{integration.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {integration.type} integration
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={integration.enabled ? "default" : "outline"}>
                      {integration.enabled ? "Active" : "Inactive"}
                    </Badge>
                    <Switch
                      checked={integration.enabled}
                      onCheckedChange={(checked) =>
                        updateIntegration(integration.id, { enabled: checked })
                      }
                    />
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Available integrations:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <Badge variant="outline">Zoom</Badge>
                  <Badge variant="outline">Stripe</Badge>
                  <Badge variant="outline">PayPal</Badge>
                  <Badge variant="outline">Mailchimp</Badge>
                  <Badge variant="outline">Twilio</Badge>
                  <Badge variant="outline">LabCorp</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automations">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  <CardTitle>Automations</CardTitle>
                </div>
                <Button size="sm">Create Automation</Button>
              </div>
            </CardHeader>
            <CardContent>
              {automations.length === 0 ? (
                <p className="text-muted-foreground">No automations configured yet.</p>
              ) : (
                <div className="space-y-4">
                  {automations.map((automation) => (
                    <div
                      key={automation.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{automation.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          When {automation.trigger.replace("_", " ")} → {automation.action.replace("_", " ")}
                        </p>
                      </div>
                      <Switch checked={automation.enabled} />
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t mt-6 pt-4">
                <p className="text-sm font-semibold mb-2">Suggested Automations:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Send appointment reminders 24 hours before</li>
                  <li>• Follow-up email after completed appointments</li>
                  <li>• Birthday greetings to clients</li>
                  <li>• Payment receipt emails</li>
                  <li>• Client feedback requests</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Email & SMS Templates</CardTitle>
                <Button size="sm">Create Template</Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create reusable templates for emails, SMS messages, notes, and treatment plans.
                Use variables like {`{{client_name}}`}, {`{{appointment_date}}`}, and {`{{provider_name}}`} for
                personalization.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protocols">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Clinical Protocols</CardTitle>
                <Button size="sm">Create Protocol</Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Define standardized clinical protocols and treatment workflows for your practice.
                Protocols help ensure consistency and quality of care across all providers.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticeSettings;
