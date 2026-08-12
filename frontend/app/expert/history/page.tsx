"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerificationHistory() {
  const history = [
    { id: '101', date: '2026-08-11', species: 'Panax quinquefolius', action: 'VERIFIED', comment: 'Matches perfectly.' },
    { id: '105', date: '2026-08-09', species: 'Echinacea purpurea', action: 'REJECTED', comment: 'Looks like E. pallida.' },
    { id: '108', date: '2026-08-08', species: 'Hydrastis canadensis', action: 'NEEDS_MORE_INFO', comment: 'Need closer photo of root structure.' },
  ];

  return (
    <ProtectedRoute requiredRole="EXPERT">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold font-outfit mb-2">Verification History</h1>
        <p className="text-muted-foreground mb-8">Log of all observations you have reviewed.</p>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Observation</TableHead>
                  <TableHead>Species</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="font-mono text-xs">#{item.id}</TableCell>
                    <TableCell className="italic">{item.species}</TableCell>
                    <TableCell><StatusBadge status={item.action} /></TableCell>
                    <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">{item.comment}</TableCell>
                    <TableCell>
                      <Link href={`/observations/${item.id}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 px-3">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
