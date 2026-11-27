"use client";

import { useState } from "react";

type Toast = {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

const toastQueue: Toast[] = [];
const [toastId, setToastId] = useState<string | null>(null);

function toast({
  title,
  description,
  variant = "default",
}: Omit<Toast, "id"> & { id?: string }) {
  const id = toastId ?? crypto.randomUUID();
  toastQueue.push({ id, title, description, variant });
  setToastId(id);
  return id;
}

function useToast() {
  const [toasts, setToasts] = useState<Map<string, Toast>>(new Map());
  const [nextId, setNextId] = useState(0);

  // Generate a new ID and add toast to state
  const addToast = (toast: Omit<Toast, "id">) => {
    const id = `${nextId++}`;
    setToasts((prev) => new Map(prev).set({ ...toast, id } as Toast, toast));
    // Remove after 4 seconds
    const timer = setTimeout(() => {
      setToasts((prev) => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
    }, 4000);
    return () => clearTimeout(timer);
  };

  const dismiss = (id: string) => {
    setToasts((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  return { toast, dismiss, toasts };
}

export { toast, useToast };