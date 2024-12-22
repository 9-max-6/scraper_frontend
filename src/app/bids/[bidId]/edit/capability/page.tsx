"use client";

import { useState, useEffect, useCallback } from "react";
import { BidProfileText } from "@/types/bid-profile-text";
import { DataTabProps } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Sample categories with levels and descriptions

const categories = BidProfileText.Capabilities

export default async function Page() {

    return (
        <div>
            Capabilities
        </div>
    )
}