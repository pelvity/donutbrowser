"use client";

import { invoke } from "@tauri-apps/api/core";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuGlobe, LuShieldCheck } from "react-icons/lu";
import { LoadingButton } from "@/components/loading-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { showErrorToast } from "@/lib/toast-utils";

interface BrowserInfo {
  id: string;
  name: string;
  version: string;
  is_installed: boolean;
}

export function BrowsersManagement() {
  const { t } = useTranslation();
  const [isDefaultBrowser, setIsDefaultBrowser] = useState(false);
  const [isSettingDefault, setIsSettingDefault] = useState(false);
  const [supportedBrowsers, setSupportedBrowsers] = useState<BrowserInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const checkDefaultBrowserStatus = useCallback(async () => {
    try {
      const isDefault = await invoke<boolean>("is_default_browser");
      setIsDefaultBrowser(isDefault);
    } catch (error) {
      console.error("Failed to check default browser status:", error);
    }
  }, []);

  const handleSetDefaultBrowser = useCallback(async () => {
    setIsSettingDefault(true);
    try {
      await invoke("set_as_default_browser");
      await checkDefaultBrowserStatus();
    } catch (error) {
      console.error("Failed to set as default browser:", error);
      showErrorToast("Failed to set as default browser");
    } finally {
      setIsSettingDefault(false);
    }
  }, [checkDefaultBrowserStatus]);

  const loadBrowsers = useCallback(async () => {
    setIsLoading(true);
    try {
      // This is a placeholder for actual browser version management logic
      // In a real scenario, we would fetch installed versions from the backend
      const browsers = await invoke<BrowserInfo[]>("get_supported_browsers");
      // filter only anti-detect for now or all? The user asked for "default browsers options also"
      setSupportedBrowsers(browsers);
    } catch (error) {
      console.error("Failed to load browsers:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void checkDefaultBrowserStatus();
    void loadBrowsers();

    const intervalId = setInterval(() => {
      void checkDefaultBrowserStatus();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [checkDefaultBrowserStatus, loadBrowsers]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <LuGlobe className="w-5 h-5 text-primary" />
                {t("settings.defaultBrowser.title")}
              </CardTitle>
              <CardDescription className="mt-1">
                {t("settings.defaultBrowser.description")}
              </CardDescription>
            </div>
            <Badge variant={isDefaultBrowser ? "default" : "secondary"}>
              {isDefaultBrowser
                ? t("common.status.active")
                : t("common.status.inactive")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <LoadingButton
            isLoading={isSettingDefault}
            onClick={() => {
              void handleSetDefaultBrowser();
            }}
            disabled={isDefaultBrowser}
            variant={isDefaultBrowser ? "outline" : "default"}
            className="w-full sm:w-auto"
          >
            {isDefaultBrowser
              ? t("settings.defaultBrowser.alreadyDefault")
              : t("settings.defaultBrowser.setAsDefault")}
          </LoadingButton>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LuShieldCheck className="w-5 h-5 text-primary" />
            {t("createProfile.regular.title")}
          </CardTitle>
          <CardDescription>
            Supported regular browsers installed on your system or available for
            download.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            {isLoading ? (
              <div className="flex justify-center py-8 text-muted-foreground animate-pulse">
                Loading supported browsers...
              </div>
            ) : supportedBrowsers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No regular browsers detected.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {supportedBrowsers.map((browser) => (
                  <div
                    key={browser.id}
                    className="flex flex-col p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{browser.name}</span>
                      <Badge
                        variant={browser.is_installed ? "outline" : "secondary"}
                      >
                        {browser.is_installed ? "Installed" : "Supported"}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Version: {browser.version || "Unknown"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
