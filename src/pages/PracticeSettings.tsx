import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePracticeContext } from "@/context/PracticeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Palette, Zap, Plug, Save, CreditCard } from "lucide-react";

const PracticeSettings = () => {
  const {
    brandingSettings,
    integrations,
    automations,
    paymentSettings,
    updateBranding,
    updateIntegration,
    updateAutomation,
    updatePaymentSettings,
  } = usePracticeContext();

  const [branding, setBranding] = useState(brandingSettings);
  const [paystackKey, setPaystackKey] = useState(paymentSettings.paystackPublicKey || "");

  const handleSaveBranding = () => {
    updateBranding(branding);
  };

  const handleSavePayments = () => {
    updatePaymentSettings({ paystackPublicKey: paystackKey });
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
          <TabsTrigger value="payments">Payments</TabsTrigger>
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
                  value={branding.customDomain || ''}
                  onChange={(e) =>
                    setBranding({ ...branding, customDomain: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="bookingPageMessage">Booking Page Message</Label>
                <Textarea
                  id="bookingPageMessage"
                  value={branding.bookingPageMessage || ''}
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
                  value={branding.emailFooter || ''}
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
                <Button size="sm" asChild>
                  <Link to="/practice-settings/automations/new">Create Automation</Link>
                </Button>
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
                      <Switch
                        checked={automation.enabled}
                        onCheckedChange={(checked) => updateAutomation(automation.id, { enabled: checked })}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Email & SMS Templates</CardTitle>
                <Button size="sm" asChild>
                  <Link to="/practice-settings/templates/new">Create Template</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Create and manage your templates here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protocols">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Clinical Protocols</CardTitle>
                <Button size="sm" asChild>
                  <Link to="/practice-settings/protocols/new">Create Protocol</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Define and manage clinical protocols here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                <CardTitle>Payment Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="paystackKey">Paystack Public Key</Label>
                <Input
                  id="paystackKey"
                  value={paystackKey}
                  onChange={(e) => setPaystackKey(e.target.value)}
                  placeholder="pk_live_..."
                />
                <p className="text-sm text-muted-foreground mt-2">
                  This key is required to process payments with Paystack.
                </p>
              </div>
              <Button onClick={handleSavePayments}>
                <Save className="mr-2 h-4 w-4" />
                Save Payment Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default PracticeSettings;
